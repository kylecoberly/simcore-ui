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
        return this.$store.state.bubble.is_open
      },
      bubbleProperties() {
        return this.$store.state.bubble.properties
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
      'bubbleProperties.dinkY': function () {
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
        this.$store.commit('toggleBubbleVisibility', false)
      },
      setClasses() {
        const classes = []
        classes.push(`sim-bubble--${this.bubbleProperties.orientation}`)

        return classes.join(' ')
      },
      setStyles() {
        const styles = []
        styles.push(`--x: ${parseInt(this.bubbleProperties.x)}`)
        styles.push(`--y: ${parseInt(this.bubbleProperties.y)}`)
        styles.push(`--dink-y: ${parseInt(this.bubbleProperties.dinkY - this.metrics.top)}`)

        return styles.join(';')
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/bubble';
</style>
