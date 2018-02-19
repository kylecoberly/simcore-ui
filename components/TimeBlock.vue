<template lang="html">
  <div :class="blockClasses" :style="blockStyles">

    <template v-if="showControls">

      <div v-if="canRemoveBlock" class="sim-timeblock--remover" @click="emitRemoveTimeBlock">
        <SimIconText icon="fa-times"></SimIconText>
      </div>

      <template v-if="orientationIsX">
        <div v-if="canResizeBlockStart" class="sim-timeblock--handle sim-timeblock--handle--x sim-timeblock--handle--left" @mousedown="startStretchLeft"></div>
        <div v-if="canResizeBlockEnd" class="sim-timeblock--handle sim-timeblock--handle--x sim-timeblock--handle--right" @mousedown="startStretchRight"></div>
      </template>

      <template v-else-if="orientationIsY">
        <div v-if="canResizeBlockStart" class="sim-timeblock--handle sim-timeblock--handle--y sim-timeblock--handle--up" @mousedown="startStretchUp"></div>
        <div v-if="canResizeBlockEnd" class="sim-timeblock--handle sim-timeblock--handle--y sim-timeblock--handle--down" @mousedown="startStretchDown"></div>
      </template>

      <div v-if="canMoveBlock" class="sim-timeblock--mover" @mousedown="startMove"></div>

      <template v-if="showBlockInfo">
        <div class="sim-timeblock--info">
          <div v-if="showBlockHours" class="sim-timeblock--info--hours">{{ displayBlockHours }}</div>
          <div v-if="showBlockTime" class="sim-timeblock--info--time">{{ displayBlockTime }}</div>
        </div>
      </template>

    </template>

    <div v-if="hasTooltip" class="sim-timeblock--tooltip">
      <span v-if="tooltipIcon" class="sim-timeblock--icon sim-timeblock--tooltip--icon">
        <svg><use :xlink:href="tooltipIcon" /></svg>
      </span>
      <span v-if="tooltipText">
        {{ tooltipText }}
      </span>
    </div>

    <div v-if="hasBlockIcon" class="sim-timeblock--icon">
      <svg><use :xlink:href="blockIcon" /></svg>
    </div>

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
        default: 0,
      },
      orientation: {
        type: String,
        default: 'x',
      },
      showControls: {
        type: Boolean,
        default: true,
      },
      theme: {
        type: String,
        default: 'default'
      },
      tooltip: {
        icon: null,
        text: null,
      },
      blockIcon: null,
      variables: {
        type: Object,
        default() {
          return {
            maximumDuration: 24,
            startTime: 0,
          }
        },
      },
      settings: {
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
    },
    data() {
      return {
        isMoving: false,
        stretchDirection: null,
      }
    },
    computed: {
      tooltipIcon() {
        return this.tooltip && this.tooltip.icon ? this.tooltip.icon : null
      },
      tooltipText() {
        return this.tooltip && this.tooltip.text ? this.tooltip.text : null
      },
      hasTooltip() {
        return (this.tooltipIcon || this.tooltipText)
      },
      hasBlockIcon() {
        return (!!this.blockIcon)
      },
      orientationIsX() {
        return this.orientation === 'x'
      },
      orientationIsY() {
        return this.orientation === 'y'
      },
      segmentSize() {
        return (100/this.variables.maximumDuration)
      },
      timeShiftOffset() {
        return this.variables.startTime
      },
      displayBlockTime() {
        const day = moment().startOf('day')
        const start = day.add(this.block.startTime, 'hours').format('h:mma')
        const end = day.add(this.block.duration, 'hours').format('h:mma')
        // times = `${start.replace(':00', '')} — ${end.replace(':00', '')}`

        return `${start} — ${end}`
      },
      displayBlockHours() {
        const total = this.block.duration
        const output = total.toString()
          .replace(/\.5/, '½')
          .replace(/^0/, '') || 0

        return `${output} ${(total > 0 && total <= 1 ? 'hour' : 'hours')}`
      },
      showBlockHours() {
        return this.settings.showBlockHours
      },
      showBlockTime() {
        return this.settings.showBlockTime
      },
      canRemoveBlock() {
        return this.settings.canRemoveBlock
      },
      canResizeBlockStart() {
        return this.settings.canResizeBlockStart
      },
      canResizeBlockEnd() {
        return this.settings.canResizeBlockEnd
      },
      canMoveBlock() {
        return this.settings.canMoveBlock
      },
      showBlockInfo() {
        return this.showBlockHours || this.showBlockTime
      },
      blockClasses() {
        const classes = [`sim-timeblock sim-timeblock--theme--${this.theme} sim-timeblock--${this.index} sim-timeblock--${this.orientation}`]
        if (!this.showControls) {
          classes.push('is-display-only')
        }
        if (this.canMoveBlock) {
          classes.push('is-moveable')
        }
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
        styles.push(`--start: ${this.block.start - this.timeShiftOffset}`)
        styles.push(`--duration: ${this.block.duration}`)
        styles.push(`--segment-size: ${this.segmentSize}`)

        return styles.join(';')
      },
    },
    methods: {
      emitRemoveTimeBlock(event) {
        event.stopPropagation()
        event.preventDefault()
        this.$emit('remove-time-block', this.index)
      },

      // ---------- For moving ----------
      setMovingStart(event) {
        const mouseCoordinate = this.orientation === 'x' ? event.clientX : event.clientY
        const calc = (this.metrics.offset[this.orientation] + mouseCoordinate - this.metrics.start[this.orientation] - this.metrics.offset_parent[this.orientation])
        const currentStart = _cap(calc, this.metrics.axis[this.orientation], 0, this.metrics.max[this.orientation])

        this.block.start = (Math.round((currentStart) / this.metrics.segment[this.orientation]) / 2) + this.timeShiftOffset
      },

      // ---------- For stretching up or left ----------
      setStretchingStart(event, mouseCoordinate) {
        const calc = (this.metrics.offset[this.orientation] + mouseCoordinate - this.metrics.start[this.orientation] - this.metrics.offset_parent[this.orientation])
        const currentStart = Math.floor(calc / this.metrics.segment[this.orientation]) / 2
        this.block.start = _cap((currentStart), 0, 0, (this.metrics.startValue + this.metrics.durationValue - 0.5)) + this.timeShiftOffset

        return currentStart
      },
      setDurationFromStart(event, mouseCoordinate, currentStart) {
        const currentDuration = this.metrics.durationValue - Math.floor((mouseCoordinate - this.metrics.start[this.orientation]) / this.metrics.segment[this.orientation]) / 2

        this.block.duration = _cap(currentDuration, 0, 0.5, (currentStart < 0 ? this.block.duration : this.variables.maximumDuration))
      },
      // ---------- For stretching down or right ----------
      setDurationFromEnd(event, mouseCoordinate) {
        const currentDuration = Math.round((this.metrics.axis[this.orientation] + mouseCoordinate - this.metrics.start[this.orientation]) / this.metrics.segment[this.orientation]) / 2

        this.block.duration = _cap(currentDuration, 0, 0.5, this.variables.maximumDuration - this.block.start + this.timeShiftOffset)
      },

      // ---------- Move ----------
      move(event) {
        this.setMovingStart(event)
      },
      doneMoving() {
        this.isMoving = false
        this.$emit('is-moving', false)
        this.$emit('block-was-updated')
        removeEventListener('mousemove', this.move)
        removeEventListener('mouseup', this.doneMoving)
      },
      startMove(event) {
        if (event.which === 1) {
          event.preventDefault()
          // event.stopPropagation()
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
        this.$emit('block-was-updated')
        removeEventListener('mousemove', this.stretchRight)
        removeEventListener('mouseup', this.doneStretchingRight)
      },
      startStretchRight(event) {
        if (event.which === 1) {
          event.preventDefault()
          // event.stopPropagation()
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
        this.$emit('block-was-updated')
        removeEventListener('mousemove', this.stretchDown)
        removeEventListener('mouseup', this.doneStretchingDown)
      },
      startStretchDown(event) {
        if (event.which === 1) {
          event.preventDefault()
          // event.stopPropagation()
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
        this.$emit('block-was-updated')
        removeEventListener('mousemove', this.stretchLeft)
        removeEventListener('mouseup', this.doneStretchingLeft)
      },
      startStretchLeft(event) {
        if (event.which === 1) {
          event.preventDefault()
          // event.stopPropagation()
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
        this.$emit('block-was-updated')
        removeEventListener('mousemove', this.stretchUp)
        removeEventListener('mouseup', this.doneStretchingUp)
      },
      startStretchUp(event) {
        if (event.which === 1) {
          event.preventDefault()
          // event.stopPropagation()
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
