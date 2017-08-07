<template lang="html">
  <span class="sim-selection" :class="{selected: isSelected}">
    <label :class="{disabled: disabled}">
      <input type="checkbox" :disabled="disabled" :checked="isSelected" @change="toggleSelection(item)" />
      <span><slot></slot></span>
    </label>
  </span>
</template>

<script>
  export default {
    name: 'sim-selection',
    props: ['item', 'disabled', 'selectedItems'],
    computed: {
      isSelected() {
        return this.selectedItems && this.selectedItems.includes(this.item.id)
      },
    },
    methods: {
      toggleSelection(item) {
        if (this.selectedItems.includes(item.id)) {
          this.selectedItems.splice(this.selectedItems.indexOf(item.id), 1)
        } else {
          this.selectedItems.push(item.id)
        }
      },
    },
  }
</script>
