<template>
  <aside class="sim-calendar--aside sim-calendar--day-control-panel">
    <div class="sim-calendar--aside--header">
      <b>My Availability</b>
    </div>
    <div class="sim-calendar--aside--body">
      <SimTimePicker
        :availabilities="availabilities"
        @updateAvailabilities="updateAvailabilities"
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
      availabilities: Array,
    },
    methods: {
      updateAvailabilities(date, availabilities){
        this.$emit('updateAvailabilities', date, availabilities)
      },
    }
  }
</script>
