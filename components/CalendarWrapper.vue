<template>
  <Calendar
    :user="currentUser"
    :instructors="instructors"
    :totalAvailabilities="totalAvailabilities"
    @updateAvailabilities="updateAvailabilities"
  />
</template>

<script>
  import { normalize } from '../utilities/filter-availabilities'
  import Calendar from './Calendar'

  export default {
    components: {
      Calendar,
    },
    created() {
      this.$store.dispatch('fetchInstructorList')
      this.$store.dispatch('fetchCurrentUserAvailabilities')
      this.$store.dispatch('fetchInstructorAvailabilities')
    },
    computed: {
      currentUser() {
        return this.$store.state.currentUser
      },
      instructors() {
        return this.$store.getters.instructors
      },
      totalAvailabilities() {
        return normalize(this.$store.state.purviewAvailabilities)
      },
    },
    methods: {
      updateAvailabilities(date, availabilities) {
        this.$store.dispatch('updateCurrentUserAvailabilities', {
          date: date.format('YYYY-MM-DD'),
          availabilities,
        })
      },
    },
  }
</script>
