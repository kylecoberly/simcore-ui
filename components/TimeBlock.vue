<template lang="html">
  <div :class="setClass()" :style="setStyle(block)">

    <template v-if="showControls">

      <div class="sim-timeblock--remover" @click="removeTimeBlock">
        <SimIconText icon="fa-times-circle fa-lg"></SimIconText>
      </div>

      <template v-if="orientationIsX">
        <div class="sim-timeblock--handle sim-timeblock--handle--x sim-timeblock--handle--left"
          @mousedown="startStretchLeft"></div>
        <div class="sim-timeblock--handle sim-timeblock--handle--x sim-timeblock--handle--right"
          @mousedown="startStretchRight"></div>
      </template>

      <template v-if="orientationIsY">
        <div class="sim-timeblock--handle sim-timeblock--handle--y sim-timeblock--handle--up"
          @mousedown="startStretchUp"></div>
        <div class="sim-timeblock--handle sim-timeblock--handle--y sim-timeblock--handle--down"
          @mousedown="startStretchDown"></div>
      </template>

      <div class="sim-timeblock--mover" @mousedown="startMove"></div>

      <div class="sim-timeblock--info">
        <div class="sim-timeblock--info--hours">{{ displayBlockHours() }}</div>
        <div class="sim-timeblock--info--time">{{ displayBlockTime() }}</div>
      </div>

    </template>

  </div>
</template>

