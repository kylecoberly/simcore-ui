<template lang="html">
  <div class="sim-calendar-day"
       @mousedown="setActiveDateToToday"
       @click.meta="toggleCalendarDisplayMode"
       :class="dayClasses"
       >
    <div class="local--day">

      <div v-if="isMonthView" class="sim-calendar--grid--date">{{ showDayNumber }}</div>

      <ul v-if="isWeekView" class="sim-calendar--grid--day--timelines">
        <li v-for="hour in 25" @dblclick="createBlock(hour-1)"
        :class="setHourClasses(hour-1)"></li>
      </ul>

      <template v-if="isInstructorContext">
        <div class="local--day--blocks local--day--event-blocks">
          <SimTimeBlock v-for="(block, index) in events"
            :key="index"
            :block="block"
            :index="index"
            :show-controls="false"
            :orientation="timeBlockOrientation"
            />
        </div>
        <div class="local--day--blocks local--day--time-blocks">
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

        <div v-if="isWeekView" class="local--day--availability-blocks">
          <SimTimeBlock v-for="(block, index) in allAvailabilityBlocks"
            :key="index"
            :block="block"
            :index="index"
            :show-controls="false"
            :orientation="timeBlockOrientation"
            />
        </div>

        <div class="local--day--event-blocks">
          <SimTimeBlock v-for="(block, index) in events"
            :key="index"
            :block="block"
            :index="index"
            :show-controls="false"
            :orientation="timeBlockOrientation"
            />
        </div>

        <div class="local--day--time-blocks">
          <SimTimeBlock v-for="(block, index) in stagedEvents"
            class="sim-timeblock--pending-event"
            :key="index"
            :block="block"
            :index="index"
            :show-controls="showTimeBlockControls"
            :orientation="timeBlockOrientation"
            />
        </div>

        <div v-if="isMonthView" class="calendar-density-blocks--outer">
          <SimBubbleTrigger v-for="(block, index) in availabilityDensityBlocks"
            class="calendar-density-block sim-timeblock sim-timeblock--y"
            :key="index"
            :class="setDensityBlockClasses(block)"
            :style="`--start: ${block.start};--duration: ${block.duration}`"
            :bubble-meta-data="{key: getMetaKey(block), x: dayOfWeek+1}"
            :slideContent="packageSlideContent(block)"
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
        blocks: this.$store.state.current_user_data.availability[this.date],
        // availability: this.$store.state.current_user_data.availability,
        availabilityDensityBlocks: this.$store.state.current_user_data.all_availability[this.date],
        allAvailabilityBlocks: this.$store.state.current_user_data.all_availability[this.date],
        events: this.$store.state.current_user_data.events[this.date],
        stagedEvents: [],
        slideContent: this.$store.state.slideDeck.currentSlideContent,
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
        return parseInt(this.date.split('-')[2])
      },
      dayOfWeek() {
        return moment(this.date).day()
      },
      dayClasses() {
        const classes = [`day-${this.dayOfWeek}`]

        if (moment().isSame(this.date, 'day')) {
          classes.push('is-today')
        } else if (moment().isAfter(this.date, 'day')) {
          classes.push('is-before-today')
        } else {
          classes.push('is-after-today')
        }

        if (this.$store.state.calendar_settings.weekend_days.includes(this.dayOfWeek)) {
          classes.push('is-weekend')
        } else {
          classes.push('is-weekday')
        }
        if (moment(this.$store.state.active_date).isSame(this.date, 'day')) {
          classes.push(this.selectedClass || 'is-selected')
        }

        return classes.join(' ')
      },
      bubbleMetaData() {
        return this.$store.state.bubble_meta_data
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
      timeBlockOrientation() {
        return (this.isMonthView ? 'y' : 'y')
      },
      showTimeBlockControls() {
        return (this.isMonthView ? false : true)
      },
    },
    methods: {
      getMetaKey(block) {
        return `${this.date}:${block.start}`
      },
      packageSlideContent(block) {
        return {
          block,
          title: this.formateDateForDisplay(this.date),
          subtitle: this.formatTimesForDisplay(block.start, block.duration)
        }
      },
      formateDateForDisplay(date) {
        return moment(date).format(this.$store.state.calendar_settings.date_format.display)
      },

      formatTimesForDisplay(start, duration) {
        const day = moment().startOf('day')
        const startTime = day.add(start, 'hours').format('h:mma')
        const endTime = day.add(duration, 'hours').format('h:mma')
        return `${startTime.replace(':00', '')} — ${endTime.replace(':00', '')}`
      },

      setActiveDateToToday() {
        this.$store.commit('setActiveDate', this.date)
      },

      toggleCalendarDisplayMode() {
        if (this.isMonthView) {
          this.$store.commit('setCalendarDisplayModeToWeek')
        } else {
          this.$store.commit('setCalendarDisplayModeToMonth')
        }
      },

      setDensityBlockClasses(block) {
        const classes = []

        if (this.shouldBubbleBeOpen && this.bubbleMetaData.key === `${this.date}:${block.start}`) {
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

      createBlock(hour) {
        if (this.isInstructorContext) {
          this.createTimeBlock(hour)
        } else {
          this.createEventBlock(hour)
        }
      },

      createTimeBlock(hour) {
        const blocks = this.blocks || []
        blocks.push({ start: hour, duration: 1 })
        blocks.sort((a, b) => parseFloat(a.start) - parseFloat(b.start))

        this.$store.commit('setAvailabilityBlocksForDay', { date: this.date, blocks })
      },

      createEventBlock(hour) {
        const blocks = this.stagedEvents || []
        blocks.push({ start: hour, duration: 1 })
        blocks.sort((a, b) => parseFloat(a.start) - parseFloat(b.start))

        // this.$store.commit('setAvailabilityBlocksForDay', { date: this.date, blocks })
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/calendar-day';
</style>
