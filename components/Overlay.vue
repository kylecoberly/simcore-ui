<template lang="html">
  <div class="sim-overlay" :class="{active: isOpen}">
    <slot></slot>
    <div class="sim-overlay__dismiss" v-if="shouldShowDismiss" @click="isOpen = false">&times;</div>
  </div>
</template>

<script>
  export default {
    name: 'sim-overlay',
    props: ['should-be-open', 'should-show-dismiss'],
    data () {
      return {
        isOpen: false
      }
    },
    watch: {
      shouldBeOpen (value) {
        this.isOpen = value
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/overlay';
</style>
