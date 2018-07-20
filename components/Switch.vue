<template lang="html">
  <div class="sim-switch">
    <label>
      <span v-if="leftLabel">{{ leftLabel }}</span>
      <input type="checkbox" :value="true" :checked="value" @change="change" />
      <span v-if="rightLabel">{{ rightLabel }}</span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'sim-switch',
    props: ['value', 'leftLabel', 'rightLabel'],
    methods: {
      change() {
        this.checked = !this.checked
        this.$emit('change', this.checked)
      },
    }
  }
</script>

<style lang="scss">
  @import '../styles/switch';
</style>
