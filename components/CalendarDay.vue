<template lang="html">
  <div class="sim-calendar-day"
      @mousedown="setActiveDateToToday"
      @click.meta="toggleCalendarDisplayMode"
      :class="dayClasses"
      >
    <div class="local--day">

      <div v-if="isMonthView" class="sim-calendar--grid--date">{{ showDayNumber }}</div>

      <ul v-if="isWeekView" class="sim-calendar--grid--day--timelines">
         <!-- || (isSelected && bubbleIsOpen) -->
        <li v-for="hour in 25" @dblclick="createBlock(hour-1, $event.target)" :class="setHourClasses(hour-1)"></li>
      </ul>

      <template v-if="isInstructorContext">
        <div class="local--day--blocks local--day--event-blocks">
          <SimTimeBlock v-for="(block, index) in events"
            theme="event"
            v-bubble-trigger="{date: date, block, x: dayOfWeek+1, followMousemove: false, slideTemplate: 'SimSlideWithEventDetails'}"
            :class="{displayMode}"
            :key="index"
            :block="block"
            :index="index"
            :show-controls="false"
            :orientation="timeBlockOrientation"
            />
        </div>
        <div class="local--day--blocks local--day--time-blocks">
          <SimTimeBlock v-for="(block, index) in currentUserAvailabilityBlocks"
            theme="available"
            :class="displayMode"
            :key="index"
            :block="block"
            :index="index"
            :show-controls="showTimeBlockControls"
            :orientation="timeBlockOrientation"
            @remove-time-block="removeTimeBlock"
            @block-was-updated="blockWasUpdated"
            />
        </div>
      </template>

      <template v-if="isCoordinatorContext">

        <div v-if="isWeekView" class="local--day--blocks local--day--aggregate-blocks">
          <SimTimeBlock v-for="(block, index) in aggregateUserAvailabilityBlocks"
            theme="aggregate"
            :class="displayMode"
            :key="index"
            :block="block"
            :index="index"
            :show-controls="false"
            :orientation="timeBlockOrientation"
            />
        </div>

        <div class="local--day--time-blocks local--day--event-blocks">
          <SimTimeBlock v-for="(block, index) in events"
            theme="event"
            v-bubble-trigger="{date: date, block, x: dayOfWeek+1, followMousemove: false, slideTemplate: 'SimSlideWithEventDetails'}"
            :class="displayMode"
            :key="index"
            :block="block"
            :index="index"
            :show-controls="false"
            :orientation="timeBlockOrientation"
            />
        </div>

        <div class="local--day--blocks local--day--pending-blocks">
          <SimTimeBlock v-for="(block, index) in pendingEvents"
            theme="pending-event"
            v-bubble-trigger="{date: date, block, x: dayOfWeek+1, followMousemove: true, slideTemplate: 'SimSlideWithAList'}"
            :class="displayMode"
            :key="index"
            :block="block"
            :index="index"
            :show-controls="showTimeBlockControls"
            :orientation="timeBlockOrientation"
            />
        </div>

        <div v-if="isMonthView" class="local--day--blocks local--day--aggregate-blocks">
          <template v-if="hasAvailability">
          <template v-if="thereIsNoDataForThisDay">
            <SimTimeBlock
              theme="null"
              block-icon="#icon--instructors-null"
              :tooltip="{icon: '#icon--instructors-null', text: 'No Data'}"
              :class="displayMode"
              :key="0"
              :block="{start: 0, duration: 24}"
              :index="0"
              :show-controls="false"
              :orientation="timeBlockOrientation"
              />
          </template>
          <template v-else-if="thereAreNoFilteredResultsForThisDay">
            <SimTimeBlock
              theme="empty"
              block-icon="#icon--instructors-none"
              :tooltip="{icon: '#icon--instructors-none', text: pluralize(0, 'Instructor Found', 'Instructors Found')}"
              :class="displayMode"
              :key="0"
              :block="{start: 0, duration: 24}"
              :index="0"
              :show-controls="false"
              :orientation="timeBlockOrientation"
              />
          </template>
          <template v-else="thereIsDataForThisDay">
            <SimTimeBlock v-for="(block, index) in aggregateUserAvailabilityBlocks"
              theme="aggregate"
              v-bubble-trigger="{date: date, block, x: dayOfWeek+1, followMousemove: false, slideTemplate: 'SimSlideWithAList'}"
              :tooltip="{icon: '#icon--instructors-exist', text: pluralize(1, 'Instructor Found', 'Instructors Found')}"
              :class="displayMode"
              :key="index"
              :block="block"
              :index="index"
              :show-controls="false"
              :orientation="timeBlockOrientation"
              />
          </template>
        </div>

      </template>

    </div>
  </div>
