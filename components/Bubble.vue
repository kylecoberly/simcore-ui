<template lang="html">
  <div v-show="shouldBeOpen" class="sim-bubble" :class="setClasses()" :style="setStyles()">
    <div class="sim-bubble--content">
      <slot></slot>
    </div>
    <div class="sim-bubble--dismiss" @click="dismiss">&times;</div>
  </div>
</template>

<script>
  export default {
    name: 'sim-bubble',
    props: {},
    data() {
      return {
        metrics: {},
      }
    },
    computed: {
      shouldBeOpen() {
        return this.$store.state.bubble_is_open
      },
      bubbleMetaData() {
        return this.$store.state.bubble_meta_data
      },
    },
    mounted() {
      this.metrics = this.getMetrics()
      addEventListener('keyup', this.dismissWithEscapeKey)
    },
    destroyed() {
      removeEventListener('keyup', this.dismissWithEscapeKey)
    },
    watch: {
      'bubbleMetaData.dinkY': function () {
        this.metrics = this.getMetrics()
      },
    },
    methods: {
      getMetrics() {
        return this.$el.getBoundingClientRect()
      },
      dismissWithEscapeKey(event) {
        if (event.which === 27) {
          this.dismiss()
        }
      },
      dismiss() {
        this.$store.commit('bubbleShouldBeOpen', false)
      },
      setClasses() {
        const classes = []
        classes.push(`sim-bubble--${this.bubbleMetaData.orientation}`)

        return classes.join(' ')
      },
      setStyles() {
        const styles = []
        styles.push(`--x: ${parseInt(this.bubbleMetaData.x)}`)
        styles.push(`--y: ${parseInt(this.bubbleMetaData.y)}`)
        styles.push(`--dink-y: ${parseInt(this.bubbleMetaData.dinkY - this.metrics.top)}`)

        return styles.join(';')
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/bubble';
</style>
