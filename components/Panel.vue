<template lang="html">
  <div class="sim-panel" :class="{active: isOpen}">
    <router-view name="panel" />
    <div class="sim-panel__dismiss" v-if="shouldShowDismiss" @click="isOpen = false">&times;</div>
  </div>
</template>

<script>
  export default {
    name: 'sim-panel',
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
  @import '../styles/panel';
</style>
