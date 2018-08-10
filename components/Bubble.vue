<template>
  <transition name="sim-bubble" appear>
    <div :class="`sim-bubble sim-bubble--${position.orientation}`">
      <div class="sim-bubble--content">
        <slot></slot>
      </div>
      <div class="sim-bubble--dismiss" @click="dismiss">
        <SimIconText icon="#icon--control--x" icon-type="svg"></SimIconText>
      </div>
    </div>
  </transition>
</template>

<script>
  import SimIconText from './IconText'

  export default {
    components: {
      SimIconText,
    },
    props: {
      target: Object,
      position: Object,
    },
    mounted() {
      this.setBubbleOpen(true)
    },
    destroyed() {
      this.setBubbleOpen(false)
    },
    computed: {
      metrics() {
        return this.$el.getBoundingClientRect()
      },
    },
    methods: {
      setBubbleOpen(value){
        this.$store.dispatch('services/bubble/setOpen', value)
      },
      dismiss() {
        this.$emit('dismiss')
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/bubble';
</style>
