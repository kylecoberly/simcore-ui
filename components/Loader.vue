<template>
  <transition name="loader" appear>
    <svg viewBox="0 0 50 50" class="sim-loader" v-if="isLoading">
      <circle cx="25" cy="25" r="22.5" />
    </svg>
  </transition>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
  @import '../styles/loader'
</style>