<script>
  import moment from 'moment'
  import SimIconText from './IconText'

  const _cap = (num, previous, min, max) => {
    return (num < min ? min : (num > max - previous ? max - previous : num))
  }

  const _getMetrics = (event, element, boundary) => {
    const blockMetrics = element.getBoundingClientRect()
    const pickerMetrics = element.parentElement.getBoundingClientRect()

    return {
      start: {
        x: event.clientX,
        y: event.clientY,
      },
      axis: {
        x: blockMetrics.width,
        y: blockMetrics.height,
      },
      offset: {
        x: blockMetrics.x,
        y: blockMetrics.y,
      },
      max: {
        x: pickerMetrics.width,
        y: pickerMetrics.height,
      },
      offset_parent: {
        x: pickerMetrics.x,
        y: pickerMetrics.y,
      },
      segment: {
        x: pickerMetrics.width / boundary / 2,
        y: pickerMetrics.height / boundary / 2,
      },
      durationValue: parseFloat(element.style.getPropertyValue('--duration')),
      startValue: parseFloat(element.style.getPropertyValue('--start')),
    }
  }

  export default {
    name: 'sim-timeblock',
    components: {
      SimIconText,
    },
    props: {
      block: {
        type: Object,
        default: {},
      },
      index: {
        type: Number,
        default: 0,
      },
      date: {
        type: String,
        default: '',
      },
      orientation: {
        type: String,
        default: 'x',
      },
      showControls: {
        type: Boolean,
        default: true,
      },
      variables: {
        type: Object,
        default() {
          return {
            maximumDuration: 24,
            timeShiftOffset: 0,
          }
        },
      },
    },
    data() {
      return {
        isMoving: false,
        stretchDirection: null,
      }
    },
    computed: {
      orientationIsX() {
        return this.orientation === 'x'
      },
      orientationIsY() {
        return this.orientation === 'y'
      },
      segmentSize() {
        return (100/this.variables.maximumDuration)
      },
    },
    mounted() {
      this.setStyle(this.block)
    },
    methods: {
      setStyle(block) {
        const styles = []
        styles.push(`--start: ${block.start - this.variables.timeShiftOffset}`)
        styles.push(`--duration: ${block.duration}`)
        styles.push(`--segment-size: ${this.segmentSize}`)

        return styles.join(';')
      },
      setClass() {
        const classes = [`sim-timeblock sim-timeblock--${this.index} sim-timeblock--${this.orientation}`]
        if (!this.showControls) {
          classes.push('is-display-only')
        }
        if (this.isMoving) {
          classes.push('is-moving')
        }
        if (this.stretchDirection) {
          classes.push(`is-stretching is-stretching--${this.stretchDirection}`)
        }

        return classes.join(' ')
      },
      displayBlockHours() {
        const total = this.block.duration
        const output = total.toString()
          .replace(/\.5/, '½')
          .replace(/^0/, '') || 0
        const hours = `${output} ${(total > 0 && total <= 1 ? 'hour' : 'hours')}`

        return hours
      },
      displayBlockTime() {
        let times = null

        if (this.isMoving || this.stretchDirection) {
          const day = moment()
            .startOf('day')
          const start = day.add(this.block.start, 'hours')
            .format('h:mma')
          const end = day.add(this.block.duration, 'hours')
            .format('h:mma')
          times = `${start.replace(':00', '')} — ${end.replace(':00', '')}`
        }

        return times
      },
      removeTimeBlock(event) {
        event.stopPropagation()
        event.preventDefault()
        this.$emit('remove-time-block', this.index)
      },
      // ---------- For moving ----------
      setMovingStart(event) {
        const mouseCoordinate = this.orientation === 'x' ? event.clientX : event.clientY
        const calc = (this.metrics.offset[this.orientation] + mouseCoordinate - this.metrics.start[this.orientation] - this.metrics.offset_parent[this.orientation])
        const currentStart = _cap(calc, this.metrics.axis[this.orientation], 0, this.metrics.max[this.orientation])

        this.block.start = (Math.round((currentStart) / this.metrics.segment[this.orientation]) / 2) + this.variables.timeShiftOffset
      },

      // ---------- For stretching up or left ----------
      setStretchingStart(event, mouseCoordinate) {
        const calc = (this.metrics.offset[this.orientation] + mouseCoordinate - this.metrics.start[this.orientation] - this.metrics.offset_parent[this.orientation])
        const currentStart = Math.floor(calc / this.metrics.segment[this.orientation]) / 2
        this.block.start = _cap((currentStart), 0, 0, (this.metrics.startValue + this.metrics.durationValue - 0.5)) + this.variables.timeShiftOffset

        return currentStart
      },
      setDurationFromStart(event, mouseCoordinate, currentStart) {
        const currentDuration = this.metrics.durationValue - Math.floor((mouseCoordinate - this.metrics.start[this.orientation]) / this.metrics.segment[this.orientation]) / 2

        this.block.duration = _cap(currentDuration, 0, 0.5, (currentStart < 0 ? this.block.duration : this.variables.maximumDuration))
      },
      // ---------- For stretching down or right ----------
      setDurationFromEnd(event, mouseCoordinate) {
        const currentDuration = Math.round((this.metrics.axis[this.orientation] + mouseCoordinate - this.metrics.start[this.orientation]) / this.metrics.segment[this.orientation]) / 2

        this.block.duration = _cap(currentDuration, 0, 0.5, this.variables.maximumDuration - this.block.start + this.variables.timeShiftOffset)
      },

      // ---------- Move ----------
      move(event) {
        this.setMovingStart(event)
      },
      doneMoving() {
        this.isMoving = false
        this.$emit('is-moving', false)
        removeEventListener('mousemove', this.move)
        removeEventListener('mouseup', this.doneMoving)
      },
      startMove(event) {
        if (event.which === 1) {
          event.preventDefault()
          event.stopPropagation()
          this.isMoving = true
          this.metrics = _getMetrics(event, this.$el, this.variables.maximumDuration)
          this.$emit('is-moving', true)
          addEventListener('mousemove', this.move)
          addEventListener('mouseup', this.doneMoving)
        }
      },
      // ---------- Stretch Right ----------
      stretchRight(event) {
        this.setDurationFromEnd(event, event.clientX)
      },
      doneStretchingRight() {
        this.stretchDirection = null
        this.$emit('is-stretching', false)
        removeEventListener('mousemove', this.stretchRight)
        removeEventListener('mouseup', this.doneStretchingRight)
      },
      startStretchRight(event) {
        if (event.which === 1) {
          event.preventDefault()
          event.stopPropagation()
          this.stretchDirection = 'right'
          this.metrics = _getMetrics(event, this.$el, this.variables.maximumDuration)
          this.$emit('is-stretching', true)
          addEventListener('mousemove', this.stretchRight)
          addEventListener('mouseup', this.doneStretchingRight)
        }
      },
      // ---------- Stretch Down ----------
      stretchDown(event) {
        this.setDurationFromEnd(event, event.clientY)
      },
      doneStretchingDown() {
        this.stretchDirection = null
        this.$emit('is-stretching', false)
        removeEventListener('mousemove', this.stretchDown)
        removeEventListener('mouseup', this.doneStretchingDown)
      },
      startStretchDown(event) {
        console.log(this.variables)
        if (event.which === 1) {
          event.preventDefault()
          event.stopPropagation()
          this.stretchDirection = 'down'
          this.metrics = _getMetrics(event, this.$el, this.variables.maximumDuration)
          this.$emit('is-stretching', true)
          addEventListener('mousemove', this.stretchDown)
          addEventListener('mouseup', this.doneStretchingDown)
        }
      },
      // ---------- Stretch Left ----------
      stretchLeft(event) {
        const currentStart = this.setStretchingStart(event, event.clientX)
        this.setDurationFromStart(event, event.clientX, currentStart)
      },
      doneStretchingLeft() {
        this.stretchDirection = null
        this.$emit('is-stretching', false)
        removeEventListener('mousemove', this.stretchLeft)
        removeEventListener('mouseup', this.doneStretchingLeft)
      },
      startStretchLeft(event) {
        if (event.which === 1) {
          event.preventDefault()
          event.stopPropagation()
          this.stretchDirection = 'left'
          this.metrics = _getMetrics(event, this.$el, this.variables.maximumDuration)
          this.$emit('is-stretching', true)
          addEventListener('mousemove', this.stretchLeft)
          addEventListener('mouseup', this.doneStretchingLeft)
        }
      },
      // ---------- Stretch Up ----------
      stretchUp(event) {
        const currentStart = this.setStretchingStart(event, event.clientY)
        this.setDurationFromStart(event, event.clientY, currentStart)
      },
      doneStretchingUp() {
        this.stretchDirection = null
        this.$emit('is-stretching', false)
        removeEventListener('mousemove', this.stretchUp)
        removeEventListener('mouseup', this.doneStretchingUp)
      },
      startStretchUp(event) {
        if (event.which === 1) {
          event.preventDefault()
          event.stopPropagation()
          this.stretchDirection = 'up'
          this.metrics = _getMetrics(event, this.$el, this.variables.maximumDuration)
          this.$emit('is-stretching', true)
          addEventListener('mousemove', this.stretchUp)
          addEventListener('mouseup', this.doneStretchingUp)
        }
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/timeblock';
</style>
