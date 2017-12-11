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
      bubbleData() {
        return this.$store.state.bubble_data
      }
    },
    mounted() {
      this.metrics = this.getMetrics()
      const next = this.$el.querySelector('.next')
      const back = this.$el.querySelector('.back')
      const max = this.$el.querySelectorAll('.content').length
    },
    methods: {
      getMetrics() {
        return this.$el.getBoundingClientRect()
      },
      dismiss() {
        this.$store.commit('updateBubbleState', false)
      },
      setClasses() {
        const classes = []
        classes.push(`sim-bubble--${this.bubbleData.orientation}`)

        return classes.join(' ')
      },
      setStyles() {
        const styles = []
        styles.push(`--x: ${parseInt(this.bubbleData.x)}`)
        styles.push(`--y: ${parseInt(this.bubbleData.y)}`)
        styles.push(`--dink-y: ${parseInt(this.bubbleData.dinkY - this.metrics.top)}`)

        return styles.join(';')
      },
    }
  }
</script>

<style lang="scss">
  @import '../styles/bubble';
</style>
