<template lang="html">
  <div class="sim-calendar" :class="{ 'is-current-month': isCurrentMonth }">

    <div class="sim-calendar--header">
      <div class="sim-calendar--title">{{ displayMonthName }} {{ displayYear }}</div>
      <div class="sim-calendar--controls">
        <span @click="loadPrevMonth">
          <SimIconText icon="fa-arrow-left fa-fw"></SimIconText>
        </span>
        <span @click="today">
          today
        </span>
        <span @click="loadNextMonth">
          <SimIconText icon="fa-arrow-right fa-fw"></SimIconText>
        </span>
      </div>
    </div>

    <div class="sim-calendar--body" :style="{'--start-offset': startOffset}">
      <div class="sim-calendar--grid">
        <div class="sim-calendar--grid--header">
          <div v-for="day in dayNames">{{ day }}</div>
        </div>
        <div class="sim-calendar--grid--days">

          <div v-if="startOffset > 0" class="sim-calendar--grid--before" :style="{'--offset': startOffset}"></div>

          <div v-for="day in days" @click="emitDayClick(activeYear, activeMonth, day)" class="sim-calendar--grid--day" :class="setDayClasses(day)">
            <div class="sim-calendar--grid--date">{{ day }}</div>
            <div class="sim-calendar--grid--time-blocks">
              <div v-for="block in timeBlocks(day)" :style="setBlockStyles(block)"></div>
            </div>
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
    props: {
      date: {
        type: String,
      },
      dates: {
        type: Object,
      },
      selectedClass: {
        type: String
      },
    },
    data () {
      return {
        dayNames: ['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat'],
        dateFormat: 'YYYY-MM-DD',
        weekendDays: [0,6],
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
      startOffset () {
        return moment([this.activeYear, this.activeMonth, 1]).day()
      },
      endOffset () {
        return 6 - moment([this.activeYear, this.activeMonth, this.days]).day()
      },
      days () {
        return this.activeMoment.daysInMonth()
      },
      displayMonthName () {
        return this.activeMoment.format('MMMM')
      },
      displayYear () {
        return this.activeMoment.format('YYYY')
      },
    },
    mounted () {
      this.today()
    },
    methods: {
      emitDayClick (year, month, day) {
        this.$emit('calendar-day-clicked', {
          year: year,
          month: _zeroPad((month+1)),
          day: _zeroPad(day),
        })
        this.$forceUpdate()
      },
      loadNextMonth () {
        let date = this.activeMoment.add(1, 'month')
        this.emitDayClick(date.year(), date.month(), 1)
      },
      loadPrevMonth () {
        let date = this.activeMoment.subtract(1, 'month')
        this.emitDayClick(date.year(), date.month(), 1)
      },
      today () {
        let date = moment()
        this.emitDayClick(date.year(), date.month(), date.date())
      },
      setDayClasses (day) {
        let dateOfDay = [this.activeYear, this.activeMonth, day]
        let dayOfWeek = moment(dateOfDay).day()
        let classes = [`day-${dayOfWeek}`]

        if(moment().isSame(dateOfDay, 'day')) {
          classes.push('is-today')
        } else if(moment().isAfter(dateOfDay, 'day')) {
          classes.push('is-before-today')
        } else {
          classes.push('is-after-today')
        }

        if(this.weekendDays.includes(dayOfWeek)) {
          classes.push('is-weekend')
        } else {
          classes.push('is-weekday')
        }

        if(moment(this.date).isSame(dateOfDay, 'day')) {
          classes.push(this.selectedClass || 'is-selected')
        }

        return classes.join(' ')
      },
      timeBlocks(day) {
        let dateOfDay = moment([this.activeYear, this.activeMonth, day]).format(this.dateFormat)
        return this.dates[dateOfDay]
      },
      setBlockStyles (block) {
        let styles = []
        styles.push(`--duration: ${block.duration}`)
        return styles.join(';')
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/calendar';
</style>
