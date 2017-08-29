<template lang="html">
    <transition name="sim-modal">
        <div class="sim-modal" :class="{active: shouldBeOpen}">
            <div class="sim-modal__mask" v-if="shouldShowMask" @click="clickMask"></div>
            <div class="sim-modal__wrapper">
                <slot name="header"></slot>
                <slot name="content"></slot>
                <slot name="footer"></slot>
                <div class="sim-modal__dismiss" v-if="shouldShowDismiss" @click="dismiss">&times;</div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'sim-modal',
    props: {
        shouldBeOpen: {
            type: Boolean,
            default: false,
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
            this.$emit('toggle')
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
