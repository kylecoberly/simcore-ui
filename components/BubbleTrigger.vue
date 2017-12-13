<template lang="html">
  <div class="sim-bubble-trigger" @mousedown="setBubbleData($event)">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'sim-bubble-trigger',
  props: ['data', 'slideContent'],
  methods: {
    setBubbleData(event) {
      const bubblePosition = JSON.parse(JSON.stringify(event.target.getBoundingClientRect()))
      bubblePosition.dinkY = event.clientY
      bubblePosition.dinkX = event.clientX

      const bubbleData = Object.assign(bubblePosition, this.data)

      this.$store.commit('setContentForTheSlideAtIndex', {
        index: 0,
        content: this.slideContent,
      })

      this.$store.commit('updateBubbleData', bubbleData)
      this.$store.commit('updateBubbleState', true)
    },
  },
}
</script>
