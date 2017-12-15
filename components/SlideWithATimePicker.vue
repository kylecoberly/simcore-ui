<template lang="html">
  <div class="sim-slide sim-slide--with-timepicker">
    <header v-if="data.title || data.subtitle" class="sim-slide--header">
      <h2 v-if="data.title" class="sim-slide--title">{{ data.title }}</h2>
      <div v-if="data.subtitle" class="sim-slide--subtitle">{{ data.subtitle }}</div>
    </header>

    <div v-if="data.intro" class="sim-slide--intro">
      {{ data.intro }}
    </div>

    <div class="sim-slide--content">
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
  import SimTimePicker from './TimePicker'

  export default {
    name: 'sim-slide',
    components: {
      SimTimePicker,
    },
    props: ['data'],
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
