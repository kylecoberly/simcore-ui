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
                <CalendarDay v-for="date in currentMonthDays"
                  class="sim-calendar--grid--day"
                  :key="date"
                  :displayMode="displayMode"
                  :date="date"
                  :user-context="contextLabel"
                  @run-lodestar="runLodestar"
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
              <SimSlidePresenter></SimSlidePresenter>
            </SimBubble>
          </div>
        </div>
      </main>

      <template v-if="isCoordinatorContext">
        <aside class="sim-calendar--aside sim-calendar--filters">
          <div class="sim-calendar--aside--header">
            <p><b>Availability &amp; Event Filters</b></p>
          </div>
          <div class="sim-calendar--aside--body">
            <div class="sim-flex--1">

              <div v-if="isMonthView" class="filter-molecule">
                <b>Event Length: {{ halfGlyph(filterEventLength, 'hour', 'hours') }}</b>
                <br /><br />
                <input type="range" v-model="filterEventLength" min="0.5" max="6" step="0.5" />
              </div>

              <div class="filter-molecule">
                <SimFilterBy xv-if="userTypeIsClient" system-echo="No facility filters" label="Facilities" type="institution_id" :list="institutions" @filter="applyFilter"></SimFilterBy>
                <SimFilterBy system-echo="No department filters" label="Departments" type="department_id" :list="departments" @filter="applyFilter"></SimFilterBy>
                <SimFilterBy system-echo="No professional title filters" label="Professional Titles" type="title_id" :list="professionalTitles" @filter="applyFilter"></SimFilterBy>
              </div>

              <div class="filter-molecule">
                <p class="sim-flex--row">
                  <b class="sim-flex--1">Instructors</b>
                  <span v-if="thereAreActiveInstructors" @click="clearAllActiveInstructors">
                    <SimIconText icon="fa-times-circle fa-fw"></SimIconText>
                  </span>
                </p>
                <SimDatalist :items="activeInstructors" :animate="true">
                  <li slot="item" slot-scope="props" :key="props.item.id" :class="`instructor-${props.item.id}`">
                    <SimSelection
                      :item="props.item"
                      :item-id="props.item.id"
                      :disabled="props.item.disabled"
                      :should-be-selected="props.item.selected"
                      @toggle="toggleItemInSelectedInstructors"
                      >
                      {{ props.item.first_name }} {{ props.item.last_name }}
                    </SimSelection>
                    <span class="item-remover" @click="removeFromActiveInstructorList(props.item)">
                      <SimIconText icon="fa-times fa-fw"></SimIconText>
                    </span>
                  </li>
                </SimDatalist>
                <br />
                <SimAutocomplete
                  :options="inactiveInstructors"
                  placeholder="find instructors..."
                  @select="addToInstructorList"
                  >
                  <div class="item-tag" slot="item" slot-scope="props">
                    {{ props.option.first_name }} {{ props.option.last_name }}
                  </div>
                </SimAutocomplete>
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
            <SimTimePicker :date="$store.state.activeDate.date"
              :should-show-date="true"
              orientation="y"
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
  import eventEditorSlides from '../external/eventEditorSlides'

  import CalendarDay from './CalendarDay'
  import SimAutocomplete from './Autocomplete'
  import SimBubble from './Bubble'
  import SimDatalist from './Datalist'
  import SimIconText from './IconText'
  import SimFilterBy from './FilterBy'
  import SimSelection from './Selection'
  import SimSlidePresenter from './SlidePresenter'
  import SimSwitch from './Switch'
  import SimTimePicker from './TimePicker'

  // #FIXME should be using common.lodestar(...) | jase
  const lodestar = function(element, classname, selector, test) {
    let items = element.querySelectorAll(selector)
    let flag = false
    console.log('here', element, items)
    items.forEach((item) => {
      let node = item // .parentNode
      if(!item[test]) {
        flag = true
        node.classList.add(classname);
        node.addEventListener('animationend', () => {
          node.classList.remove(classname)
        }, false)
      }
    })
    return flag
  }

  export default {
    name: 'sim-calendar',
    components: {
      CalendarDay,
      SimAutocomplete,
      SimBubble,
      SimDatalist,
      SimIconText,
      SimFilterBy,
      SimSelection,
      SimSlidePresenter,
      SimSwitch,
      SimTimePicker,
    },
    props: ['selectedClass'],
    data() {
      return {
        contextSwitch: true,
        filterEventLength: 2,

        institutions: [],
        departments: [],
        professionalTitles: [],
        instructors: [],
        activeInstructors: [],
        inactiveInstructors: [],
        selectedInstructors: [],
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
      thereAreActiveInstructors() {
        return this.activeInstructors.length
      },
    },
    created() {
      this.$store.commit('setSlideTemplates', eventEditorSlides)
      this.$store.commit('setAllUsers', users.users())
      this.$store.commit('setAggregateAvailabilityBlocks', availabilities.availabilities())
    },
    mounted() {
      this.setTheActiveDateToToday()
      this.instructors = this.$store.state.users.all
      this.resetInactiveInstructors()
    },
    methods: {
      sortItemsByProperty(items, property) {
        items.sort((a, b) => {
          return (a[property] > b[property]) - (a[property] < b[property])
        })
      },
      addToInstructorList(item) {
        const foundItem = this.activeInstructors.find((instructor) => instructor.id === item.id)
        if (!foundItem) {
          this.activeInstructors.push(item)
          this.inactiveInstructors.splice(this.inactiveInstructors.indexOf(item), 1)
          this.toggleItemInSelectedInstructors(item.id, true)
          this.sortItemsByProperty(this.activeInstructors, 'last_name')
          this.sortItemsByProperty(this.inactiveInstructors, 'last_name')
        } else {
          lodestar(this.$el, 'lodestar', `.instructor-${item.id}`, 'value')
        }
      },
      removeFromActiveInstructorList(item) {
        const foundItem = this.activeInstructors.find((instructor) => instructor.id === item.id)
        this.toggleItemInSelectedInstructors(item.id, false)
        this.activeInstructors.splice(this.activeInstructors.indexOf(item), 1)
        this.inactiveInstructors.push(foundItem)
        this.sortItemsByProperty(this.activeInstructors, 'last_name')
        this.sortItemsByProperty(this.inactiveInstructors, 'last_name')
      },
      toggleItemInSelectedInstructors(itemId, value) {
        let selectedItemsWasUpdated = false

        const foundItem = this.activeInstructors.find((item) => item.id === itemId)

        if (foundItem) {
          if (value === true) {
            foundItem.selected = true
            this.selectedInstructors.push(foundItem)
          } else if (value === false) {
            this.selectedInstructors.splice(this.selectedInstructors.indexOf(foundItem), 1)
          }
          selectedItemsWasUpdated = true
        }
      },
      resetInactiveInstructors() {
        this.inactiveInstructors = JSON.parse(JSON.stringify(this.instructors))
        this.sortItemsByProperty(this.inactiveInstructors, 'last_name')
      },
      clearAllActiveInstructors() {
        this.activeInstructors.splice(0, this.activeInstructors.length)
        this.selectedInstructors.splice(0, this.selectedInstructors.length)
        this.resetInactiveInstructors()
      },
      runLodestar() {
        lodestar(this.$el, 'lodestar', '.sim-calendar--filters .sim-calendar--aside--body', 'value')
      },
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
      halfGlyph(number, singularUnit, pluralUnits) {
        const grammaticalUnit = number > 0 && number <= 1 ? singularUnit : pluralUnits
        const glyph = number.toString()
          .replace(/\.5/, '½')
          .replace(/^0/, '') || 0

        return `${glyph} ${grammaticalUnit}`
      },
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
  .sim-flex--row {
    display: flex;
    flex-direction: row;
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
    --timeblock-color: var(--green);
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
