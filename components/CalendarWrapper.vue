<template>
  <Calendar
    :isLoading="isLoading"
    :eventBlocks="eventBlocks"
    :pendingEventBlocks="pendingEventBlocks"
    :currentUserAvailabilityBlocks="currentUserAvailabilityBlocks"
    :aggregateUserAvailabilityBlocks="aggregateUserAvailabilityBlocks"
    :allBlocks="allBlocks"
    :aggregateUserAvailabilitySegments="aggregateUserAvailabilitySegments"
    :allSegments="allSegments"
    :instructors="instructors"
    :activeMoment="activeMoment"
    :calendarIsUpdating="calendarIsUpdating"
    :date="date"
    :dayNames="dayNames"
    :showExpandedWeek="showExpandedWeek"
    :dateFormat="dateFormat"
    :displayMonthName="displayMonthName"
    :displayYear="displayYear"
    :displayDate="displayDate"
    :bubbleIsOpen="bubbleIsOpen"
    :baseUrl="baseUrl"
    :currentUserId="currentUserId"
    :filteredBlocks="filteredBlocks"
    :allInstructorAvailabilityBlocks="allInstructorAvailabilityBlocks"
    :filteredSegments="filteredSegments"
    :allInstructorAvailabilitySegments="allInstructorAvailabilitySegments"
    :inactiveInstructors="inactiveInstructors"
    :monthDays="monthDays"
    @fetchInstructorAvailabilitySegments="fetchInstructorAvailabilitySegments"
    @fetchCurrentUserAvailabilities="fetchCurrentUserAvailabilities"
    @setActiveDate="setActiveDate"
    @filterInstructorAvailabilityBlocks="filterInstructorAvailabilityBlocks"
    @setCalendarExpandWeek="setCalendarExpandWeek"
    @toggleBubbleVisibility="toggleBubbleVisibility"
    @setTheActiveDateToToday="setTheActiveDateToToday"
    @setUserAvailabilityBlocksForDay="setUserAvailabilityBlocksForDay"
    @resetMonthDays="resetMonthDays"
    @setMonthDays="setMonthDays"
  />
</template>

<script>
import eventEditorSlides from '../external/eventEditorSlides'
import users from '../external/users'
import events from '../external/events'
import currentUser from '../external/currentUser'

import Calendar from './Calendar'

import _ from 'lodash'
import moment from 'moment'

