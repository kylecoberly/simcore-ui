<template lang="html">
  <div class="sim-slide sim-slide--with-form">

    <SimSlideHeader :title="content.title" :subtitle="content.subtitle" />

    <SimSlideIntro :content="content.intro" />

    <div class="sim-slide--content">

      <div class="filter-molecule">
        <p>
          <label>
            <b>Event title</b>
            <br /><br />
            <input type="text" placeholder="..." />
          </label>
        </p>
      </div>

      <div class="filter-molecule">
        <p>
          <label>
            <b>Description</b>
            <br /><br />
            <textarea placeholder="..."></textarea>
          </label>
        </p>
      </div>

      <div class="filter-molecule">
        <p>
          <label>
            <b>Notes</b>
            <br /><br />
            <textarea placeholder="..."></textarea>
          </label>
        </p>
      </div>

      <div class="filter-molecule">
        <p>
          <label>
            <b>Department</b>
            <br /><br />
            <textarea placeholder="..."></textarea>
          </label>
        </p>
      </div>


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
    props: ['content'],
    watcher: {
      timeBlock(newBlock) {
        if (newBlock !== null) {
          const nextSlide = this.$store.state.slideDeck.slideTemplates.event_form
          nextSlide.title = this.content.title
          nextSlide.start_time = this.content.content.start_time
          nextSlide.end_time = this.content.content.end_time

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
