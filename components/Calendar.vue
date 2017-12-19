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
            <div v-for="(dayName, index) in $store.state.calendar.settings.day_names" class="sim-calendar--grid--header--day">
              <span class="sim-calendar--grid--header--dayname">
                {{ dayName }}
              </span>
              <span v-if="isWeekView" class="sim-calendar--grid--header--date" :class="{ 'is-today': isCurrentDay(currentWeekDays[index]) }">
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
                <CalendarDay v-for="day in monthDays"
                             class="sim-calendar--grid--day"
                             @blocksWereUpdated="saveUpdatedBlocksFromACalendarDay"
                             :key="day.date"
                             :displayMode="displayMode"
                             :date="day.date"
                             :user-context="contextLabel"
                             :initialEvents="day.eventBlocks"
                             :initialPendingEvents="day.pendingEventBlocks"
                             :initialCurrentUserAvailabilityBlocks="day.currentUserAvailabilityBlocks"
                             :initialAggregateUserAvailabilityBlocks="day.aggregateUserAvailabilityBlocks"
                  />
              </template>

              <template v-if="isWeekView">
                <CalendarDay v-for="day in weekDays"
                             class="sim-calendar--grid--day"
                             @blocksWereUpdated="saveUpdatedBlocksFromACalendarDay"
                             :key="day.date"
                             :displayMode="displayMode"
                             :date="day.date"
                             :user-context="contextLabel"
                             :initialEvents="day.eventBlocks"
                             :initialPendingEvents="day.pendingEventBlocks"
                             :initialCurrentUserAvailabilityBlocks="day.currentUserAvailabilityBlocks"
                             :initialAggregateUserAvailabilityBlocks="day.aggregateUserAvailabilityBlocks"
                  />
              </template>

              <div v-if="endOffset > 0" class="sim-calendar--grid--after"></div>

            </div>

            <SimBubble v-if="isCoordinatorContext && shouldBubbleBeOpen && isMonthView">
              <SimSlidePresenter :slides="slides"></SimSlidePresenter>
            </SimBubble>
          </div>
        </div>
      </main>

      <template v-if="isCoordinatorContext">
        <aside class="sim-calendar--aside sim-calendar--filters">
          <div class="sim-calendar--aside--header">
            <b>Availability &amp; Event Filters</b>
          </div>
          <div class="sim-calendar--aside--body">
            <div class="sim-flex--1">

              <div class="filter-molecule">
                <SimFilterBy xv-if="userTypeIsClient" system-echo="No facility filters" label="Facilities" type="institution_id" :list="institutions" @filter="applyFilter"></SimFilterBy>
                <SimFilterBy system-echo="No department filters" label="Departments" type="department_id" :list="departments" @filter="applyFilter"></SimFilterBy>
                <SimFilterBy system-echo="No professional title filters" label="Professional Titles" type="title_id" :list="professionalTitles" @filter="applyFilter"></SimFilterBy>
              </div>

              <div class="filter-molecule">
                <p>
                  <label>
                    <b>Instructors</b>
                    <br /><br />
                    <input type="text" placeholder="autocomplete instructors..." />
                  </label>
                </p>
              </div>

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
            <SimTimePicker
              @blocksWereUpdated="saveUpdatedBlocksFromACalendarDay"
              :blocks="currentUserAvailabilityBlocksForCurrentDate"
              :date="date"
              :should-show-date="true"
              orientation="y"
              :initialEvents="currentDay.eventBlocks"
              :initialPendingEvents="currentDay.pendingEventBlocks"
              :initialCurrentUserAvailabilityBlocks="currentDay.currentUserAvailabilityBlocks"
              :initialAggregateUserAvailabilityBlocks="currentDay.aggregateUserAvailabilityBlocks"
              />
          </div>
        </aside>
      </template>

    </div>

  </div>
</template>

