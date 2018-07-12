<template lang="html">
  <div class="sim-calendar" :class="componentClasses">

    <EventDurationIcon />
    <InstructorIcon />
    <CheckboxIcon />
    <ControlIcon />

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
            <div v-for="dayName in dayNames" class="sim-calendar--grid--header--day">
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

  import EventDurationIcon from './EventDurationIcon'
  import InstructorIcon from './InstructorIcon'
  import CheckboxIcon from './CheckboxIcon'
  import ControlIcon from './ControlIcon'

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
      ControlIcon,
    },
    props: {
      canScheduleEvents: {
        type: Boolean,
        default: false,
        required: false,
      },
      isLoading: Boolean,
      eventBlocks: {
        type: Array,
        default: () => [],
      },
      pendingEventBlocks: {
        type: Array,
        default: () => [],
      },
      currentUserAvailabilityBlocks: {
        type: Array,
        default: () => [],
      },
      aggregateUserAvailabilityBlocks: {
        type: Array,
        default: () => [],
      },
      allBlocks: {
        type: Array,
        default: () => [],
      },
      aggregateUserAvailabilitySegments: {
        type: Array,
        default: () => [],
      },
      allSegments: {
        type: Array,
        default: () => [],
      },
      calendarIsUpdating: Boolean,
      date: {
        required: false
      },
      dayNames: Array,
      showExpandedWeek: Boolean,
      dateFormat: String,
      displayMonthName: String,
      displayYear: String,
      displayDate: String,
      bubbleIsOpen: Boolean,
      baseUrl: String,
      currentUserId: String,
      filteredBlocks: Array,
      allInstructorAvailabilityBlocks: Array,
      filteredSegments: Array,
      allInstructorAvailabilitySegments: Array,
      activeMoment: {
        type: Object,
        required: true
      },
      monthDays: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        lastUpdated: Date.now(), // TODO: Not this. - Chad
        rawUserData: {},
        contextSwitch: false,
        hideSlideNavigationControls: false,
        showHistoricalData: true,
        institutions: [],
        departments: [],
        professionalTitles: [],
        instructors: [],
        currentSeat: 1,
        activeInstructors: [],
        activeInstructorIds: [],
        inactiveInstructors: [],
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
      }
    },
    mounted() {
      this.addSlotToActiveInstructorsList()
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

        let currentDay;
        if (this.date){
          currentDay = this.monthDays[this.date.format(this.dateFormat)]
        }

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

        this.$emit('resetMonthDays')

        _.each(activeMonthDays, (day) => {
          this.$emit('setMonthDays', day, {
            date: day,
            isInActiveWeek: activeWeekDays.includes(day),
            currentUserAvailabilityBlocks: this.currentUserAvailabilityBlocks[day] || [],
            aggregateUserAvailabilityBlocks: this.aggregateUserAvailabilityBlocks[day] || [],
            allBlocks: this.allBlocks[day] || [],
            aggregateUserAvailabilitySegments: this.aggregateUserAvailabilitySegments[day] || [],
            allSegments: this.allSegments[day] || [],
            eventBlocks: this.eventBlocks[day] || [],
            pendingEventBlocks: this.pendingEventBlocks[day] || [],
          })
        })

        return activeMonthDays
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

        this.$emit('resetMonthDays')

        _.each(activeMonthDays, (monthDay) => {
          this.$emit('setMonthDays', [monthDay], {
            date: monthDay,
            isInActiveWeek: activeWeekDays.includes(monthDay),
            currentUserAvailabilityBlocks: this.currentUserAvailabilityBlocks[monthDay] || [],
            aggregateUserAvailabilityBlocks: this.filteredBlocks[monthDay] || {},
            allBlocks: this.allInstructorAvailabilityBlocks[monthDay] || {},
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

        this.$emit('resetMonthDays')

        _.each(activeMonthDays, (monthDay) => {
          this.$emit('setMonthDays', [monthDay], {
            date: monthDay,
            isInActiveWeek: activeWeekDays.includes(monthDay),
            currentUserAvailabilityBlocks: this.currentUserAvailabilityBlocks[monthDay] || [],
            aggregateUserAvailabilitySegments: this.filteredSegments[monthDay] || {},
            allSegments: this.allInstructorAvailabilitySegments[monthDay] || {},
            eventBlocks: this.eventBlocks[monthDay] || [],
            pendingEventBlocks: this.pendingEventBlocks[monthDay] || [],
          })
        })
      },
      contextSwitch() {
        const date = moment(this.activeMoment).format(this.dateFormat)
        this.$emit('setActiveDate', date)
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

        this.$emit('filterInstructorAvailabilityBlocks', {
          eventLength: this.filterEventLength,
          date: this.lastUpdated,
          specificInstructorIds: this.activeInstructorIds,
          nonspecificInstructorIds: _.map(this.activeInstructors, (instructor) => instructor.id),
        })

        return this.activeInstructors
      },
      filterEventLength() {
        this.lastUpdated = Date.now()

        this.$emit('filterInstructorAvailabilityBlocks', {
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
        this.$emit('fetchInstructorAvailabilitySegments', date, this.filterEventLength, this.activeInstructorIds, this.activeInstructors)
      },
      fetchCurrentUserAvailabilities(date) {
        this.$emit('fetchCurrentUserAvailabilities', date)
      },
      toggleExpandedWeek() {
        this.showExpandedWeek = !this.showExpandedWeek
        this.$emit('setCalendarExpandWeek', this.showExpandedWeek)
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
      closeBubble() {
        this.$emit('toggleBubbleVisibility', false)
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
        this.$emit('setActiveDate', date)
      },
      loadPreviousMonth() {
        const date = moment(this.activeMoment).subtract(1, 'month').format(this.dateFormat)
        this.closeBubble()
        this.$emit('setActiveDate', date)
      },
      loadNextDay() {
        const date = moment(this.activeMoment).add(1, 'day').format(this.dateFormat)
        this.closeBubble()
        this.$emit('setActiveDate', date)
      },
      loadPrevDay() {
        const date = moment(this.activeMoment).subtract(1, 'day').format(this.dateFormat)
        this.closeBubble()
        this.$emit('setActiveDate', date)
      },
      setTheActiveDateToToday() {
        this.$emit('setTheActiveDateToToday')
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
        this.$emit('setUserAvailabilityBlocksForDay', blocksToUpdate)

        currentUser.saveAvailabilities(
          this.baseUrl,
          this.currentUserId,
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
