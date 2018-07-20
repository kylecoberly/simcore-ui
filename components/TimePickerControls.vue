<template>
  <div class="sim-timepicker--controls">
    <div class="sim-timepicker--prev-day" @click="$emit('loadPreviousDay')">
      <SimIconText icon="fa-arrow-circle-left fa-lg"></SimIconText>
    </div>
    <div class="sim-timepicker--display-date">
      <span>{{ displayDate }} <br /><b>{{ displayTotalTimeBlockHours }}</b></span>
      <span v-if="countTimeBlockHours > 0" class="sim-timepicker--remove-blocks" @click="$emit('removeAllTimeBlocks')">
        <SimIconText icon="#icon--control--x" icon-type="svg"></SimIconText>
      </span>
    </div>
    <div class="sim-timepicker--next-day" @click="$emit('loadNextDay')">
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
      selectedDate: Object,
      userAvailabilities: Array,
    },
    computed: {
      displayDate() {
        return this.selectedDate.format('dddd, MMM D')
      },
      countTimeBlockHours() {
        return this.userAvailabilities
          .map(block => block.duration)
          .reduce((sum, value) => sum + value, 0)
      },
      displayTotalTimeBlockHours() {
        const hourCount = this.countTimeBlockHours.toString()
          .replace(/\.5/, '½')
          .replace(/^0/, '') || 0

        return `${hourCount} ${this.countTimeBlockHours > 1 ? 'hours' : 'hour'}`
      },
    }
}
</script>
