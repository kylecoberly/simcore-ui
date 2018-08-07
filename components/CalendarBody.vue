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
          <Loader :isLoading="true" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import dayjs from 'dayjs'

  import CalendarDay from './CalendarDay'
  import Loader from './Loader'

  export default {
    components: {
      CalendarDay,
      Loader,
    },
    data() {
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
      dateService() {
        return this.$store.state.services.date
      },
      today() {
        return this.dateService.today
      },
      selectedDate() {
        return this.dateService.selectedDate
      },
      isLoading() {
        return this.$store.getters['services/loading/isLoading']
      },
      startOffset() {
        return dayjs(this.selectedDate).startOf('month').day()
      },
      endOffset() {
        return 6 - dayjs(this.selectedDate).endOf('month').day()
      },
      daysInCurrentMonth() {
        const daysInMonth = []
        let day, count
        for (day = 1, count = this.selectedDate.daysInMonth(); day <= count; day += 1) {
          let dayString = day.toString()
          if (day < 10) {
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
      updateBlockPosition(position, day) {
        position.offset.x = day.day() + 1
        this.position = this.getBubblePosition(position)
      },
    },
  }
</script>
