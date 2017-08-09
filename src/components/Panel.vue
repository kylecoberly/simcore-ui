<template lang="html">
  <div class="sim-panel" :class="{active: active}">
    <router-view name="panel" />
    <div class="sim-panel__dismiss" v-if="showDismiss" @click="dismissThis">&times;</div>
  </div>
</template>

<script>
  export default {
    name: 'sim-panel',
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
  .sim-panel {
    z-index: 3;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 100%;
    width: var(--panel-width, var(--default-panel-width));
    max-width: 100vw;
    will-change: transform;
    transition: transform var(--ms, var(--default-ms)) ease-out;

    // panel parts
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

    // panel states
    &.active {
      transform: translateX(-100%);
      .sim-panel__dismiss {
        transform: translate(-50%, 50%) scale(1);
      }
    }
  }
</style>
