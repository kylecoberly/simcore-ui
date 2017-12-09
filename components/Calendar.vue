<template lang="html">
  <div class="sim-calendar"
       :class="{ 'is-current-month': isCurrentMonth, 'is-week-view': isWeekView, 'is-month-view': isMonthView }">

    <div class="sim-calendar--header">
      <div class="sim-calendar--title">{{ displayDate }}</div>
      <div class="sim-calendar--context">
        <slot name="context-controls"></slot>
      </div>
      <div class="sim-calendar--modes">
        <span class="sim-calendar-button" @click="setDisplayMode('month')" :class="{active: isMonthView}">Month</span>
        <span class="sim-calendar-button" @click="setDisplayMode('week')" :class="{active: isWeekView}">Week</span>
      </div>
      <div class="sim-calendar--controls">
        <span @click="loadPrevDays">
          <SimIconText icon="fa-arrow-left fa-fw"></SimIconText>
        </span>
        <span @click="setTheActiveDateToToday">
          today
        </span>
        <span @click="loadNextDays">
          <SimIconText icon="fa-arrow-right fa-fw"></SimIconText>
        </span>
      </div>
    </div>

    <div class="sim-calendar--body" :style="{'--start-offset': startOffset}">

      <div class="sim-calendar--grid">
        <div class="sim-calendar--grid--header">
          <div v-for="(day, index) in $store.state.calendar_settings.day_names" class="sim-calendar--grid--header--day">
            <span class="sim-calendar--grid--header--dayname">
              {{ day }}
            </span>
            <span class="sim-calendar--grid--header--date" v-if="isWeekView">
              {{ showDayNumber(currentWeekDays[index]) }}
            </span>
          </div>
        </div>
        <div class="sim-calendar--grid--body">
          <ul v-if="isWeekView" class="sim-calendar--grid--timelines">
            <li v-for="hour in 25">
              <div>
                <SimIconText v-if="hour === 13" icon="fa-sun-o"></SimIconText>
                <SimIconText v-else-if="hour === 1 || hour === 25" icon="fa-moon-o"></SimIconText>
                <span v-else>
                  {{ displayHour(hour-1) }}
                </span>
              </div>
            </li>
          </ul>
          <div class="sim-calendar--grid--days">

            <div v-if="startOffset > 0" class="sim-calendar--grid--before" :style="{'--offset': startOffset}"></div>

            <template v-if="isMonthView">
              <CalendarDay v-for="date in currentMonthDays"
                           class="sim-calendar--grid--day"
                           :displayMode="displayMode"
                           :date="date"
              >
              </CalendarDay>
            </template>

            <template v-if="isWeekView">
              <CalendarDay v-for="date in currentWeekDays"
                           class="sim-calendar--grid--day"
                           :displayMode="displayMode"
                           :date="date"
              >
              </CalendarDay>
            </template>

            <div v-if="endOffset > 0" class="sim-calendar--grid--after"></div>

          </div>
          <slot name="day-bubble" :date="date" :mode="displayMode"></slot>
        </div>
      </div>

      <slot name="day-control-panel" :mode="displayMode"></slot>
      <!--<slot name="day-bubble" :date="date" :mode="displayMode"></slot>-->
    </div>

  </div>
</template>

<script>
  import moment from 'moment'

  import CalendarDay from './CalendarDay'
  import SimIconText from './IconText'

  const _zeroPad = (num, pads) => {
    pads = pads || '000'

    return (pads + num).substr(-2)
  }

  export default {
    name: 'sim-calendar',
    components: {
      CalendarDay,
      SimIconText,
    },
    props: ['selectedClass'],
    data() {
      return {
        displayMode: 'month',
      }
    },
    computed: {
      activeMoment() {
        return moment(this.$store.state.active_date)
      },
      activeMonth() {
        return this.activeMoment.month()
      },
      activeYear() {
        return this.activeMoment.year()
      },
      isCurrentMonth() {
        return moment()
          .isSame([this.activeYear, this.activeMonth, 1], 'month')
      },
      isMonthView() {
        return (this.displayMode === 'month')
      },
      isWeekView() {
        return (this.displayMode === 'week')
      },
      startOffset() {
        return moment([this.activeYear, this.activeMonth, 1]).day()
      },
      endOffset() {
        return 6 - moment([this.activeYear, this.activeMonth, this.currentWeekDays.length]).day()
      },
      currentWeekDays() {
        const start = moment(this.activeMoment).startOf('week')
        const limit = 7

        return this.setDays(start, limit)
      },
      currentMonthDays() {
        const start = moment(this.activeMoment).startOf('month')
        const limit = this.activeMoment.daysInMonth()

        return this.setDays(start, limit)
      },
      displayMonthName() {
        return this.activeMoment.format(this.$store.state.calendar_settings.date_format.month_name)
      },
      displayYear() {
        return this.activeMoment.format(this.$store.state.calendar_settings.date_format.year)
      },
      displayDate() {
        let display = `${this.displayMonthName} ${this.displayYear}`
        if (this.isWeekView) {
          display = `
            ${moment(this.currentWeekDays[0])
            .format(this.$store.state.calendar_settings.date_format.month_short_day_ordinal)}
            –
            ${moment(this.currentWeekDays[6])
            .format(this.$store.state.calendar_settings.date_format.month_short_day_ordinal)}
          `
        }

        return display
      },
    },
    mounted() {
      this.setTheActiveDateToToday()
    },
    methods: {
      setDays(start, limit) {
        const dateStrings = [start.format(this.$store.state.calendar_settings.date_format.raw)]

        for (let i = 1; i < limit; i++) {
          dateStrings.push(start.add(1, 'day')
            .format(this.$store.state.calendar_settings.date_format.raw))
        }

        return dateStrings
      },
      loadNextDays() {
        const nextDays = moment(this.activeMoment).add(1, this.displayMode)
          .format(this.$store.state.calendar_settings.date_format.raw)

        this.$store.commit('setActiveDate', nextDays)
      },
      loadPrevDays() {
        const previousDays = moment(this.activeMoment).subtract(1, this.displayMode)
          .format(this.$store.state.calendar_settings.date_format.raw)

        this.$store.commit('setActiveDate', previousDays)
      },
      setTheActiveDateToToday() {
        this.$store.commit('setActiveDate', moment().format(this.$store.state.calendar_settings.date_format.raw))
      },
      displayHour(hour) {
        hour = hour === 0 || hour === 24 ? 'Midnight' : (hour === 12 ? 'Noon' : hour) // (hour % 2 === 0 ? hour : ''))

        return hour > 12 ? `${hour - 12}p` : (parseInt(hour) ? `${hour}a` : hour)
      },
      showDayNumber(date) {
        date = date.split('-')

        return parseInt(date[2])
      },
      setDisplayMode(mode) {
        this.displayMode = mode

        this.$forceUpdate()
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/calendar';
</style>
