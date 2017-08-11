<template lang="html">
  <span class="sim-badge">
    <span v-if="count" class="sim-badge__count">{{ count }}</span>
    <span class="sim-badge__text"><slot></slot></span>
  </span>
</template>

<script>
export default {
  name: 'sim-badge',
  props: {
    count: Number,
  },
}
</script>

<style lang="scss">
.sim-badge {
  display: inline-block;
  position: relative;
  align-items: baseline;
  margin-right: calc(1em + 1ex);
  &__count {
    position: absolute;
    top: 0;
    left: 100%;
    transform: translate(0%, -50%);
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: monospace;
    background: var(--badge-bg, var(--default-badge-bg, #ccc));
    color: var(--badge-fg, var(--default-badge-fg, #fff));
  }
}
</style>
