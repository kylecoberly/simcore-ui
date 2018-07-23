<template>
  <div :style="blockStyles" :class="{'is-stretching is-stretching-down': stretchDirection}" class="sim-timeblock sim-timeblock--theme--duration sim-timeblock--0 sim-timeblock--y">
    <div class="sim-timeblock--handle sim-timeblock--handle--y sim-timeblock--handle--down" @mousedown="startStretchDown"></div>
    <div class="sim-timeblock--info">
      <div class="sim-timeblock--info--hours">{{ displayDuration }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        stretchDirection: null,
        orientation: 'y',
        minimumDuration: 0.5,
      }
    },
    props: {
      duration: Number,
      maximumDuration: Number,
    },
    computed: {
      displayDuration() {
        const suffix = this.duration > 1
          ? 'hours'
          : 'hour'
        return `${this.duration} ${suffix}`
      },
      segmentSize() {
        return (100 / this.maximumDuration)
      },
      blockStyles() {
        const styles = [
          `--start: 0`,
          `--duration: ${this.duration}`,
          `--segment-size: ${this.segmentSize}`,
        ]

        return styles.join(';')
      },
    },
    methods: {
      setStretchingStart(event, mouseCoordinate) {
        const calc = (
          this.metrics.offset[this.orientation]
          + mouseCoordinate
          - this.metrics.start[this.orientation]
          - this.metrics.offset_parent[this.orientation]
        )
        const currentStart = Math.floor(calc / this.metrics.segment[this.orientation]) / 2

        return currentStart
      },
      setDurationFromEnd(event, mouseCoordinate) {
        const currentDuration = Math.round(
          (this.metrics.axis[this.orientation]
          + mouseCoordinate
          - this.metrics.start[this.orientation])
            / this.metrics.segment[this.orientation]
        ) / 2

        this.$emit('setDuration', this.boundDuration(currentDuration, this.minimumDuration, this.maximumDuration))
      },
      startStretchDown(event) {
        if (event.which === 1) {
          event.preventDefault()
          this.stretchDirection = 'down'
          this.metrics = this.getMetrics(event, this.$el, this.maximumDuration)
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
        removeEventListener('mousemove', this.stretchDown)
        removeEventListener('mouseup', this.doneStretchingDown)
      },
      boundDuration(number, minimum, maximum) {
        return number < minimum
          ? minimum
          : number > maximum
            ? maximum
            : number
      },
      getMetrics(event, element, boundary) {
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
      },
    },
  }
</script>
