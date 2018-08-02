// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'

import VueHighlightJS from 'vue-highlightjs'

import App from './App'
import router from './router'
import common from './mixins'

import services from '../modules/services'

import availabilitiesStub from '../test/e2e/fixtures/availabilities.json'

Vue.config.productionTip = false

// helpers
Vue.use(Vuex)
Vue.use(VueHighlightJS)

/*
Endpoints:
My Availabilities:
GET https://dev.simcoretech.com/api/v1/users/912/availabilities?start_date=2018-07-01&end_date=2018-07-31&mock=true,
POST https://dev.simcoretech.com/api/v1/users/912/availabilities
{
  dates: {
    [availabilities.date]: availabilities.blocks
  }
}
Purview Availabilities:
GET https://dev.simcoretech.com/api/v1/users/912/purview_availabilities?start_date=2018-07-01&end_date=2018-07-31&key_by=user_id&mock=true,
Purview Users Instructors:
GET https://dev.simcoretech.com/api/v1/users/912/purview_users?scope=canInstruct
*/
const store = new Vuex.Store({
  state: {
    shouldBeAbleToScheduleEvents: true,
    currentUser: { id: 912 },
    base_url: 'https://dev.simcoretech.com/api/v1/',
    mock: true,
  },
  modules: {
    services,
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
