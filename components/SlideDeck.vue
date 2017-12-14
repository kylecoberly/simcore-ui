<template lang="html">
  <article class="sim-slide-deck" :style="`--step: ${currentStep}`">
    <section class="sim-slide-deck--slides">
      <component class="sim-slide-deck--slide"
        v-for="(slide, index) in slides"
        :key="index"
        :data="slide"
        :is="slide.componentType"
        />
    </section>
    <footer v-if="showNavigationControls">
      <button class="cancel back" @click="previousSlide" :disabled="currentStep == 0">back</button>
      <button class="primary next" @click="nextSlide" :disabled="currentStep == maxSlides">Next</button>
    </footer>
  </article>
</template>

<script>
  import SimSlide from './Slide'
  import SimSlideWithAList from './SlideWithAList'
  import SimSlideWithATimePicker from './SlideWithATimePicker'
  import SimSlideWithHTML from './SlideWithHTML'

  export default {
    name: 'sim-slide-deck',
    components: {
      SimSlide,
      SimSlideWithAList,
      SimSlideWithATimePicker,
      SimSlideWithHTML,
    },
    props: ['slides', 'shouldHideNavigationControls'],
    computed: {
      showNavigationControls() {
        let willShowNavigationControls = true

        if (this.shouldHideNavigationControls || this.slides.length <= 1) {
          willShowNavigationControls = false
        }

        return willShowNavigationControls
      },
      currentStep() {
        return this.$store.state.slideDeck.currentSlideIndex
      },
      maxSlides() {
        return this.slides.length - 1
      },
    },
    mounted() {
      this.$store.commit('updateCurrentSlideIndex', 0)
    },
    destroyed() {
      this.$store.commit('updateCurrentSlideIndex', 0)
    },
    methods: {
      previousSlide() {
        this.$store.commit('prevSlideIndex')
      },
      nextSlide() {
        this.$store.commit('nextSlideIndex')
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/slide-deck';
</style>
