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

    <!-- {{ totalHours }} | {{totalHoursInterger}} | {{ segmentProduct }} -->

    <div class="sim-timepicker--inner" :class="setClass()">
      <ul>
        <li v-for="hour in totalHours" @mousedown="createTimeBlock(hour-1)" :class="setHourClass(hour-1)">
          <div v-if="hour === 13" class="sim-timepicker--time sim-timepicker--noon">
            <SimIconText icon="fa-sun-o"></SimIconText>
          </div>
          <div v-else-if="hour === 1 || hour === 25" class="sim-timepicker--time sim-timepicker--midnight">
            <SimIconText icon="fa-moon-o"></SimIconText>
          </div>
          <div v-else class="sim-timepicker--time">
            {{ displayHour(hour-1) }}
          </div>
        </li>
      </ul>

      <SimTimeBlock v-for="(block, index) in blocks" :key="index" :block="block" :index="index" :date="date"
        :orientation="orientation"
        :variables="{maximumDuration: totalHoursInterger, timeShiftOffset: startTime}"
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
      totalHours() {
        const hours = []
        for (var index = this.startTime + 1; index <= this.endTime + 1; index++) {
          hours.push(index)
        }
        return hours
      },
      totalHoursInterger() {
        return this.totalHours.length - 1
      },
      segmentProduct() {
        return parseFloat((100 / this.totalHoursInterger).toFixed(4))
      },
      activeMoment() {
        return moment(this.date)
      },
      displayDate() {
        return moment(this.date)
          .format('dddd, MMM D')
      },
      countTimeBlockHours() {
        return this.blocks
          .map((block) => { return block.duration })
          .reduce((sum, value) => sum + value, 0)
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
    },
    methods: {
      // UI Management Methods
      setClass() {
        const classes = []
        if (this.isMoving) {
          classes.push('is-moving')
        }
        if (this.isStretching) {
          classes.push('is-stretching')
        }
        return classes.join(' ')
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
      setHourClass(hour) {
        return hour >= 6 && hour <= 17 ? 'is-daytime' : 'is-nighttime'
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
      createTimeBlock(hour) {
        if (this.blocks.length < this.timeBlockLimit) {
          this.blocks.push({ start: hour, duration: 1 })

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
