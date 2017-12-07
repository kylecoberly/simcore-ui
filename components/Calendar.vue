<template lang="html">
  <div class="sim-calendar" :class="{ 'is-current-month': isCurrentMonth, 'is-week-view': isWeekView, 'is-month-view': isMonthView }">

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
        <span @click="today">
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
            <span class="sim-calendar--grid--header--date" v-if="isWeekView" :class="setDayClasses(days[index])">
              {{ showDayNumber(days[index]) }}
            </span>
          </div>
        </div>
        <div class="sim-calendar--grid--body">
          <ul v-if="isWeekView" class="sim-calendar--grid--timelines">
            <li v-for="hour in 25" :class="setHourClasses(hour-1)">
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

            <div v-for="date in days" @mousedown="emitDayClick(date)" class="sim-calendar--grid--day" :class="setDayClasses(date)">
              <div v-if="isMonthView" class="sim-calendar--grid--date">{{ showDayNumber(date) }}</div>
              <slot name="day" :date="date" :mode="displayMode"></slot>
            </div>

            <div v-if="endOffset > 0" class="sim-calendar--grid--after"></div>

          </div>
          <slot name="day-bubble" :date="date" :mode="displayMode"></slot>
        </div>
      </div>

      <slot name="day-control-panel" :date="date" :mode="displayMode"></slot>
      <slot name="day-bubble" :date="date" :mode="displayMode"></slot>
    </div>

  </div>
</template>

<script>
  import moment from 'moment'
  import SimIconText from './IconText'

  const _zeroPad = function(num, pads) {
    pads = pads || '000'
    return (pads + num).substr(-2)
  }

  export default {
    name: 'sim-calendar',
    components: {
      SimIconText,
    },
    props: ['date', 'dates', 'selectedClass'],
    data () {
      return {
        displayMode: 'month',
      }
    },
    computed: {
      activeMoment () {
        return moment(this.date)
      },
      activeMonth () {
        return this.activeMoment.month()
      },
      activeYear () {
        return this.activeMoment.year()
      },
      isCurrentMonth () {
        return moment().isSame([this.activeYear, this.activeMonth, 1], 'month')
      },
      isMonthView () {
        return (this.displayMode === 'month')
      },
      isWeekView () {
        return (this.displayMode === 'week')
      },
      startOffset () {
        return moment([this.activeYear, this.activeMonth, 1]).day()
      },
      endOffset () {
        return 6 - moment([this.activeYear, this.activeMonth, this.days.length]).day()
      },
      currentWeekDays () {
        const start = moment(this.activeMoment).startOf('week')
        let days = [start.format(this.$store.state.calendar_settings.date_format.raw)]
        for (let i = 0; i < 6; i++) {
          days.push(start.add(1, 'day').format(this.$store.state.calendar_settings.date_format.raw))
        }
        // window.console.log('week', days)
        return days
      },
      currentMonthDays () {
        return Array.from(Array(this.activeMoment.daysInMonth()), (_, day) => `${this.activeYear}-${_zeroPad(this.activeMonth+1)}-${_zeroPad(day+1)}`)
      },
      days () {
        return this.isMonthView ? this.currentMonthDays : this.currentWeekDays
      },
      displayMonthName () {
        return this.activeMoment.format(this.$store.state.calendar_settings.date_format.month_name)
      },
      displayYear () {
        return this.activeMoment.format(this.$store.state.calendar_settings.date_format.year)
      },
      displayDate () {
        let display = `${this.displayMonthName} ${this.displayYear}`
        if(this.isWeekView) {
          display = `
            ${moment(this.currentWeekDays[0]).format(this.$store.state.calendar_settings.date_format.month_short_day_ordinal)}
            –
            ${moment(this.currentWeekDays[6]).format(this.$store.state.calendar_settings.date_format.month_short_day_ordinal)}
          `
        }
        return display
      },
    },
    mounted () {
      this.today()
      // window.console.log(this.$store.state.active_date)
    },
    methods: {
      emitDayClick (day) {
        this.$emit('calendar-day-selected', day)
      },
      loadNextDays () {
        this.emitDayClick(this.activeMoment.add(1, this.displayMode).format(this.$store.state.calendar_settings.date_format.raw))
      },
      loadPrevDays () {
        this.emitDayClick(this.activeMoment.subtract(1, this.displayMode).format(this.$store.state.calendar_settings.date_format.raw))
      },
      today () {
        this.emitDayClick(moment().format(this.$store.state.calendar_settings.date_format.raw))
      },
      showDayNumber (date) {
        date = date.split('-')
        return parseInt(date[2])
      },
      setDisplayMode (mode) {
        this.displayMode = mode
      },
      getDayOfWeek(date) {
        return moment(date).day()
      },
      displayHour (hour) {
        hour = hour === 0 || hour === 24 ? 'Midnight' : (hour === 12 ? 'Noon' : hour) // (hour % 2 === 0 ? hour : ''))
        return hour > 12 ? `${hour - 12}p` : (parseInt(hour) ? `${hour}a` : hour)
      },
      setHourClasses (hour) {
        let classes = []
        classes.push((hour >= 6 && hour <= 17 ? 'is-daytime' : 'is-nighttime'))
        classes.push((hour === 0 || hour === 24 ? 'is-midnight' : (hour === 12 ? 'is-noon' : '')))
        // classes.push((hour === 8 ? 'is-start-dayshift' : ''))
        // classes.push((hour === 18 ? 'is-end-dayshift' : ''))
        return classes.join(' ')
      },
      setDayClasses (date) {
        let dayOfWeek = this.getDayOfWeek(date)
        let classes = [`day-${dayOfWeek}`]

        if(moment().isSame(date, 'day')) {
          classes.push('is-today')
        } else if(moment().isAfter(date, 'day')) {
          classes.push('is-before-today')
        } else {
          classes.push('is-after-today')
        }

        if(this.$store.state.calendar_settings.weekend_days.includes(dayOfWeek)) {
          classes.push('is-weekend')
        } else {
          classes.push('is-weekday')
        }

        if(moment(this.date).isSame(date, 'day')) {
          classes.push(this.selectedClass || 'is-selected')
        }

        return classes.join(' ')
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/calendar';
</style>
