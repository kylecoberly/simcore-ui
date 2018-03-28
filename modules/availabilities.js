import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'

import filter from '../data/availabilities/index'
import * as cleansers from '../data/availabilities/cleansers'

const endpoint = 'users'
const action = 'purview_availabilities'

function filterData(commit, state, filtersToApply) {
  const onlySpecificInstructorIds = _.filter(
    filtersToApply.specificInstructorIds,
    (instructorId) => { return instructorId !== undefined },
  )

  const totalCount = filtersToApply.specificInstructorIds.length

  const filteredBlocks = filter(
      state.instructorsWithAvailabilityBlocks,
      state.allInstructorAvailabilityBlocks,
    {
      eventLength: filtersToApply.eventLength,
      instructorSlots: {
        totalCount,
        specificInstructorIds: onlySpecificInstructorIds,
      },
    },
  )

  commit('setAvailabilityInstructors', {
    totalCount,
    specific: onlySpecificInstructorIds,
    nonspecific: [],
  })

  commit(
    'setFilteredBlocks',
    { date: moment(), blocks: filteredBlocks },
  )

  commit('setIsLoading', false)
}

const availabilities = {
  state: {
    availabilityInstructors: {
      totalCount: 0,
      specific: [],
      nonspecific: [],
    },
    isLoading: false,
    last_updated: null,
    instructorFilterSlots: {},
    // {
    //    1: 203,
    //    2: null.
    //    3: ...

    instructorsWithAvailabilityBlocks: {},
    // 203: [
    //  { 2020-10-10: { start: 5, duration: 3 } },
    //  { 2020-10-10: { start: 12, duration: .5 } },
    //  ...
    // ],
    // ...

    allInstructorAvailabilityBlocks: {},
    // {
    //  2020-10-10: {
    //    duration: 8,n
    //    endSegment: 21,
    //    endTime: 10.5,
    //    numberOfSegments: 16,
    //    startSegment: 5,
    //    startTime: 2.5,
    //    uniqueInstructorIds: ['203', '4112', '7475'],
    //    numberOfInstructors: 3,
    //    segments: {
    //      5: { start: 5, user_ids: [203, ...] },
    //      ...
    //  }
    // }},
    // ...

    allSegmentsForDates: {},
    // { 2020-10-10: { start: 5, user_ids: [203, ...] } },
    // ...

    filteredBlocks: {},
    specificBlocks: {},
  },
  mutations: {
    setAvailabilityInstructors(state, instructors) {
      state.availabilityInstructors = Object.assign({}, instructors)
    },
    setAllInstructorAvailabilityBlocks(state, availabilityBlocks) {
      state.allInstructorAvailabilityBlocks = Object.assign({}, availabilityBlocks)
    },
    setAllSegmentsFromInstructorAvailabilityBlocks(state, instructorAvailabilityBlocks) {
      const segments = cleansers.groupByDateAndStartTime(instructorAvailabilityBlocks)

      state.allSegmentsForDates = Object.assign({}, segments)
    },
    setFilteredBlocks(state, availabilityBlocks) {
      const date = availabilityBlocks.date

      if (state.last_updated !== date) {
        state.last_updated = date
      }

      state.filteredBlocks = availabilityBlocks.blocks

      state.last_updated = moment()
    },
    setInstructorsWithAvailabilityBlocks(state, availabilityBlocks) {
      state.instructorsWithAvailabilityBlocks = availabilityBlocks
    },
    setIsLoading(state, value) {
      state.isLoading = value
    },
  },
  actions: {
    filterInstructorAvailabilityBlocks({ commit, state }, filtersToApply) {
      if (_.size(state.instructorsWithAvailabilityBlocks) > 0) {
        filterData(commit, state, filtersToApply)
      }
    },
    getInstructorAvailabilitySegments({ commit, state }, { baseUrl, userId, startDate, endDate, mock, filtersToApply }) {
      commit('setIsLoading', true)
      axios.get(`${baseUrl}${endpoint}/${userId}/${action}?start_date=${startDate}&end_date=${endDate}&key_by=user_id&mock=${mock}`)
        .then((response) => {
          const allInstructorAvailabilityBlocks             = response.data.users
          const allSegmentsFromInstructorAvailabilityBlocks =
            cleansers.groupByDateAndStartTime(allInstructorAvailabilityBlocks)
          const allBlocksFromInstructorAvailabilitySegments =
            cleansers.groupByDate(
              allSegmentsFromInstructorAvailabilityBlocks,
            )

          commit('setInstructorsWithAvailabilityBlocks', response.data.users)

          // allSegmentsForDates
          commit('setAllSegmentsFromInstructorAvailabilityBlocks', response.data.users)

          // allInstructorAvailabilityBlocks
          commit(
            'setAllInstructorAvailabilityBlocks',
            allBlocksFromInstructorAvailabilitySegments,
          )

          filterData(commit, state, filtersToApply)
        })
    },
  },
  getters: {
    getLastUpdatedAggregateAvailabilityBlocks: (state) => () => {
      return state.last_updated
    },
  },
}

export default availabilities
