<template lang="html">
  <div class="sim-calendar-day" @mousedown="emitDayClick">
    <div v-if="isMonthView" class="sim-calendar--grid--date">{{ showDayNumber(day) }}</div>
    <!-- <ul v-if="isWeekView" class="sim-calendar--grid--day--timelines">
      <li v-for="hour in 25" @click="emitHourClick(day, hour-1)" :class="setHourClasses(hour-1)"></li>
    </ul> -->

    <slot name="day" :day="day" :mode="displayMode"></slot>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'sim-calendar-day',
    components: {
    },
    props: ['day', 'displayMode'],
    data () {
      return {
        dateFormat: 'YYYY-MM-DD',
        weekendDays: [0,6],
      }
    },
    computed: {
      isMonthView () {
        return (this.displayMode === 'month')
      },
      isWeekView () {
        return (this.displayMode === 'week')
      },
    },
    mounted () {
    },
    methods: {
      emitDayClick () {
        this.$emit('calendar-day-selected', this.day)
      },
      showDayNumber (date) {
        date = date.split('-')
        return parseInt(date[2])
      },
    },
  }
</script>

<style lang="scss">
  // @import '../styles/calendar';
</style>
