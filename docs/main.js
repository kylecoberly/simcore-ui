// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueHighlightJS from 'vue-highlightjs'

import App from './App'
import router from './router'
import common from './mixins'

Vue.config.productionTip = false

// helpers
Vue.use(VueHighlightJS)

/* eslint-disable no-new, import/prefer-default-export */
// export const Events = new Vue({})

new Vue({
  el: '#app',
  router,
  mixins: [common],
  template: '<App/>',
  components: { App },
  methods: {
    toggleOverlay() {
      this.$emit('toggle-overlay')
    },
    openOverlay() {
      this.$emit('open-overlay')
    },
    closeOverlay() {
      this.$emit('close-overlay')
    },
    togglePanel() {
      this.$emit('toggle-panel')
    },
    openPanel() {
      this.$emit('open-panel')
    },
    closePanel() {
      this.$emit('close-panel')
    },
    toggleModal() {
      this.$emit('toggle-modal')
    },
    openModal() {
      this.$emit('open-modal')
    },
    closeModal() {
      this.$emit('close-modal')
    },
  },
})
