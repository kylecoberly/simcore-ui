<template lang="html">
  <div class="sim-bubble-trigger" @mousedown="setBubbleData($event)">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'sim-bubble-trigger',
  props: ['bubble-meta-data', 'slideContent'],
  methods: {
    setBubbleData(event) {
      const bubblePosition = JSON.parse(JSON.stringify(event.target.getBoundingClientRect()))
      bubblePosition.dinkY = bubblePosition.top + bubblePosition.height / 2
      bubblePosition.dinkX = bubblePosition.left + bubblePosition.width / 2

      const bubbleMetaData = Object.assign(bubblePosition, this.bubbleMetaData)

      this.$store.commit('setCurrentSlideContent', this.slideContent)
      this.$store.commit('updateBubbleMetaData', bubbleMetaData)
      this.$store.commit('bubbleShouldBeOpen', true)
    },
  },
}
</script>
