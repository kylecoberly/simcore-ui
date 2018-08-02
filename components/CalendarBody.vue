<template>
  <main class="sim-calendar--main">
    <div class="sim-calendar--grid">
      <div class="sim-calendar--grid--header">
        <div v-for="dayName in dayNames" class="sim-calendar--grid--header--day">
          <span class="sim-calendar--grid--header--dayname">
            {{ dayName }}
          </span>
        </div>
      </div>
      <div class="sim-calendar--grid--body">
        <div class="sim-calendar--grid--days" @click.meta="toggleExpandedWeek">
          <div v-if="startOffset > 0" class="sim-calendar--grid--before" :style="{'--offset': startOffset}"></div>
          <CalendarDay v-for="(day, index) in daysInCurrentMonth"
             :key="index"
             :day="day"
             :availabilities="getAvailabilitiesForDay(day)"
             :showExpandedWeek="showExpandedWeek"
             @updateAvailabilities="updateAvailabilities"
             @click.native="setDate(day)"
             @toggleExpandedWeek="toggleExpandedWeek"
          />
          <div v-if="endOffset > 0" class="sim-calendar--grid--after"></div>
        </div>
        <div class="sim-loader--shield" v-if="isLoading">
          <SimLoader :is-loading="true"></SimLoader>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import moment from 'moment'

  import CalendarDay from './CalendarDay'
  import SimLoader from './Loader'

  export default {
    components: {
      CalendarDay,
      SimLoader,
    },
    data(){
      return {
        dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      }
    },
    props: {
      showExpandedWeek: Boolean,
      availabilities: {
        type: Object,
        default: () => ({}),
      },
    },
    computed: {
      dateService(){
        return this.$store.state.services.date
      },
      today(){
        return this.dateService.today
      },
      selectedDate(){
        return this.dateService.selectedDate
      },
      loadingService(){
        return this.$store.state.services.loading
      },
      isLoading(){
        return this.loadingService.isLoading
      },
      startOffset(){
        return moment(this.selectedDate).startOf('month').day()
      },
      endOffset(){
        return 6 - moment(this.selectedDate).endOf('month').day()
      },
      daysInCurrentMonth(){
        const daysInMonth = []
        for (let day = 1, count = this.selectedDate.daysInMonth(); day <= count; day++){
          let dayString = day.toString()
          if (day < 10) {
            dayString = `0${dayString}`
          }
          daysInMonth.push(dayString)
        }
        const currentMonthString = this.selectedDate.format('YYYY-MM-')
        return daysInMonth.map(day => moment(`${currentMonthString}${day}`))
      },
    },
    methods: {
      toggleExpandedWeek(){
        this.$emit('toggleExpandedWeek')
      },
      setDate(date){
        this.$store.dispatch('services/date/setDate', date)
      },
      updateAvailabilities(date, availabilities){
        this.$emit('updateAvailabilities', date, availabilities)
      },
      getAvailabilitiesForDay(date){
        return this.availabilities[date.format('YYYY-MM-DD')] || []
      },
      getStyles(position) {
        const top = this.$refs.bubble
          ? this.$refs.bubble.$el.getBoundingClientRect().top
          : 0
        const styles = []
        styles.push(`--x: ${parseInt(position.x, 10)}`)
        styles.push(`--y: ${parseInt(position.y, 10)}`)
        styles.push(`--dink-y: ${parseInt(position.dinkY - top, 10)}`)

        return styles.join(';')
      },
      updateBlockPosition(position, day){
        position.offset.x = day.day() + 1
        this.position = this.getBubblePosition(position)
      },
    },
  }
</script>
