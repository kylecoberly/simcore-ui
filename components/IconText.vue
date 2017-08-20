<template lang="html">
  <span class="sim-icontext" :class="bling">
    <span v-if="icon" class="sim-icon fa" :class="icon"></span>
    <span v-if="text">{{ text }}</span>
  </span>
</template>

<script>
  export default {
    name: 'sim-icontext',
    props: {
      icon: String,
      text: [Number, String],
      circle: Boolean,
      round: Boolean,
      square: Boolean,
    },
    computed: {
      bling () {
        if (this.circle) {
          return 'sim-icontext__circle'
        }
        if (this.round) {
          return 'sim-icontext__round'
        }
        if (this.square) {
          return 'sim-icontext__square'
        }
        return 'sim-icontext__plain'
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/icontext';
</style>
