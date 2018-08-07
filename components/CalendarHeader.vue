<template>
  <div class="sim-calendar--header">
    <div class="sim-calendar--header--controls sim-calendar--header--controls--months">
      <span class="load-previous-month" @click="loadPreviousMonth">
        <SimIconText icon="fa-arrow-left fa-fw"></SimIconText>
      </span>
      <span class="current-month">
        {{ displayDate }}
      </span>
      <span class="load-next-month" @click="loadNextMonth">
        <SimIconText icon="fa-arrow-right fa-fw"></SimIconText>
      </span>
    </div>
    <div class="sim-calendar--header--mode" v-if="true">
      <SimSwitch :value="isCoordinator" @change="$emit('toggleContext')" left-label="My Availability" right-label="Schedule Events"/>
    </div>
    <div class="sim-calendar--header--controls sim-calendar--header--controls--days">
      <span class="load-previous-day" @click="loadPreviousDay">
        <SimIconText icon="fa-arrow-left fa-fw"></SimIconText>
      </span>
      <span class="load-today" @click="loadToday">
        today
      </span>
      <span class="load-next-day" @click="loadNextDay">
        <SimIconText icon="fa-arrow-right fa-fw"></SimIconText>
      </span>
    </div>
  </div>
</template>

<script>
  import SimIconText from './IconText'
  import SimSwitch from './Switch'

  export default {
    components: {
      SimIconText,
      SimSwitch,
    },
    props: {
      isCoordinator: Boolean,
    },
    computed: {
      dateService() {
        return this.$store.state.services.date
      },
      today() {
        return this.dateService.today
      },
      selectedDate() {
        return this.dateService.selectedDate
      },
      displayDate() {
        return this.selectedDate.format('MMMM YYYY')
      },
    },
    methods: {
      loadNextMonth() {
        const date = this.selectedDate.add(1, 'month')
        this.$store.dispatch('services/date/setDate', date)
      },
      loadPreviousMonth() {
        const date = this.selectedDate.subtract(1, 'month')
        this.$store.dispatch('services/date/setDate', date)
      },
      loadNextDay() {
        const date = this.selectedDate.add(1, 'day')
        this.$store.dispatch('services/date/setDate', date)
      },
      loadPreviousDay() {
        const date = this.selectedDate.subtract(1, 'day')
        this.$store.dispatch('services/date/setDate', date)
      },
      loadToday() {
        this.$store.dispatch('services/date/setDate', this.today)
      },
    },
  }
</script>
