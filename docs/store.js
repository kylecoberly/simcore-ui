import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import axios from 'axios'

import { getBoundariesOfMonth } from '../utilities/date'

import services from '../modules/services'

import purviewAvailabilities from '../test/e2e/fixtures/purview_availabilities.json'
import instructors from '../test/e2e/fixtures/purview_users.json'
import availabilities from '../test/e2e/fixtures/availabilities.json'

const baseUrl = 'https://dev.simcoretech.com/api/v1'

function buildAvailabilitiesUrl(userId, { startDate, endDate }) {
  return `${baseUrl}/users/${userId}/availabilities?state_date=${startDate}&end_date=${endDate}`
}

function buildPurviewUsersUrl(userId) {
  return `${baseUrl}/users/${userId}/purview_users?scope=canInstruct`
}

function buildPurviewAvailabilitiesUrl(userId, { startDate, endDate }) {
  return `${baseUrl}/users/${userId}/purview_availabilities?start_date=${startDate}&end_date=${endDate}&key_by=user_id&mock=true`
}

function buildUpdateAvailabilitiesUrl(userId) {
  return `${baseUrl}/users/${userId}/availabilities`
}

const store = new Vuex.Store({
  state: {
    currentUser: {
      id: 912,
      availabilities: {},
    },
    purviewAvailabilities: {},
    instructors: [],
  },
  getters: {
    instructors(state) {
      return state.instructors.map(instructor => {
        instructor.label = `${instructor.lastname}, ${instructor.firstname}`
        return instructor
      })
    }
  },
  mutations: {
    updateCurrentUserAvailabilitiesByDate(state, {date, availabilities}) {
      Vue.set(state.currentUser.availabilities, date, availabilities)
    },
    updateCurrentUserAvailabilities(state, availabilities) {
      state.currentUser.availabilities = availabilities
    },
    updateInstructors(state, instructors) {
      state.instructors = instructors
    },
    updateInstructorAvailabilities(state, availabilities) {
      state.purviewAvailabilities = availabilities
    },
  },
  actions: {
    async updateCurrentUserAvailabilities({dispatch, state, commit}, {date, availabilities}) {
      const url = buildUpdateAvailabilitiesUrl(state.currentUser.id)
      const payload = {
        dates: {}
      }
      payload.dates[date] = availabilities
      commit('updateCurrentUserAvailabilitiesByDate', {date, availabilities})
      dispatch('services/loading/pushLoading')
      await axios.post(url, payload).catch(error => console.error(error.message))
      dispatch('services/loading/popLoading')
    },
    async fetchCurrentUserAvailabilities({dispatch, state, commit}) {
      const {startDate, endDate} = getBoundariesOfMonth(state.services.date.selectedDate)
      const url = buildAvailabilitiesUrl(state.currentUser.id, {startDate, endDate})
      dispatch('services/loading/pushLoading')
      let availabilities = await axios.get(url).then(response => response.data.dates)
      dispatch('services/loading/popLoading')
      if (availabilities instanceof Array){
        availabilities = {}
      }
      return commit('updateCurrentUserAvailabilities', availabilities)
    },
    async fetchInstructorAvailabilities({dispatch, state, commit}) {
      const {startDate, endDate} = getBoundariesOfMonth(state.services.date.selectedDate)
      const url = buildPurviewAvailabilitiesUrl(state.currentUser.id, {startDate, endDate})
      dispatch('services/loading/pushLoading')
      const availabilities = await axios.get(url).then(response => response.data.users)
      dispatch('services/loading/popLoading')
      return commit('updateInstructorAvailabilities', availabilities)
    },
    async fetchInstructorList({dispatch, state, commit}) {
      const url = buildPurviewUsersUrl(state.currentUser.id)
      dispatch('services/loading/pushLoading')
      const instructors = await axios.get(url).then(response => response.data.users.list)
      dispatch('services/loading/popLoading')
      return commit('updateInstructors', instructors)
    },
    async createEvent({commit}, pendingEvent) {
    },
  },
  modules: {
    services,
  },
})

export default store
