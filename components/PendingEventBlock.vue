<template>
  <div :class="`sim-timeblock sim-timeblock--theme--pending-event sim-timeblock--0 sim-timeblock--${this.orientation} is-moveable`" :style="blockStyles">
    <div class="sim-timeblock--remover" @click.stop="$emit('clearPendingEvent')">
      <SimIconText icon="#icon--control--minus" icon-type="svg"></SimIconText>
    </div>
    <div class="sim-timeblock--mover" @mousedown="startMove"></div>
    <div class="sim-timeblock--info">
      <div class="sim-timeblock--info--hours">{{ label }}</div>
    </div>
  </div>
</template>

<script>
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
        metrics: {},
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
      blockStyles() {
        const styles = []

        styles.push(`--start: ${this.block.startTime - this.timeShiftOffset}`)
        styles.push(`--duration: ${this.block.duration}`)
        if (this.maximumDuration < 24) {
          styles.push(`--segment-size: ${this.segmentSize}`)
        }

        return styles.join(';')
      },
      timeShiftOffset() {
        return this.startTime
      },
      label() {
        const suffix = this.block.duration > 1
          ? 'hours'
          : 'hour'
        return `${this.block.duration} ${suffix}`
      },
    },
    mounted() {
      this.updatePosition()
    },
    methods: {
      updatePendingEvent(block){
        this.$emit('updatePendingEvent', block)
      },
      updatePosition(){
        this.$emit('updatePosition', {
          domPosition: this.$el.getBoundingClientRect(),
          offset: {
            x: 0,
            y: 0,
          },
        })
      },
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

        const newBlock = Object.assign({}, this.block, { startTime })
        this.updatePendingEvent(newBlock)
        this.updatePosition()
      },
      doneMoving() {
        this.updatePosition()
        this.isMoving = false
        this.$emit('setMoving', false)
        removeEventListener('mousemove', this.move)
        removeEventListener('mouseup', this.doneMoving)
      },

    },
  }
</script>
