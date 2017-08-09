<template lang="html">
  <div class="sim-overlay" :class="{active: active}">
    <slot></slot>
    <div class="sim-overlay__dismiss" v-if="showDismiss" @click="dismissThis">&times;</div>
  </div>
</template>

<script>
  export default {
    name: 'sim-overlay',
    props: ['show-dismiss'],
    data() {
      return {
        active: false,
      }
    },
    methods: {
      toggleThis(force) {
        this.active = (force === undefined ? !this.active : force)
      },
    },
  }
</script>

<style lang="scss">
  .sim-overlay {
    opacity: 0;

    z-index: 2;
    position: fixed;
    bottom: 100%;
    height: 100vh;
    left: 0;
    right: 0;
    will-change: transform;
    transition: transform var(--ms, var(--default-ms)) ease-out, opacity var(--ms, var(--default-ms)) linear;

    display: flex;
    flex-direction: column;

    &.active {
      transform: translateY(100%);
      opacity: 1;
      ~ .app-content {
        transform: translateY(15vh);
      }
      .sim-overlay__dismiss {
        transform: translate(-50%, 50%) scale(1)
      }
    }
    &--content {
      overflow: auto;
    }
    &__dismiss {
      line-height: 0;
      white-space: nowrap;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform var(--ms, var(--default-ms)) ease-out;
      transition-delay: calc(var(--ms, var(--default-ms)) / 2);
      transform: translate(-50%, 50%) scale(0);
    }
  }
</style>