export default {
  components: {
    Calendar
  },
  data() {
    return {
      calendarIsUpdating: false,
      date: this.$store.state.activeDate.date,
      inactiveInstructors: [],
      instructors: this.$store.state.user.instructors || [],
      monthDays: {},
      currentUserAvailabilityBlocks: this.$store.state.user.availabilities || {},
      dateFormat: this.$store.state.calendar.settings.date_format.raw,
      eventBlocks: this.$store.state.events.blocks || {},
      pendingEventBlocks: this.$store.state.events.pendingBlocks || {},
      aggregateUserAvailabilityBlocks: this.$store.state.availabilities.filteredBlocks || {},
      allBlocks: this.$store.state.availabilities.allInstructorAvailabilityBlocks || {},
      aggregateUserAvailabilitySegments: this.$store.state.availabilities.filteredSegments || {},
      allSegments: this.$store.state.availabilities.allInstructorAvailabilitySegments || {},
      dayNames: this.$store.state.calendar.settings.day_names,
      showExpandedWeek: this.$store.state.calendar.expand_week,
      bubbleIsOpen: this.$store.state.bubble.is_open,
      baseUrl: this.$store.state.base_url,
      currentUserId: this.$store.state.currentUser.id,
      filteredBlocks: this.$store.state.availabilities.filteredBlocks || {},
      allInstructorAvailabilityBlocks: this.$store.state.availabilities.allInstructorAvailabilityBlocks || {},
      filteredSegments: this.$store.state.availabilities.filteredSegments || {},
      allInstructorAvailabilitySegments: this.$store.state.availabilities.allInstructorAvailabilitySegments || {},
    }
  },
  created () {
    this.$store.commit('setSlideTemplates', eventEditorSlides)
    this.$store.commit('setAllUsers', users.users())
    this.$store.commit('setAggregateEventBlocks', events.events())

    this.$store.commit('setCurrentUser', currentUser.user())
    this.$store.commit('setInstitutions', currentUser.institutions())
    this.$store.commit('setDepartments', currentUser.departments())
    this.$store.commit('setProfessionalTitles', currentUser.professionalTitles())
    this.$store.commit('setInstructors', users.users())
    console.log("all commits done")

    this.fetchInstructorAvailabilitySegments(this.activeMoment)
    this.fetchCurrentUserAvailabilities(this.activeMoment)
    console.log("all fetches fired")

    const instructorsPromise = users.getUsers(
      this.$store.state.base_url,
      this.$store.state.currentUser.id,
    )
    console.log("promise generated")
    return instructorsPromise.then((response) => {
      console.log("promise resolved")
      return this.$store.commit('setInstructors', response.data.users.list)
    })
  },
  mounted(){
    console.log("resetInactiveInstructors")
    this.resetInactiveInstructors()

    // When the week/month is updated, refresh this day's currentUserAvailabilityBlocks.
    this.$store.watch(this.$store.getters.getActiveDate, () => {
      console.log("getActiveDate")
      this.date = this.$store.state.activeDate.date
    })
    this.$store.watch(this.$store.getters.getLastUpdatedAggregateAvailabilityBlocks, () => {
      console.log("getLastUpdate... Blocks")
      this.$set(this, 'aggregateUserAvailabilityBlocks', this.filteredBlocks)
      this.$set(this, 'allBlocks', this.allInstructorAvailabilityBlocks)

      this.$forceUpdate()
    })
    this.$store.watch(this.$store.getters.getLastUpdatedAggregateAvailabilitySegments, () => {
      console.log("getLastUpdate... Segments")
      this.$set(this, 'aggregateUserAvailabilitySegments', this.filteredSegments)
      this.$set(this, 'allSegments', this.allInstructorAvailabilitySegments)

      this.$forceUpdate()
    })
    this.$store.watch(this.$store.getters.getInstructorsLastUpdated, () => {
      console.log("getInstructorsLastUpdated")
      this.resetInactiveInstructors()
    })
    // When a time block is added, updated, or deleted, check to see if it belongs to this date.
    // If so, refresh this day's time blocks.
    this.$store.watch(this.$store.getters.getLastUpdatedCurrentUserAvailabilityBlocks, (date) => {
      console.log("date 1", date)
      if (date === this.date) {
        this.$set(this.currentUserAvailabilityBlocks, [date], this.currentUserAvailabilityBlocks[date])
        //this.$set(this.monthDays[date], 'currentUserAvailabilityBlocks', this.currentUserAvailabilityBlocks[date])
      }
    })
    this.$store.watch(this.$store.getters.getLastUpdatedPendingEventBlocks, (date) => {
      console.log("date 2", date)
      if (date === this.date) {
        this.$set(this.pendingEventBlocks, [date], this.pendingEventBlocks[date])
        //this.$set(this.monthDays[date], 'pendingEventBlocks', this.pendingEventBlocks[date])
      }
    })
  },
  computed: {
    isLoading() {
      return this.$store.state.availabilities.isLoading
    },
    activeMoment() {
      return moment(this.$store.state.activeDate.date)
    },
    displayMonthName() {
      return this.activeMoment.format(this.$store.state.calendar.settings.date_format.month_name)
    },
    displayYear() {
      return this.activeMoment.format(this.$store.state.calendar.settings.date_format.year)
    },
    displayDate() {
      return `${this.displayMonthName} ${this.displayYear}`
    },
  },
  methods: {
    setTheActiveDateToToday() {
      const date = moment().format(this.dateFormat)
      this.toggleBubbleVisibility(false)
      return this.setActiveDate(date)
    },
    fetchInstructorAvailabilitySegments(date, filterEventLength, activeInstructorIds, activeInstructors) {
      const firstDayOfTheMonth = moment(date).startOf('month').format('YYYY-MM-DD 00:00:00')
      const lastDayOfTheMonth = moment(date).endOf('month').format('YYYY-MM-DD 23:59:59')

      return this.$store.dispatch('getInstructorAvailabilitySegments', {
        baseUrl: this.$store.state.base_url,
        userId: this.$store.state.currentUser.id,
        startDate: firstDayOfTheMonth,
        endDate: lastDayOfTheMonth,
        mock: this.$store.state.mock,
        filtersToApply: {
          eventLength: filterEventLength,
          specificInstructorIds: activeInstructorIds,
          nonspecificInstructorIds: _.map(activeInstructors, (instructor) => instructor.id),
        },
      })
    },
    fetchCurrentUserAvailabilities(date) {
      this.calendarIsUpdating = true
      const firstDayOfTheMonth = moment(date).startOf('month').format('YYYY-MM-DD 00:00:00')
      const lastDayOfTheMonth = moment(date).endOf('month').format('YYYY-MM-DD 23:59:59')

      const userAvailabilitiesPromise = currentUser.availabilities(
        this.$store.state.base_url,
        this.$store.state.currentUser.id,
        firstDayOfTheMonth,
        lastDayOfTheMonth,
      )
      return userAvailabilitiesPromise.then((response) => {
        this.calendarIsUpdating = false
        return this.$store.commit('setCurrentUserAvailabilities', { blocks: response.data.dates, date: this.date })
      })
    },
    setActiveDate(date) {
      return this.$store.commit('setActiveDate', date)
    },
    filterInstructorAvailabilityBlocks(filter) {
      return this.$store.dispatch('filterInstructorAvailabilityBlocks', filter)
    },
    setCalendarExpandWeek(status) {
      this.showExpandedWeek = !this.showExpandedWeek
      return this.$store.commit('setCalendarExpandWeek', status)
    },
    toggleBubbleVisibility(status) {
      return this.$store.commit('toggleBubbleVisibility', status)
    },
    setActiveDate(date) {
      return this.$store.commit('setActiveDate', date)
    },
    setUserAvailabilityBlocksForDay(blocksToUpdate) {
      return this.$store.commit('setUserAvailabilityBlocksForDay', blocksToUpdate)
    },
    resetInactiveInstructors() {
      console.log('inst', this.instructors)
      return this.inactiveInstructors = _.sortBy([...this.instructors], ['lastname', 'firstname'])
    },
    resetMonthDays(){
      return this.monthDays = {};
    },
    setMonthDays(key, value){
      return this.$set(this.monthDays, key, value)
    },
  }
}
</script>
