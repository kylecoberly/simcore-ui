<template lang="html">
  <div class="sim-slide sim-slide--with-timepicker">

    <SimSlideHeader :title="data.title" :subtitle="data.subtitle" />

    <SimSlideIntro :content="data.intro" />

    <div class="sim-slide--content">
      <p>
        <span v-for="(item, index) in items">
             &bull;&nbsp;{{ item.last_name }}
        </span>
      </p>

      <SimTimePicker :date="$store.state.activeDate.date"
        orientation="y"
        :time-block-limit="1"
        :start-time="data.start_time"
        :end-time="data.end_time"
        />
    </div>
  </div>
</template>

<script>
  import SimSlideHeader from './SlideHeader'
  import SimSlideIntro from './SlideIntro'
  import SimTimePicker from './TimePicker'

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
    name: 'sim-slide-with-a-timepicker',
    components: {
      SimSlideHeader,
      SimSlideIntro,
      SimTimePicker,
    },
    props: ['data'],
    computed: {
      items() {
        return getListFromIds(this.data.content.items, this.$store.state.users.all, 'last_name')
      },
    },
    mounted() {
    },
    watcher: {
      timeBlock(newBlock) {
        if (newBlock !== null) {
          const nextSlide = this.$store.state.slideDeck.slideTemplates.event_form

          nextSlide.title = this.data.title
          nextSlide.start_time = this.data.content.start_time
          nextSlide.end_time = this.data.content.end_time

          this.$emit('theSlideHasAnUpdate', {
            nextSlide,
          })
        }
      },
    },
  }
</script>

<style lang="scss">
  // uses: '../styles/slide';
</style>
