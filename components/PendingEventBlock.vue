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
  import { formatTimesForDisplay } from '../utilities/date'
  import { cap, getMetrics } from '../utilities/box-metrics'

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
        return formatTimesForDisplay(this.block.startTime, this.block.duration)
      },
    },
    mounted() {
      this.updatePosition()
    },
    methods: {
      updatePendingEvent(block) {
        this.$emit('updatePendingEvent', block)
      },
      updatePosition() {
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
          this.metrics = getMetrics(event, this.$el, this.maximumDuration)
          this.$emit('setMoving', true)
          addEventListener('mousemove', this.move)
          addEventListener('mouseup', this.doneMoving)
        }
      },
      move(event) {
        const mouseCoordinate = this.orientation === 'x' ? event.clientX : event.clientY
        const calc = this.metrics.offset[this.orientation]
          + mouseCoordinate
          - this.metrics.start[this.orientation]
          - this.metrics.offset_parent[this.orientation]
        const currentStart = cap(
          calc,
          this.metrics.axis[this.orientation],
          0,
          this.metrics.max[this.orientation],
        )

        let startTime = (
          Math.round(
            currentStart
            / this.metrics.segment[this.orientation],
          ) / 2
        ) + this.timeShiftOffset

        if (this.block.limits && this.block.limits.starting && this.block.limits.ending) {
          startTime = cap(startTime, 0, this.block.limits.starting, this.block.limits.ending)
        }

        this.block.startTime = startTime
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
