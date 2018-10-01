<template lang="html">
  <article>
    <h2>{{ title }}</h2>

    <demobox>
      <template slot="intro">
        Normal / Default
      </template>
      <template slot="view">

        <Calendar
          :user="currentUser"
          :lookups="lookups"
          :totalAvailabilities="totalAvailabilities"
          @updateAvailabilities="updateAvailabilities"
          @submitEvent="submitEvent"
        />

      </template>
      <template slot="html">
        <pre v-highlightjs><code class="html"></code></pre>
      </template>
      <template slot="js">
        <pre><code class="javascript"></code></pre>
      </template>
    </demobox>

  </article>
</template>

<script>
  import { normalize } from '../../../utilities/filter-availabilities'
  import Demobox from '../../utility/Demobox'
  import Calendar from '../../../components/Calendar'

  export default {
    name: 'calendar-doc',
    components: {
      Demobox,
      Calendar,
    },
    data() {
      return {
        title: 'Calendar',
      }
    },
    created() {
      [
        'users',
        'equipment',
        'rooms',
        'scenarios',
        'departments',
      ].forEach(action => this.$store.dispatch('fetchList', action));
      [
        'fetchCurrentUserAvailabilities',
        'fetchInstructorAvailabilities',
      ].forEach(action => this.$store.dispatch(action));
    },
    computed: {
      lookups() {
        return {
          instructors: this.$store.getters.instructors,
          learners: this.$store.getters.instructors,
          equipment: this.$store.getters.list({ list: 'equipment', value: 'name' }),
          rooms: this.$store.getters.list({ list: 'rooms', value: 'name' }),
          scenarios: this.$store.getters.list({ list: 'scenarios', value: 'name' }),
          departments: this.$store.getters.list({ list: 'departments', value: 'name' }),
        }
      },
      currentUser() {
        return this.$store.state.currentUser
      },
      events() {
        return this.$store.state.events
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
      submitEvent(event) {
        this.$store.dispatch('submitEvent', event)
      },
    },
  }
</script>
