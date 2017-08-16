<template lang="html">
  <span class="sim-badge">
    <span class="sim-badge__text"><slot></slot></span>
    <transition name="sim-badge" appear v-if="badge">
      <span class="sim-badge__content">{{ badge }}</span>
    </transition>
  </span>
</template>

<script>
export default {
  name: 'sim-badge',
  props: {
    badge: [Number, String],
  },
}
</script>

<style lang="scss">
  .sim-badge {
    display: inline-block;
    position: relative;
    &__content {
      position: relative;
      transform: translate(-1ex, -1em);
      font-size: 0.85em;
      height: 1.5em;
      min-width: 1.5em;
      margin: -.5em 0;
      padding: 0 .5em;
      border-radius: 1em;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: monospace;
      will-change: font-size;
    }
    // transitions
    &-enter-active,
    &-leave-active {
      transition: all var(--ms, var(--default-ms)) cubic-bezier(.6,-0.4,.6,1.4);
    }
    &-enter,
    &-leave-to {
      font-size: 0em;
    }
  }
</style>
