<template lang="html">
  <div class="sim-progress" :style="stylePercentComplete">
      <div class="sim-progress__completed" :tooltip="bubbleText"></div>
  </div>
</template>

<script>
  export default {
    name: 'sim-progress',
    props: {
        percent: [Number, String],
    },
    computed: {
        stylePercentComplete () {
            return `--percent:${this.percent}%`
        },
        bubbleText () {
            return `${this.percent}% Complete`
        },
    },
  }
</script>

<style lang="scss">
  @import '../styles/progress';
</style>
