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

      <!--<div v-if="isCoordinatorContext && props.mode === 'month'" class="calendar-quadrants&#45;&#45;outer">-->
        <!--<div class="calendar-quadrant" v-for="quad in density"-->
             <!--:style="`&#45;&#45;percent: ${(quad.percent / 100)}`"></div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  import SimTimeBlock from './TimeBlock'

  export default {
    name: 'sim-calendar-day',
    components: { SimTimeBlock },
    props: ['date', 'index', 'displayMode'],
    data() {
      return {
        dateFormat: 'YYYY-MM-DD',
        weekendDays: [0, 6],
        blocks: this.$store.state.current_user_data.availability[this.date],
        availability: this.$store.state.current_user_data.availability,
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
