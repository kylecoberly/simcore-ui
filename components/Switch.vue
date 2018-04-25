<template lang="html">
  <div class="sim-switch">
    <label>
      <span v-if="leftLabel">{{ leftLabel }}</span>
      <input type="checkbox" :value="true" :checked="checked" @change="change" />
      <span v-if="rightLabel">{{ rightLabel }}</span>
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
    watch: {
      value(value) {
        this.checked = value
      }
    },
  }
</script>

<style lang="scss">
  @import '../styles/switch';
</style>
