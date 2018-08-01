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


export default {
  components: {
    Calendar
  },
  data() {
    return {
      today: moment('2018-07-13'),
      selectedDate: moment('2018-07-13'),
      user: {
        canScheduleEvents: true,
        availabilitiesForCurrentMonth: availabilities.dates,
      },
      instructors: instructors.list,
      totalAvailabilities: normalize(purviewAvailabilities.users),
    }
  },
  methods: {
    updateAvailabilities(date, availabilities) {
      this.$set(this.user.availabilitiesForCurrentMonth, date.format('YYYY-MM-DD'), availabilities)
    },
    setSelectedDate(date) {
      this.selectedDate = moment(date)
    },
  },
}
</script>
