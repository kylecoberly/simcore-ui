<template>
  <div class="sim-timepicker--controls">
    <div class="sim-timepicker--prev-day" @click="loadPreviousDay">
      <SimIconText icon="fa-arrow-circle-left fa-lg"></SimIconText>
    </div>
    <div class="sim-timepicker--display-date">
      <span>{{ displayDate }} <br /><b>{{ displayTotalTimeBlockHours }}</b></span>
      <span v-if="countTimeBlockHours > 0" class="sim-timepicker--remove-blocks" @click="$emit('removeAllTimeBlocks')">
        <SimIconText icon="#icon--control--x" icon-type="svg"></SimIconText>
      </span>
    </div>
    <div class="sim-timepicker--next-day" @click="loadNextDay">
      <SimIconText icon="fa-arrow-circle-right fa-lg"></SimIconText>
    </div>
  </div>
</template>

<script>
  import SimIconText from './IconText'

  export default {
    components: {
      SimIconText,
    },
    props: {
      availabilities: Array,
    },
    computed: {
      dateService(){
        return this.$store.state.services.date
      },
      selectedDate(){
        return this.dateService.selectedDate
      },
      displayDate() {
        return this.selectedDate.format('dddd, MMM D')
      },
      countTimeBlockHours() {
        return this.availabilities
          .map(block => block.duration)
          .reduce((sum, value) => sum + value, 0)
      },
      displayTotalTimeBlockHours() {
        const hourCount = this.countTimeBlockHours.toString()
          .replace(/\.5/, '½')
          .replace(/^0/, '') || 0

        return `${hourCount} ${this.countTimeBlockHours > 1 ? 'hours' : 'hour'}`
      },
    },
    methods: {
      loadNextDay() {
        const date = this.selectedDate.add(1, 'day')
        this.$store.dispatch('services/date/setDate', date)
      },
      loadPreviousDay() {
        const date = this.selectedDate.subtract(1, 'day')
        this.$store.dispatch('services/date/setDate', date)
      },
    }
}
</script>
