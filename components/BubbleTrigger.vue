<template lang="html">
  <div class="sim-bubble-trigger" @mousedown="setBubbleData($event)">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'sim-bubble-trigger',
  props: ['bubbleProperties', 'slideContent'],
  methods: {
    setBubbleData(event) {
      const bubblePosition = JSON.parse(JSON.stringify(event.target.getBoundingClientRect()))
      bubblePosition.dinkY = bubblePosition.top + bubblePosition.height / 2
      bubblePosition.dinkX = bubblePosition.left + bubblePosition.width / 2

      const bubbleProperties = Object.assign(bubblePosition, this.bubbleProperties)

      this.$store.commit('setASlideAtIndex', { index: 0, content: this.slideContent })

      this.$store.commit('updateBubbleProperties', bubbleProperties)
      this.$store.commit('toggleBubbleVisibility', true)
    },
  },
}
</script>
