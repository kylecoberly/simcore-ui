<template lang="html">
  <article class="sim-slide-deck" :style="`--step: ${currentStep}`">
    <section class="sim-slide-deck--slides">
      <component class="sim-slide-deck--slide"
        v-for="(slide, index) in slides"
        :key="index"
        :data="slide"
        :is="slide.componentType"
        @theSlideHasAnUpdate="receiveTheUpdateFromTheSlide"
        />
    </section>
    <footer v-if="showNavigationControls">
      <button class="cancel back" @click="previousSlide" :disabled="thePreviousControlShouldBeDisabled">Back</button>
      <button class="primary next" @click="nextSlide" :disabled="theNextControlShouldBeDisabled">Next</button>
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
    data() {
      return {
        theNextControlShouldBeDisabled: this.makeTheNextControlDisabledIf,
        thePreviousControlShouldBeDisabled: this.makeThePreviousControlDisabledIf,
      }
    },
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
    },
    mounted() {
      this.$store.commit('updateCurrentSlideIndex', 0)
    },
    destroyed() {
      this.$store.commit('updateCurrentSlideIndex', 0)
    },
    methods: {
      makeTheNextControlDisabledIf(conditionsAreMet) {
        console.log('are met', conditionsAreMet)
        let conditionsHaveBeenMet = false

        if (conditionsAreMet === null) {
          if (this.$store.state.slideDeck.currentSlideIndex === this.slides.length - 1) {
            conditionsHaveBeenMet = true
          } else {
            conditionsHaveBeenMet = false
          }
        } else {
          conditionsHaveBeenMet = conditionsAreMet
        }

        this.theNextControlShouldBeDisabled = conditionsHaveBeenMet
      },
      makeThePreviousControlDisabledIf(conditionsAreMet) {
        let conditionsHaveBeenMet = false

        if (conditionsAreMet === null) {
          if (this.$store.state.slideDeck.currentSlideIndex === 0) {
            conditionsHaveBeenMet = true
          } else {
            conditionsHaveBeenMet = false
          }
        } else {
          conditionsHaveBeenMet = conditionsAreMet
        }

        this.thePreviousControlShouldBeDisabled = conditionsHaveBeenMet
      },
      previousSlide() {
        this.$store.commit('prevSlideIndex')
      },
      nextSlide() {
        this.$store.commit('nextSlideIndex')
      },
      receiveTheUpdateFromTheSlide(update) {
        console.log(update.wantsToDisableTheNavigationControls)
        if (update.wantsToDisableTheNavigationControls) {
          if (update.wantsToDisableTheNavigationControls.hasOwnProperty('next')) {
            this.makeTheNextControlDisabledIf(update.wantsToDisableTheNavigationControls.next)
          }

          if (update.wantsToDisableTheNavigationControls.hasOwnProperty('previous')) {
            this.makeThePreviousControlDisabledIf(update.wantsToDisableTheNavigationControls.previous)
          }
        }
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/slide-deck';
</style>
