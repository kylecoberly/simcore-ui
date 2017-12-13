<template lang="html">
  <div class="sim-slide">

    <header v-if="data.title || data.subtitle" class="sim-slide--header">
      <h2 v-if="data.title" class="sim-slide--title">{{ data.title }}</h2>
      <div v-if="data.subtitle" class="sim-slide--subtitle">{{ data.subtitle }}</div>
    </header>

    <div v-if="data.intro">
      {{ data.intro }}
    </div>

    {{ content.title }}

    <template v-if="content.items">
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

    <!--<div v-if="data.content">-->
      <!--{{ data.content }}-->
    <!--</div>-->

  </div>
</template>

<script>
  import SimDatalist from './Datalist'
  import SimSelection from './Selection'

  // #FIXME should be using common.sortByKey(...)
  const sortByKey = function(list, key, direction) {
      if(list && list.length) {
          let newList = list.sort((a, b) => {
              if (a[key] < b[key]) {
                  return -1
              } else if (a[key] > b[key]) {
                  return 1
              }
              return 0
          })
          if(direction === 'desc') {
              return newList.reverse()
          }
          return newList
      }
      return []
  }

  export default {
    name: 'sim-slide',
    components: {
      SimDatalist,
      SimSelection,
    },
    props: ['data', 'content'],
    data() {
      return {
        selectedItems: [],
        itemSearch: '',
      }
    },
    computed: {
      foundItems () {
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
