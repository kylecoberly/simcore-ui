<template lang="html">
  <div class="sim-slide sim-slide--with-list">

    <SimSlideHeader :title="slide.title" />

    <SimSlideIntro :content="slide.intro" />

    <div class="sim-slide--content">
      <section class="sim-slide--content--section">
        <header class="text--orange--lighter">
          <SimIconText icon="#icon--event-duration" icon-type="svg" :text="slide.subtitle"></SimIconText>
        </header>
      </section>

      <section v-if="thereAreSpecificItems" class="sim-slide--content--section">
        <header class="text--green">
          <SimIconText icon="#icon--instructors-checked" icon-type="svg" text="Specific Instructors"></SimIconText>
        </header>
        <SimDatalist :items="specificItems" :animate="false">
          <li slot="item" slot-scope="props" :key="props.item.id" :class="`instructor-${props.item.id}`">
            <SimIconText icon="#icon--checkbox--checked" icon-type="svg" :text="`${props.item.id}: ${props.item.lastname}, ${props.item.firstname}`"></SimIconText>
          </li>
        </SimDatalist>
      </section>

      <section v-if="thereAreItems" class="sim-slide--content--section">
        <header class="text--blue--lighter">
          <SimIconText icon="#icon--instructors-exist" icon-type="svg" :text="labelForAvailableInstructors"></SimIconText>
        </header>
        <SimDatalist :items="items" :animate="true" style="--selection-color: var(--green)">
          <li slot="item" slot-scope="props" :key="props.item.id" :class="`instructor-${props.item.id}`">
            <sim-selection
              :item="props.item"
              :item-id="props.item.id"
              :disabled="props.item.disabled"
              :should-be-selected="isItemSelected(props.item.id)"
              @toggle="toggleItemInSelectedItems"
            >
              {{props.item.id}}: {{ props.item.lastname }}, {{ props.item.firstname }}
              <small class="ghost" v-if="props.item.department_id">({{ getItemName(departments, props.item.department_id) }})</small>
            </sim-selection>
          </li>
        </SimDatalist>
      </section>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

  import SimDatalist from './Datalist'
  import SimIconText from './IconText'
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
      SimIconText,
      SimSelection,
      SimSlideHeader,
      SimSlideIntro,
    },
    data() {
      return {
        selectedItems: [],
        slide: this.$store.getters.currentSlide(),
      }
    },
    mounted() {
      window.console.log('slide mounted', this.slide.content)
      this.$store.watch(this.$store.getters.currentSlide, (currentSlide) => {
        this.$set(this, 'slide', currentSlide)
      })
    },
    updated() {
      // @FIXME: keep this around for now - Jase
      // This allows the backbutton to repopulate the selected items
      // but breaks the selected items when scrubbing
      // this.selectedItems = this.slide.content.selectedItems
    },
    computed: {
      departments() {
        return this.$store.state.user.departments
      },
      segmentItems() {
        // let items
        // let user_ids = []
        // for (let iterator = this.slide.content.segment_start; iterator <= this.slide.content.segment_end; iterator++) {
        //   user_ids = this.slide.content.segments[iterator].user_ids
        //   items = items ? _.intersection(items, user_ids) : user_ids
        // }
        //
        // return items
        return []
      },
      specificItems() {
        return this.slide.content.specificItems
          ? getListFromIds(this.slide.content.specificItems, this.$store.state.user.instructors, 'lastname')
          : []
      },
      items() {
        let items = null
        if (this.slide.content.items && this.slide.content.items) {
          items = this.slide.content.items.filter((item) => !this.slide.content.specificItems.includes(parseInt(item, 10)))
        }

        return items
          ? getListFromIds(items, this.$store.state.user.instructors, 'lastname')
          : []
      },
      specificItemCount() {
        return this.specificItems.length
      },
      thereAreSpecificItems() {
        return (this.specificItemCount > 0)
      },
      itemCount() {
        return this.items.length
      },
      thereAreItems() {
        return (this.itemCount > 0)
      },
      minimumItemsNeeded() {
        // @FIXME: This is a hack to keep the next button from working when we arent ready for it yet - Jase
        return 1000 // this.$store.state.availabilities.availabilityInstructors.totalCount - this.specificItemCount
      },
      labelForAvailableInstructors() {
        return `Available Instructors: ${this.itemCount}`
      },
    },
    watch: {
      segmentItems() {
        this.selectedItems = _.intersection(this.items, this.selectedItems)
      },
    },
    methods: {
      isItemSelected(itemId) {
        return this.selectedItems.find((item) => item.id === itemId) ? true : false
      },
      getDepartmentName(id) {
          const department = this.departments.find((item) => item.id === id)
          if(department && department.hasOwnProperty('name')) {
              return department.name
          }
      },
      toggleItemInSelectedItems(itemId, value) {
        let selectedItemsWasUpdated = false

        const itemFound = this.items.find((item) => item.id === itemId)

        if (itemFound) {
          if (value === true) {
            this.selectedItems.push(itemFound)
          } else if (value === false) {
            this.selectedItems.splice(this.selectedItems.indexOf(itemFound), 1)
          }
          selectedItemsWasUpdated = true
        }

        let nextSlide = null

        if (this.selectedItems.length >= this.minimumItemsNeeded) {
          nextSlide = this.$store.state.slideDeck.slideTemplates.event_form
          nextSlide.selectedItems = this.selectedItems
          nextSlide.specificItems = this.specificItems
          nextSlide.title = this.slide.title
          nextSlide.subtitle = this.slide.subtitle
          nextSlide.start_time = this.slide.content.start_time
          nextSlide.end_time = this.slide.content.end_time
          nextSlide.meta = this.slide.meta
          nextSlide.meta.slideWidthFactor = 2
        }

        const currentSlide = this.slide

        currentSlide.content.selectedItems = this.selectedItems

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