</template>
 
<script>
  import _ from 'lodash'
  import moment from 'moment'

  import SimTimeBlock from './TimeBlock'
  import SimTooltip from './Tooltip'

  export default {
    name: 'sim-calendar-day',
    components: { SimTimeBlock, SimTooltip },
    props: [
      'date',
      'index',
      'displayMode',
      'userContext',
      'initialEventLength',
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
      initialAggregateUserAvailabilityBlocks(newValue) {
        this.$set(this, 'aggregateUserAvailabilityBlocks', newValue)
      },
    },
    computed: {
      isMonthView() {
        return this.displayMode === 'month'
      },
      isWeekView() {
        return this.displayMode === 'week'
      },
      isSelected() {
        return moment(this.$store.state.activeDate.date).isSame(this.date, 'day')
      },
      isBeforeToday() {
        return moment().isAfter(this.date, 'day')
      },
      isToday() {
        return moment().isSame(this.date, 'day')
      },
      isWeekendDay() {
        return this.$store.state.calendar.settings.weekend_days.includes(this.dayOfWeek)
      },
      showDayNumber() {
        return parseInt(this.date.split('-')[2], 10)
      },
      dayOfWeek() {
        return moment(this.date).day()
      },
      dayClasses() {
        const classes = [`day-${this.dayOfWeek}`]

        if (this.isToday) {
          classes.push('is-today')
        } else if (this.isBeforeToday) {
          classes.push('is-before-today')
        } else {
          classes.push('is-after-today')
        }

        if (this.isWeekendDay) {
          classes.push('is-weekend')
        } else {
          classes.push('is-weekday')
        }
        if (this.isSelected) {
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
      bubbleIsOpen() {
        return this.$store.state.bubble.is_open
      },
      thereIsNoDataForThisDay() {
        return (this.aggregateUserAvailabilityBlocks[this.date] === undefined)
      },
      thereIsDataForThisDay() {
        return (this.aggregateUserAvailabilityBlocks[this.date].length > 0)
      },
      thereAreNoFilteredResultsForThisDay() {
        return (this.aggregateUserAvailabilityBlocks[this.date].length === 0)
      },
    },
    methods: {
      pluralize(count, single, other) {
        return (count === 1 ? `${count} ${single}` : `${count} ${other}`)
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
      setHourClasses(hour) {
        const classes = []
        classes.push((hour >= 6 && hour <= 17 ? 'is-daytime' : 'is-nighttime'))
        classes.push((hour === 0 || hour === 24 ? 'is-midnight' : (hour === 12 ? 'is-noon' : '')))

        return classes.join(' ')
      },
      // TimeBlock Methods
      sortBlocks() {
        this.currentUserAvailabilityBlocks.sort((a, b) => {
          return parseFloat(a.start) - parseFloat(b.start)
        })
      },
      updateBlocks() {
        this.sortBlocks()

        this.$emit('blocksWereUpdated', { blocks: this.currentUserAvailabilityBlocks, date: this.date })
      },
      removeTimeBlock(index) {
        this.currentUserAvailabilityBlocks.splice(index, 1)

        this.updateBlocks()
      },
      blockWasUpdated() {
        this.updateBlocks()
      },
      createBlock(hour, element) {
        if (this.isInstructorContext) {
          this.createTimeBlock(hour)
        } else {
          // FIXME: This is disabled for now now until week view filters are working - Jase
          this.createEventBlock(hour, element)
        }
      },
      createTimeBlock(hour) {
        this.currentUserAvailabilityBlocks.push({ start: hour, duration: 1 })

        this.updateBlocks()
      },
      createEventBlock(hour, element) {
        this.pendingEvents.push({ start: hour, duration: this.initialEventLength })
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
              duration: this.initialEventLength
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
