<template>
  <div :class="blockClasses" :style="blockStyles">
    <div class="sim-timeblock--remover" @click.stop="$emit('removeTimeBlock', index)">
      <SimIconText icon="#icon--control--minus" icon-type="svg"></SimIconText>
    </div>
    <div class="sim-timeblock--handle sim-timeblock--handle--y sim-timeblock--handle--up" @mousedown="startStretchUp"></div>
    <div class="sim-timeblock--mover" @mousedown="startMove"></div>
    <div class="sim-timeblock--handle sim-timeblock--handle--y sim-timeblock--handle--down" @mousedown="startStretchDown"></div>
    <div class="sim-timeblock--info">
      <div class="sim-timeblock--info--hours">{{ displayBlockHours }}</div>
      <div class="sim-timeblock--info--time">{{ displayBlockTime }}</div>
    </div>
  </div>
</template>

<script>
  import SimIconText from './IconText'
  import * as dateFormatter from '../data/date'

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
    components: {
      SimIconText,
    },
    data() {
      return {
        isMoving: false,
        stretchDirection: null,
        orientation: 'y',
        startTime: 0,
        maximumDuration: 24,
      }
    },
    props: {
      block: Object,
      index: Number,
    },
    computed: {
      segmentSize() {
        return (100 / this.maximumDuration)
      },
      timeShiftOffset() {
        return this.startTime
      },
      displayBlockTime() {
        return dateFormatter.formatTimesForDisplay(this.block.startTime, this.block.duration)
      },
      displayBlockHours() {
        return dateFormatter.formatBlockHoursForDisplay(this.block.duration)
      },
      blockClasses() {
        const classes = [`sim-timeblock sim-timeblock--theme--default sim-timeblock--${this.index} sim-timeblock--${this.orientation} is-moveable`]
        if (this.isMoving) {
          classes.push('is-moving')
        }
        if (this.stretchDirection) {
          classes.push(`is-stretching is-stretching--${this.stretchDirection}`)
        }

        return classes.join(' ')
      },
      blockStyles() {
        const styles = []

        styles.push(`--start: ${this.block.startTime - this.timeShiftOffset}`)
        styles.push(`--duration: ${this.block.duration}`)
        if (this.maximumDuration < 24) {
          styles.push(`--segment-size: ${this.segmentSize}`)
        }

        return styles.join(';')
      },
    },
    methods: {
      // ---------- For stretching up or left ----------
      setStretchingStart(event, mouseCoordinate) {
        const calc = (this.metrics.offset[this.orientation] + mouseCoordinate - this.metrics.start[this.orientation] - this.metrics.offset_parent[this.orientation])
        const currentStart = Math.floor(calc / this.metrics.segment[this.orientation]) / 2
        this.block.startTime = _cap((currentStart), 0, 0, (this.metrics.startValue + this.metrics.durationValue - 0.5)) + this.timeShiftOffset

        return currentStart
      },
      setDurationFromStart(event, mouseCoordinate, currentStart) {
        const currentDuration = this.metrics.durationValue - Math.floor((mouseCoordinate - this.metrics.start[this.orientation]) / this.metrics.segment[this.orientation]) / 2

        this.block.duration = _cap(currentDuration, 0, 0.5, (currentStart < 0 ? this.block.duration : this.maximumDuration))
      },
      // ---------- For stretching down or right ----------
      setDurationFromEnd(event, mouseCoordinate) {
        const currentDuration = Math.round((this.metrics.axis[this.orientation] + mouseCoordinate - this.metrics.start[this.orientation]) / this.metrics.segment[this.orientation]) / 2

        this.block.duration = _cap(currentDuration, 0, 0.5, this.maximumDuration - this.block.startTime + this.timeShiftOffset)
      },

      // ---------- Move ----------
      startMove(event) {
        if (event.which === 1) {
          event.preventDefault()
          this.isMoving = true
          this.metrics = _getMetrics(event, this.$el, this.maximumDuration)
          this.$emit('setMoving', true)
          addEventListener('mousemove', this.move)
          addEventListener('mouseup', this.doneMoving)
        }
      },
      move(event) {
        const mouseCoordinate = this.orientation === 'x' ? event.clientX : event.clientY
        const calc            = (this.metrics.offset[this.orientation] + mouseCoordinate - this.metrics.start[this.orientation] - this.metrics.offset_parent[this.orientation])
        const currentStart    = _cap(calc, this.metrics.axis[this.orientation], 0, this.metrics.max[this.orientation])

        let startTime = (Math.round((currentStart) / this.metrics.segment[this.orientation]) / 2) + this.timeShiftOffset

        if (this.block.limits && this.block.limits.starting && this.block.limits.ending) {
          startTime = _cap(startTime, 0, this.block.limits.starting, this.block.limits.ending)
        }

        this.block.startTime = startTime
      },
      doneMoving() {
        this.isMoving = false
        this.$emit('setMoving', false)
        this.$emit('updateTimeblock')
        removeEventListener('mousemove', this.move)
        removeEventListener('mouseup', this.doneMoving)
      },
      // ---------- Stretch Down ----------
      startStretchDown(event) {
        if (event.which === 1) {
          event.preventDefault()
          this.stretchDirection = 'down'
          this.metrics = _getMetrics(event, this.$el, this.maximumDuration)
          this.$emit('setStretching', true)
          addEventListener('mousemove', this.stretchDown)
          addEventListener('mouseup', this.doneStretchingDown)
        }
      },
      stretchDown(event) {
        this.setDurationFromEnd(event, event.clientY)
      },
      doneStretchingDown() {
        this.stretchDirection = null
        this.$emit('setStretching', false)
        this.$emit('updateTimeblock')
        removeEventListener('mousemove', this.stretchDown)
        removeEventListener('mouseup', this.doneStretchingDown)
      },
      // ---------- Stretch Up ----------
      startStretchUp(event) {
        if (event.which === 1) {
          event.preventDefault()
          this.stretchDirection = 'up'
          this.metrics = _getMetrics(event, this.$el, this.maximumDuration)
          this.$emit('setStretching', true)
          addEventListener('mousemove', this.stretchUp)
          addEventListener('mouseup', this.doneStretchingUp)
        }
      },
      stretchUp(event) {
        const currentStart = this.setStretchingStart(event, event.clientY)
        this.setDurationFromStart(event, event.clientY, currentStart)
      },
      doneStretchingUp() {
        this.stretchDirection = null
        this.$emit('setStretching', false)
        this.$emit('updateTimeblock')
        removeEventListener('mousemove', this.stretchUp)
        removeEventListener('mouseup', this.doneStretchingUp)
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/timeblock';
</style>
