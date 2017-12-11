<template lang="html">
  <article class="sim-slide-deck" :style="`--step: ${currentStep}`">
    <section class="sim-slide-deck--slides">
      <component class="sim-slide-deck--slide" v-for="slide in slides" :data="slide" :is="slide.componentType"></component>
    </section>
    <footer v-if="showNavigationControls">
      <button class="cancel back" @click="previousSlide" :disabled="currentStep == 0">back</button>
      <button class="primary next" @click="nextSlide" :disabled="currentStep == maxSlides">Next</button>
    </footer>
  </article>
</template>

<script>
import SimSlide from './Slide'
import SimSlideWithAHeader from './SlideWithAHeader'
import SimSlideWithAList from './SlideWithAList'

export default {
  name: 'sim-slide-deck',
  components: {
    SimSlide,
    SimSlideWithAHeader,
    SimSlideWithAList,
  },
  props: ['slides', 'shouldHideNavigationControls'],
  computed: {
    showNavigationControls() {
      let willShowNavigationControls = true

      if(this.shouldHideNavigationControls || this.slides.length <= 1) {
        willShowNavigationControls = false
      }

      return willShowNavigationControls
    },
    currentStep() {
      return this.$store.state.currentSlideIndex
    },
    maxSlides() {
      return this.slides.length - 1
    }
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
