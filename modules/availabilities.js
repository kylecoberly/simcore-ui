import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'

import * as filters from '../data/filters'
import availabilityFilters from '../external/availabilities'

const endpoint = 'users'
const action = 'purview_availabilities'

const availabilities = {
  state: {
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
    //    duration: 8,
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
    setAllInstructorAvailabilityBlocks(state, availabilityBlocks) {
      state.allInstructorAvailabilityBlocks = Object.assign({}, availabilityBlocks)
    },
    setAllSegmentsFromInstructorAvailabilityBlocks(state, instructorAvailabilityBlocks) {
      const segments = availabilityFilters
        .groupInstructorAvailabilitiesKeyedByDateAndStartTime(instructorAvailabilityBlocks)

      state.allSegmentsForDates = Object.assign({}, segments)
    },
    setAggregateAvailabilityBlocks(state, availabilityBlocks) {
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
  },
  actions: {
    getInstructorAvailabilitySegments({ commit }, { baseUrl, userId, startDate, endDate }) {
      axios.get(`${baseUrl}${endpoint}/${userId}/${action}?start_date=${startDate}&end_date=${endDate}&key_by=user_id`)
        .then((response) => {
          const allInstructorAvailabilityBlocks             = response.data.users
          const allSegmentsFromInstructorAvailabilityBlocks = availabilityFilters
            .groupInstructorAvailabilitiesKeyedByDateAndStartTime(allInstructorAvailabilityBlocks)
          const allBlocksFromInstructorAvailabilitySegments =
            filters.groupAllInstructorAvailabilityBlocksByDate(
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

          // filteredBlocks -- This is what the current calendar is looking for to render blocks.
          const specificInstructorIds = []
          const filteredBlocks = availabilityFilters
            .filterInstructorAvailabilityBlocks(
              response.data.users,
              allBlocksFromInstructorAvailabilitySegments,
            {
              eventLength: 0.5,
              instructorSlots: {
                totalCount: specificInstructorIds.length + 2,
                specificInstructorIds,
              },
            },
            )
          commit(
            'setAggregateAvailabilityBlocks',
            { date: moment(), blocks: filteredBlocks },
          )
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
