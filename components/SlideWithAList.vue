<template lang="html">
  <div class="sim-slide">

    <header v-if="slide.title || slide.subtitle" class="sim-slide--header">
      <h2 v-if="slide.title" class="sim-slide--title">{{ slide.title }}</h2>
      <div v-if="slide.subtitle" class="sim-slide--subtitle">{{ slide.subtitle }}</div>
    </header>

    <div v-if="slide.intro">
      {{ slide.intro }}
    </div>

    <template v-if="items">
      <SimDatalist :items="foundItems" :animate="true">
        <div slot="static-before" key="before">
          <input type="search" v-model="itemSearch" placeholder="find..." />
        </div>
        <li slot="item" slot-scope="props" :key="props.item.id">
          <sim-selection :item="props.item" :item-id="props.item.id" :disabled="props.item.disabled" :selected-items="selectedItems">
            {{ props.item.first_name }} {{ props.item.last_name }}
          </sim-selection>
        </li>
      </SimDatalist>
    </template>

  </div>
</template>

<script>
  import SimDatalist from './Datalist'
  import SimSelection from './Selection'

  // @FIXME should be using common.unique(...) | jase
  const unique = (array) => {
    if (array && array.length) {
      const t = {}
      return array.filter((item) => {
        if (Object.prototype.hasOwnProperty.call(t, item)) {
          return false
        }
        return (t[item] = true)
      })
    }
    return []
  }

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

  // @FIXME should be using common.getListFromIds(...) | jase
  const getListFromIds = (array, source, sortKey) => {
    if (array && array.length) {
      const list = source.filter((item) => unique(array).find((id) => item.id === id))
      if (sortKey) {
        return sortByKey(list, sortKey)
      }
      return list
    }
    return []
  }

  export default {
    name: 'sim-slide-with-a-list',
    components: {
      SimDatalist,
      SimSelection,
    },
    data() {
      return {
        selectedItems: [],
        itemSearch: '',
        slide: this.$store.getters.currentSlide(),
      }
    },
    mounted() {
      this.$store.watch(this.$store.getters.currentSlide, (currentSlide) => {
        console.log('watch')
        this.slide = currentSlide
      })
    },
    computed: {
      items() {
        return this.slide.content.items
            ? getListFromIds(this.slide.content.items, this.$store.state.users.all, 'last_name')
            : null
      },
      foundItems() {
        return sortByKey(this.items.filter(item => {
          return `${item.first_name} ${item.last_name}`.toLowerCase().includes(this.itemSearch.toLowerCase().trim())
        }), 'last_name', 'asc')
      },
    },
    methods: {
    },
  }
</script>

<style lang="scss">
  @import '../styles/slide';
</style>
