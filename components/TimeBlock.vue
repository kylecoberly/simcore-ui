<template lang="html">
  <div :class="setClass()" :style="setStyle(block)">
    <template v-if="showControls">
      <div class="sim-timeblock--remover" @click="removeTimeBlock">
        <SimIconText icon="fa-times-circle fa-lg"></SimIconText>
      </div>
      <div v-if="orientationIsX" class="sim-timeblock--handle sim-timeblock--handle--x sim-timeblock--handle--left"
           @mousedown="startStretchLeft"></div>
      <div v-if="orientationIsY" class="sim-timeblock--handle sim-timeblock--handle--y sim-timeblock--handle--up"
           @mousedown="startStretchUp"></div>
      <div v-if="orientationIsX" class="sim-timeblock--handle sim-timeblock--handle--x sim-timeblock--handle--right"
           @mousedown="startStretchRight"></div>
      <div v-if="orientationIsY" class="sim-timeblock--handle sim-timeblock--handle--y sim-timeblock--handle--down"
           @mousedown="startStretchDown"></div>
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
  const _setProperty = (element, property, value) => {
    element.style.setProperty(`--${property}`, value)
  }
  const _getProperty = (element, property) => {
    return element.style.getPropertyValue(`--${property}`)
  }
  const _getMetrics = (event, element) => {
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
        x: pickerMetrics.width / 48,
        y: pickerMetrics.height / 48,
      },
      durationValue: parseFloat(_getProperty(element, 'duration')),
      startValue: parseFloat(_getProperty(element, 'start')),
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
    },
    methods: {
      setStyle(block) {
        const styles = []
        styles.push(`--start: ${block.start}`)
        styles.push(`--duration: ${block.duration}`)

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
      // ----------
      setStretchingStart(event, mouseCoordinate) {
        // for stretch left/up
        const calc = (this.metrics.offset[this.orientation] + mouseCoordinate - this.metrics.start[this.orientation] - this.metrics.offset_parent[this.orientation])
        const currentStart = Math.floor(calc / this.metrics.segment[this.orientation]) / 2
        this.block.start = _cap(currentStart, 0, 0, (this.metrics.startValue + this.metrics.durationValue - 0.5))

        // @FIXME dont make this a global setter?
        _setProperty(this.$el, 'start', this.block.start)

        return currentStart
      },
      setMovingStart(event) {
        const mouseCoordinate = this.orientation === 'x' ? event.clientX : event.clientY
        const calc = (this.metrics.offset[this.orientation] + mouseCoordinate - this.metrics.start[this.orientation] - this.metrics.offset_parent[this.orientation])
        const currentStart = _cap(calc, this.metrics.axis[this.orientation], 0, this.metrics.max[this.orientation])
        this.block.start = Math.round(currentStart / this.metrics.segment[this.orientation]) / 2

        // @FIXME dont make this a global setter?
        _setProperty(this.$el, 'start', this.block.start)
      },
      setDurationFromEnd(event, mouseCoordinate) {
        // For down or right
        const currentDuration = Math.round(
          (
            this.metrics.axis[this.orientation]
            + mouseCoordinate
            - this.metrics.start[this.orientation]
          )
          / this.metrics.segment[this.orientation]
        ) / 2
        this.block.duration = _cap(currentDuration, 0, 0.5, 24 - this.block.start)

        // @FIXME dont make this a global setter?
        _setProperty(this.$el, 'duration', this.block.duration)
      },
      setDurationFromStart(event, mouseCoordinate, currentStart) {
        // For up or left
        const currentDuration = this.metrics.durationValue - Math.floor((mouseCoordinate - this.metrics.start[this.orientation]) / this.metrics.segment[this.orientation]) / 2
        this.block.duration = _cap(currentDuration, 0, 0.5, (currentStart < 0 ? this.block.duration : 24))

        // @FIXME dont make this a global setter?
        _setProperty(this.$el, 'duration', this.block.duration)
      },
      // ----------
      move(event) {
        this.setMovingStart(event, event.clientX)
      },
      doneMoving() {
        this.isMoving = false
        this.$emit('is-moving', false)
        this.$emit('block-updated', this.date)
        removeEventListener('mousemove', this.move)
        removeEventListener('mouseup', this.doneMoving)
      },
      startMove(event) {
        if (event.which === 1) {
          window.console.log('start move', this.orientation)
          // event.preventDefault()
          // event.stopPropagation()
          this.isMoving = true
          this.metrics = _getMetrics(event, this.$el)
          this.$emit('is-moving', true)
          addEventListener('mousemove', this.move)
          addEventListener('mouseup', this.doneMoving)
        }
      },
      // ----------
      stretchRight(event) {
        this.setDurationFromEnd(event, event.clientX)
      },
      doneStretchingRight() {
        this.stretchDirection = null
        this.$emit('is-stretching', false)
        this.$emit('block-updated', this.date)
        removeEventListener('mousemove', this.stretchRight)
        removeEventListener('mouseup', this.doneStretchingRight)
      },
      startStretchRight(event) {
        if (event.which === 1) {
          event.preventDefault()
          event.stopPropagation()
          this.stretchDirection = 'right'
          this.metrics = _getMetrics(event, this.$el)
          this.$emit('is-stretching', true)
          addEventListener('mousemove', this.stretchRight)
          addEventListener('mouseup', this.doneStretchingRight)
        }
      },
      // ----------
      stretchDown(event) {
        this.setDurationFromEnd(event, event.clientY)
      },
      doneStretchingDown() {
        this.stretchDirection = null
        this.$emit('is-stretching', false)
        this.$emit('block-updated', this.date)
        removeEventListener('mousemove', this.stretchDown)
        removeEventListener('mouseup', this.doneStretchingDown)
      },
      startStretchDown(event) {
        if (event.which === 1) {
          event.preventDefault()
          event.stopPropagation()
          this.stretchDirection = 'down'
          this.metrics = _getMetrics(event, this.$el)
          this.$emit('is-stretching', true)
          addEventListener('mousemove', this.stretchDown)
          addEventListener('mouseup', this.doneStretchingDown)
        }
      },
      // ----------
      stretchLeft(event) {
        const currentStart = this.setStretchingStart(event, event.clientX)
        this.setDurationFromStart(event, event.clientX, currentStart)
      },
      doneStretchingLeft() {
        this.stretchDirection = null
        this.$emit('is-stretching', false)
        this.$emit('block-updated', this.date)
        removeEventListener('mousemove', this.stretchLeft)
        removeEventListener('mouseup', this.doneStretchingLeft)
      },
      startStretchLeft(event) {
        if (event.which === 1) {
          event.preventDefault()
          event.stopPropagation()
          this.stretchDirection = 'left'
          this.metrics = _getMetrics(event, this.$el)
          this.$emit('is-stretching', true)
          addEventListener('mousemove', this.stretchLeft)
          addEventListener('mouseup', this.doneStretchingLeft)
        }
      },
      // ----------
      stretchUp(event) {
        const currentStart = this.setStretchingStart(event, event.clientY)
        this.setDurationFromStart(event, event.clientY, currentStart)
      },
      doneStretchingUp() {
        this.stretchDirection = null
        this.$emit('is-stretching', false)
        this.$emit('block-updated', this.date)
        removeEventListener('mousemove', this.stretchUp)
        removeEventListener('mouseup', this.doneStretchingUp)
      },
      startStretchUp(event) {
        if (event.which === 1) {
          event.preventDefault()
          event.stopPropagation()
          this.stretchDirection = 'up'
          this.metrics = _getMetrics(event, this.$el)
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
