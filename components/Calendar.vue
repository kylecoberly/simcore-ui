<template lang="html">
  <div class="sim-calendar" :class="{ 'is-current-month': isCurrentMonth, 'is-week-view': isWeekView, 'is-month-view': isMonthView }">

    <div class="sim-calendar--header">
      <div class="sim-calendar--title">{{ displayDate }}</div>
      <div class="sim-calendar--modes">
        <span @click="setDisplayMode('month')" :class="{active: displayMode === 'month'}">Month</span>
        <span @click="setDisplayMode('week')" :class="{active: displayMode === 'week'}">Week</span>
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
          <div v-for="(day, index) in dayNames" class="sim-calendar--grid--header--day">
            <span class="sim-calendar--grid--header--dayname">
              {{ day }}
            </span>
            <span class="sim-calendar--grid--header--date" v-if="isWeekView" :class="setDayClasses(days[index])">
              {{ showDayNumber(days[index]) }}
            </span>
          </div>
        </div>
        <div class="sim-calendar--grid--days">

          <div v-if="startOffset > 0" class="sim-calendar--grid--before" :style="{'--offset': startOffset}"></div>

            <div v-for="day in days" @click="emitDayClick(day)" class="sim-calendar--grid--day" :class="setDayClasses(day)">
              <div class="sim-calendar--grid--date" v-if="isMonthView">{{ showDayNumber(day) }}</div>
              <slot name="day" :day="day"></slot>
            </div>

          <div v-if="endOffset > 0" class="sim-calendar--grid--after"></div>

        </div>
      </div>

      <slot name="day-control-panel"></slot>
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
        dayNames: ['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat'],
        dateFormat: 'YYYY-MM-DD',
        weekendDays: [0,6],
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
        let days = [start.format(this.dateFormat)]
        for (let i = 0; i < 6; i++) {
          days.push(start.add(1, 'day').format(this.dateFormat))
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
        return this.activeMoment.format('MMMM')
      },
      displayYear () {
        return this.activeMoment.format('YYYY')
      },
      displayDate () {
        let display = `${this.displayMonthName} ${this.displayYear}`
        if(this.isWeekView) {
          display = `${moment(this.currentWeekDays[0]).format('MMM Do')} – ${moment(this.currentWeekDays[6]).format('MMM Do')}`
        }
        return display
      },
    },
    mounted () {
      this.today()
    },
    methods: {
      emitDayClick (day) {
        this.$emit('calendar-day-clicked', day)
      },
      loadNextDays () {
        this.emitDayClick(this.activeMoment.add(1, this.displayMode).format(this.dateFormat))
      },
      loadPrevDays () {
        this.emitDayClick(this.activeMoment.subtract(1, this.displayMode).format(this.dateFormat))
      },
      today () {
        this.emitDayClick(moment().format(this.dateFormat))
      },
      showDayNumber (date) {
        date = date.split('-')
        return parseInt(date[2])
      },
      setDisplayMode (mode) {
        this.displayMode = mode
      },
      setDayClasses (day) {
        let dayOfWeek = moment(day).day()
        let classes = [`day-${dayOfWeek}`]

        if(moment().isSame(day, 'day')) {
          classes.push('is-today')
        } else if(moment().isAfter(day, 'day')) {
          classes.push('is-before-today')
        } else {
          classes.push('is-after-today')
        }

        if(this.weekendDays.includes(dayOfWeek)) {
          classes.push('is-weekend')
        } else {
          classes.push('is-weekday')
        }

        if(moment(this.date).isSame(day, 'day')) {
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
