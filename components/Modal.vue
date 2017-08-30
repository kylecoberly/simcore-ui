<template lang="html">
  <div class="sim-modal" :class="{active: shouldBeOpen}">
    <div class="sim-modal__mask" v-if="shouldShowMask" @click="clickMask"></div>
    <div class="sim-modal__wrapper">
      <slot></slot>
      <div class="sim-modal__dismiss" v-if="shouldShowDismiss" @click="dismiss">&times;</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sim-modal',
    props: {
      shouldBeOpen: {
        type: Boolean,
        default: false,
      },
      dismissTo: {
        type: String,
        default: '',
      },
      shouldShowDismiss: {
        type: Boolean,
        default: true,
      },
      shouldShowMask: {
        type: Boolean,
        default: true,
      },
      canClickMask: {
        type: Boolean,
        default: true,
      },
    },
    methods: {
      dismiss: function(){
        if (this.$router && this.dismissTo && typeof this.dismissTo === 'string') {
          this.$router.push(this.dismissTo)
        } else {
          this.$root.closeModal()
        }
      },
      clickMask: function(){
        if(this.canClickMask) {
          this.dismiss()
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/modal';
</style>
