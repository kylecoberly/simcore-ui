<template>
  <div :class="`sim-timeblock sim-timeblock--theme--aggregate sim-timeblock--${this.index} sim-timeblock--${this.orientation}`" :style="blockStyles">
  </div>
</template>

<script>
  export default {
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
    },
  }
</script>
