<template lang="html">
  <div class="sim-switch">
    <label>
      <span>{{ leftLabel }}</span>
      <input type="checkbox" :value="true" :checked="checked" @change="change" />
      <span>{{ rightLabel }}</span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'sim-switch',
    props: ['value', 'leftLabel', 'rightLabel'],
    data() {
      return {
        checked: this.value,
      }
    },
    methods: {
      change() {
        this.checked = !this.checked
        this.$emit('input', this.checked)
      },
    },
  }
</script>

<style lang="scss">
  .sim-switch {
    display: inline-block;
    label {
      display: inline-flex;
      align-items: center;
      > * {
        margin: 0;
        + * {
          margin-left: 1ch;
        }
      }
    }
    input {
      appearance: none;
      position: relative;
      padding: .8ch 1.8ch;
      border-radius: 1em;
      font: inherit;
      cursor: pointer;
      outline: 0;
      will-change: transform, background;
      transition: background var(--ms, var(--default-ms)) ease-out, transform var(--ms, var(--default-ms)) ease-out;

      &:active {
        transform: scale(.9);
      }

      // the dot
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-100%, -50%);
        padding: .9ch;
        border-radius: 1em;
        box-shadow: 0 0 0 1px var(--color);
        transition: transform var(--ms, var(--default-ms)) ease-out;
      }

      &:checked::before {
        transform: translate(0%, -50%);
      }
    }
  }
</style>
