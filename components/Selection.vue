<template lang="html">
  <span class="sim-selection" :class="{selected: item.selected}">
    <label :class="{disabled: disabled}">
      <input type="checkbox" :disabled="disabled" :checked="item.selected" @change="toggleSelection" />
      <span><slot></slot></span>
    </label>
  </span>
</template>

<script>
  export default {
    name: 'sim-selection',
    props: ['item', 'disabled', 'shouldBeSelected'],
    created () {
        this.item.selected = this.shouldBeSelected
    },
    methods: {
      toggleSelection () {
          this.item.selected = !this.item.selected
          this.$emit('toggle', this.item.id, this.item.selected)
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/selection';
</style>
