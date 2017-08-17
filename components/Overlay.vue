<template lang="html">
  <div class="sim-overlay" :class="{active: shouldBeOpen}">
    <slot></slot>
    <div class="sim-overlay__dismiss" v-if="shouldShowDismiss" @click="$root.closeOverlay">&times;</div>
  </div>
</template>

<script>
  export default {
    name: 'sim-overlay',
    props: ['should-be-open', 'should-show-dismiss'],
  }
</script>

<style lang="scss">
  @import '../styles/overlay';
</style>
