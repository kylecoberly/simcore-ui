<template lang="html">
  <transition name="sim-bubble" appear>
    <div v-show="shouldBeOpen" class="sim-bubble" :class="setClasses" :style="setStyles">
      <div class="sim-bubble--content">
        <slot></slot>
      </div>
      <div class="sim-bubble--dismiss" @click="dismiss">
        <SimIconText icon="#icon--control--x" icon-type="svg"></SimIconText>
        <!-- <SimIconText icon="fa-times fa-lg"></SimIconText> -->
      </div>
    </div>
  </transition>
</template>

<script>
  import SimIconText from './IconText'

  export default {
    name: 'sim-bubble',
    props: ['target'],
    components: {
      SimIconText,
    },
    data() {
      return {
        metrics: {},
      }
    },
    computed: {
      shouldBeOpen() {
        return this.$store.state.bubble.is_open
      },
      bubblePosition() {
        return this.$store.state.bubble.position
      },
      setClasses() {
        const classes = []
        classes.push(`sim-bubble--${this.bubblePosition.orientation}`)

        return classes.join(' ')
      },
      setStyles() {
        const styles = []
        styles.push(`--x: ${parseInt(this.bubblePosition.x, 10)}`)
        styles.push(`--y: ${parseInt(this.bubblePosition.y, 10)}`)
        styles.push(`--dink-y: ${parseInt(this.bubblePosition.dinkY - this.metrics.top, 10)}`)

        return styles.join(';')
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
      bubblePosition() {
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
    },
  }
</script>

<style lang="scss">
  @import '../styles/bubble';
</style>
