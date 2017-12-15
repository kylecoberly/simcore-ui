<template lang="html">
  <div class="sim-slide sim-slide--with-form">

    <SimSlideHeader :title="data.title" :subtitle="data.subtitle" />
    <SimSlideIntro :content="data.intro" />

    <div class="sim-slide--content">
      Yay! Event Form!
    </div>
  </div>
</template>

<script>
import SimSlideHeader from './SlideHeader'
import SimSlideIntro from './SlideIntro'

  export default {
    name: 'sim-slide-with-a-form',
    components: {
      SimSlideHeader,
      SimSlideIntro,
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
