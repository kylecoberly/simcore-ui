<template lang="html">
  <div class="sim-calendar-day"
      @mousedown="setActiveDateToToday"
      :class="dayClasses"
  >
    <div class="local--day">


      <SimTimeLines v-if="shouldShowTimelines"
                    class="sim-calendar--grid--day--timelines"
                    mode="hours"
                    :action="timelineAction"
                    :start="0"
                    :end="24"
                    @create-time-block="createTimeBlock"
                    />

      <div class="sim-calendar--grid--date">{{ showDayNumber }}</div>

      <template v-if="isInstructorContext">
        <div class="local--day--blocks local--day--event-blocks">
          <SimTimeBlock v-for="(block, index) in events"
            theme="event"
            :key="index"
            :block="block"
            :index="index"
            :show-controls="false"
            />
        </div>
        <div v-if="(showHistoricalData || !isBeforeToday)" class="local--day--blocks local--day--time-blocks">
          <SimTimeBlock v-for="(block, index) in currentUserAvailabilityBlocks"
            theme="available"
            :key="index"
            :block="block"
            :index="index"
            :block-icon="null"
            :show-controls="showTimeBlockControls"
            @remove-time-block="removeTimeBlock"
            @block-was-updated="blockWasUpdated"
            @time-block-clicked="availabilityTimeBlockClicked"
            />
        </div>
      </template>

      <template v-if="isCoordinatorContext">
        <div class="local--day--time-blocks local--day--event-blocks">
          <SimTimeBlock v-for="(block, index) in events"
            theme="event"
            xv-bubble-trigger="{date: date, block, x: dayOfWeek+1, followMousemove: false, slideTemplate: 'SimSlideWithEventDetails'}"
            :key="index"
            :block="block"
            :index="index"
            :show-controls="false"
          />
        </div>

        <div class="local--day--blocks local--day--pending-blocks">
          <SimTimeBlock v-if="pendingEvent"
            theme="pending-event"
            key="peblox"
            :can-have-a-bubble="true"
            :offset="{ x: dayOfWeek + 1, y: 0 }"
            :block="pendingEvent"
            :index="0"
            :show-controls="showTimeBlockControls"
            :settings="pendingBlockSettings"
            @remove-time-block="removePendingBlock"
          />
        </div>

        <div class="local--day--blocks local--day--aggregate-blocks">
          <SimTimeBlock v-if="thereAreNoFilteredResultsForThisDay"
            theme="empty"
            block-icon="#icon--instructors-none"
            :tooltip="{icon: '#icon--instructors-none', text: 'No Instructors Found'}"
            :block="{startTime: 0, duration: 24}"
            :index="0"
            :show-controls="false"
          />

          <SimTimeBlock v-else-if="thereIsDataForThisDay" v-for="(item, segmentKey, index) in filteredSegments"
            :theme="availabilityBlockTheme"
            :block="{startTime: (segmentKey / 2), duration: 0.5, items: item.user_ids}"
            :index="index"
            :show-controls="false"
            :settings="filteredBlockSettings"
            @time-block-clicked="aggregateTimeBlockClicked"
          />

          <SimTimeBlock v-else-if="thereIsNoDataForThisDay"
            theme="null"
            :tooltip="{icon: '#icon--instructors-null', text: 'No Data'}"
            :block="{startTime: 0, duration: 24}"
            :index="0"
            :show-controls="false"
          />
        </div>
      </template>

      <div class="sim-calendar--grid--tools">
        <span @click="toggleExpandedWeek" v-if="!bubbleIsOpen">
          <SimIconText :icon="expandIcon" icon-type="svg"></SimIconText>
        </span>
      </div>

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
      'hasOnlySpecificInstructors',
      'userContext',
      'initialEventLength',
      'initialEventBlocks',
      'initialPendingEventBlocks',
      'initialCurrentUserAvailabilityBlocks',
      'initialAggregateUserAvailabilityBlocks',
      'initialAggregateUserAvailabilitySegments',
      'initialAllBlocks',
    ],
    data() {
      return {
        dateFormat: 'YYYY-MM-DD',
        events: [],
        currentUserAvailabilityBlocks: [],
        filteredBlocks: [],
        allBlocks: [],
        filteredSegments: [],
        allSegments: [],
        pendingBlockSettings: {
          showBlockHours: true,
          showBlockTime: false,
          canRemoveBlock: true,
          canResizeBlockStart: false,
          canResizeBlockEnd: false,
          canMoveBlock: true,
        },
        filteredBlockSettings: {
          showBlockHours: false,
          showBlockTime: false,
          canRemoveBlock: false,
          canResizeBlockStart: false,
          canResizeBlockEnd: false,
          canMoveBlock: false,
        },
        pendingEvent: null,
      }
    },
    mounted() {
      if (this.initialEventBlocks) {
        this.events = this.initialEventBlocks
      }
      if (this.initialPendingEventBlocks) {
        this.pendingEvent = this.initialPendingEventBlocks[0]
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
      if (this.initialAggregateUserAvailabilitySegments) {
        this.filteredSegments = this.initialAggregateUserAvailabilitySegments
      }
      if (this.initialAllSegments) {
        this.allSegments = this.initialAllSegments
      }
    },
    watch: {
      initialEventBlocks() {
        this.events = this.initialEventBlocks
      },
      initialPendingEventBlocks() {
        this.pendingEvent = this.initialPendingEventBlocks[0]
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
      initialAggregateUserAvailabilitySegments(newValue) {
        this.$set(this, 'filteredSegments', newValue)
      },
      initialAllSegments(newValue) {
        this.$set(this, 'allSegments', newValue)
      },
    },
    computed: {
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
      showTimeBlockControls() {
        return (this.showExpandedWeek || this.bubbleIsOpen) && this.isInActiveWeek
      },
      bubbleIsOpen() {
        return this.$store.state.bubble.is_open
      },
      thereIsNoDataForThisDay() {
        // return _.isEmpty(this.allBlocks)
        return _.isEmpty(this.allSegments)
      },
      thereIsDataForThisDay() {
        return (_.size(this.filteredSegments) > 0)
      },
      thereAreNoFilteredResultsForThisDay() {
        return (!_.isEmpty(this.allSegments) && _.size(this.filteredSegments) === 0)
      },
      shouldShowTimelines() {
        let show = false
        if (this.showHistoricalData || !this.isBeforeToday) {
          if (this.isInstructorContext) {
            if (this.isSelected && this.showExpandedWeek) {
              show = true
            }
          } else if (this.isCoordinatorContext) {
            if (this.isSelected && this.thereIsDataForThisDay && (this.showExpandedWeek || this.bubbleIsOpen)) {
              show = true
            }
          }
        }
        return show
      },
      availabilityBlockTheme() {
        return this.hasOnlySpecificInstructors ? 'specific' : 'aggregate'
      },
      expandIcon() {
        return this.showExpandedWeek && this.isInActiveWeek ? '#icon--control--contract' : '#icon--control--expand'
      },
      timelineAction() {
        return this.isInstructorContext ? 'mousedown' : null
      },
    },
    methods: {
      pluralize(count, single, other) {
        return (count === 1 ? `${count} ${single}` : `${count} ${other}`)
      },
      setActiveDateToToday() {
        this.$store.commit('setActiveDate', this.date)
      },
      isWholeNumber(value) {
        return Math.ceil(parseFloat(value)) === parseInt(value, 10)
      },
      setHourClasses(hour) {
        const classes = []
        classes.push((hour >= 6 && hour <= 17 ? 'is-daytime' : 'is-nighttime'))
        classes.push((hour === 0 || hour === 24 ? 'is-midnight' : (hour === 12 ? 'is-noon' : '')))

        return classes.join(' ')
      },
      displayHour(hour) {
        hour = hour === 0 || hour === 24 ? 'Midnight' : (hour === 12 ? 'Noon' : hour)

        return hour > 12 ? `${hour - 12}` : (parseInt(hour, 10) ? `${hour}` : hour)
      },
      closeBubble() {
        this.$store.commit('toggleBubbleVisibility', false)
      },
      // TimeBlock Methods
      sortBlocks() {
        this.currentUserAvailabilityBlocks.sort((a, b) => {
          return parseFloat(a.startTime) - parseFloat(b.startTime)
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
      removePendingBlock() {
        this.closeBubble()
        this.pendingEvent = null
      },
      blockWasUpdated() {
        this.updateBlocks()
      },
      createTimeBlock(hour) {
        this.currentUserAvailabilityBlocks.push({ startTime: hour, duration: 1 })
        this.updateBlocks()
      },
      createPendingBlock(block) {
        this.pendingEvent = {
          ...block,
          duration: this.initialEventLength,
          // limits: {
          //   starting: block.startTime,
          //   ending: block.startTime + block.duration - this.initialEventLength,
          // },
        }
      },
      availabilityTimeBlockClicked() {
        // @TODO interaction evaluation needed for dealing with timeblocks - Jase
        // if (!this.showExpandedWeek) {
        //   this.toggleExpandedWeek()
        // }
      },
      aggregateTimeBlockClicked(block) {
        if (this.showExpandedWeek || this.bubbleIsOpen) {
          this.createPendingBlock(block)
        } else {
          this.toggleExpandedWeek()
        }
      },
      toggleExpandedWeek() {
        this.$emit('toggle-expanded-week')
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/calendar-day';
</style>
