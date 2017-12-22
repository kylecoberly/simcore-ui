<template lang="html">
  <div class="sim-calendar" :class="componentClasses">

    <div class="sim-calendar--header">
      <div class="sim-calendar--header--title">{{ displayDate }}</div>
      <div class="sim-calendar--header--context" v-if="canScheduleEvents">
        <SimSwitch v-model="contextSwitch" left-label="My Availability" right-label="Schedule Events"/>
      </div>
      <div class="sim-calendar--header--modes">
        <span class="sim-calendar-button sim-button" @click="setCalendarDisplayModeToMonth" :class="{active: isMonthView}">Month</span>
        <span class="sim-calendar-button sim-button" @click="setCalendarDisplayModeToWeek" :class="{active: isWeekView}">Week</span>
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
                             @run-lodestar="runLodestar"
                             @set-bubble-position="prepareTheBubblePosition"
                             @set-bubble-data="prepareTheBubbleData"
                             :key="day.date"
                             :displayMode="displayMode"
                             :date="day.date"
                             :user-context="contextLabel"
                             :initialEventBlocks="day.eventBlocks"
                             :initialPendingEventBlocks="day.pendingEventBlocks"
                             :initialCurrentUserAvailabilityBlocks="day.currentUserAvailabilityBlocks"
                             :initialAggregateUserAvailabilityBlocks="day.aggregateUserAvailabilityBlocks"
                  />
              </template>

              <template v-if="isWeekView">
                <CalendarDay v-for="day in weekDays"
                             class="sim-calendar--grid--day"
                             @blocksWereUpdated="saveUpdatedBlocksFromACalendarDay"
                             @set-bubble-position="prepareTheBubblePosition"
                             @set-bubble-data="prepareTheBubbleData"
                             :key="day.date"
                             :displayMode="displayMode"
                             :date="day.date"
                             :user-context="contextLabel"
                             :initialEventBlocks="day.eventBlocks"
                             :initialPendingEventBlocks="day.pendingEventBlocks"
                             :initialCurrentUserAvailabilityBlocks="day.currentUserAvailabilityBlocks"
                             :initialAggregateUserAvailabilityBlocks="day.aggregateUserAvailabilityBlocks"
                  />
              </template>

              <div v-if="endOffset > 0" class="sim-calendar--grid--after"></div>

            </div>

            <SimBubble v-if="bubbleIsOpen">
              <SimSlidePresenter></SimSlidePresenter>
            </SimBubble>

            <div class="sim-loader--shield" v-if="isLoading">
              <SimLoader :is-loading="true"></SimLoader>
            </div>
          </div>
        </div>
      </main>

      <template v-if="isCoordinatorContext">
        <aside class="sim-calendar--aside sim-calendar--filters" :class="{'sim-calendar--filters--disabled': bubbleIsOpen}">
          <div class="sim-calendar--aside--header">
            <span><b>Availability Filters</b></span>
          </div>
          <div class="sim-calendar--aside--body">
            <div class="sim-flex--1">

              <div xv-if="isMonthView" class="filter-molecule">
                Min. Event Length: <b class="text--aqua">{{ halfGlyph(filterEventLength, 'hour', 'hours') }}</b>
                <br /><br />
                <input type="range" v-model="filterEventLength" :disabled="bubbleIsOpen" min="0.5" max="6" step="0.5" />
              </div>

              <!--<div v-if="false && isMonthView" class="filter-molecule">-->
                <!--Min. Instructors Needed: <b class="text&#45;&#45;aqua">{{ filterInstructorCount }}</b>-->
                <!--<br /><br />-->
                <!--<input type="range" v-model="filterInstructorCount" :disabled="bubbleIsOpen" min="1" max="20" />-->
              <!--</div>-->

              <div class="filter-molecule ghost">
                <SimFilterBy xv-if="userTypeIsClient" system-echo="(Filter is not available yet)" label="Facilities" type="institution_id" :list="institutions" @filter="applyFilter"></SimFilterBy>
                <SimFilterBy system-echo="(Filter is not available yet)" label="Departments" type="department_id" :list="departments" @filter="applyFilter"></SimFilterBy>
                <SimFilterBy system-echo="(Filter is not available yet)" label="Professional Titles" type="title_id" :list="professionalTitles" @filter="applyFilter"></SimFilterBy>
              </div>

              <div class="filter-molecule sim-filter">
                <p class="sim-flex--row">
                  <span class="sim-flex--1">Instructors</span>
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
                <SimAutocomplete placeholder="find instructors..."
                  :options="inactiveInstructors"
                  :should-be-disabled="bubbleIsOpen"
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
            <SimTimePicker orientation="y"
              @blocksWereUpdated="saveUpdatedBlocksFromACalendarDay"
              :blocks="currentUserAvailabilityBlocksForCurrentDate"
              :date="date"
              :should-show-date="true"
              :initialEventBlocks="currentDay.eventBlocks"
              :initialPendingEventBlocks="currentDay.pendingEventBlocks"
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

  import { lodestar } from '../utilities/animations'

  import availabilities from '../external/availabilities'
  import currentUser from '../external/currentUser'
  import events from '../external/events'
  import eventEditorSlides from '../external/eventEditorSlides'
  import users from '../external/users'

  import CalendarDay from './CalendarDay'
  import SimAutocomplete from './Autocomplete'
  import SimBubble from './Bubble'
  import SimDatalist from './Datalist'
  import SimIconText from './IconText'
  import SimFilterBy from './FilterBy'
  import SimLoader from './Loader'
  import SimSelection from './Selection'
  import SimSlidePresenter from './SlidePresenter'
  import SimSwitch from './Switch'
  import SimTimePicker from './TimePicker'

  export default {
    name: 'sim-calendar',
    components: {
      CalendarDay,
      SimAutocomplete,
      SimBubble,
      SimDatalist,
      SimIconText,
      SimFilterBy,
      SimLoader,
      SimSelection,
      SimSlidePresenter,
      SimSwitch,
      SimTimePicker,
    },
    props: {
      canScheduleEvents: {
        type: Boolean,
        default: false,
        required: true,
      },
    },
    data() {
      return {
        lastUpdated: Date.now(), // TODO: Not this. - Chad
        contextSwitch: false,
        calendarIsUpdating: false,
        isLoading: false,
        filterEventLength: 2,
        filterInstructorCount: 1,
        date: this.$store.state.activeDate.date,
        institutions: [],
        departments: [],
        professionalTitles: [],
        instructors: [],
        activeInstructors: [],
        activeInstructorIds: [],
        inactiveInstructors: [],
        selectedInstructors: [],
        eventBlocks: [],
        pendingEventBlocks: [],
        currentUserAvailabilityBlocks: [],
        aggregateUserAvailabilityBlocks: {},
        monthDays: {},
        weekDays: {},
      }
    },
    created() {
      this.$store.commit('setSlideTemplates', eventEditorSlides)
      this.$store.commit('setAllUsers', users.users())
      this.$store.commit('setAggregateEventBlocks', events.events())

      this.$store.commit('setCurrentUser', currentUser.user())
      this.$store.commit('setInstitutions', currentUser.institutions())
      this.$store.commit('setDepartments', currentUser.departments())
      this.$store.commit('setProfessionalTitles', currentUser.professionalTitles())
      this.$store.commit('setInstructors', users.users())

      const firstDayOfTheMonth = moment(this.activeMoment).startOf('month').format('YYYY-MM-DD 00:00:00')
      const lastDayOfTheMonth = moment(this.activeMoment).endOf('month').format('YYYY-MM-DD 23:59:59')

      const userAvailabilitiesPromise = currentUser.availabilities(
        this.$store.state.base_url,
        this.$store.state.currentUser.id,
        firstDayOfTheMonth,
        lastDayOfTheMonth,
      )
      userAvailabilitiesPromise.then((response) => {
        this.$store.commit('setCurrentUserAvailabilities', { blocks: response.data.dates, date: this.date })
      })

      const aggregateAvailabilitiesPromise = availabilities.getAvailabilities(
        this.$store.state.base_url,
        this.$store.state.currentUser.id,
        firstDayOfTheMonth,
        lastDayOfTheMonth,
      )
      aggregateAvailabilitiesPromise.then((response) => {
        const transformedAggregateAvailabilities = availabilities.transform(response.data.users)

        this.$store.commit('setAggregateAvailabilityBlocks', { blocks: transformedAggregateAvailabilities, date: Date.now() })
      })

      this.pendingEventBlocks = this.$store.state.events.pendingBlocks
      this.eventBlocks = this.$store.state.events.blocks
      this.aggregateUserAvailabilityBlocks = this.$store.state.availabilities.blocks
      this.currentUserAvailabilityBlocks = this.$store.state.user.availabilities

      // this.institutions = this.$store.state.user.institutions
      // this.departments = this.$store.state.user.departments
      // this.professionalTitles = this.$store.state.user.professionalTitles
      this.instructors = this.$store.state.user.instructors
    },
    mounted() {
      this.setTheActiveDateToToday()
      this.resetInactiveInstructors()

      // When the week/month is updated, refresh this day's currentUserAvailabilityBlocks.
      this.$store.watch(this.$store.getters.getActiveDate, () => {
        this.date = this.$store.state.activeDate.date
      })

      // When a time block is added, updated, or deleted, check to see if it belongs to this date.
      // If so, refresh this day's time blocks.
      this.$store.watch(this.$store.getters.getLastUpdatedCurrentUserAvailabilityBlocks, (date) => {
        this.currentUserAvailabilityBlocks = this.$store.state.user.availabilities

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
            this.pendingEventBlocks,
            [date],
            this.$store.state.events.pendingBlocks[date],
          )

          if (this.weekDays[date]) {
            this.$set(this.weekDays[date], 'pendingEventBlocks', this.pendingEventBlocks[date])
          }
          this.$set(this.monthDays[date], 'pendingEventBlocks', this.pendingEventBlocks[date])
        }
      })

      this.$store.watch(this.$store.getters.getLastUpdatedAggregateAvailabilityBlocks, () => {
        this.$set(this, 'aggregateUserAvailabilityBlocks', this.$store.state.availabilities.blocks)

        this.$forceUpdate()
      })
    },
    computed: {
      currentDay() {
        const defaultCurrentDay = {
          eventBlocks: [],
          pendingEventBlocks: [],
          currentUserAvailabilityBlocks: [],
          aggregateUserAvailabilityBlocks: [],
        }

        let currentDay = (this.isMonthView) ? this.monthDays[this.date] : this.weekDays[this.date]

        if (currentDay === undefined) {
          currentDay = defaultCurrentDay
        }

        return currentDay
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
            aggregateUserAvailabilityBlocks: this.aggregateUserAvailabilityBlocks[day] || [],
            eventBlocks: this.eventBlocks[day] || [],
            pendingEventBlocks: this.pendingEventBlocks[day] || [],
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
            aggregateUserAvailabilityBlocks: this.aggregateUserAvailabilityBlocks[day] || [],
            eventBlocks: this.eventBlocks[day] || [],
            pendingEventBlocks: this.pendingEventBlocks[day] || [],
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
      bubbleIsOpen() {
        return this.$store.state.bubble.is_open
      },
      thereAreActiveInstructors() {
        return this.activeInstructors.length
      },
      currentUserAvailabilityBlocksForCurrentDate() {
        return this.currentUserAvailabilityBlocks[this.date]
      },
    },
    watch: {
      aggregateUserAvailabilityBlocks() {
        const startOfWeek = moment(this.activeMoment).startOf('week')
        const weekLimit = 7

        const newWeekDaysString = this.setDays(startOfWeek, weekLimit)

        this.weekDays = {}
        _.each(newWeekDaysString, (weekDay) => {
          this.$set(this.weekDays, [weekDay], {
            date: weekDay,
            currentUserAvailabilityBlocks: this.currentUserAvailabilityBlocks[weekDay] || [],
            aggregateUserAvailabilityBlocks: this.$store.state.availabilities.blocks[weekDay] || [],
            eventBlocks: this.eventBlocks[weekDay] || [],
            pendingEventBlocks: this.pendingEventBlocks[weekDay] || [],
          })
        })

        const startOfMonth = moment(this.activeMoment).startOf('month')
        const monthLimit = this.activeMoment.daysInMonth()

        const newMonthDayStrings = this.setDays(startOfMonth, monthLimit)

        this.monthDays = {}
        _.each(newMonthDayStrings, (monthDay) => {
          this.$set(this.monthDays, [monthDay], {
            date: monthDay,
            currentUserAvailabilityBlocks: this.currentUserAvailabilityBlocks[monthDay] || [],
            aggregateUserAvailabilityBlocks: this.$store.state.availabilities.blocks[monthDay] || [],
            eventBlocks: this.eventBlocks[monthDay] || [],
            pendingEventBlocks: this.pendingEventBlocks[monthDay] || [],
          })
        })
      },
      contextSwitch() {
        this.closeBubble()
      },
      displayMode() {
        this.closeBubble()
      },
      calendarIsUpdating(value) {
        this.isLoading = value
      },
      activeInstructors() {
        this.activeInstructorIds = _.map(this.activeInstructors, (instructor) => {
          return instructor.id
        })

        this.lastUpdated = Date.now()
        this.$store.commit('setAggregateAvailabilityBlocks', {
          blocks: availabilities.availabilities({
            minimumDuration: this.filterEventLength,
            filteredInstructors: this.activeInstructorIds,
          }),
          date: this.lastUpdated,
        })

        return this.activeInstructors
      },
      // @FIXME temporay, mocking data update interaction | Jase
      filterEventLength() {
        this.lastUpdated = Date.now()

        this.$store.commit('setAggregateAvailabilityBlocks', {
          blocks: availabilities.availabilities({
            minimumDuration: this.filterEventLength,
            filteredInstructors: this.activeInstructorIds,
          }),
          date: this.lastUpdated,
        })
      }
    },
    methods: {
      formateDateForDisplay(date) {
        return moment(date).format(this.$store.state.calendar.settings.date_format.display)
      },
      formatTimesForDisplay(start, duration) {
        const day = moment().startOf('day')
        const startTime = day.add(start, 'hours').format('h:mma')
        const endTime = day.add(duration, 'hours').format('h:mma')
        return `${startTime.replace(':00', '')} — ${endTime.replace(':00', '')}`
      },
      formatBlockHoursForDisplay(duration) {
        const output = duration.toString()
          .replace(/\.5/, '½')
          .replace(/^0/, '') || 0

        return `${output} ${(duration > 0 && duration <= 1 ? 'hour' : 'hours')}`
      },
      packageSlideContent(bubbleData) {
        return {
          title: this.formateDateForDisplay(bubbleData.date),
          subtitle: `${this.formatTimesForDisplay(bubbleData.block.start, bubbleData.block.duration)} (${this.formatBlockHoursForDisplay(bubbleData.block.duration)})`,
          componentType: bubbleData.slideTemplate, // TODO: Make this dynamic. - Chad/Jase
          content: {
            items: bubbleData.block.user_ids,
            selectedItems: [],
            foundItems: [],
            itemSearch: '',
            start_time: bubbleData.block.start,
            end_time: bubbleData.block.start + bubbleData.block.duration,
          },
          meta: bubbleData.meta,
          // title: this.formateDateForDisplay(this.date),
          // subtitle: this.formatTimesForDisplay(block.start, block.duration),
          // componentType: 'SimSlideWithAnEventForm', // TODO: Make this dynamic. - Chad/Jase
          // content: {},
        }
      },
      prepareTheBubblePosition(bubblePosition) {
        this.$store.commit('updateBubblePosition', bubblePosition)
        this.$store.commit('toggleBubbleVisibility', true)

      },
      prepareTheBubbleData(bubbleData) {
        bubbleData.meta = {}
        bubbleData.meta.initialEventDuration = parseFloat(this.filterEventLength)

        this.$store.commit('resetHistory')
        this.$store.commit('addASlide', this.packageSlideContent(bubbleData))

        // window.console.log('prepareTheBubbleData ** ', bubbleData)
      },
      // @TODO move to common utilities or use Lowdash? meh... - Jase
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
        this.closeBubble()
        lodestar(this.$el, 'lodestar', '.sim-calendar--filters .sim-calendar--aside--body', 'value')
      },
      isCurrentDay(date) {
        return moment().isSame(date, 'day')
      },
      closeBubble() {
        this.$store.commit('toggleBubbleVisibility', false)
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

        this.closeBubble()
        this.$store.commit('setActiveDate', nextDays)
      },
      loadPrevDays() {
        const previousDays = moment(this.activeMoment).subtract(1, this.displayMode)
          .format(this.$store.state.calendar.settings.date_format.raw)

        this.closeBubble()
        this.$store.commit('setActiveDate', previousDays)
      },
      setTheActiveDateToToday() {
        this.closeBubble()
        this.$store.commit('setActiveDate', moment().format(this.$store.state.calendar.settings.date_format.raw))
      },
      setCalendarDisplayModeToMonth() {
        this.$store.commit('setCalendarDisplayModeToMonth')
      },
      setCalendarDisplayModeToWeek() {
        this.$store.commit('setCalendarDisplayModeToWeek')
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
      applyFilter(type, data) {
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
      saveUpdatedBlocksFromACalendarDay(blocksToUpdate) {
        // TODO: Normalize this for setting any type of block. - Chad
        this.$store.commit('setUserAvailabilityBlocksForDay', blocksToUpdate)

        currentUser.saveAvailabilities(blocksToUpdate)
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
    // --bubble-fg: var(--dark);
    // --bubble-bg: var(--light);
    top: -1em;
    bottom: -1em;
    width: calc(var(--width-factor, 1) * 20em);
    max-width: 50%;
    &::after {
      top: calc(var(--dink-y) * 1px);
    }
    &--left {
      left: calc(14.285% * var(--x));
    }
    &--right {
      left: calc(14.285% * (var(--x) - 1));
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
