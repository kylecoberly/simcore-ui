import { boundDuration, getMetrics } from '../utilities/box-metrics'

export default {
  data(){
    return {
      stretchDirection: null,
    }
  },
  methods: {
    setStretchingStart(event, mouseCoordinate) {
      const calc = this.metrics.offset[this.orientation]
        + mouseCoordinate
        - this.metrics.start[this.orientation]
        - this.metrics.offset_parent[this.orientation]
      const currentStart = Math.floor(calc / this.metrics.segment[this.orientation]) / 2
      this.block.startTime = boundDuration(
        currentStart,
        0,
        this.metrics.startValue + this.metrics.durationValue - 0.5,
      ) + this.timeShiftOffset

      return currentStart
    },
    startStretchUp(event) {
      if (event.which === 1) {
        event.preventDefault()
        this.stretchDirection = 'up'
        this.metrics = getMetrics(event, this.$el, this.maximumDuration)
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
    setDurationFromStart(event, mouseCoordinate, currentStart) {
      const currentDuration = this.metrics.durationValue
        - Math.floor((mouseCoordinate
        - this.metrics.start[this.orientation])
        / this.metrics.segment[this.orientation])
        / 2

      this.block.duration = boundDuration(currentDuration, 0.5, (
        currentStart < 0
          ? this.block.duration
          : this.maximumDuration
      ))
    },
  },
}
