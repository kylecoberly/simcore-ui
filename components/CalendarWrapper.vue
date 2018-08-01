<template>
  <Calendar
    :isLoading="false"
    @setDate="setDate"
    @setInstructors="setInstructors"
    @setActiveDate="setActiveDate"
    @setSelectedDate="setSelectedDate"
    @toggleBubbleVisibility="toggleBubbleVisibility"
    @setLastUpdatedToNow="setLastUpdatedToNow"
    @toggleExpandedWeek="toggleExpandedWeek"

    :today="today"
    :selectedDate="selectedDate"
    :user="user"
    :instructors="allInstructors"
    :totalAvailabilities="totalAvailabilities"
    @updateAvailabilities="updateAvailabilities"
  />
</template>

<script>
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
      filterEventLength: 1,
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
  mounted(){
    this.setTheActiveDateToToday()
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
