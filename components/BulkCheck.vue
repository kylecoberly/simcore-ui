<template lang="html">
  <button class="sim-bulkcheck" :class="{active: checkAll}" @click="toggleState">
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
      state: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: 'fa-check'
      }
    },
    data () {
      return {
        checkAll: this.state
      }
    },
    methods: {
      toggleState () {
        this.checkAll = !this.checkAll
        this.$emit('toggle', this.checkAll)
      },
    },
    watch: {
      state (value) {
        this.checkAll = value
      }
    },
  }
</script>

<style lang="scss">
  @import '../styles/bulkcheck';
</style>