<script>
  import moment from 'moment'
  import _ from 'lodash'

  import availabilities from '../external/availabilities'
  import currentUser from '../external/currentUser'
  import events from '../external/events'
  import eventEditorSlides from '../external/eventEditorSlides'
  import users from '../external/users'

  import CalendarDay from './CalendarDay'
  import SimBubble from './Bubble'
  import SimIconText from './IconText'
  import SimFilterBy from './FilterBy'
  import SimSlidePresenter from './SlidePresenter'
  import SimSwitch from './Switch'
  import SimTimePicker from './TimePicker'

  export default {
    name: 'sim-calendar',
    components: {
      CalendarDay,
      SimBubble,
      SimIconText,
      SimFilterBy,
      SimSlidePresenter,
      SimSwitch,
      SimTimePicker,
    },
    props: ['selectedClass'],
    data() {
      return {
        contextSwitch: true,
        date: this.$store.state.activeDate.date,
        institutions: [],
        departments: [],
        professionalTitles: [],
        events: [],
        pendingEvents: [],
        currentUserAvailabilityBlocks: [],
        aggregateUserAvailabilityBlocks: [],
        monthDays: {},
        weekDays: {},
      }
    },
    computed: {
      currentDay() {
        return (this.isMonthView) ? this.monthDays[this.date] : this.weekDays[this.date]
      },
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

        const newWeekDaysString = this.setDays(start, limit)

        this.weekDays = {}
        _.each(newWeekDaysString, (day) => {
          this.weekDays[day] = {
            date: day,
            currentUserAvailabilityBlocks: this.currentUserAvailabilityBlocks[day] || [],
            aggregateUserAvailabilityBlocks: this.aggregateAvailabilityBlocks[day] || [],
            eventBlocks: this.events[day] || [],
            pendingEventBlocks: this.pendingEvents[day] || [],
          }
        })

        return newWeekDaysString
      },
      currentMonthDays() {
        const start = moment(this.activeMoment).startOf('month')
        const limit = this.activeMoment.daysInMonth()

        const newMonthDayStrings = this.setDays(start, limit)

        this.monthDays = {}

        _.each(newMonthDayStrings, (day) => {
          this.monthDays[day] = {
            date: day,
            currentUserAvailabilityBlocks: this.currentUserAvailabilityBlocks[day] || [],
            aggregateUserAvailabilityBlocks: this.aggregateAvailabilityBlocks[day] || [],
            eventBlocks: this.events[day] || [],
            pendingEventBlocks: this.pendingEvents[day] || [],
          }
        })

        return newMonthDayStrings
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
            .format(this.$store.state.calendar.settings.date_format.month_short_day_ordinal)},
            ${this.displayYear}
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
      currentUserAvailabilityBlocksForCurrentDate() {
        return this.currentUserAvailabilityBlocks[this.date]
      },
    },
    created() {
      this.$store.commit('setSlideTemplates', eventEditorSlides)
      this.$store.commit('setAllUsers', users.users())
      this.$store.commit('setCurrentUser', currentUser.user())
      this.$store.commit('setAggregateEventBlocks', events.events())
      this.$store.commit('setAggregateAvailabilityBlocks', availabilities.availabilities())

      this.pendingEvents = this.$store.state.events.pendingBlocks
      this.events = this.$store.state.events.blocks
      this.aggregateAvailabilityBlocks = this.$store.state.availabilities.blocks
      this.currentUserAvailabilityBlocks = this.$store.state.user.availabilities
    },
    mounted() {
      this.setTheActiveDateToToday()

      // When the week/month is updated, refresh this day's currentUserAvailabilityBlocks.
      this.$store.watch(this.$store.getters.getActiveDate, () => {
        this.date = this.$store.state.activeDate.date
      })

      // When a time block is added, updated, or deleted, check to see if it belongs to this date.
      // If so, refresh this day's time blocks.
      this.$store.watch(this.$store.getters.getLastUpdatedCurrentUserAvailabilityBlocks, (date) => {
        if (date === this.date) {
          this.$set(
            this.currentUserAvailabilityBlocks,
            [date],
            this.$store.state.user.availabilities[date],
          )

          if (this.weekDays[date]) {
            this.$set(this.weekDays[date], 'currentUserAvailabilityBlocks', this.currentUserAvailabilityBlocks[date])
          }
          this.$set(this.monthDays[date], 'currentUserAvailabilityBlocks', this.currentUserAvailabilityBlocks[date])
        }
      })

      this.$store.watch(this.$store.getters.getLastUpdatedPendingEventBlocks, (date) => {
        if (date === this.date) {
          this.$set(
            this.pendingEvents,
            [date],
            this.$store.state.events.pendingBlocks[date],
          )

          if (this.weekDays[date]) {
            this.$set(this.weekDays[date], 'pendingEvents', this.pendingEvents[date])
          }
          this.$set(this.monthDays[date], 'pendingEvents', this.pendingEvents[date])
        }
      })

      this.$store.watch(this.$store.getters.getLastUpdatedAggregateAvailabilityBlocks, (date) => {
        if (date === this.date) {
          this.$set(
            this.aggregateAvailabilityBlocks,
            [date],
            this.$store.state.availabilities.blocks[date],
          )

          if (this.weekDays[date]) {
            this.$set(this.weekDays[date], 'aggregateAvailabilityBlocks', this.aggregateAvailabilityBlocks[date])
          }
          this.$set(this.monthDays[date], 'aggregateAvailabilityBlocks', this.aggregateAvailabilityBlocks[date])
        }
      })
    },
    watch: {
      // currentUserAvailabilityBlocks(newBlocks) {
        // console.log('new blocks')
        // this.$store.commit('setUserAvailabilityBlocksForDay', { blocks: newBlocks, date: this.date })
      // },
      // date(newDate) {
      //   // this.currentUserAvailabilityBlocks = this.$store.state.user.availabilities[newDate] || []
      // },
    },
    methods: {
      isCurrentDay(date) {
        return moment().isSame(date, 'day')
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
      // setHourClasses(hour) {
      //   const classes = []
      //   classes.push((hour >= 6 && hour <= 17 ? 'is-daytime' : 'is-nighttime'))
      //   classes.push((hour === 0 || hour === 24 ? 'is-midnight' : (hour === 12 ? 'is-noon' : '')))
      //   return classes.join(' ')
      // },
      // setDate(date) {
      //   const dayMoment = moment(date)
      //
      //   this.displayDate = dayMoment.format('dddd, MMMM Do')
      //   this.date = dayMoment.format('YYYY-MM-DD')
      // },
      // halfGlyph(number, singularUnit, pluralUnits) {
      //   const grammaticalUnit = number > 0 && number <= 1 ? singularUnit : pluralUnits
      //   const glyph = number.toString()
      //     .replace(/\.5/, '½')
      //     .replace(/^0/, '') || 0
      //
      //   return `${glyph} ${grammaticalUnit}`
      // },
      applyFilter (type, data) {
          this.filters.find((filter) => filter.type === type).items = data
          this.filteredUsers = this.users.filter((item) => {
              // @FIXME ew this.filters[n]...
              // return this.filters.forEach(filter => filter.items.length ? filter.items.includes(item[filter.type]) : true)
              // filters[0] = institutions
              // filters[1] = departments
              // filters[2] = professionalTitles
              return (this.userTypeIsClient && this.filters[0].items.length ? this.filters[0].items.includes(item[this.filters[0].type]) : true)
                  && (this.filters[1].items.length ? this.filters[1].items.includes(item[this.filters[1].type]) : true)
                  && (this.filters[2].items.length ? this.filters[2].items.includes(item[this.filters[2].type]) : true)
          })
          // this.bulkCheckState = this.isSetSelectedAlready(this.filteredUsers)
      },
      eventsForDate(date) {
        return this.events[date]
      },
      pendingEventsForDate(date) {
        return this.pendingEvents[date]
      },
      currentUserAvailabilityBlocksForDate(date) {
        return this.currentUserAvailabilityBlocks[date] || []
      },
      aggregateUserAvailabilityBlocksForDate(date) {
        return this.aggregateUserAvailabilityBlocks[date] || []
      },
      saveUpdatedBlocksFromACalendarDay(blocksToUpdate) {
        // TODO: Normalize this for setting any type of block. - Chad
        this.$store.commit('setUserAvailabilityBlocksForDay', blocksToUpdate)
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/calendar';

  .sim-flex--handoff {
    flex: 1;
    display: flex;
  }

  .sim-flex--1 {
    flex: 1;
  }

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
