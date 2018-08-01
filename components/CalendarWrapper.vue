<template>
  <Calendar
    :isLoading="false"
    :today="today"
    :selectedDate="selectedDate"
    :user="user"
    :instructors="instructors"
    :totalAvailabilities="totalAvailabilities"
    @setSelectedDate="setSelectedDate"
    @updateAvailabilities="updateAvailabilities"
  />
</template>

<script>
import availabilities from '../test/e2e/fixtures/availabilities'
import instructors from '../test/e2e/fixtures/purview_users'
import purviewAvailabilities from '../test/e2e/fixtures/purview_availabilities'

import {normalize} from '../utilities/filter-availabilities'

import Calendar from './Calendar'

import _ from 'lodash'
import moment from 'moment'

function totalAvailabilities(){
  return normalize(purviewAvailabilities.users)
}

export default {
  components: {
    Calendar
  },
  data() {
    return {
      filterEventLength: 1,
      activeInstructors: [],
      inactiveInstructors: [],
      activeInstructorIds: [],

      today: moment('2018-07-13'),
      selectedDate: moment('2018-07-13'),
      user: {
        canScheduleEvents: true,
        availabilitiesForCurrentMonth: availabilities.dates,
      },
      instructors: instructors.list,
      totalAvailabilities: totalAvailabilities(),
    }
  },
  methods: {
    updateAvailabilities(date, availabilities) {
      this.$set(this.user.availabilitiesForCurrentMonth, date.format('YYYY-MM-DD'), availabilities)
    },
    setSelectedDate(date) {
      this.selectedDate = moment(date)
    },
    filterInstructorAvailabilityBlocks(filter) {
      return this.$store.dispatch('filterInstructorAvailabilityBlocks', filter)
    },
    setCalendarExpandWeek(status) {
      this.showExpandedWeek = !this.showExpandedWeek
      return this.$store.commit('setCalendarExpandWeek', status)
    },
    setDate(date){
      this.selectedDate = date
    },
  },
}
</script>
