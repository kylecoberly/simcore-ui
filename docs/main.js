// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'

import VueHighlightJS from 'vue-highlightjs'

import App from './App'
import router from './router'
import common from './mixins'

import activeDate from '../modules/activeDate'
import availabilities from '../modules/availabilities'
import calendar from '../modules/calendar'
import bubble from '../modules/bubble'
import events from '../modules/events'
import slideDeck from '../modules/slideDeck'
import user from '../modules/user'
import users from '../modules/users'

import BubbleTrigger from '../directives/BubbleTrigger'

Vue.directive('bubble-trigger', BubbleTrigger)

Vue.config.productionTip = false

// helpers
Vue.use(Vuex)
Vue.use(VueHighlightJS)

const store = new Vuex.Store({
  state: {
    shouldBeAbleToScheduleEvents: true,
    currentUser: { id: 912 },
    base_url: 'https://dev.simcoretech.com/api/v1/',
    mock: true,
  },
  modules: {
    activeDate,
    availabilities,
    calendar,
    events,
    bubble,
    slideDeck,
    user,
    users,
  },
})

/* eslint-disable no-new, import/prefer-default-export */
new Vue({
  el: '#app',
  router,
  mixins: [common],
  template: '<App/>',
  components: { App },
  store,
  methods: {
    toggleOverlay(callback) {
      this.$emit('toggle-overlay', callback)
    },
    openOverlay(callback) {
      this.$emit('open-overlay', callback)
    },
    closeOverlay(callback) {
      this.$emit('close-overlay', callback)
    },
    togglePanel(callback) {
      this.$emit('toggle-panel', callback)
    },
    openPanel(callback) {
      this.$emit('open-panel', callback)
    },
    closePanel(callback) {
      this.$emit('close-panel', callback)
    },
    toggleModal(callback) {
      this.$emit('toggle-modal', callback)
    },
    openModal(callback) {
      this.$emit('open-modal', callback)
    },
    closeModal(callback) {
      this.$emit('close-modal', callback)
    },
    closeBubble(callback) {
      this.$emit('close-bubble', callback)
    },
  },
})
