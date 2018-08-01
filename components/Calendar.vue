<template>
  <div class="sim-calendar" :class="componentClasses">
    <EventDurationIcon />
    <InstructorIcon />
    <CheckboxIcon />
    <ControlIcon />

    <CalendarHeader
       :selectedDate="selectedDate"
       :context="contextSwitch"
       :canScheduleEvents="user.canScheduleEvents"
       @loadPreviousMonth="loadPreviousMonth"
       @loadNextMonth="loadNextMonth"
       @loadPreviousDay="loadPreviousDay"
       @loadToday="loadToday"
       @loadNextDay="loadNextDay"
       @toggleContext="toggleContext"
     />
    <div class="sim-calendar--body">
      <CalendarBody
         :isLoading="isLoading"
         :bubbleIsOpen="bubbleIsOpen"
         :showExpandedWeek="showExpandedWeek"
         :availabilities="user.availabilitiesForCurrentMonth"
         :selectedDate="selectedDate"
         :today="today"
         :context="contextSwitch"
         :totalAvailabilities="totalAvailabilities"
         :filters="filters"
         :pendingEvent="pendingEvent"
         :slides="slides"
         @updateAvailabilities="updateAvailabilities"
         @setDate="setSelectedDate"
         @toggleExpandedWeek="toggleExpandedWeek"
         @createPendingEvent="createPendingEvent"
         @clearPendingEvent="clearPendingEvent"
         @updatePendingEvent="updatePendingEvent"
       />
      <CoordinatorSidebar v-if="isCoordinatorContext"
        :availableInstructors="availableInstructors"
        :selectedInstructors="selectedInstructors"
        :duration="duration"
        @addInstructor="addInstructor"
        @removeInstructor="removeInstructor"
        @selectInstructor="selectInstructor"
        @clearInstructor="clearInstructor"
        @setDuration="setDuration"
      />
      <InstructorSidebar v-else-if="isInstructorContext"
        :userAvailabilities="selectedDateAvailabilities"
        :selectedDate="selectedDate"
        @updateAvailabilities="updateAvailabilities"
        @loadPreviousDay="loadPreviousDay"
        @loadToday="loadToday"
        @loadNextDay="loadNextDay"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'

import { formatTimesForDisplay, formatBlockHoursForDisplay } from '../data/date'

import EventDurationIcon from './EventDurationIcon'
import InstructorIcon from './InstructorIcon'
import CheckboxIcon from './CheckboxIcon'
import ControlIcon from './ControlIcon'

import CalendarHeader from './CalendarHeader'
import CalendarBody from './CalendarBody'
import InstructorSidebar from './InstructorSidebar'
import CoordinatorSidebar from './CoordinatorSidebar'

