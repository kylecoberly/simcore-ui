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
        @loadPreviousDay="loadPreviousDay"
        @loadNextDay="loadNextDay"
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
      },
      loadNextDay() {
        const date = this.selectedDate.add(1, 'day')
        this.$emit('setSelectedDate', date)
      },
      loadPreviousDay() {
        const date = this.selectedDate.subtract(1, 'day')
        this.$emit('setSelectedDate', date)
      },
    }
  }
</script>
