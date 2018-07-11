<template lang="html">
  <div class="sim-calendar" :class="componentClasses">

    <EventDurationIcon />
    <InstructorIcon />
    <CheckboxIcon />
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
      <symbol id="icon--control--add" viewBox="0 0 15 15">
        <path class="icon--control--add" fill="#b8e986" d="M7.5,1 C11.0898509,1 14,3.91014913 14,7.5 C14,11.0898509 11.0898509,14 7.5,14 C3.91014913,14 1,11.0898509 1,7.5 C1,3.91014913 3.91014913,1 7.5,1 Z M8.14285714,6.85714286 L8.14285714,3.64285714 C8.14285714,3.28781695 7.8550402,3 7.5,3 C7.1449598,3 6.85714286,3.28781695 6.85714286,3.64285714 L6.85714286,6.85714286 L3.64285714,6.85714286 C3.28781695,6.85714286 3,7.1449598 3,7.5 C3,7.8550402 3.28781695,8.14285714 3.64285714,8.14285714 L6.85714286,8.14285714 L6.85714286,11.3571429 C6.85714286,11.7121831 7.1449598,12 7.5,12 C7.8550402,12 8.14285714,11.7121831 8.14285714,11.3571429 L8.14285714,8.14285714 L11.3571429,8.14285714 C11.7121831,8.14285714 12,7.8550402 12,7.5 C12,7.1449598 11.7121831,6.85714286 11.3571429,6.85714286 L8.14285714,6.85714286 Z"></path>
      </symbol>
      <symbol id="icon--control--x" viewBox="0 0 15 15">
        <path class="icon--control--x" fill="#eeeeee" d="M8.57900857,7.5 L11.27653,10.1975214 C11.57449,10.4954814 11.57449,10.97857 11.27653,11.27653 C10.97857,11.57449 10.4954814,11.57449 10.1975214,11.27653 L7.5,8.57900857 L4.80247857,11.27653 C4.50451858,11.57449 4.02142998,11.57449 3.72346999,11.27653 C3.42551,10.97857 3.42551,10.4954814 3.72346999,10.1975214 L6.42099143,7.5 L3.72346999,4.80247857 C3.42551,4.50451858 3.42551,4.02142998 3.72346999,3.72346999 C4.02142998,3.42551 4.50451858,3.42551 4.80247857,3.72346999 L7.5,6.42099143 L10.1975214,3.72346999 C10.4954814,3.42551 10.97857,3.42551 11.27653,3.72346999 C11.57449,4.02142998 11.57449,4.50451858 11.27653,4.80247857 L8.57900857,7.5 Z"></path>
      </symbol>
      <symbol id="icon--control--minus" viewBox="0 0 15 15">
        <path class="icon--control--minus" fill="#eeeeee" d="M3.75,6.75 L11.25,6.75 C11.6642136,6.75 12,7.08578644 12,7.5 C12,7.91421356 11.6642136,8.25 11.25,8.25 L3.75,8.25 C3.33578644,8.25 3,7.91421356 3,7.5 C3,7.08578644 3.33578644,6.75 3.75,6.75 Z"></path>
      </symbol>
      <symbol id="icon--control--expand" viewBox="0 0 15 15">
        <path class="icon--control--expand" fill="#777777" d="M2.5,6 C1.67157288,6 1,6.67157288 1,7.5 C1,8.32842712 1.67157288,9 2.5,9 L12.5,9 C13.3284271,9 14,8.32842712 14,7.5 C14,6.67157288 13.3284271,6 12.5,6 L2.5,6 Z M2.5,5 L12.5,5 C13.8807119,5 15,6.11928813 15,7.5 C15,8.88071187 13.8807119,10 12.5,10 L2.5,10 C1.11928813,10 1.69088438e-16,8.88071187 0,7.5 C-1.69088438e-16,6.11928813 1.11928813,5 2.5,5 Z M7.5,1 L10,4 L5,4 L7.5,1 Z M7.5,14 L5,11 L10,11 L7.5,14 Z" fill-rule="nonzero"></path>
      </symbol>
      <symbol id="icon--control--contract" viewBox="0 0 15 15">
        <path class="icon--control--contract" fill="#777777" d="M3,1 C1.8954305,1 1,1.8954305 1,3 L1,12 C1,13.1045695 1.8954305,14 3,14 L12,14 C13.1045695,14 14,13.1045695 14,12 L14,3 C14,1.8954305 13.1045695,1 12,1 L3,1 Z M3,0 L12,0 C13.6568542,-3.04359188e-16 15,1.34314575 15,3 L15,12 C15,13.6568542 13.6568542,15 12,15 L3,15 C1.34314575,15 2.02906125e-16,13.6568542 0,12 L0,3 C-2.02906125e-16,1.34314575 1.34314575,3.04359188e-16 3,0 Z M7.5,10 L5,13 L10,13 L7.5,10 Z M7.5,5 L10,2 L5,2 L7.5,5 Z" fill-rule="nonzero"></path>
      </symbol>
    </svg>

    <div class="sim-calendar--header">
      <div class="sim-calendar--header--controls sim-calendar--header--controls--months">
        <span @click="loadPreviousMonth">
          <SimIconText icon="fa-arrow-left fa-fw"></SimIconText>
        </span>
        <span @click="setTheActiveDateToToday">
          {{ displayDate }}
        </span>
        <span @click="loadNextMonth">
          <SimIconText icon="fa-arrow-right fa-fw"></SimIconText>
        </span>
      </div>
      <div class="sim-calendar--header--mode" v-if="canScheduleEvents">
        <SimSwitch v-model="contextSwitch" left-label="My Availability" right-label="Schedule Events"/>
      </div>
      <div class="sim-calendar--header--controls sim-calendar--header--controls--days">
        <span @click="loadPrevDay">
          <SimIconText icon="fa-arrow-left fa-fw"></SimIconText>
        </span>
        <span @click="setTheActiveDateToToday">
          today
        </span>
        <span @click="loadNextDay">
          <SimIconText icon="fa-arrow-right fa-fw"></SimIconText>
        </span>
      </div>
    </div>

    <div class="sim-calendar--body">

      <main class="sim-calendar--main">
        <div class="sim-calendar--grid">
          <div class="sim-calendar--grid--header">
            <div v-for="dayName in $store.state.calendar.settings.day_names" class="sim-calendar--grid--header--day">
              <span class="sim-calendar--grid--header--dayname">
                {{ dayName }}
              </span>
            </div>
          </div>
          <div class="sim-calendar--grid--body">
            <div class="sim-calendar--grid--days" @click.meta="toggleExpandedWeek">

              <div v-if="startOffset > 0" class="sim-calendar--grid--before" :style="{'--offset': startOffset}"></div>

              <CalendarDay v-for="day in monthDays"
                           class="sim-calendar--grid--day"
                           :key="day.date"
                           :date="day.date"
                           :is-in-active-week="day.isInActiveWeek"
                           :show-expanded-week="showExpandedWeek"
                           :show-historical-data="showHistoricalData"
                           :user-context="contextLabel"
                           :initialEventLength="filterEventLength"
                           :has-only-specific-instructors="thereAreOnlySpecificInstructors"
                           :initialEventBlocks="day.eventBlocks"
                           :initialPendingEventBlocks="day.pendingEventBlocks"
                           :initialCurrentUserAvailabilityBlocks="day.currentUserAvailabilityBlocks"
                           :initialAggregateUserAvailabilityBlocks="day.aggregateUserAvailabilityBlocks"
                           :initialAllBlocks="day.allBlocks"
                           :initialAggregateUserAvailabilitySegments="day.aggregateUserAvailabilitySegments"
                           :initialAllSegments="day.allSegments"
                           @blocksWereUpdated="saveUpdatedBlocksFromACalendarDay"
                           @toggle-expanded-week="toggleExpandedWeek"
              />

              <div v-if="endOffset > 0" class="sim-calendar--grid--after"></div>

            </div>

            <SimBubble v-if="bubbleIsOpen">
              <SimSlidePresenter :should-hide-navigation-controls="hideSlideNavigationControls"></SimSlidePresenter>
            </SimBubble>
            <div class="sim-loader--shield" v-if="isLoading">
              <SimLoader :is-loading="true"></SimLoader>
            </div>
          </div>
        </div>
      </main>

      <aside class="sim-calendar--aside" :class="filterContainerClasses">
        <template v-if="isCoordinatorContext">
          <div class="sim-calendar--aside--header">
            <span><b>Filters</b></span>
          </div>
          <div class="sim-calendar--aside--body" @click="closeBubble">
            <section class="sim-flex--1 sim-flex--column filter-molecule filter--duration">
              <header class="filter-molecule--heading text--orange--lighter"><SimIconText icon="#icon--event-duration" icon-type="svg" text="Duration"></SimIconText></header>
              <div class="filter-molecule--options sim-flex--handoff">
                <SimTimePicker orientation="y"
                              timeline-mode="numbers"
                              block-theme="duration"
                              :show-block-time="false"
                              :time-block-limit="1"
                              :time-block-default-duration="1"
                              :start-time="0"
                              :end-time="6"
                              :block-settings="durationFilterBlockSettings"
                              :duration-filter-blocks="durationFilterBlocks"
                              :date="date"
                              @blocksWereUpdated="updateFilterEventLength"
                />
              </div>
            </section>

            <div class="sim-flex--2">
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
              <section v-if="false" class="filter-molecule filter--categories">
                <header class="filter-molecule--heading text--blue--lighter"><SimIconText icon="#icon--instructors-exist" icon-type="svg" text="Filters"></SimIconText></header>
                <div class="filter-molecule--options">
                  <SimFilterBy xv-if="userTypeIsClient" system-echo="(Filter is not available yet)" label="Facilities" type="institution_id" :list="institutions" @filter="applyFilter"></SimFilterBy>
                  <SimFilterBy system-echo="(Filter is not available yet)" label="Departments" type="department_id" :list="departments" @filter="applyFilter"></SimFilterBy>
                  <SimFilterBy system-echo="(Filter is not available yet)" label="Professional Titles" type="title_id" :list="professionalTitles" @filter="applyFilter"></SimFilterBy>
                </div>
              </section>
            </div>
          </div>
        </template>

        <template v-if="isInstructorContext">
          <div class="sim-calendar--aside--header">
            <b>My Availability</b>
          </div>
          <div class="sim-calendar--aside--body">
            <SimTimePicker orientation="y"
                          timeline-action="mousedown"
                          :blocks="currentUserAvailabilityBlocksForCurrentDate"
                          :date="date"
                          :should-show-date="true"
                          :initialEventBlocks="currentDay.eventBlocks"
                          :initialPendingEventBlocks="currentDay.pendingEventBlocks"
                          :initial-current-user-availability-blocks="currentDay.currentUserAvailabilityBlocks"
                          :initialAggregateUserAvailabilityBlocks="currentDay.aggregateUserAvailabilityBlocks"
                          @blocksWereUpdated="saveUpdatedBlocksFromACalendarDay"
            />
          </div>
        </template>
      </aside>

    </div>

  </div>
