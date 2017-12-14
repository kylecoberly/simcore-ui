<template lang="html">
  <div class="sim-calendar" :class="componentClasses">

    <div class="sim-calendar--header">
      <div class="sim-calendar--header--title">{{ displayDate }}</div>
      <div class="sim-calendar--header--context">
        <SimSwitch v-model="contextSwitch" left-label="Instructor" right-label="Coordinator"/>
      </div>
      <div class="sim-calendar--header--modes">
        <span class="sim-calendar-button" @click="$store.commit('setCalendarDisplayModeToMonth')" :class="{active: isMonthView}">Month</span>
        <span class="sim-calendar-button" @click="$store.commit('setCalendarDisplayModeToWeek')" :class="{active: isWeekView}">Week</span>
      </div>
      <div class="sim-calendar--header--controls">
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

      <main class="sim-calendar--main">
        <div class="sim-calendar--grid">
          <div class="sim-calendar--grid--header">
            <div v-for="(day, index) in $store.state.calendar.settings.day_names" class="sim-calendar--grid--header--day">
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
                  :key="date"
                  :displayMode="displayMode"
                  :date="date"
                  :user-context="contextLabel"
                  />
              </template>

              <template v-if="isWeekView">
                <CalendarDay v-for="date in currentWeekDays"
                  class="sim-calendar--grid--day"
                  :key="date"
                  :displayMode="displayMode"
                  :date="date"
                  :user-context="contextLabel"
                  />
              </template>

              <div v-if="endOffset > 0" class="sim-calendar--grid--after"></div>

            </div>

            <SimBubble v-if="isCoordinatorContext && shouldBubbleBeOpen && isMonthView">
              <SimSlideDeck :slides="slides"></SimSlideDeck>
            </SimBubble>
          </div>
        </div>
      </main>

      <template v-if="isCoordinatorContext">
        <aside class="sim-calendar--aside sim-calendar--filters">
          <div class="sim-calendar--aside--header">
            <b>Filters</b>
          </div>
          <div class="sim-calendar--aside--body">

            <div class="filter-molecule">
              <p>
                <label>
                  Event Length: <b>{{ halfGlyph(filterEventLength, 'Hour', 'Hours') }}</b>
                  <br />
                  <br />
                  <input v-model="filterEventLength" type="range" min="0.5" max="6" step="0.5" />
                </label>
              </p>
            </div>

            <div class="filter-molecule">
              <p>
                <label>
                  Instructors
                  <br />
                  <br />
                  <input type="text" placeholder="autocomplete instructors..." />
                </label>
              </p>
            </div>

          </div>
        </aside>
      </template>

      <template v-if="isInstructorContext && isMonthView">
        <aside class="sim-calendar--aside sim-calendar--day-control-panel">
          <div class="sim-calendar--aside--header">
            <b>My Availability</b>
          </div>
          <div class="sim-calendar--aside--body">
            <SimTimePicker :date="$store.state.activeDate.date"
              :should-show-date="true"
              orientation="y"
              @calendar-day-selected="setDate"
              />
          </div>
        </aside>
      </template>

    </div>

  </div>
</template>

