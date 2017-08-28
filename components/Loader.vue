<template lang="html">
  <transition name="loader">
      <div class="sim-loader" v-if="isLoading"></div>
  </transition>
</template>

<script>
export default {
  name: 'sim-loader',
  props: {
      isLoading: {
          type: Boolean,
          default: false
      }
  }
}
</script>

<style lang="scss">
  @import '../styles/loader';
</style>
