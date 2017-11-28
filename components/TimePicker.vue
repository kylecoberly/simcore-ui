<template lang="html">
  <div class="sim-timepicker">

    <div v-if="shouldShowDate" class="sim-timepicker--controls">
      <div class="sim-timepicker--prev-day" @click="prevDay">
        <SimIconText icon="fa-arrow-left"></SimIconText>
      </div>
      <div class="sim-timepicker--display-date">
        <span>{{ displayDate }} &mdash; <b>{{ displayDateTotalHours }}</b></span>
        <span v-if="totalHours > 0" class="sim-timepicker--remove-blocks" @click="removeAllTimeBlocks">
          <SimIconText icon="fa-times"></SimIconText>
        </span>
      </div>
      <div class="sim-timepicker--next-day" @click="nextDay">
        <SimIconText icon="fa-arrow-right"></SimIconText>
      </div>
    </div>

    <div class="sim-timepicker--inner" :class="setClass()">
      <ul>
        <li v-for="hour in 25" @mousedown="createTimeBlock(hour-1)" :class="setHourClass(hour-1)">

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

      <SimTimeBlock v-for="(block, index) in blocks" :key="index" :block="block" :index="index"
        @remove-time-block="removeTimeBlock"
        @is-moving="setMovingState"
        @is-stretching="setStretchingState"
        @block-updated="sortBlocks"
        ></SimTimeBlock>

    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import SimIconText from './IconText'
  import SimTimeBlock from './TimeBlock'

  const _zeroPad = function(num, pads) {
    pads = pads || '000'
    return (pads + num).substr(-2)
  }

  export default {
    name: 'sim-timepicker',
    components: {
      SimIconText,
      SimTimeBlock,
    },
    props: {
      date: {
        type: String,
        default: ''
      },
      blocks: {
        type: Array,
      },
      shouldShowDate: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        isMoving: false,
        isStretching: false,
      }
    },
    computed: {
      activeMoment () {
        return moment(this.date)
      },
      displayDate () {
        return moment(this.date).format('dddd, MMMM Do')
      },
      totalHours () {
        return this.blocks.map((block) => block.duration).reduce((sum, value) => sum + value, 0)
      },
      displayDateTotalHours () {
        let output = this.totalHours.toString().replace(/\.5/, '½').replace(/^0/, '') || 0
        let hours = `${output} ${(this.totalHours > 0 && this.totalHours <= 1 ? 'hour' : 'hours')}`
        return hours
      },
    },
    methods: {
      sortBlocks () {
        this.blocks.sort(function(a, b) {
          return parseFloat(a.start) - parseFloat(b.start);
        })
      },
      setClass () {
        let classes = []
        if(this.isMoving) {
          classes.push('is-moving')
        }
        if(this.isStretching) {
          classes.push('is-stretching')
        }
        return classes.join(' ')
      },
      setMovingState (bool) {
        this.isMoving = bool
      },
      setStretchingState (bool) {
        this.isStretching = bool
      },
      displayHour (hour) {
        hour = hour === 0 || hour === 24 ? 'Midnight' : (hour === 12 ? 'Noon' : hour)
        return hour > 12 ? `${hour - 12}p` : (parseInt(hour) ? `${hour}a` : hour)
      },
      setHourClass (hour) {
        return hour >= 6 && hour <= 17 ? 'is-daytime' : 'is-nighttime'
      },
      createTimeBlock (hour) {
        this.blocks.push({start: hour, duration: 1})
        this.sortBlocks()
        this.$emit('time-block-created', this.date, this.blocks)
      },
      removeTimeBlock (index) {
        this.blocks.splice(index, 1)
        this.$emit('time-block-removed', this.date, this.blocks)
      },
      removeAllTimeBlocks () {
        this.blocks.splice(0, this.blocks.length)
        this.$emit('all-time-blocks-removed', this.date)
      },
      emitDayClick (year, month, day) {
        this.$emit('calendar-day-selected', {
          year: year,
          month: _zeroPad((month+1)),
          day: _zeroPad(day),
        })
        this.$forceUpdate()
      },
      nextDay () {
        let date = this.activeMoment.add(1, 'day')
        this.emitDayClick(date.year(), date.month(), date.date())
      },
      prevDay () {
        let date = this.activeMoment.subtract(1, 'day')
        this.emitDayClick(date.year(), date.month(), date.date())
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/timepicker';
</style>
