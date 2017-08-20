<template lang="html">
  <div class="sim-panel" :class="{active: shouldBeOpen}">
    <slot></slot>
    <div class="sim-panel__dismiss" v-if="shouldShowDismiss" @click="dismiss">&times;</div>
  </div>
</template>

<script>
  export default {
    name: 'sim-panel',
    props: ['should-be-open', 'should-show-dismiss', 'dismiss-to'],
    methods: {
      dismiss () {
        return this.$root.closePanel()
        if (this.$router && this.dismissTo) {
          this.$router.replace(this.dismissTo)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/panel';
</style>
