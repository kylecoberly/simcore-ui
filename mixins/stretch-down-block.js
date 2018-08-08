import { boundDuration, getMetrics } from '../utilities/box-metrics'

let metrics

export default {
  data(){
    return {
      stretchDirection: null,
    }
  },
  methods: {
    startStretchDown(event) {
      if (event.which === 1) {
        event.preventDefault()
        this.stretchDirection = 'down'
        metrics = getMetrics(event, this.$el, this.maximumDuration)
        addEventListener('mousemove', this.stretchDown)
        addEventListener('mouseup', this.doneStretchingDown)
      }
    },
    stretchDown(event) {
      this.setDurationFromEnd(event, event.clientY)
    },
    doneStretchingDown() {
      this.stretchDirection = null
      this.$emit('updateTimeblock', this.block)
      removeEventListener('mousemove', this.stretchDown)
      removeEventListener('mouseup', this.doneStretchingDown)
    },
    getNewDuration(mouseCoordinate) {
      return Math.round(
        (metrics.axis[this.orientation]
          + mouseCoordinate
          - metrics.start[this.orientation])
        / metrics.segment[this.orientation],
      ) / 2
    },
    setDurationFromEnd(event, mouseCoordinate) {
      const newDuration = this.getNewDuration(mouseCoordinate)
      this.$emit('setDuration', newDuration)

      this.block.duration = boundDuration(
        newDuration,
        this.minimumDuration,
        this.maximumDuration - this.block.startTime + this.timeShiftOffset,
      )
    },
  }
}
