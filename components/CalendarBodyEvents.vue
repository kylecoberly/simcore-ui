<template>
  <CalendarBody>
    <CalendarDayEvent slot="day" v-for="(day, index) in daysInCurrentMonth"
      :key="index"
      :day="day"
      :availabilities="getEventAvailabilitiesForDay(day)"
      :showExpandedWeek="showExpandedWeek"
      :pendingEvent="isPendingEventToday(pendingEvent, day)"
      @click.native="setDate(day)"
      @toggleExpandedWeek="toggleExpandedWeek"
      @createPendingEvent="createPendingEvent"
      @clearPendingEvent="clearPendingEvent"
      @updateBlockPosition="updateBlockPosition(...arguments, day)"
      @updatePendingEvent="updatePendingEvent"
    />
    <Bubble v-if="pendingEvent"
      slot="bubble"
      ref="bubble"
      :style="getStyles(position)"
      :position="position"
      @keydown.esc="clearPendingEvent"
      @dismiss="clearPendingEvent"
    >
      <SlidePresenter :slides="slides" />
    </Bubble>
  </CalendarBody>
</template>

<script>
  /* eslint no-nested-ternary: 0 */
  import dayjs from 'dayjs'

  import CalendarBody from './CalendarBody'
  import CalendarDayEvent from './CalendarDayEvent'
  import Bubble from './Bubble'
  import SlidePresenter from './SlidePresenter'

  import { formatTimesForDisplay, formatBlockHoursForDisplay } from '../utilities/date'

  export default {
    components: {
      CalendarBody,
      CalendarDayEvent,
      Bubble,
      SlidePresenter,
    },
    data() {
      return {
        position: {},
        pendingEvent: null,
      }
    },
    props: {
      showExpandedWeek: Boolean,
      filteredAvailabilities: Array,
      instructors: Array,
    },
    computed: {
      dateService() {
        return this.$store.state.services.date
      },
      selectedDate() {
        return this.dateService.selectedDate
      },
      daysInCurrentMonth() {
        const daysInMonth = []
        for (let day = 1, count = this.selectedDate.daysInMonth(); day <= count; day += 1) {
          let dayString = day.toString()
          if (day < 10) {
            dayString = `0${dayString}`
          }
          daysInMonth.push(dayString)
        }
        const currentMonthString = this.selectedDate.format('YYYY-MM-')
        return daysInMonth.map(day => dayjs(`${currentMonthString}${day}`))
      },
      slides() {
        return this.pendingEvent
          ? [{
            title: this.pendingEvent.day.format('dddd, MMMM Do'),
            subtitle: `${formatBlockHoursForDisplay(this.pendingEvent.duration)} • ${formatTimesForDisplay(this.pendingEvent.startTime, this.pendingEvent.duration)}`,
            componentType: 'SimSlideWithAList',
            content: {
              segment_start: (this.pendingEvent.startTime * 2),
              segment_end: (((this.pendingEvent.startTime + this.pendingEvent.duration) * 2) - 1),
              generalItems: this.pendingEvent.generalInstructors,
              specificItems: this.pendingEvent.specificInstructors,
            },
          }]
          : []
      },
    },
    methods: {
      toggleExpandedWeek() {
        this.$emit('toggleExpandedWeek')
      },
      getEventAvailabilitiesForDay(date) {
        const matchingDay = this.filteredAvailabilities.find(day => date.isSame(day.date, 'day'))
        return matchingDay
          ? matchingDay.availabilities
          : []
      },
      createPendingEvent(block) {
        this.pendingEvent = {
          day: block.day,
          specificInstructors: block.specificInstructors.map(id => {
            return this.instructors.find(instructor => +instructor.id === +id)
          }),
          generalInstructors: block.generalInstructors.map(id => {
            return this.instructors.find(instructor => +instructor.id === +id)
          }),
          startTime: block.startTime,
          duration: block.duration,
        }
      },
      updatePendingEvent(block) {
        this.pendingEvent = block
      },
      clearPendingEvent() {
        this.pendingEvent = null
      },
      getStyles(position) {
        const top = this.$refs.bubble
          ? this.$refs.bubble.$el.getBoundingClientRect().top
          : 0
        const styles = []
        styles.push(`--x: ${parseInt(position.x, 10)}`)
        styles.push(`--y: ${parseInt(position.y, 10)}`)
        styles.push(`--dink-y: ${parseInt(position.dinkY - top, 10)}`)

        return styles.join(';')
      },
      updateBlockPosition(position, day) {
        position.offset.x = day.day() + 1
        this.position = this.getBubblePosition(position)
      },
      getBubblePosition({ domPosition, offset }) {
        const position = {}
        position.dinkY = domPosition.top + domPosition.height / 2
        position.dinkX = domPosition.left + domPosition.width / 2

        position.x = offset.x
        position.y = offset.y

        if (this.position && position.x > this.position.x && position.x > 2) {
          position.orientation = 'right'
        } else if (this.position && this.x < this.position.x && position.x < 6) {
          position.orientation = 'left'
        } else if (this.position.orientation) {
          position.orientation = this.position.orientation
        } else {
          position.orientation = 'right'
        }

        return position
      },
      isPendingEventToday(pendingEvent, day) {
        return pendingEvent
          ? day.isSame(pendingEvent.day, 'day')
            ? pendingEvent
            : undefined
          : undefined
      },
      setDate(date) {
        this.$store.dispatch('services/date/setDate', date)
      },
    },
  }
</script>
