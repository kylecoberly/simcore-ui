<template lang="html">
  <div class="sim-calendar--grid--day sim-calendar-day"
       @mousedown="setActiveDateToToday"
       :class="dayClasses"
       >
    <div class="local--day">

      <div v-if="isMonthView" class="sim-calendar--grid--date">{{ showDayNumber }}</div>
      <ul v-if="isWeekView" class="sim-calendar--grid--day--timelines">
        <li v-for="hour in 25" @dblclick="createTimeBlock(hour-1)"
            :class="setHourClasses(hour-1)"></li>
      </ul>

      <template v-if="isInstructorContext">
        <div class="local--day--time-blocks">
          <SimTimeBlock v-for="(block, index) in blocks"
            :key="index"
            :block="block"
            :index="index"
            :show-controls="showTimeBlockControls"
            :orientation="timeBlockOrientation"
            />
        </div>
      </template>

      <template v-if="isCoordinatorContext">
        <div class="local--day--event-blocks">
          <SimTimeBlock v-for="(block, index) in blocks"
            :key="index"
            :block="block"
            :index="index"
            :show-controls="showTimeBlockControls"
            :orientation="timeBlockOrientation"
            />
        </div>
        <div v-if="isMonthView" class="calendar-density-blocks--outer">
          <SimBubbleTrigger v-for="(block, index) in availabilityDensityBlocks"
            class="calendar-density-block"
            :key="index"
            :class="setDensityBlockClasses(block)"
            :style="`--percent: ${(block.percent / 100)}`"
            :data="{item: block, dayOfWeek, date, x: dayOfWeek+1}"
            :slideContent="slideContent"
            />
        </div>
      </template>

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
        blocks: this.$store.state.availabilities.blocks[this.date],
        availability: this.$store.state.availabilities.blocks,
        availabilityDensityBlocks: this.$store.state.availabilities.density_blocks[this.date],
        slideContent: {
          componentType: 'SimSlide',
          title: 'Date',
          subtitle: 'bot',
          items: [],
        },
      }
    },
    mounted() {
      // When a timeblock is added, updated, or deleted, check to see if it belongs to this date.
      // If so, refresh this day's time blocks.
      this.$store.watch(this.$store.getters.getLastUpdated, (date) => {
        if (date === this.date) {
          this.blocks = this.$store.state.availabilities.blocks[this.date]
        }
      })

      // When the week/month is updated, refresh this day's blocks.
      this.$store.watch(this.$store.getters.getActiveDate, () => {
        this.blocks = this.$store.state.availabilities.blocks[this.date]
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
        return parseInt(this.date.split('-')[2])
      },
      dayOfWeek() {
        return moment(this.date).day()
      },
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

        if (this.$store.state.calendar.settings.weekend_days.includes(dayOfWeek)) {
          classes.push('is-weekend')
        } else {
          classes.push('is-weekday')
        }
        if (moment(this.$store.state.activeDate.date).isSame(this.date, 'day')) {
          classes.push(this.selectedClass || 'is-selected')
        }

        return classes.join(' ')
      },
      bubbleData() {
        return this.$store.state.bubble.data
      },
      shouldBubbleBeOpen() {
        return this.$store.state.bubble.is_open
      },
      isInstructorContext() {
        return (this.userContext === 'instructor')
      },
      isCoordinatorContext() {
        return (this.userContext === 'coordinator')
      },
      timeBlockOrientation() {
        return (this.isMonthView ? 'x' : 'y')
      },
      showTimeBlockControls() {
        return (this.isMonthView ? false : true)
      },
    },
    methods: {
      setActiveDateToToday() {
        this.$store.commit('setActiveDate', this.date)
      },

      setDensityBlockClasses(block) {
        const classes = []


        if (this.shouldBubbleBeOpen && this.bubbleData.item === block) {
          console.log(this.bubbleData.date)
          classes.push('active')
        }

        return classes.join(' ')
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
  @import '../styles/calendar-day';
</style>
