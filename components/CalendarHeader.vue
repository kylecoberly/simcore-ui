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
    <div class="sim-calendar--header--mode" v-if="canScheduleEvents">
      <SimSwitch :value="context" @change="toggleContext" left-label="My Availability" right-label="Schedule Events"/>
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
      SimSwitch
    },
    data(){
      return {
        context: false,
      }
    },
    props: {
      selectedDate: {
        type: Object,
        required: true,
      },
      today: Object,
      canScheduleEvents: Boolean,
    },
    computed: {
      displayDate(){
        return this.selectedDate.format('MMMM YYYY')
      }
    },
    methods: {
      toggleContext(){
        this.context = !this.context
        this.$emit('toggleContext')
      },
      loadNextMonth() {
        const date = this.selectedDate.add(1, 'month')
        this.$emit('setSelectedDate', date)
      },
      loadPreviousMonth() {
        const date = this.selectedDate.subtract(1, 'month')
        this.$emit('setSelectedDate', date)
      },
      loadNextDay() {
        const date = this.selectedDate.add(1, 'day')
        this.$emit('setSelectedDate', date)
      },
      loadPreviousDay() {
        const date = this.selectedDate.subtract(1, 'day')
        this.$emit('setSelectedDate', date)
      },
      loadToday() {
        this.$emit('setSelectedDate', this.today)
      },
    },
  }
</script>
