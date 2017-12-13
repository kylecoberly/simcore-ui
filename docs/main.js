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

Vue.config.productionTip = false

// helpers
Vue.use(Vuex)
Vue.use(VueHighlightJS)

const store = new Vuex.Store({
  modules: {
    activeDate,
    availabilities,
    calendar,
    events,
    bubble,
    slideDeck,
    users: [
      { id: 1, firstname: 'Chevy', lastname: 'Knee' },
      { id: 2, firstname: 'Penny', lastname: 'Chumley' },
      { id: 3, firstname: 'Lonee', lastname: 'Banasevich' },
      { id: 4, firstname: 'Phylys', lastname: 'Hewins' },
      { id: 5, firstname: 'Prescott', lastname: 'Clipston' },
      { id: 6, firstname: 'Rab', lastname: 'Le Pine' },
      { id: 7, firstname: 'Sansone', lastname: 'Peetermann' },
      { id: 8, firstname: 'Thedrick', lastname: 'Glassford' },
      { id: 9, firstname: 'Eadie', lastname: 'Ravel' },
      { id: 10, firstname: 'Allistir', lastname: 'Stride' },
      { id: 11, firstname: 'Brit', lastname: 'Boyen' },
      { id: 12, firstname: 'Alexio', lastname: 'O\'Cleary' },
      { id: 13, firstname: 'Eydie', lastname: 'Campany' },
      { id: 14, firstname: 'Alfie', lastname: 'Athy' },
      { id: 15, firstname: 'Red', lastname: 'Gwalter' },
      { id: 16, firstname: 'Linzy', lastname: 'Josifovitz' },
      { id: 17, firstname: 'Benjie', lastname: 'Niven' },
      { id: 18, firstname: 'Amata', lastname: 'Dilland' },
      { id: 19, firstname: 'Timmy', lastname: 'Lorrain' },
      { id: 20, firstname: 'Latrina', lastname: 'Cosley' },
      { id: 21, firstname: 'Issi', lastname: 'Udey' },
      { id: 22, firstname: 'Alden', lastname: 'Rooze' },
      { id: 23, firstname: 'Felecia', lastname: 'Dahlman' },
      { id: 24, firstname: 'Charleen', lastname: 'Cruikshank' },
      { id: 25, firstname: 'Sal', lastname: 'Mynett' },
    ],
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