</template>

<script>
  import moment from 'moment'
  import _ from 'lodash'

  import { lodestar } from '../utilities/animations'

  import currentUser from '../external/currentUser'
  import events from '../external/events'
  import eventEditorSlides from '../external/eventEditorSlides'
  import users from '../external/users'

  import EventDurationIcon from './EventDurationIcon'
  import InstructorIcon from './InstructorIcon'
  import CheckboxIcon from './CheckboxIcon'

  import CalendarDay from './CalendarDay'
  import SimAutocomplete from './Autocomplete'
  import SimAutofinder from './Autofinder'
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
      SimAutofinder,
      SimBubble,
      SimDatalist,
      SimIconText,
      SimFilterBy,
      SimLoader,
      SimSelection,
      SimSlidePresenter,
      SimSwitch,
      SimTimePicker,
      EventDurationIcon,
      InstructorIcon,
      CheckboxIcon,
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
        rawUserData: {},
        contextSwitch: false,
        hideSlideNavigationControls: false,
        showExpandedWeek: this.$store.state.calendar.expand_week,
        showHistoricalData: true,
        calendarIsUpdating: false,
        date: this.$store.state.activeDate.date,
        institutions: [],
        departments: [],
        professionalTitles: [],
        instructors: [],
        currentSeat: 1,
        activeInstructors: [],
        activeInstructorIds: [],
        inactiveInstructors: [],
        eventBlocks: [],
        pendingEventBlocks: [],
        currentUserAvailabilityBlocks: [],
        filterEventLength: 1,
        durationFilterBlocks: [
          {
            startTime: 0,
            duration: 1,
          },
        ],
        durationFilterBlockSettings: {
          showBlockHours: true,
          showBlockTime: false,
          canRemoveBlock: false,
          canResizeBlockStart: false,
          canResizeBlockEnd: true,
          canMoveBlock: false,
        },
        aggregateUserAvailabilityBlocks: [],
        allBlocks: [],
        aggregateUserAvailabilitySegments: [],
        allSegments: [],
        monthDays: {},
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

      const instructorsPromise = users.getUsers(
        this.$store.state.base_url,
        this.$store.state.currentUser.id,
      )
      instructorsPromise.then((response) => {
        this.$store.commit('setInstructors', response.data.users.list)
      })

      this.fetchInstructorAvailabilitySegments(this.activeMoment)
      this.fetchCurrentUserAvailabilities(this.activeMoment)

      this.eventBlocks                        = this.$store.state.events.blocks
      this.pendingEventBlocks                 = this.$store.state.events.pendingBlocks
      this.currentUserAvailabilityBlocks      = this.$store.state.user.availabilities
      this.aggregateUserAvailabilityBlocks    = this.$store.state.availabilities.filteredBlocks
      this.allBlocks                          = this.$store.state.availabilities.allInstructorAvailabilityBlocks
      this.aggregateUserAvailabilitySegments  = this.$store.state.availabilities.filteredSegments
      this.allSegments                        = this.$store.state.availabilities.allInstructorAvailabilitySegments

      // TODO: activate these when we need to build them out - Jase
      // this.institutions = this.$store.state.user.institutions || []
      // this.departments = this.$store.state.user.departments || []
      // this.professionalTitles = this.$store.state.user.professionalTitles || []

      this.instructors = this.$store.state.user.instructors
    },
    mounted() {
      this.setTheActiveDateToToday()
      this.resetInactiveInstructors()
      this.addSlotToActiveInstructorsList()

      this.dateFormat = this.$store.state.calendar.settings.date_format.raw

      // When the week/month is updated, refresh this day's currentUserAvailabilityBlocks.
      this.$store.watch(this.$store.getters.getActiveDate, () => {
        this.date = this.$store.state.activeDate.date
      })

      this.$store.watch(this.$store.getters.getInstructorsLastUpdated, () => {
        this.instructors = this.$store.state.user.instructors
        this.resetInactiveInstructors()
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

          this.$set(this.monthDays[date], 'pendingEventBlocks', this.pendingEventBlocks[date])
        }
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
      currentDay() {
        const defaultCurrentDay = {
          eventBlocks: [],
          pendingEventBlocks: [],
          currentUserAvailabilityBlocks: [],
          aggregateUserAvailabilityBlocks: [],
          allBlocks: [],
          aggregateUserAvailabilitySegments: [],
          allSegments: [],
        }

        let currentDay = this.monthDays[this.date]

        if (currentDay === undefined) {
          currentDay = defaultCurrentDay
        }

        return currentDay
      },
      componentClasses() {
        const classes = [`is-${this.contextLabel}-context`]

        if (this.isCurrentMonth) {
          classes.push('is-current-month')
        }

        if (this.showExpandedWeek || this.bubbleIsOpen) {
          classes.push('is-expanded')
        }

        return classes.join(' ')
      },
      filterContainerClasses() {
        const classes = []

        if (this.isCoordinatorContext) {
          classes.push('sim-calendar--filters')

          if (this.bubbleIsOpen) {
            classes.push('sim-calendar--filters--disabled')
          }
        } else if (this.isInstructorContext) {
          classes.push('sim-calendar--day-control-panel')
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
      startOffset() {
        return moment([this.activeYear, this.activeMonth, 1]).day()
      },
      endOffset() {
        return 6 - moment([this.activeYear, this.activeMonth, this.currentMonthDays.length]).day()
      },
      currentMonthDays() {
        const startOfWeek = moment(this.activeMoment).startOf('week')
        const startOfMonth = moment(this.activeMoment).startOf('month')

        const weekLimit = 7
        const monthLimit = this.activeMoment.daysInMonth()

        const activeMonthDays = this.setDays(startOfMonth, monthLimit)
        const activeWeekDays = this.setDays(startOfWeek, weekLimit)

        this.monthDays = {}

        _.each(activeMonthDays, (day) => {
          this.monthDays[day] = {
            date: day,
            isInActiveWeek: activeWeekDays.includes(day),
            currentUserAvailabilityBlocks: this.currentUserAvailabilityBlocks[day] || [],
            aggregateUserAvailabilityBlocks: this.aggregateUserAvailabilityBlocks[day] || [],
            allBlocks: this.allBlocks[day] || [],
            aggregateUserAvailabilitySegments: this.aggregateUserAvailabilitySegments[day] || [],
            allSegments: this.allSegments[day] || [],
            eventBlocks: this.eventBlocks[day] || [],
            pendingEventBlocks: this.pendingEventBlocks[day] || [],
          }
        })

        return activeMonthDays
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
      isLoading() {
        return this.$store.state.availabilities.isLoading // || this.calendarIsUpdating
      }
    },
    watch: {
      activeMoment(newDate, oldDate) {
        if (!moment(newDate).isSame(oldDate, 'month')) {
          if (this.isCoordinatorContext) {
            this.fetchInstructorAvailabilitySegments(newDate)
          } else {
            this.fetchCurrentUserAvailabilities(newDate)
          }
        }
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
      contextSwitch() {
        const date = moment(this.activeMoment).format(this.dateFormat)
        this.$store.commit('setActiveDate', date)
        if (this.isCoordinatorContext) {
          this.fetchInstructorAvailabilitySegments(date)
        } else {
          this.fetchCurrentUserAvailabilities(date)
        }
        this.closeBubble()
      },
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
      filterEventLength() {
        this.lastUpdated = Date.now()

        this.$store.dispatch(
          'filterInstructorAvailabilityBlocks', {
            eventLength: this.filterEventLength,
            date: this.lastUpdated,
            specificInstructorIds: this.activeInstructorIds,
            nonspecificInstructorIds: _.map(this.activeInstructors, (instructor) => instructor.id),
          })
      },
    },
    methods: {
      updateFilterEventLength() {
        // TODO: Update Vuex available instructors here. - Chad
        this.filterEventLength = this.durationFilterBlocks[0].duration
      },
      fetchInstructorAvailabilitySegments(date) {
        const firstDayOfTheMonth = moment(date).startOf('month').format('YYYY-MM-DD 00:00:00')
        const lastDayOfTheMonth = moment(date).endOf('month').format('YYYY-MM-DD 23:59:59')

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
        this.calendarIsUpdating = true
        const firstDayOfTheMonth = moment(date).startOf('month').format('YYYY-MM-DD 00:00:00')
        const lastDayOfTheMonth = moment(date).endOf('month').format('YYYY-MM-DD 23:59:59')

        const userAvailabilitiesPromise = currentUser.availabilities(
          this.$store.state.base_url,
          this.$store.state.currentUser.id,
          firstDayOfTheMonth,
          lastDayOfTheMonth,
        )
        userAvailabilitiesPromise.then((response) => {
          this.$store.commit('setCurrentUserAvailabilities', { blocks: response.data.dates, date: this.date })
          this.calendarIsUpdating = false
        })
      },
      toggleExpandedWeek() {
        this.showExpandedWeek = !this.showExpandedWeek
        this.$store.commit('setCalendarExpandWeek', this.showExpandedWeek)
      },
      addSlotToActiveInstructorsList() {
        this.activeInstructors.push(
          {
            seat: this.currentSeat,
            firstname: '',
            lastname: '',
          })

        this.currentSeat++
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
      closeBubble() {
        this.$store.commit('toggleBubbleVisibility', false)
      },
      setDays(start, limit) {
        const dateStrings = [start.format(this.dateFormat)]

        for (let i = 1; i < limit; i++) {
          dateStrings.push(start.add(1, 'day').format(this.dateFormat))
        }

        return dateStrings
      },
      loadNextMonth() {
        const date = moment(this.activeMoment).add(1, 'month').format(this.dateFormat)
        this.closeBubble()
        this.$store.commit('setActiveDate', date)
      },
      loadPreviousMonth() {
        const date = moment(this.activeMoment).subtract(1, 'month').format(this.dateFormat)
        this.closeBubble()
        this.$store.commit('setActiveDate', date)
      },
      loadNextDay() {
        const date = moment(this.activeMoment).add(1, 'day').format(this.dateFormat)
        this.closeBubble()
        this.$store.commit('setActiveDate', date)
      },
      loadPrevDay() {
        const date = moment(this.activeMoment).subtract(1, 'day').format(this.dateFormat)
        this.closeBubble()
        this.$store.commit('setActiveDate', date)
      },
      setTheActiveDateToToday() {
        const date = moment().format(this.dateFormat)
        this.closeBubble()
        this.$store.commit('setActiveDate', date)
      },
      applyFilter(type, data) {
          this.filters.find((filter) => filter.type === type).items = data
          this.filteredUsers = this.users.filter((item) => {
            // @FIXME ew this.filters[n]...
            // return this.filters.forEach(filter => filter.items.length ? filter.items.includes(item[filter.type]) : true)

            // legend:  filters[0] = institutions
            //          filters[1] = departments
            //          filters[2] = professionalTitles
            return (this.userTypeIsClient && this.filters[0].items.length ? this.filters[0].items.includes(item[this.filters[0].type]) : true)
                && (this.filters[1].items.length ? this.filters[1].items.includes(item[this.filters[1].type]) : true)
                && (this.filters[2].items.length ? this.filters[2].items.includes(item[this.filters[2].type]) : true)
          })
          // this.bulkCheckState = this.isSetSelectedAlready(this.filteredUsers)
      },
      saveUpdatedBlocksFromACalendarDay(blocksToUpdate) {
        // TODO: Normalize this for setting any type of block. - Chad
        this.$store.commit('setUserAvailabilityBlocksForDay', blocksToUpdate)

        currentUser.saveAvailabilities(
          this.$store.state.base_url,
          this.$store.state.currentUser.id,
          blocksToUpdate,
        )
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/calendar';

  .sim-flex--handoff {flex: 1;display: flex;}
  .sim-flex--1 {flex: 1;}
  .sim-flex--2 {flex: 2;}
  .sim-flex--3 {flex: 3;}
  .sim-flex--4 {flex: 4;}
  .sim-flex--5 {flex: 5;}
  .sim-flex--row {display: flex;flex-direction: row;}
  .sim-flex--row--between {display: flex;flex-direction: row;justify-content: space-between;}
  .sim-flex--row--between--center {display: flex;flex-direction: row;justify-content: space-between;align-items: center;}
  .sim-flex--row--between--baseline {display: flex;flex-direction: row;justify-content: space-between;align-items: baseline;}
  .sim-flex--column {display: flex;flex-direction: column;}

  .control--add-item {
    cursor: pointer;
    transition: transform var(--ms, var(--default-ms, 350ms)) ease-out;

    &:hover {
      transform: scale(1.1);
    }
    &:active:not(:disabled) {
      transform: scale(.9);
    }
  }

  .sim-calendar .sim-bubble {
    top: -1em;
    bottom: -1em;
    width: calc(var(--width-factor, 1) * 25em);
    max-width: 50%;
    &::before,
    &::after {
      top: calc(var(--dink-y) * 1px);
    }
    &--left {
      left: calc(14.285% * var(--x) - .2em);
    }
    &--right {
      left: calc(14.285% * (var(--x) - 1) + .2em);
      transform: translateX(-100%);
    }
  }

  .sim-calendar {
    --switch-color: var(--lighter-grey);
    --switch-color-active: var(--lighter-grey);
    --switch-handle-color: var(--action);
    --timeblock-color: var(--green);
    --bubble-fg: var(--lighter);
    --bubble-bg: var(--dark-grey); //#fcf9e9; //var(--lightest);
    --slide-fg: var(--bubble-fg);
    --slide-bg: var(--bubble-bg);

    .sim-switch input {
      box-shadow: 0 0 0 1px var(--light-grey);
      &::before {
        padding: 1ch;
        color: var(--lightest);
      }
    }

    &.is-instructor-context {
      .sim-calendar--aside {
        width: 20em;
      }

      .sim-calendar--grid--day--timelines {
        cursor: cell;
        left: 50%;
      }
    }

    &.is-coordinator-context {
      .sim-calendar--aside {
        width: 28em;
      }
      .sim-calendar--grid--day--timelines {
        left: 3em;
      }
    }

    .local--day--pending-blocks {
      position: absolute;
      top: 0;
      left: 3em;
      right: 2em;
      bottom: 0;

      .sim-timeblock {
        border: 1px solid var(--lighter);
        box-shadow: 0 .3em 1em -.4em;
        border-radius: .3em;
        --timeblock-color: var(--orange-film);

        .sim-timeblock--info {
          top: 0;
          transform: translateY(0);
          background: var(--orange);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: .2em;
          line-height: 1.1;
        }
        .sim-timeblock--remover {
          --color: var(--orange);
        }
      }
    }
  }

  .filter-molecule {
    .sim-timepicker--y {
      padding: 1em .5em 1em 1em;
      .sim-timepicker--inner {
        width: auto;
      }

      .sim-timeblock .sim-timeblock--info {
        left: 50%;
        transform: translate(-50%, -50%);
        white-space: normal;
        text-align: center;
      }
    }

    &.filter--duration {
      background: var(--shade);
      margin: -1em 1em -1em -1em;
      padding: 1em;
    }

    &.filter--instructors {
      &--seat {
        display: flex;
      }
    }
  }
</style>
