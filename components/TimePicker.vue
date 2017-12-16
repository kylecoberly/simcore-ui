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
      <ul>
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
      </ul>

      <SimTimeBlock v-for="(block, index) in blocks" :key="index" :block="block" :index="index" :date="date"
        :orientation="orientation"
        :variables="blockVariables"
        @remove-time-block="removeTimeBlock"
        @is-moving="setMovingState"
        @is-stretching="setStretchingState"
        @block-updated="blockWasUpdated"
        />
    </div>

  </div>
</template>

<script>
  import moment from 'moment'
  import SimIconText from './IconText'
  import SimTimeBlock from './TimeBlock'

  export default {
    name: 'sim-timepicker',
    components: {
      SimIconText,
      SimTimeBlock,
    },
    props: {
      shouldShowDate: {
        type: Boolean,
        default: false,
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
    },
    data() {
      return {
        isMoving: false,
        isStretching: false,
        blocks: this.$store.state.user.availabilities[this.$store.state.activeDate.date] || [],
      }
    },
    watch: {
      date(newDate) {
        this.blocks = this.$store.state.user.availabilities[newDate] || []
      },
    },
    computed: {
      blockVariables() {
        return {
          maximumDuration: this.totalHoursInterger,
          startTime: this.startTime,
        }
      },
      totalSegments() {
        const segments = []
        for (var index = this.startTime + 1; index <= this.endTime + 1; index+=0.5) {
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
        if (this.blocks) {
          return this.blocks
          .map((block) => block.duration)
          .reduce((sum, value) => sum + value, 0)
        } else {
          return 0
        }
      },
      displayTotalTimeBlockHours() {
        const output = this.countTimeBlockHours.toString()
          .replace(/\.5/, '½')
          .replace(/^0/, '') || 0

        return `${output} ${(this.countTimeBlockHours > 0 && this.countTimeBlockHours <= 1 ? 'hour' : 'hours')}`
      },
      date() {
        return this.$store.state.activeDate.date
      },
      timelineClasses() {
        const classes = []
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

        if (hour >= 6 && hour <= 17.5) {
          classes.push('is-daytime')
        } else {
          classes.push('is-nighttime')
        }

        if (this.isWholeNumber(hour)) {
          classes.push(`is-hour is-hour-${hour}`)
        } else {
          classes.push(`is-half-hour is-hour-${Math.floor(hour)}-half`)
        }

        return classes
      },

      // Time Block Methods.
      updateBlocks() {
        this.sortBlocks()

        this.$store.commit('setAvailabilityBlocksForDay', { date: this.date, blocks: this.blocks })
      },
      sortBlocks() {
        this.blocks.sort((a, b) => {
          return parseFloat(a.start) - parseFloat(b.start)
        })
      },
      createTimeBlock(event, hour) {
        if (event.which === 1 && this.blocks.length < this.timeBlockLimit) {
          const useModifier = (hour === Math.floor(this.endTime) || Math.ceil(hour) === this.endTime)
          const maxDuration = useModifier ? 0.5 : 1

          this.blocks.push({ start: hour, duration: maxDuration })

          this.updateBlocks()
        }
      },
      removeTimeBlock(index) {
        this.blocks.splice(index, 1)

        this.updateBlocks()
      },
      removeAllTimeBlocks() {
        this.blocks.splice(0, this.blocks.length)

        this.updateBlocks()
      },
      blockWasUpdated() {
        this.updateBlocks()
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
  }
</script>

<style lang="scss">
  @import '../styles/timepicker';
</style>
