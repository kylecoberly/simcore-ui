import { boundDuration, getMetrics } from '../utilities/box-metrics'

export default {
  data() {
    return {
      isMoving: false,
    }
  },
  methods: {
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
      const currentStart = boundDuration(
        calc,
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
        startTime = boundDuration(startTime, this.block.limits.starting, this.block.limits.ending)
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
  },
}
