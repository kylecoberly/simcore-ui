<template lang="html">
  <div class="sim-slide sim-slide--with-list">

    <SimSlideHeader :title="slide.title" :subtitle="slide.subtitle" />
    <SimSlideIntro :content="slide.intro" />

    <div class="sim-slide--content">
      <template v-if="items">
        <SimDatalist v-if="items" :items="foundItems" :animate="true">
          <!-- <div slot="static-before" key="before">
            <input type="search" v-model="itemSearch" placeholder="find..." />
          </div> -->
          <li slot="item" slot-scope="props" :key="props.item.id">
            <!-- <sim-selection
              :item="props.item"
              :item-id="props.item.id"
              :disabled="props.item.disabled"
              :should-be-selected="isItemSelected(props.item.id)"
              @toggle="toggleItemInSelectedItems"
            > -->
              {{ props.item.first_name }} {{ props.item.last_name }}
            <!-- </sim-selection> -->
          </li>
        </SimDatalist>
      </template>
    </div>

  </div>
</template>

<script>
  import _ from 'lodash'

  import SimDatalist from './Datalist'
  import SimSelection from './Selection'
  import SimSlideHeader from './SlideHeader'
  import SimSlideIntro from './SlideIntro'

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
      const list = _.filter(source, (item) => unique(array).find((id) => item.id == id))
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
      SimSlideHeader,
      SimSlideIntro,
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
        this.$set(this, 'slide', currentSlide)
      })

      // this.bubbleElement = this.$el.closest('.sim-bubble')
      // this.bubbleElement.style.setProperty('--width-factor', this.slide.meta.slideWidthFactor)
    },
    destroyed() {
      // this.bubbleElement.style.removeProperty('--width-factor')
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
      isItemSelected(itemId) {
        return this.selectedItems.find((item) => item.id === itemId) ? true : false
      },
      toggleItemInSelectedItems(itemId, value) {
        let selectedItemsWasUpdated = false

        const foundItem = this.foundItems.find((item) => item.id === itemId)

        if (foundItem) {
          if (value === true) {
            this.selectedItems.push(foundItem)
          } else if (value === false) {
            this.selectedItems.splice(this.selectedItems.indexOf(foundItem), 1)
          }
          selectedItemsWasUpdated = true
        }

        let nextSlide = null

        if (this.selectedItems.length > 0) {
          nextSlide = this.$store.state.slideDeck.slideTemplates.event_time_picker
          nextSlide.items = this.selectedItems
          nextSlide.title = this.slide.title
          // nextSlide.subtitle = this.slide.subtitle
          nextSlide.start_time = this.slide.content.start_time
          nextSlide.end_time = this.slide.content.end_time
          nextSlide.meta = this.slide.meta
        }

        const currentSlide = this.slide

        currentSlide.content.selectedItems = this.selectedItems
        currentSlide.content.itemSearch = this.itemSearch
        currentSlide.content.foundItems = this.foundItems

        if (selectedItemsWasUpdated) {
          this.$emit('theSlideHasAnUpdate', {
            currentSlide,
            nextSlide,
            nextControl: {text: 'Next'},
          })
        }
      },
    },
  }
</script>

<style lang="scss">
  // uses: '../styles/slide-presenter';
</style>