<script>
  import moment from 'moment'

  import availabilities from '../external/availabilities'
  import users from '../external/users'

  import CalendarDay from './CalendarDay'
  import SimBubble from './Bubble'
  import SimIconText from './IconText'
  import SimSlideDeck from './SlideDeck'
  import SimSwitch from './Switch'
  import SimTimePicker from './TimePicker'

  export default {
    name: 'sim-calendar',
    components: {
      CalendarDay,
      SimBubble,
      SimIconText,
      SimSlideDeck,
      SimSwitch,
      SimTimePicker,
    },
    props: ['selectedClass'],
    data() {
      return {
        contextSwitch: false,
        slides: this.$store.state.slideDeck.slides,
        filterEventLength: 0.5,
      }
    },
    computed: {
      displayMode() {
        return this.$store.state.calendar.display_mode
      },
      componentClasses() {
        const classes = [`is-${this.contextLabel}-context`]

        if (this.isCurrentMonth) {
          classes.push('is-current-month')
        }

        if (this.isWeekView) {
          classes.push('is-week-view')
        }

        if (this.isMonthView) {
          classes.push('is-month-view')
        }

        return classes.join(' ')
      },
      activeMoment() {
        return moment(this.$store.state.activeDate.date)
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
        return 6 - moment([this.activeYear, this.activeMonth, this.currentMonthDays.length]).day()
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
        return this.activeMoment.format(this.$store.state.calendar.settings.date_format.month_name)
      },
      displayYear() {
        return this.activeMoment.format(this.$store.state.calendar.settings.date_format.year)
      },
      displayDate() {
        let display = `${this.displayMonthName} ${this.displayYear}`
        if (this.isWeekView) {
          display = `
            ${moment(this.currentWeekDays[0])
            .format(this.$store.state.calendar.settings.date_format.month_short_day_ordinal)}
            –
            ${moment(this.currentWeekDays[6])
            .format(this.$store.state.calendar.settings.date_format.month_short_day_ordinal)}
          `
        }

        return display
      },
      isInstructorContext() {
        return (this.contextSwitch === false)
      },
      isCoordinatorContext() {
        return (this.contextSwitch === true)
      },
      contextLabel() {
        return this.isInstructorContext ? 'instructor' : 'coordinator'
      },
      shouldBubbleBeOpen() {
        return this.$store.state.bubble.is_open
      },
    },
    created() {
      this.$store.commit('setAllUsers', users.users())
      this.$store.commit('setAggregateAvailabilityBlocks', availabilities.availabilities())
    },
    mounted() {
      this.setTheActiveDateToToday()
    },
    methods: {
      halfGlyph(number, singularUnit, pluralUnits) {
        const grammaticalUnit = number > 0 && number <= 1 ? singularUnit : pluralUnits
        const glyph = number.toString()
          .replace(/\.5/, '½')
          .replace(/^0/, '') || 0

        return `${glyph} ${grammaticalUnit}`
      },
      setDays(start, limit) {
        const dateStrings = [start.format(this.$store.state.calendar.settings.date_format.raw)]

        for (let i = 1; i < limit; i++) {
          dateStrings.push(start.add(1, 'day')
            .format(this.$store.state.calendar.settings.date_format.raw))
        }

        return dateStrings
      },
      loadNextDays() {
        const nextDays = moment(this.activeMoment).add(1, this.displayMode)
          .format(this.$store.state.calendar.settings.date_format.raw)

        this.$store.commit('setActiveDate', nextDays)
      },
      loadPrevDays() {
        const previousDays = moment(this.activeMoment).subtract(1, this.displayMode)
          .format(this.$store.state.calendar.settings.date_format.raw)

        this.$store.commit('setActiveDate', previousDays)
      },
      setTheActiveDateToToday() {
        this.$store.commit('setActiveDate', moment().format(this.$store.state.calendar.settings.date_format.raw))
      },
      displayHour(hour) {
        hour = hour === 0 || hour === 24 ? 'Midnight' : (hour === 12 ? 'Noon' : hour) // (hour % 2 === 0 ? hour : ''))

        return hour > 12 ? `${hour - 12}p` : (parseInt(hour) ? `${hour}a` : hour)
      },
      showDayNumber(date) {
        date = date.split('-')

        return parseInt(date[2])
      },
      setHourClasses(hour) {
        const classes = []
        classes.push((hour >= 6 && hour <= 17 ? 'is-daytime' : 'is-nighttime'))
        classes.push((hour === 0 || hour === 24 ? 'is-midnight' : (hour === 12 ? 'is-noon' : '')))
        return classes.join(' ')
      },
      setDate(date) {
        const dayMoment = moment(date)

        this.displayDate = dayMoment.format('dddd, MMMM Do')
        this.date = dayMoment.format('YYYY-MM-DD')
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/calendar';

  .sim-calendar .sim-bubble {
    top: -1em;
    bottom: -1em;
    width: 20em;
    &::after {
      top: calc(var(--dink-y) * 1px);
    }
    &--left {
      left: calc(14.285% * var(--x) - 1px);
    }
    &--right {
      left: calc(14.285% * (var(--x) - 1) - 1px);
      transform: translateX(-100%);
    }
  }

  .sim-calendar {
    --switch-color: var(--lighter-grey);
    --switch-color-active: var(--lighter-grey);
    --switch-handle-color: var(--action);
    // --timeblock-color: var(--green);
    .sim-switch input {
      box-shadow: 0 0 0 1px var(--light-grey);
      &::before {
        padding: 1ch;
        color: var(--lightest);
      }
    }
    &.is-week-view {
      .day-control-panel {
        display: none;
      }
      .sim-calendar--grid--day {
        display: flex;
      }
    }
    .is-before-today {
      .sim-calendar--grid--date {
        color: #ddd;
      }
    }
  }
</style>
