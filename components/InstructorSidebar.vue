<template>
  <aside class="sim-calendar--aside sim-calendar--day-control-panel">
    <div class="sim-calendar--aside--header">
      <b>My Availability</b>
    </div>
    <div class="sim-calendar--aside--body">
      <SimTimePicker
        :userAvailabilities="userAvailabilities"
        :selectedDate="selectedDate"
        @updateAvailabilities="updateAvailabilities"
        @loadPreviousDay="$emit('loadPreviousDay')"
        @loadNextDay="$emit('loadNextDay')"
      />
    </div>
  </aside>
</template>

<script>
  import SimTimePicker from './TimePicker'

  export default {
    components: {
      SimTimePicker
    },
    props: {
      userAvailabilities: Array,
      selectedDate: Object,
    },
    methods: {
      updateAvailabilities(date, availabilities){
        this.$emit('updateAvailabilities', date, availabilities)
      }
    }
  }
</script>
