<template lang="html">
  <div class="sim-calendar--grid--day sim-calendar-day"
       @mousedown="setActiveDateToToday"
       :class="dayClasses"
  >
    <div class="local--day">
      <div v-if="isMonthView" class="sim-calendar--grid--date">{{ showDayNumber }}</div>
      <ul v-else-if="isWeekView" class="sim-calendar--grid--day--timelines">
        <li v-for="hour in 25" @dblclick="createTimeBlock(hour-1)"
            :class="setHourClasses(hour-1)"></li>
      </ul>

      <div class="local--day--time-blocks">
        <template v-for="(block, index) in blocks">
          <SimTimeBlock v-if="isWeekView"
                        :block="block"
                        :index="index"
                        orientation="y" />
          <SimTimeBlock v-if="isMonthView"
                        :block="block"
                        :index="index"
                        :show-controls="false"
                        orientation="x" />
        </template>
      </div>

      <div class="local--day--time-blocks">
        <template v-for="(block, index) in blocks">
          <SimTimeBlock v-if="isWeekView"
                        :block="block"
                        :index="index"
                        :show-controls="false"
                        orientation="y" />
          <SimTimeBlock v-if="isMonthView"
                        :block="block"
                        :index="index"
                        :show-controls="false"
                        orientation="x" />
        </template>
      </div>

      <div v-if="isCoordinatorContext && isMonthView" class="calendar-quadrants--outer">
        <template v-for="quad in density">
          <SimBubbleTrigger class="calendar-quadrant"
                            :class="{active: shouldBubbleBeOpen && bubbleData.item === quad && date === date}"
                            :style="`--percent: ${(quad.percent / 100)}`"
                            :data="{item: quad, dayOfWeek, date, x: dayOfWeek+1}"
          ></SimBubbleTrigger>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  import SimTimeBlock from './TimeBlock'
  import SimBubbleTrigger from './BubbleTrigger'

  export default {
    name: 'sim-calendar-day',
    components: { SimTimeBlock, SimBubbleTrigger },
    props: ['date', 'index', 'displayMode', 'userContext'],
    data() {
      return {
        dateFormat: 'YYYY-MM-DD',
        blocks: this.$store.state.current_user_data.availability[this.date],
        availability: this.$store.state.current_user_data.availability,
        density: [
          {
            percent: 100,
            start: 0,
            end: 6,
          },
          {
            percent: 35,
            start: 6,
            end: 12,
          },
          {
            percent: 65,
            start: 12,
            end: 18,
          },
          {
            percent: 10,
            start: 18,
            end: 24,
          },
        ],
      }
    },
    mounted() {
      // When a timeblock is added, updated, or deleted, check to see if it belongs to this date.
      // If so, refresh this day's time blocks.
      this.$store.watch(this.$store.getters.getLastUpdated, (date) => {
        if (date === this.date) {
          this.blocks = this.$store.state.current_user_data.availability[this.date]
        }
      })

      // When the week/month is updated, refresh this day's blocks.
      this.$store.watch(this.$store.getters.getActiveDate, () => {
        this.blocks = this.$store.state.current_user_data.availability[this.date]
      })
    },
    computed: {
      isMonthView() {
        return this.displayMode === 'month'
      },
      isWeekView() {
        return this.displayMode === 'week'
      },
      showDayNumber() {
        const date = this.date.split('-')

        return parseInt(date[2])
      },
      dayOfWeek() { return moment(this.date).day() },
      dayClasses() {
        const dayOfWeek = moment(this.date).day()
        const classes = [`day-${dayOfWeek}`]

        if (moment().isSame(this.date, 'day')) {
          classes.push('is-today')
        } else if (moment().isAfter(this.date, 'day')) {
          classes.push('is-before-today')
        } else {
          classes.push('is-after-today')
        }

        if (this.$store.state.calendar_settings.weekend_days.includes(dayOfWeek)) {
          classes.push('is-weekend')
        } else {
          classes.push('is-weekday')
        }
        if (moment(this.$store.state.active_date).isSame(this.date, 'day')) {
          classes.push(this.selectedClass || 'is-selected')
        }

        return classes.join(' ')
      },
      bubbleData() {
        return this.$store.state.bubble_data
      },
      shouldBubbleBeOpen() {
        return this.$store.state.bubble_is_open
      },
      isInstructorContext() {
        return (this.userContext === 'instructor')
      },
      isCoordinatorContext() {
        return (this.userContext === 'coordinator')
      },
    },
    methods: {
      setActiveDateToToday() {
        this.$store.commit('setActiveDate', this.date)
      },
      setHourClasses(hour) {
        const classes = []
        classes.push((hour >= 6 && hour <= 17 ? 'is-daytime' : 'is-nighttime'))
        classes.push((hour === 0 || hour === 24 ? 'is-midnight' : (hour === 12 ? 'is-noon' : '')))

        return classes.join(' ')
      },

      createTimeBlock(hour) {
        const blocks = this.availability[this.date] || []
        blocks.push({ start: hour, duration: 1 })
        blocks.sort((a, b) => parseFloat(a.start) - parseFloat(b.start))

        this.$store.commit('setAvailabilityBlocksForDay', { date: this.date, blocks })
      },
    },
  }
</script>

<style lang="scss">
  // @import '../styles/calendar';
</style>
