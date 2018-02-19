<template lang="html">
  <div class="sim-timepicker" :class="`sim-timepicker--${orientation}`">

    <div v-if="shouldShowDate" class="sim-timepicker--controls">
      <div class="sim-timepicker--prev-day" @click="prevDay">
        <SimIconText icon="fa-arrow-circle-left fa-lg"></SimIconText>
      </div>
      <div class="sim-timepicker--display-date">
        <span>{{ displayDate }} <br /><b>{{ displayTotalTimeBlockHours }}</b></span>
        <span v-if="countTimeBlockHours > 0" class="sim-timepicker--remove-blocks" @click="removeAllTimeBlocks">
          <SimIconText icon="fa-times"></SimIconText>
        </span>
      </div>
      <div class="sim-timepicker--next-day" @click="nextDay">
        <SimIconText icon="fa-arrow-circle-right fa-lg"></SimIconText>
      </div>
    </div>

    <div class="sim-timepicker--inner" :class="timelineClasses">

      <SimTimeLines :mode="timelineMode" :start="startTime" :end="endTime" />

      <!-- <ul>
        <template v-if="timelineMode === 'hours'">
          <li v-for="segment in totalSegments" @mousedown="createTimeBlock($event, segment-1)" :class="setHourClasses(segment-1)">
            <div v-if="segment === 13" class="sim-timepicker--time sim-timepicker--noon">
              <SimIconText icon="fa-sun-o"></SimIconText>
            </div>
            <div v-else-if="segment === 1 || segment === 25" class="sim-timepicker--time sim-timepicker--midnight">
              <SimIconText icon="fa-moon-o"></SimIconText>
            </div>
            <div v-else-if="isWholeNumber(segment)" class="sim-timepicker--time">
              {{ displayHour(segment-1) }}
            </div>
          </li>
        </template>
        <template v-else-if="timelineMode === 'numbers'">
          <li v-for="segment in totalSegments" @mousedown="createTimeBlock($event, segment-1)" :class="setHourClasses(segment-1)">
            <div v-if="isWholeNumber(segment)" class="sim-timepicker--time">
              {{ segment-1 }}
            </div>
          </li>
        </template>
      </ul> -->

      <SimTimeBlock v-for="(block, index) in currentBlocks"
                    :key="index"
                    :block="block"
                    :index="index"
                    :date="date"
                    :orientation="orientation"
                    :theme="blockTheme"
                    :variables="timeBlockVariables"
                    :settings="timeBlockSettings"
                    @remove-time-block="removeTimeBlock"
                    @is-moving="setMovingState"
                    @is-stretching="setStretchingState"
                    @block-was-updated="blockWasUpdated"
        />
    </div>

  </div>
</template>

