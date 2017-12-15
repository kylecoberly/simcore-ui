<template lang="html">
  <div class="sim-slide sim-slide--with-timepicker">

    <SimSlideHeader :title="title" :subtitle="subtitle" />

    <SimSlideIntro :content="intro" />

    <div class="sim-slide--content">
      <p>
        <span v-for="(item, index) in items">
             &bull;&nbsp;{{ item.last_name }}
        </span>
      </p>

      <SimTimePicker :date="date"
        orientation="y"
        :time-block-limit="1"
        :start-time="start_time"
        :end-time="end_time"
        :propBlocks="blocks"
        />
    </div>
  </div>
</template>

<script>
  import SimSlideHeader from './SlideHeader'
  import SimSlideIntro from './SlideIntro'
  import SimTimePicker from './TimePicker'

  export default {
    name: 'sim-slide-with-a-timepicker',
    components: {
      SimSlideHeader,
      SimSlideIntro,
      SimTimePicker,
    },
    props: ['content'],
    data() {
      return {
        blocks: [],
        start_time: this.content.start_time,
        end_time: this.content.end_time,
        date: this.$store.state.activeDate.date,
        title: this.content.title,
        subtitle: this.content.subtitle,
        intro: this.content.intro,
        items: this.content.items,
        nextSlide: this.$store.state.slideDeck.slideTemplates.event_form,
      }
    },
    watcher: {
      timeBlock(newBlock) {
        if (newBlock !== null) {
          this.nextSlide.title = this.title
          this.nextSlide.start_time = this.start_time
          this.nextSlide.end_time = this.end_time

          const nextSlide = this.nextSlide

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
