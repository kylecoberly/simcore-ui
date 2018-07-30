<template>
  <Calendar
    :canScheduleEvents="true"
    :date="date"
    :dateFormat="dateFormat"
    :eventBlocks="eventBlocks"
    :pendingEventBlocks="pendingEventBlocks"
    :currentUserAvailabilityBlocks="currentUserAvailabilityBlocks"
    :aggregateUserAvailabilityBlocks="aggregateUserAvailabilityBlocks"
    :allBlocks="allBlocks"
    :aggregateUserAvailabilitySegments="aggregateUserAvailabilitySegments"
    :allSegments="allSegments"
    :xinstructors="instructors"
    :monthDays="monthDays"
    :isLoading="false"
    :bubbleIsOpen="bubbleIsOpen"
    :lastUpdated="lastUpdated"
    :filterEventLength="filterEventLength"
    :activeInstructors="activeInstructors"
    :inactiveInstructors="inactiveInstructors"
    :showExpandedWeek="showExpandedWeek"
    @setDate="setDate"
    @resetMonthDays="resetMonthDays"
    @setMonthDay="setMonthDay"
    @setMonthDayProperty="setMonthDayProperty"
    @setInstructors="setInstructors"
    @setActiveDate="setActiveDate"
    @setSelectedDate="setSelectedDate"
    @setUserAvailabilityBlocksForDay="setUserAvailabilityBlocksForDay"
    @toggleBubbleVisibility="toggleBubbleVisibility"
    @setLastUpdatedToNow="setLastUpdatedToNow"
    @toggleExpandedWeek="toggleExpandedWeek"
    @fetchCurrentUserAvailabilities="fetchCurrentUserAvailabilities"
    @fetchInstructorAvailabilitySegments="fetchInstructorAvailabilitySegments"
    @removeFromInactiveInstructorsList="removeFromInactiveInstructorsList"
    @restoreItemToInactiveInstructorsList="restoreItemToInactiveInstructorsList"
    @addItemToActiveInstructorsList="addItemToActiveInstructorsList"
    @clearItemFromActiveInstructorsList="clearItemFromActiveInstructorsList"
    @removeFromActiveInstructorsList="removeFromActiveInstructorsList"

    :today="today"
    :selectedDate="selectedDate"
    :user="user"
    :instructors="instructors"
    :totalAvailabilities="totalAvailabilities"
    @updateAvailabilities="updateAvailabilities"
  />
</template>

<script>
import eventEditorSlides from '../external/eventEditorSlides'
import users from '../external/users'
import events from '../external/events'
import currentUser from '../external/currentUser'
import availabilities from '../test/e2e/fixtures/availabilities'
import instructors from '../test/e2e/fixtures/purview_users'
import purviewAvailabilities from '../test/e2e/fixtures/purview_availabilities'

import {normalize} from '../utilities/filter-availabilities'

import Calendar from './Calendar'

import _ from 'lodash'
import moment from 'moment'

function totalAvailabilities(){
  return normalize(purviewAvailabilities.users)
}