<script>
  import moment from 'moment'
  import SimIconText from './IconText'
  import SimTimeBlock from './TimeBlock'
  import SimTimeLines from './TimeLines'

  export default {
    name: 'sim-timepicker',
    components: {
      SimIconText,
      SimTimeBlock,
      SimTimeLines,
    },
    props: {
      date: {
        type: String,
      },
      shouldShowDate: {
        type: Boolean,
        default: false,
      },
      timelineMode: {
        type: String,
        default: 'hours',
      },
      blockTheme: {
        type: String,
        default: 'default',
      },
      blockSettings: {
        type: Object,
        default() {
          return {
            showBlockHours: true,
            showBlockTime: true,
            canRemoveBlock: true,
            canResizeBlockStart: true,
            canResizeBlockEnd: true,
            canMoveBlock: true,
          }
        },
      },
      orientation: {
        type: String,
        default: 'x',
      },
      startTime: {
        type: Number,
        default: 0,
      },
      endTime: {
        type: Number,
        default: 24,
      },
      timeBlockLimit: {
        type: Number,
        default: 48,
      },
      timeBlockDefaultDuration: {
        type: Number,
        default: 1,
      },
      durationFilterBlocks: {
        type: Array,
      },
      initialEventBlocks: {
        type: Array,
      },
      initialPendingEventBlocks: {
        type: Array,
      },
      initialCurrentUserAvailabilityBlocks: {
        type: Array,
      },
      initialAggregateAvailabilityBlocks: {
        type: Array,
      },
    },
    data() {
      return {
        isMoving: false,
        isStretching: false,
        currentBlocks: [],
        eventBlocks: [],
        pendingEventBlocks: [],
        currentUserAvailabilityBlocks: [],
        aggregateAvailabilityBlocks: [],
        blocks: this.$store.state.user.availabilities[this.$store.state.activeDate.date] || [],
      }
    },
    computed: {
      timeBlockVariables() {
        return {
          maximumDuration: this.totalHoursInterger,
          startTime: this.startTime,
        }
      },
      timeBlockSettings() {
        return {
          showBlockHours: this.blockSettings.showBlockHours,
          showBlockTime: this.blockSettings.showBlockTime,
          canRemoveBlock: this.blockSettings.canRemoveBlock,
          canResizeBlockStart: this.blockSettings.canResizeBlockStart,
          canResizeBlockEnd: this.blockSettings.canResizeBlockEnd,
          canMoveBlock: this.blockSettings.canMoveBlock,
        }
      },
      totalSegments() {
        const segments = []
        for (let index = this.startTime + 1; index <= this.endTime + 1; index += 0.5) {
          segments.push(index)
        }
        return segments
      },
      totalHoursInterger() {
        return this.endTime - this.startTime
      },
      activeMoment() {
        return moment(this.date)
      },
      displayDate() {
        return moment(this.date)
          .format('dddd, MMM D')
      },
      countTimeBlockHours() {
        // return this.currentUserAvailabilityBlocks
        return this.currentBlocks
          .map((block) => { return block.duration })
          .reduce((sum, value) => sum + value, 0)
      },
      displayTotalTimeBlockHours() {
        const output = this.countTimeBlockHours.toString()
          .replace(/\.5/, '½')
          .replace(/^0/, '') || 0

        return `${output} ${(this.countTimeBlockHours > 0 && this.countTimeBlockHours <= 1 ? 'hour' : 'hours')}`
      },
      blockLimitReached() {
        // return this.currentUserAvailabilityBlocks.length === this.timeBlockLimit
        return this.currentBlocks.length === this.timeBlockLimit
      },
      timelineClasses() {
        const classes = []
        if (this.timeBlockSettings.canMoveBlock) {
          classes.push('is-moveable')
        }
        if (this.blockLimitReached) {
          classes.push('is-at-block-limit')
        }
        if (this.isMoving) {
          classes.push('is-moving')
        }
        if (this.isStretching) {
          classes.push('is-stretching')
        }
        return classes.join(' ')
      },
    },
    methods: {
      // UI Management Methods
      isWholeNumber(value) {
        return Math.ceil(parseFloat(value)) === parseInt(value)
      },
      setMovingState(bool) {
        this.isMoving = bool
      },
      setStretchingState(bool) {
        this.isStretching = bool
      },
      displayHour(hour) {
        hour = hour === 0 || hour === 24 ? 'Midnight' : (hour === 12 ? 'Noon' : hour)

        return hour > 12 ? `${hour - 12}p` : (parseInt(hour) ? `${hour}a` : hour)
      },
      setHourClasses(hour) {
        const classes = []

        if (this.timelineMode === 'hours') {
          if (hour >= 6 && hour <= 17.5) {
            classes.push('is-daytime')
          } else {
            classes.push('is-nighttime')
          }
        }

        if (this.isWholeNumber(hour)) {
          classes.push(`is-hour is-hour-${hour}`)
        } else {
          classes.push(`is-half-hour is-hour-${Math.floor(hour)}-half`)
        }

        return classes
      },

      // Time Block Methods.
      emitUpdateBlocks() {
        this.sortBlocks()

        // this.$emit('blocksWereUpdated', { blocks: this.currentUserAvailabilityBlocks, date: this.date })
        this.$emit('blocksWereUpdated', { blocks: this.currentBlocks, date: this.date })
      },
      sortBlocks() {
        // this.currentUserAvailabilityBlocks.sort((a, b) => {
        this.currentBlocks.sort((a, b) => {
          return parseFloat(a.start) - parseFloat(b.start)
        })
      },
      createTimeBlock(event, hour) {
        // if (event.which === 1 && this.currentUserAvailabilityBlocks.length < this.timeBlockLimit) {
        if (event.which === 1 && this.currentBlocks.length < this.timeBlockLimit) {
          let useModifier = false
          const modifiedDuration = (this.endTime - hour)

          if (
            hour === Math.floor(this.endTime)
            || Math.ceil(hour) === this.endTime
            || hour + this.timeBlockDefaultDuration > this.endTime
          ) {
            useModifier = true
          }

          const maxDuration = useModifier ? modifiedDuration : this.timeBlockDefaultDuration

          // this.currentUserAvailabilityBlocks.push({ start: hour, duration: maxDuration })
          this.currentBlocks.push({ start: hour, duration: maxDuration })
          this.emitUpdateBlocks()
        }

      },
      removeTimeBlock(index) {
        // this.currentUserAvailabilityBlocks.splice(index, 1)
        this.currentBlocks.splice(index, 1)

        this.emitUpdateBlocks()
      },
      removeAllTimeBlocks() {
        // this.currentUserAvailabilityBlocks.splice(0, this.currentUserAvailabilityBlocks.length)
        this.currentBlocks.splice(0, this.currentBlocks.length)

        this.emitUpdateBlocks()
      },
      blockWasUpdated() {
        this.emitUpdateBlocks()
      },
      // Date Management Methods.
      nextDay() {
        const date = this.activeMoment.add(1, 'day')
          .format('YYYY-MM-DD')

        this.$store.commit('setActiveDate', date)
      },
      prevDay() {
        const date = this.activeMoment.subtract(1, 'day')
          .format('YYYY-MM-DD')

        this.$store.commit('setActiveDate', date)
      },
    },
    mounted() {
      // if (this.initialEventBlocks) {
      //   this.eventBlocks = this.initialEventBlocks
      // }
      // if (this.initialPendingEventBlocks) {
      //   this.pendingEventBlocks = this.initialPendingEventBlocks
      // }
      // if (this.initialCurrentUserAvailabilityBlocks) {
      //   this.currentUserAvailabilityBlocks = this.initialCurrentUserAvailabilityBlocks
      // }
      // if (this.initialAggregateAvailabilityBlocks) {
      //   this.aggregateAvailabilityBlocks = this.initialAggregateAvailabilityBlocks
      // }
      if (this.durationFilterBlocks) {
        this.currentBlocks = this.durationFilterBlocks
      }
      else if (this.initialEventBlocks) {
        this.currentBlocks = this.initialEventBlocks
      }
      else if (this.initialPendingEventBlocks) {
        this.currentBlocks = this.initialPendingEventBlocks
      }
      else if (this.initialCurrentUserAvailabilityBlocks) {
        this.currentBlocks = this.initialCurrentUserAvailabilityBlocks
      }
      else if (this.initialAggregateAvailabilityBlocks) {
        this.currentBlocks = this.initialAggregateAvailabilityBlocks
      }
    },
    watch: {
      durationFilterBlocks() {
        this.currentBlocks = this.durationFilterBlocks
      },
      initialEventBlocks() {
        this.currentBlocks = this.initialEventBlocks
      },
      initialPendingEventBlocks() {
        this.currentBlocks = this.initialPendingEventBlocks
      },
      initialCurrentUserAvailabilityBlocks() {
        this.currentBlocks = this.initialCurrentUserAvailabilityBlocks
      },
      initialAggregateAvailabilityBlocks() {
        this.currentBlocks = this.initialAggregateAvailabilityBlocks
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/timepicker';
</style>
