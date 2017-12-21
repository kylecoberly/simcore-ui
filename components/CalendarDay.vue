<template lang="html">
  <div class="sim-calendar-day"
      @mousedown="setActiveDateToToday"
      @click.meta="toggleCalendarDisplayMode"
      :class="dayClasses"
      >
    <div class="local--day">

      <div v-if="isMonthView" class="sim-calendar--grid--date">{{ showDayNumber }}</div>

      <ul v-if="isWeekView" class="sim-calendar--grid--day--timelines">
        <li v-for="hour in 25" @dblclick="createBlock(hour-1, $event.target)"
        :class="setHourClasses(hour-1)"></li>
      </ul>

      <template v-if="isInstructorContext">
        <div class="local--day--blocks local--day--event-blocks">
          <SimTimeBlock v-for="(block, index) in events"
            :class="{displayMode}"
            class="sim-timeblock--theme--event"
            v-bubble-trigger="{date: date, block, x: dayOfWeek+1, followMousemove: false, slideTemplate: 'SimSlideWithEventDetails'}"
            :key="index"
            :block="block"
            :index="index"
            :show-controls="false"
            :orientation="timeBlockOrientation"
            />
        </div>
        <div class="local--day--blocks local--day--time-blocks">
          <SimTimeBlock v-for="(block, index) in currentUserAvailabilityBlocks"
            :class="displayMode"
            class="sim-timeblock--theme--available"
            :key="index"
            :block="block"
            :index="index"
            :show-controls="showTimeBlockControls"
            :orientation="timeBlockOrientation"
            />
        </div>
      </template>

      <template v-if="isCoordinatorContext">

        <div v-if="isWeekView" class="local--day--aggregate-blocks">
          <SimTimeBlock v-for="(block, index) in aggregateUserAvailabilityBlocks"
            :class="displayMode"
            class="sim-timeblock--theme--aggregate"
            :key="index"
            :block="block"
            :index="index"
            :show-controls="false"
            :orientation="timeBlockOrientation"
            />
        </div>

        <div class="local--day--event-blocks">
          <SimTimeBlock v-for="(block, index) in events"
            :class="displayMode"
            class="sim-timeblock--theme--event"
            v-bubble-trigger="{date: date, block, x: dayOfWeek+1, followMousemove: false, slideTemplate: 'SimSlideWithEventDetails'}"
            :key="index"
            :block="block"
            :index="index"
            :show-controls="false"
            :orientation="timeBlockOrientation"
            />
        </div>

        <div class="local--day--pending-blocks">
          <SimTimeBlock v-for="(block, index) in pendingEvents"
            :class="displayMode"
            class="sim-timeblock--theme--pending-event"
            v-bubble-trigger="{date: date, block, x: dayOfWeek+1, followMousemove: true, slideTemplate: 'SimSlideWithAList'}"
            :key="index"
            :block="block"
            :index="index"
            :show-controls="showTimeBlockControls"
            :orientation="timeBlockOrientation"
            />
        </div>

        <div v-if="isMonthView" class="local--day--aggregate-blocks">
          <template v-if="aggregateUserAvailabilityBlocks.length">
            <SimTimeBlock v-for="(block, index) in aggregateUserAvailabilityBlocks"
              :class="displayMode"
              class="sim-timeblock--theme--aggregate"
              v-bubble-trigger="{date: date, block, x: dayOfWeek+1, followMousemove: false, slideTemplate: 'SimSlideWithAList'}"
              :key="index"
              :block="block"
              :index="index"
              :show-controls="false"
              :orientation="timeBlockOrientation"
              />
          </template>
          <template v-else-if="!aggregateUserAvailabilityBlocks.length">
            <div @click="emitLodestar" class="sim-timeblock sim-timeblock--y sim-timeblock--theme--empty is-display-only" style="--start: 0;--duration: 24"></div>
          </template>
        </div>

      </template>

    </div>
  </div>
</template>
 
