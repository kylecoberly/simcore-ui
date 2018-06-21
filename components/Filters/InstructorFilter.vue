<template>
  <section class="filter-molecule filter--instructors sim-filter">
    <header class="filter-molecule--heading text--green">
      <SimIconText icon="#icon--instructors-checked" icon-type="svg" :text="`Instructors: ${activeInstructorCount}`"></SimIconText>
    </header>
    <div class="filter-molecule--options">
      <SimDatalist :items="activeInstructors" :animate="true">
        <li slot="item" slot-scope="props" :key="props.item.seat" :class="`instructor-${props.item.id}`">
          <SimAutofinder placeholder="Any Available Instructor"
                         :tabIndex="props.index"
                         :item="props.item"
                         :index="props.index"
                         :is-alone="(activeInstructorCount === 1)"
                         :options="inactiveInstructors"
                         @select="addItemToActiveInstructorsList"
                         @clear="clearItemFromActiveInstructorsList"
                         @remove="removeFromActiveInstructorsList"
                         @add-another="addSlotToActiveInstructorsList"
          >
            <template slot="option" slot-scope="props">
              {{ props.option.lastname }}, {{ props.option.firstname }}
            </template>
          </SimAutofinder>
        </li>
        <li slot="static-after" key="after">
          <span class="control--add-item" @click="addSlotToActiveInstructorsList">
            <SimIconText icon="#icon--control--add" icon-type="svg"></SimIconText>
          </span>
        </li>
      </SimDatalist>
    </div>
  </section>
</template>
<script>
import _ from 'lodash'
import moment from 'moment'

import SimAutofinder from '../Autofinder'
import SimDatalist from '../Datalist'
import SimIconText from '../IconText'

export default {
  components: {
    SimAutofinder,
    SimDatalist,
    SimIconText,
  },
  data() {
    return {
      instructors: [],
      activeInstructors: [],
      activeInstructorIds: [],
      inactiveInstructors: [],
    }
  },
  mounted() {
    this.resetInactiveInstructors()
    this.addSlotToActiveInstructorsList()

    // When the week/month is updated, refresh this day's currentUserAvailabilityBlocks.
    this.$store.watch(this.$store.getters.getActiveDate, () => {
      this.date = this.$store.state.activeDate.date
    })

    this.$store.watch(this.$store.getters.getInstructorsLastUpdated, () => {
      this.instructors = this.$store.state.user.instructors
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
  },
  computed: {
    currentUserAvailabilityBlocksForCurrentDate() {
      return this.currentUserAvailabilityBlocks[this.date]
    },
    activeInstructorCount() {
      return this.activeInstructors.length
    },
    specificInstructorIds() {
      return this.activeInstructorIds.filter((id) => id !== undefined)
    },
    specificInstructorCount() {
      return this.specificInstructorIds.length
    },
    thereAreOnlySpecificInstructors() {
      return (this.specificInstructorCount === this.activeInstructorCount)
    },
  },
  watch: {
    activeInstructors() {
      this.activeInstructorIds = _.map(this.activeInstructors, (instructor) => instructor.id)

      this.lastUpdated = Date.now()

      this.$store.dispatch(
        'filterInstructorAvailabilityBlocks', {
          eventLength: this.filterEventLength,
          date: this.lastUpdated,
          specificInstructorIds: this.activeInstructorIds,
          nonspecificInstructorIds: _.map(this.activeInstructors, (instructor) => instructor.id),
        })

      return this.activeInstructors
    },
    aggregateUserAvailabilityBlocks() {
      const startOfWeek = moment(this.activeMoment).startOf('week')
      const startOfMonth = moment(this.activeMoment).startOf('month')

      const weekLimit = 7
      const monthLimit = this.activeMoment.daysInMonth()

      const activeWeekDays = this.setDays(startOfWeek, weekLimit)
      const activeMonthDays = this.setDays(startOfMonth, monthLimit)

      this.monthDays = {}

      _.each(activeMonthDays, (monthDay) => {
        this.$set(this.monthDays, [monthDay], {
          date: monthDay,
          isInActiveWeek: activeWeekDays.includes(monthDay),
          currentUserAvailabilityBlocks: this.currentUserAvailabilityBlocks[monthDay] || [],
          aggregateUserAvailabilityBlocks: this.$store.state.availabilities.filteredBlocks[monthDay] || {},
          allBlocks: this.$store.state.availabilities.allInstructorAvailabilityBlocks[monthDay] || {},
          eventBlocks: this.eventBlocks[monthDay] || [],
          pendingEventBlocks: this.pendingEventBlocks[monthDay] || [],
        })
      })
    },
    aggregateUserAvailabilitySegments() {
      const startOfWeek = moment(this.activeMoment).startOf('week')
      const startOfMonth = moment(this.activeMoment).startOf('month')

      const weekLimit = 7
      const monthLimit = this.activeMoment.daysInMonth()

      const activeWeekDays = this.setDays(startOfWeek, weekLimit)
      const activeMonthDays = this.setDays(startOfMonth, monthLimit)

      this.monthDays = {}

      _.each(activeMonthDays, (monthDay) => {
        this.$set(this.monthDays, [monthDay], {
          date: monthDay,
          isInActiveWeek: activeWeekDays.includes(monthDay),
          currentUserAvailabilityBlocks: this.currentUserAvailabilityBlocks[monthDay] || [],
          aggregateUserAvailabilitySegments: this.$store.state.availabilities.filteredSegments[monthDay] || {},
          allSegments: this.$store.state.availabilities.allInstructorAvailabilitySegments[monthDay] || {},
          eventBlocks: this.eventBlocks[monthDay] || [],
          pendingEventBlocks: this.pendingEventBlocks[monthDay] || [],
        })
      })
    },
  },
  methods: {
    fetchInstructorAvailabilitySegments(date) {
      const firstDayOfTheMonth = moment(date)
        .startOf('month')
        .format('YYYY-MM-DD 00:00:00')
      const lastDayOfTheMonth = moment(date)
        .endOf('month')
        .format('YYYY-MM-DD 23:59:59')

      this.$store.dispatch(
        'getInstructorAvailabilitySegments',
        {
          baseUrl: this.$store.state.base_url,
          userId: this.$store.state.currentUser.id,
          startDate: firstDayOfTheMonth,
          endDate: lastDayOfTheMonth,
          mock: this.$store.state.mock,
          filtersToApply: {
            eventLength: this.filterEventLength,
            specificInstructorIds: this.activeInstructorIds,
            nonspecificInstructorIds: _.map(this.activeInstructors, (instructor) => instructor.id),
          },
        },
      )
    },
    fetchCurrentUserAvailabilities(date) {
      const firstDayOfTheMonth = moment(date)
        .startOf('month')
        .format('YYYY-MM-DD 00:00:00')
      const lastDayOfTheMonth = moment(date)
        .endOf('month')
        .format('YYYY-MM-DD 23:59:59')

      const userAvailabilitiesPromise = currentUser.availabilities(
        this.$store.state.base_url,
        this.$store.state.currentUser.id,
        firstDayOfTheMonth,
        lastDayOfTheMonth,
      )
      userAvailabilitiesPromise.then((response) => {
        this.$store.commit('setCurrentUserAvailabilities', { blocks: response.data.dates, date: this.date })
      })
    },
    addSlotToActiveInstructorsList() {
      this.activeInstructors.push(
        {
          seat: this.currentSeat,
          firstname: '',
          lastname: '',
        })

      this.currentSeat += 1
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
    resetInactiveInstructors() {
      this.inactiveInstructors = _.sortBy([...this.instructors], ['lastname', 'firstname'])
    },
  },
}
</script>