export default {
  components: {
    Calendar
  },
  data() {
    return {
      calendarIsUpdating: false,
      date: this.$store.state.activeDate.date,
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
      showExpandedWeek: this.$store.state.calendar.expand_week,
      bubbleIsOpen: this.$store.state.bubble.is_open,
      baseUrl: this.$store.state.base_url,
      currentUserId: this.$store.state.currentUser.id,
      filteredBlocks: this.$store.state.availabilities.filteredBlocks || {},
      allInstructorAvailabilityBlocks: this.$store.state.availabilities.allInstructorAvailabilityBlocks || {},
      filteredSegments: this.$store.state.availabilities.filteredSegments || {},
      allInstructorAvailabilitySegments: this.$store.state.availabilities.allInstructorAvailabilitySegments || {},
      filterEventLength: 1,
      lastUpdated: Date.now(),
      activeInstructors: [],
      inactiveInstructors: [],
      activeInstructorIds: [],

      today: moment('2018-07-13'),
      selectedDate: moment('2018-07-13'),
      user: {
        canScheduleEvents: true,
        availabilitiesForCurrentMonth: availabilities.dates,
      },
      allInstructors: instructors.list,
      totalAvailabilities: totalAvailabilities(),
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

    const instructorsPromise = users.getUsers(
      this.$store.state.base_url,
      this.$store.state.currentUser.id,
    )
    instructorsPromise.then((response) => {
      this.$store.commit('setInstructors', response.data.users.list)
    })

  },
  mounted(){
    this.addSlotToActiveInstructorsList()
    this.resetInactiveInstructors()
    this.setTheActiveDateToToday()

    // When the week/month is updated, refresh this day's currentUserAvailabilityBlocks.
    this.$store.watch(this.$store.getters.getActiveDate, () => {
      this.setDate(this.$store.state.activeDate.date)
    })

    this.$store.watch(this.$store.getters.getInstructorsLastUpdated, () => {
      this.setInstructors(this.$store.state.user.instructors)
      this.resetInactiveInstructors()
    })

    this.$store.watch(this.$store.getters.getLastUpdatedAggregateAvailabilityBlocks, () => {
      this.$set(this, 'aggregateUserAvailabilityBlocks', this.$store.state.availabilities.filteredBlocks)
      this.$set(this, 'allBlocks', this.$store.state.availabilities.allInstructorAvailabilityBlocks)

      this.$forceUpdate()
    })

    this.$store.watch(this.$store.getters.getLastUpdatedAggregateAvailabilitySegments, () => {
      this.$set(this, 'aggregateUserAvailabilitySegments', this.$store.state.availabilities.filteredSegments)
      this.$set(this, 'allSegments', this.$store.state.availabilities.allInstructorAvailabilitySegments)

      this.$forceUpdate()
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

        this.setMonthDayProperty(date, 'currentUserAvailabilityBlocks', this.currentUserAvailabilityBlocks[date])
      }
    })

    this.$store.watch(this.$store.getters.getLastUpdatedPendingEventBlocks, (date) => {
      if (date === this.date) {
        this.$set(
          this.pendingEventBlocks,
          [date],
          this.$store.state.events.pendingBlocks[date],
        )

        this.setMonthDayProperty(date, 'pendingEventBlocks', this.pendingEventBlocks[date])
      }
    })
  },
  computed: {
    isLoading() {
      return this.$store.state.availabilities.isLoading
    },
  },
  methods: {
    setTheActiveDateToToday() {
      const date = moment(this.$store.state.activeDate.today).format(this.dateFormat)
      this.toggleBubbleVisibility(false)
      return this.setActiveDate(date)
    },
    saveUpdatedBlocksFromACalendarDay() {
        // TODO: Normalize this for setting any type of block. - Chad
        this.setUserAvailabilityBlocksForDay(blocksToUpdate)

        currentUser.saveAvailabilities(
          this.$store.state.base_url,
          this.$store.state.currentUser.id,
          blocksToUpdate,
        )
    },
    updateAvailabilities(date, availabilities) {
      this.$set(this.user.availabilitiesForCurrentMonth, date.format('YYYY-MM-DD'), availabilities)
    },
    toggleExpandedWeek() {
      this.showExpandedWeek = !this.showExpandedWeek
      this.$store.commit('setCalendarExpandWeek', this.showExpandedWeek)
    },
    fetchInstructorAvailabilitySegments(date) {
      const firstDayOfTheMonth = moment(date).startOf('month').format('YYYY-MM-DD 00:00:00')
      const lastDayOfTheMonth = moment(date).endOf('month').format('YYYY-MM-DD 23:59:59')

      return this.$store.dispatch('getInstructorAvailabilitySegments', {
        baseUrl: this.$store.state.base_url,
        userId: this.$store.state.currentUser.id,
        startDate: firstDayOfTheMonth,
        endDate: lastDayOfTheMonth,
        mock: this.$store.state.mock,
        filtersToApply: {
          eventLength: this.filterEventLength,
          specificInstructorIds: this.activeInstructorIds,
          nonspecificInstructorIds: this.activeInstructors.map(instructor => instructor.id),
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
    addSlotToActiveInstructorsList() {
      this.activeInstructors.push(
        {
          seat: this.currentSeat, // Doesn't refer to anything?
          firstname: '',
          lastname: '',
        })

      this.currentSeat++
    },
    setActiveDate(date) {
      return this.$store.commit('setActiveDate', date)
    },
    setSelectedDate(date) {
      this.selectedDate = moment(date)
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
      return this.inactiveInstructors = _.sortBy([...this.instructors], ['lastname', 'firstname'])
    },
    resetMonthDays(){
      return this.monthDays = {}
    },
    setDate(date){
      this.selectedDate = date
    },
    setMonthDay(day, value){
      this.monthDays[day] = value
    },
    setMonthDayProperty(day, key, value){
      this.$set(this.monthDays[day], key, value)
    },
    setInstructors(instructors){
      this.instructors = instructors
    },
    updateFilterEventLength(length){
      // TODO: Update Vuex available instructors here. - Chad
      this.filterEventLength = this.durationFilterBlocks[0].duration
    },
    setLastUpdatedToNow(){
      this.lastUpdated = Date.now()
    },
    setDays(start, limit) {
      const dateStrings = [start.format(this.dateFormat)]

      for (let i = 1; i < limit; i++) {
        dateStrings.push(start.add(1, 'day').format(this.dateFormat))
      }

      return dateStrings
    },
    removeFromInactiveInstructorsList(item) {
      this.inactiveInstructors = this.inactiveInstructors.filter((element) => element.id !== item.id)
    },
    restoreItemToInactiveInstructorsList(item) {
      if (item.seat) {
        delete item.seat
      }

      if (!this.inactiveInstructors.includes(item)) {
        this.inactiveInstructors.push(item)
        _.sortBy(this.inactiveInstructors, ['lastname', 'firstname'])
      }
    },
    addItemToActiveInstructorsList(item, index) {
      this.activeInstructors.splice(index, 1, item)
      this.removeFromInactiveInstructorsList(item)
    },
    clearItemFromActiveInstructorsList(item) {
      if (this.activeInstructors.includes(item)) {
        this.activeInstructors.splice(this.activeInstructors.indexOf(item), 1, {
          seat: item.seat,
          firstname: '',
          lastname: '',
        })
        this.restoreItemToInactiveInstructorsList(item)
      }
    },
    removeFromActiveInstructorsList(item) {
      this.activeInstructors = this.activeInstructors.filter((element) => element.seat !== item.seat)
      if (item.id) {
        this.restoreItemToInactiveInstructorsList(item)
      }
    },
  },
  watch: {
    filterEventLength() {
      this.setLastUpdatedToNow()

      this.$store.dispatch('filterInstructorAvailabilityBlocks', {
        eventLength: this.filterEventLength,
        date: this.lastUpdated,
        specificInstructorIds: this.activeInstructorIds,
        nonspecificInstructorIds: this.activeInstructors.map(instructor => instructor.id),
      })
    },
    activeInstructors() {
      this.activeInstructorIds = this.activeInstructors.map(instructor => instructor.id)
      this.setLastUpdatedToNow()
      this.$store.dispatch('filterInstructorAvailabilityBlocks', {
        eventLength: this.filterEventLength,
        date: this.lastUpdated,
        specificInstructorIds: this.activeInstructorIds,
        nonspecificInstructorIds: this.activeInstructors.map(instructor => instructor.id),
      })
      return this.activeInstructors
    },
  },
}
</script>
