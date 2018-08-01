<template>
  <Calendar
    :isLoading="false"
    :today="today"
    :user="user"
    :instructors="instructors"
    :totalAvailabilities="totalAvailabilities"
    @updateAvailabilities="updateAvailabilities"
  />
</template>

<script>
import availabilities from '../test/e2e/fixtures/availabilities'
import instructors from '../test/e2e/fixtures/purview_users'
import purviewAvailabilities from '../test/e2e/fixtures/purview_availabilities'

import {normalize} from '../utilities/filter-availabilities'

import Calendar from './Calendar'

import moment from 'moment'

export default {
  components: {
    Calendar
  },
  data() {
    return {
      today: moment('2018-07-13'),
      user: {
        canScheduleEvents: true,
        availabilitiesForCurrentMonth: availabilities.dates,
      },
      instructors: instructors.users.list,
      totalAvailabilities: normalize(purviewAvailabilities.users),
    }
  },
  methods: {
    updateAvailabilities(date, availabilities) {
      this.$set(this.user.availabilitiesForCurrentMonth, date.format('YYYY-MM-DD'), availabilities)
    }
  },
}
</script>
