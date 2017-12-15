<template lang="html">
  <article class="sim-slide-presenter" :style="`--step: ${currentStep}`">
    <section v-if="slideDeck" class="sim-slide-presenter--slides">
      <component class="sim-slide-presenter--slide"
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
  import SimSlideWithAnEventForm from './SlideWithAnEventForm'
  import SimSlideWithATimePicker from './SlideWithATimePicker'
  import SimSlideWithHTML from './SlideWithHTML'

  export default {
    name: 'sim-slide-presenter',
    components: {
      SimSlide,
      SimSlideWithAList,
      SimSlideWithAnEventForm,
      SimSlideWithATimePicker,
      SimSlideWithHTML,
    },
    props: ['shouldHideNavigationControls'],
    data() {
      return {
        slideDeck: this.$store.state.slideDeck,
        nextControl: { slide: null },
        theNextControlShouldBeDisabled: this.makeTheNextControlDisabledIf,
        thePreviousControlShouldBeDisabled: this.makeThePreviousControlDisabledIf,
      }
    },
    computed: {
      slides() {
        return this.slideDeck.slideHistory.slides
      },
      showNavigationControls() {
        let willShowNavigationControls = true

        if (this.shouldHideNavigationControls || this.slideDeck.slideHistory.size < 1) {
          willShowNavigationControls = false
        }

        return willShowNavigationControls
      },
      currentStep() {
        this.makeTheNextControlDisabledIf()
        this.makeThePreviousControlDisabledIf()

        return this.slideDeck.slideHistory.size - 1
      },
    },
    destroyed() {
      this.$store.commit('resetHistory')
    },
    methods: {
      makeTheNextControlDisabledIf() {
        let conditionsHaveBeenMet = false

        if (this.slideDeck.slideHistory.size === this.slideDeck.size) {
          conditionsHaveBeenMet = true
        } else if (this.nextControl.slide === null) {
          conditionsHaveBeenMet = true
        }

        this.theNextControlShouldBeDisabled = conditionsHaveBeenMet
      },
      makeThePreviousControlDisabledIf(conditionsAreMet) {
        let conditionsHaveBeenMet = false

        if (conditionsAreMet === null || conditionsAreMet === undefined) {
          if (this.slideDeck.slideHistory.size === 1) {
            conditionsHaveBeenMet = true
          }
        } else {
          conditionsHaveBeenMet = conditionsAreMet
        }

        this.thePreviousControlShouldBeDisabled = conditionsHaveBeenMet
      },
      previousSlide() {
        this.$store.commit('navigateToThePreviousSlide')
      },
      nextSlide() {
        if (this.nextControl.slide) {
          this.$store.commit(
            'addASlide',
            this.nextControl.slide,
          )
        }
      },
      receiveTheUpdateFromTheSlide(update) {
        if (update.nextSlide || update.nextSlide === null) {
          this.nextControl.slide = update.nextSlide
        }
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/slide-presenter';
  @import '../styles/slide';
</style>
