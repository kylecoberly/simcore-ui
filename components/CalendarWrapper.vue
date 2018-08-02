<template>
  <Calendar
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

export default {
  components: {
    Calendar
  },
  data() {
    return {
      user: {
        availabilitiesForCurrentMonth: availabilities.dates,
      },
      instructors: instructors.users.list.map(instructor => {
        instructor.label = `${instructor.lastname}, ${instructor.firstname}`
        return instructor
      }),
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
