<template lang="html">
  <div class="sim-calendar-day"
      @mousedown="setActiveDateToToday"
      @click.meta="toggleCalendarDisplayMode"
      :class="dayClasses"
      >
    <div class="local--day">

      <SimTimeLines v-if="shouldShowTimelines"
                    class="sim-calendar--grid--day--timelines"
                    mode="hours"
                    action="dblClick"
                    :start="0"
                    :end="24"
                    @create-time-block="createTimeBlock"
                    />

      <div v-if="isMonthView" class="sim-calendar--grid--date">{{ showDayNumber }}</div>

      <template v-if="isInstructorContext">
        <div v-if="showHistoricalData" class="local--day--blocks local--day--event-blocks">
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
        <div v-if="showHistoricalData" class="local--day--blocks local--day--time-blocks">
          <SimTimeBlock v-for="(block, index) in currentUserAvailabilityBlocks"
            theme="available"
            :class="displayMode"
            :key="index"
            :block="block"
            :index="index"
            :block-icon="null"
            :show-controls="showTimeBlockControls"
            :orientation="timeBlockOrientation"
            @remove-time-block="removeTimeBlock"
            @block-was-updated="blockWasUpdated"
            />
        </div>
      </template>

      <template v-if="isCoordinatorContext">

        <div v-if="(showHistoricalData || !isBeforeToday) && isWeekView" class="local--day--blocks local--day--aggregate-blocks">
          <SimTimeBlock v-for="(block, index) in filteredBlocks"
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

        <div v-if="(showHistoricalData || !isBeforeToday) && isMonthView" class="local--day--blocks local--day--aggregate-blocks">
          <template v-if="thereAreNoFilteredResultsForThisDay">
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
          <template v-else-if="thereIsDataForThisDay">
            <SimTimeBlock v-for="(block, index) in filteredBlocks"
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
          <template v-else-if="thereIsNoDataForThisDay">
            <SimTimeBlock
              theme="null"
              xblock-icon="#icon--instructors-null"
              :tooltip="{icon: '#icon--instructors-null', text: 'No Data'}"
              :class="displayMode"
              :key="0"
              :block="{start: 0, duration: 24}"
              :index="0"
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

  import SimIconText from './IconText'
  import SimTimeBlock from './TimeBlock'
  import SimTimeLines from './TimeLines'
  import SimTooltip from './Tooltip'

  export default {
    name: 'sim-calendar-day',
    components: {
      SimIconText,
      SimTimeBlock,
      SimTimeLines,
      SimTooltip,
    },
    props: [
      'date',
      'index',
      'isInActiveWeek',
      'showExpandedWeek',
      'showHistoricalData',
      'displayMode',
      'userContext',
      'initialEventLength',
      'initialEventBlocks',
      'initialPendingEventBlocks',
      'initialCurrentUserAvailabilityBlocks',
      'initialAggregateUserAvailabilityBlocks',
      'initialAllBlocks',
    ],
    data() {
      return {
        dateFormat: 'YYYY-MM-DD',
        events: [],
        pendingEvents: [],
        currentUserAvailabilityBlocks: [],
        filteredBlocks: [],
        allBlocks: [],
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
        this.filteredBlocks = this.initialAggregateUserAvailabilityBlocks
      }
      if (this.initialAllBlocks) {
        this.allBlocks = this.initialAllBlocks
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
        this.$set(this, 'filteredBlocks', newValue)
      },
      initialAllBlocks(newValue) {
        this.$set(this, 'allBlocks', newValue)
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
      isAfterToday() {
        return moment().isBefore(this.date, 'day')
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
        } else if (this.isAfterToday){
          classes.push('is-after-today')
        }

        if (this.isWeekendDay) {
          classes.push('is-weekend')
        } else {
          classes.push('is-weekday')
        }

        if (this.isInActiveWeek) {
          classes.push('is-in-active-week')
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
        return (this.isMonthView ? true : true)
      },
      bubbleIsOpen() {
        return this.$store.state.bubble.is_open
      },
      thereIsNoDataForThisDay() {
        return _.isEmpty(this.allBlocks)
      },
      thereIsDataForThisDay() {
        return (this.filteredBlocks.length > 0)
      },
      thereAreNoFilteredResultsForThisDay() {
        return (!_.isEmpty(this.allBlocks) && this.filteredBlocks.length === 0)
      },
      shouldShowTimelines() {
        let show = false
        if (this.isInstructorContext) {
          if (this.isSelected && this.showExpandedWeek) {
            show = true
          }
        } else if (this.isCoordinatorContext) {
          if (this.isSelected && (this.showExpandedWeek || this.bubbleIsOpen) && this.thereIsDataForThisDay) {
            show = true
          }
        }
        return show
      }
    },
    methods: {

      eventHandler(event) {
        var items = document.querySelectorAll('.dock .item');

        if(items.length) {
          for (var i = 0, len = items.length; i < len; i++) {
            items[i].classList.remove('is-in-row');
          }
        }

        if (event.target.tagName === 'SPAN' && e.srcElement.previousElementSibling) {
          e.srcElement.previousElementSibling.classList.add('is-in-row');
        }
      },

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
      isWholeNumber(value) {
        return Math.ceil(parseFloat(value)) === parseInt(value)
      },
      setHourClasses(hour) {
        const classes = []
        classes.push((hour >= 6 && hour <= 17 ? 'is-daytime' : 'is-nighttime'))
        classes.push((hour === 0 || hour === 24 ? 'is-midnight' : (hour === 12 ? 'is-noon' : '')))

        return classes.join(' ')
      },
      displayHour(hour) {
        hour = hour === 0 || hour === 24 ? 'Midnight' : (hour === 12 ? 'Noon' : hour)

        return hour > 12 ? `${hour - 12}` : (parseInt(hour) ? `${hour}` : hour)
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
      createBlock(event, hour) {
        if (this.isInstructorContext) {
          this.createTimeBlock(hour)
        } else {
          // FIXME: This is disabled for now now until week view filters are working - Jase
          this.createEventBlock(event.target, hour)
        }
      },
      createTimeBlock(hour) {
        this.currentUserAvailabilityBlocks.push({ start: hour, duration: 1 })

        this.updateBlocks()
      },
      createEventBlock(element, hour) {
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
