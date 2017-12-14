<template lang="html">
  <div class="sim-slide">

    <header v-if="data.title || data.subtitle" class="sim-slide--header">
      <h2 v-if="data.title" class="sim-slide--title">{{ data.title }}</h2>
      <div v-if="data.subtitle" class="sim-slide--subtitle">{{ data.subtitle }}</div>
    </header>

    <div v-if="data.intro">
      {{ data.intro }}
    </div>

    <template v-if="data.content.items">
      <SimDatalist :items="foundItems">
        <div slot="static-before">
          <input type="search" v-model="itemSearch" placeholder="find..." />
        </div>
        <li slot="item" slot-scope="props" :key="props.index">
          <sim-selection :item="props.item" :disabled="props.item.disabled" :selected-items="selectedItems">
            {{ props.item.name }}
          </sim-selection>
        </li>
      </SimDatalist>
    </template>

  </div>
</template>

<script>
  import SimDatalist from './Datalist'
  import SimSelection from './Selection'

  // #FIXME should be using common.sortByKey(...)
  const sortByKey = (list, key, direction) => {
    if (list && list.length) {
      const newList = list.sort((a, b) => {
        if (a[key] < b[key]) {
          return -1
        } else if (a[key] > b[key]) {
          return 1
        }
        return 0
      })

      if (direction === 'desc') {
        return newList.reverse()
      }

      return newList
    }

    return []
  }

  export default {
    name: 'sim-slide-with-a-list',
    components: {
      SimDatalist,
      SimSelection,
    },
    props: ['data'],
    data() {
      return {
        selectedItems: [],
        itemSearch: '',
      }
    },
    computed: {
      foundItems() {
        return sortByKey(this.data.content.items.filter(item => {
          return `${item.name}`.toLowerCase().includes(this.itemSearch.toLowerCase().trim())
        }), 'name', 'asc')
      },
    },
    methods: {
    },
  }
</script>

<style lang="scss">
  @import '../styles/slide';
</style>
