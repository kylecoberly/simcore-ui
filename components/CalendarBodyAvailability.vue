<template>
  <CalendarBody>
    <CalendarDayAvailability v-for="(day, index) in daysInCurrentMonth"
      :key="index"
      slot="day"
      :day="day"
      :availabilities="getAvailabilitiesForDay(day)"
      :showExpandedWeek="showExpandedWeek"
      @updateAvailabilities="updateAvailabilities"
      @click.native="setDate(day)"
      @toggleExpandedWeek="toggleExpandedWeek"
    />
  </CalendarBody>
</template>

<script>
  import dayjs from 'dayjs'

  import CalendarDayAvailability from './CalendarDayAvailability'
  import CalendarBody from './CalendarBody'

  export default {
    components: {
      CalendarDayAvailability,
      CalendarBody,
    },
    props: {
      showExpandedWeek: Boolean,
      availabilities: {
        type: Object,
        default: () => ({}),
      },
    },
    computed: {
      dateService() {
        return this.$store.state.services.date
      },
      selectedDate() {
        return this.dateService.selectedDate
      },
      daysInCurrentMonth() {
        const daysInMonth = []
        let dayNumber
        const count = this.selectedDate.daysInMonth()
        for (dayNumber = 1; dayNumber <= count; dayNumber += 1) {
          let dayString = dayNumber.toString()
          if (dayNumber < 10) {
            dayString = `0${dayString}`
          }
          daysInMonth.push(dayString)
        }
        const currentMonthString = this.selectedDate.format('YYYY-MM-')
        return daysInMonth.map(day => dayjs(`${currentMonthString}${day}`))
      },
    },
    methods: {
      toggleExpandedWeek() {
        this.$emit('toggleExpandedWeek')
      },
      setDate(date) {
        this.$store.dispatch('services/date/setDate', date)
      },
      updateAvailabilities(date, availabilities) {
        this.$emit('updateAvailabilities', date, availabilities)
      },
      getAvailabilitiesForDay(date) {
        return this.availabilities[date.format('YYYY-MM-DD')] || []
      },
    },
  }
</script>

