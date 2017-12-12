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
        blocks: this.$store.state.current_user_data.availability[this.date],
        availability: this.$store.state.current_user_data.availability,
        availabilityDensityBlocks: this.$store.state.current_user_data.availability_density[this.date],
        slideContent: {
          componentType: 'SimSlide',
          title: 'Date',
          subtitle: 'bot',
          items: [
            { id: 1, name: 'Brian' },
            { id: 2, name: 'Dustin' },
            { id: 3, name: 'Jase' },
            { id: 4, name: 'Chad' },
            { id: 5, name: 'Rick' },
            { id: 6, name: 'Kaiti' },
            { id: 7, name: 'Eric' },
            { id: 8, name: 'Gary' },
            { id: 9, name: 'Mike' },
            { id: 10, name: 'Yaz' },
            { id: 11, name: 'Brian Deux' },
            { id: 12, name: 'Dustin Deux' },
            { id: 13, name: 'Jase Deux' },
            { id: 14, name: 'Chad Deux' },
            { id: 15, name: 'Rick Deux' },
            { id: 16, name: 'Kaiti Deux' },
            { id: 17, name: 'Eric Deux' },
            { id: 18, name: 'Gary Deus' },
            { id: 19, name: 'Mike Deux' },
            { id: 20, name: 'Yaz Deux' },
          ],
        },
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
