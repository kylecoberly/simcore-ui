<template lang="html">
  <button class="sim-bulkcheck" :class="{active: shouldBeActive}" @click="toggleSelectedItems">
    <SimIconText :icon="`${icon} fa-fw`"></SimIconText>
    <SimIconText :icon="`${icon} fa-fw`"></SimIconText>
    <SimIconText :icon="`${icon} fa-fw`"></SimIconText>
  </button>
</template>

<script>
  import SimIconText from './IconText'

  export default {
    name: 'sim-bulkcheck',
    components: {
      SimIconText,
    },
    props: {
      items: {
        type: Array,
        default: [],
        required: true,
      },
      icon: {
        type: String,
        default: 'fa-check'
      }
    },
    data () {
      return {
        checkedItems: []
      }
    },
    computed: {
      shouldBeActive () {
        return this.checkedItems.length > 0
      },
    },
    methods: {
      toggleSelectedItems () {
        this.checkedItems = this.checkedItems.length === this.items.length ? [] : this.items.map(item => item.id)
        this.$emit('toggle', this.checkedItems)
      },
    }
  }
</script>

<style lang="scss">
  @import '../styles/bulkcheck';
</style>
