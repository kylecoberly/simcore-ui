<template lang="html">
  <div class="sim-filter sim-accordion" :class="{ active: shouldBeActive, open: isOpen }">

    <div class="sim-filter--header sim-accordion--label" @click="toggleOpenList">{{ label }}</div>

    <SimDatalist :items="list" :animate="true" class="sim-filter--items sim-accordion--items">
      <li slot="static-before" key="static-before" class="static system-echo FIXME-generic-classes" v-if="showSystemEcho">
        {{ systemEcho }}
      </li>
      <li slot="item" slot-scope="props" :key="props.item.id" class="no-wrap">
        <SimSelection :item-id="props.item.id" :should-be-selected="false" @toggle="toggleSelection">
          {{ props.item.name }}
        </SimSelection>
      </li>
    </SimDatalist>

  </div>
</template>

<script>
  import SimIconText from './IconText'
  import SimDatalist from './Datalist'
  import SimSelection from './Selection'

  export default {
    name: 'sim-filter-by',
    components: {
      SimIconText,
      SimDatalist,
      SimSelection,
    },
    props: {
      label: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      list: {
        type: Array,
        required: true,
      },
      systemEcho: {
        type: String,
      },
    },
    data() {
      return {
        selectedItems: [],
        items: [],
        isOpen: false
      }
    },
    computed: {
      shouldBeActive () {
        return this.selectedItems.length > 0
      },
      showSystemEcho () {
        return (this.systemEcho && this.systemEcho.length && !this.list.length)
      },
    },
    methods: {
      toggleOpenList: function(){
        this.isOpen = !this.isOpen
      },
      toggleSelection (id, isSelected) {
        if (isSelected) {
          this.selectedItems.push(id)
        } else {
          this.selectedItems.splice(this.selectedItems.indexOf(id), 1)
        }
      },
    },
    watch: {
      'selectedItems': function(newValue) {
        this.$emit('filter', this.type, newValue)
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/filter-by';
</style>