export default {
  components: {
    EventDurationIcon,
    InstructorIcon,
    CheckboxIcon,
    ControlIcon,
    CalendarHeader,
    CalendarBody,
    InstructorSidebar,
    CoordinatorSidebar,
  },
  props: {
    isLoading: Boolean,
    today: Object,
    selectedDate: Object,
    user: Object,
    instructors: Array,
    totalAvailabilities: Array,
  },
  data() {
    return {
      contextSwitch: false,
      showExpandedWeek: false,

      selectedInstructors: [{id: -1}],
      duration: 1,
      pendingEvent: null,
      bubbleIsOpen: false,
    }
  },
  computed: {
    componentClasses() {
      const classes = [`is-${this.contextLabel}-context`]
      const isCurrentMonth = this.selectedDate.isSame(this.today, 'month')

      if (isCurrentMonth) {
        classes.push('is-current-month')
      }

      if (this.showExpandedWeek || this.bubbleIsOpen) {
        classes.push('is-expanded')
      }

      return classes.join(' ')
    },
    slides(){
      return this.pendingEvent
        ? [{
          title: this.pendingEvent.day.format('dddd, MMMM Do'),
          subtitle: `${formatBlockHoursForDisplay(this.pendingEvent.duration)} • ${formatTimesForDisplay(this.pendingEvent.startTime, this.pendingEvent.duration)}`,
          componentType: 'SimSlideWithAList',
          content: {
            segment_start: (this.pendingEvent.startTime * 2),
            segment_end: (((this.pendingEvent.startTime + this.pendingEvent.duration) * 2) - 1),
            items: this.pendingEvent.instructors
          }
        }]
        : []
/*
      const block = this.block
      const startingSegment = (block.startTime * 2)
      const items = this.$store.state.availabilities.filteredSegments[this.$store.state.activeDate.date][startingSegment]
        ? this.$store.state.availabilities.filteredSegments[this.$store.state.activeDate.date][startingSegment].user_ids
        : []
      const meta = {}
      meta.initialEventDuration = parseFloat(this.block.duration)
      this.$store.commit('addASlide',
        {
          content: {
            items: items,
            specificItems: this.$store.state.availabilities.availabilityInstructors.specific,
            selectedItems: [],
            foundItems: [],
            itemSearch: '',
            start_time: block.startTime,
            end_time: block.startTime + block.duration,
            segment_start: (block.startTime * 2),
            segment_end: (((block.startTime + block.duration) * 2) - 1),
            segments: block.segments,
          },
          meta,
        }
      )
*/
    },
    selectedDateAvailabilities() {
      const selectedDate = this.selectedDate.format('YYYY-MM-DD')
      return this.user.availabilitiesForCurrentMonth[selectedDate] || []
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
    filters() {
      return {
        duration: this.duration,
        instructors: this.selectedInstructors.filter(instructor => instructor.id > 0),
        instructorCount: this.selectedInstructors.length,
      }
    },
    isInstructorContext() {
      return this.contextSwitch === false
    },
    isCoordinatorContext() {
      return this.contextSwitch === true
    },
    contextLabel() {
      return this.isInstructorContext ? 'instructor' : 'coordinator'
    },
    activeInstructorCount() {
      return this.activeInstructors.length
    },
    availableInstructors(){
      const selectedInstructorIds = this.selectedInstructors.map(instructor => instructor.id)
      return this.instructors.filter(instructor => !selectedInstructorIds.includes(instructor.id))
    }
  },
  methods: {
    addInstructor(id){
      const instructor = this.instructors.find(instructor => instructor.id == id)
      this.selectedInstructors.push(instructor || {
        id: -1
      })
    },
    clearInstructor(index){
      Vue.set(this.selectedInstructors, index, {
        id: -1
      })
    },
    removeInstructor(index){
      this.selectedInstructors.splice(index, 1)
    },
    selectInstructor(index, id){
      const instructor = this.instructors.find(instructor => instructor.id == id)
      // also need to take them out of the available array
      Vue.set(this.selectedInstructors, index, instructor)
    },
    toggleExpandedWeek() {
      this.showExpandedWeek = !this.showExpandedWeek
    },
    loadNextMonth() {
      const date = this.selectedDate.add(1, 'month')
      this.$emit('setSelectedDate', date)
    },
    loadPreviousMonth() {
      const date = this.selectedDate.subtract(1, 'month')
      this.$emit('setSelectedDate', date)
    },
    loadNextDay() {
      const date = this.selectedDate.add(1, 'day')
      this.$emit('setSelectedDate', date)
    },
    loadPreviousDay() {
      const date = this.selectedDate.subtract(1, 'day')
      this.$emit('setSelectedDate', date)
    },
    loadToday() {
      this.$emit('setSelectedDate', this.today)
    },
    updateAvailabilities(date, availabilities) {
      this.$emit('updateAvailabilities', date, availabilities)
    },
    setSelectedDate(date){
      this.$emit("setSelectedDate", date)
    },
    toggleContext() {
      this.contextSwitch = !this.contextSwitch
    },
    setDuration(duration) {
      this.duration = duration
    },
    createPendingEvent(block) {
      this.pendingEvent = {
        day: block.day,
        instructors: block.users.map(id => {
          return this.instructors.find(instructor => instructor.id == id)
        }),
        startTime: block.startTime,
        duration: block.duration,
      }
    },
    updatePendingEvent(block){
      this.pendingEvent = block
    },
    clearPendingEvent() {
      this.pendingEvent = null
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
