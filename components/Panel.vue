<template lang="html">
  <div class="sim-panel" :class="{active: shouldBeOpen}">
    <slot></slot>
    <div class="sim-panel__dismiss" v-if="shouldShowDismiss" @click="$root.closePanel">&times;</div>
  </div>
</template>

<script>
  export default {
    name: 'sim-panel',
    props: ['should-be-open', 'should-show-dismiss'],
  }
</script>

<style lang="scss">
  @import '../styles/panel';
</style>