<script>
  import moment from 'moment'

  import SimTimeBlock from './TimeBlock'

  export default {
    name: 'sim-calendar-day',
    components: { SimTimeBlock },
    props: [
      'date',
      'index',
      'displayMode',
      'userContext',
      'initialEventBlocks',
      'initialPendingEventBlocks',
      'initialCurrentUserAvailabilityBlocks',
      'initialAggregateUserAvailabilityBlocks',
    ],
    data() {
      return {
        dateFormat: 'YYYY-MM-DD',
        events: [],
        pendingEvents: [],
        currentUserAvailabilityBlocks: [],
        aggregateUserAvailabilityBlocks: [],
      }
    },
    mounted() {
      if (this.initialEventBlocks) {
        this.events = this.initialEventBlocks
      }
      if (this.initialPendingEventBlocks) {
        this.pendingEvents = this.initialPendingEventBlocks
      }
      if (this.initialCurrentUserAvailabilityBlocks) {
        this.currentUserAvailabilityBlocks = this.initialCurrentUserAvailabilityBlocks
      }
      if (this.initialAggregateUserAvailabilityBlocks) {
        this.aggregateUserAvailabilityBlocks = this.initialAggregateUserAvailabilityBlocks
      }
    },
    watch: {
      initialEventBlocks() {
        this.events = this.initialEventBlocks
      },
      initialPendingEventBlocks() {
        this.pendingEvents = this.initialPendingEventBlocks
      },
      initialCurrentUserAvailabilityBlocks() {
        this.currentUserAvailabilityBlocks = this.initialCurrentUserAvailabilityBlocks
      },
      initialAggregateUserAvailabilityBlocks() {
        this.aggregateUserAvailabilityBlocks = this.initialAggregateUserAvailabilityBlocks
      },
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

        if (this.$store.state.calendar.settings.weekend_days.includes(this.dayOfWeek)) {
          classes.push('is-weekend')
        } else {
          classes.push('is-weekday')
        }
        if (moment(this.$store.state.activeDate.date).isSame(this.date, 'day')) {
          classes.push(this.selectedClass || 'is-selected')
        }

        return classes.join(' ')
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
      setHourClasses(hour) {
        const classes = []
        classes.push((hour >= 6 && hour <= 17 ? 'is-daytime' : 'is-nighttime'))
        classes.push((hour === 0 || hour === 24 ? 'is-midnight' : (hour === 12 ? 'is-noon' : '')))

        return classes.join(' ')
      },
      createBlock(hour, element) {
        if (this.isInstructorContext) {
          this.createTimeBlock(hour)
        } else {
          // FIXME: This is disabled for now now until week view filters are working - Jase
          // this.createEventBlock(hour, element)
        }
      },
      createTimeBlock(hour) {
        this.currentUserAvailabilityBlocks.push({ start: hour, duration: 1 })
        this.currentUserAvailabilityBlocks.sort((a, b) => parseFloat(a.start) - parseFloat(b.start))

        this.$emit('blocksWereUpdated', { blocks: this.currentUserAvailabilityBlocks, date: this.date })
      },
      createEventBlock(hour, element) {
        this.pendingEvents.push({ start: hour, duration: 1 })
        this.pendingEvents.sort((a, b) => parseFloat(a.start) - parseFloat(b.start))

        // TODO: Make this an emit like above. - Chad
        this.$store.commit('setPendingEventBlocksForDay', { date: this.date, blocks: this.pendingEvents })

        const properties = {}
        properties.position = element.getBoundingClientRect()
        properties.position.dinkY = properties.position.top + properties.position.height / 2
        properties.position.dinkX = properties.position.left + properties.position.width / 2
        properties.position.x = this.dayOfWeek+1

        this.$emit('set-bubble-position', properties.position)
        this.$emit('set-bubble-data', {
            date: this.date,
            block: {
              start: hour,
              duration: 1
            },
            x: this.dayOfWeek+1,
            followMousemove: true,
            slideTemplate: 'SimSlideWithAList',
          }
        )
      },
      emitLodestar() {
        this.$emit('run-lodestar')
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/calendar-day';
</style>
