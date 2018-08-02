<template>
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
          <EventCalendarDay v-for="day in daysInCurrentMonth"
            :key="day.format('YYYY-MM-DD')"
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
          <div v-if="endOffset > 0" class="sim-calendar--grid--after"></div>
        </div>

        <SimBubble v-if="pendingEvent"
          :style="bubbleStyles"
          :position="position"
          ref="bubble"
          @keydown.esc="clearPendingEvent"
          @dismiss="clearPendingEvent"
        >
        <SimSlidePresenter :slides="slides"></SimSlidePresenter>
        </SimBubble>
        <div class="sim-loader--shield" v-if="isLoading">
          <SimLoader :is-loading="true"></SimLoader>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import moment from 'moment'

  import EventCalendarDay from './EventCalendarDay'
  import SimBubble from './Bubble'
  import SimSlidePresenter from './SlidePresenter'
  import SimLoader from './Loader'

  export default {
    components: {
      EventCalendarDay,
      SimBubble,
      SimSlidePresenter,
      SimLoader,
    },
    data(){
      return {
        dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        position: {},
        slides: [],
        pendingEvent: null,
      }
    },
    props: {
      showExpandedWeek: Boolean,
      bubbleIsOpen: Boolean,
      filteredAvailabilities: Array,
    },
    computed: {
      dateService(){
        return this.$store.state.services.date
      },
      selectedDate(){
        return this.dateService.selectedDate
      },
      loadingService(){
        return this.$store.state.services.loading
      },
      isLoading(){
        return this.loadingService.isLoading
      },
      startOffset(){
        return moment(this.selectedDate).startOf('month').day()
      },
      endOffset(){
        return 6 - moment(this.selectedDate).endOf('month').day()
      },
      daysInCurrentMonth(){
        const daysInMonth = []
        for (let day = 1, count = this.selectedDate.daysInMonth(); day <= count; day++){
          let dayString = day.toString()
          if (day < 10) {
            dayString = `0${dayString}`
          }
          daysInMonth.push(dayString)
        }
        const currentMonthString = this.selectedDate.format('YYYY-MM-')
        return daysInMonth.map(day => moment(`${currentMonthString}${day}`))
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
      },
      bubbleStyles(){
        return this.getStyles(this.position)
      },
    },
    methods: {
      toggleExpandedWeek(){
        this.$emit('toggleExpandedWeek')
      },
      updateAvailabilities(date, availabilities){
        this.$emit('updateAvailabilities', date, availabilities)
      },
      getAvailabilitiesForDay(date){
        return this.availabilities[date.format('YYYY-MM-DD')] || []
      },
      getEventAvailabilitiesForDay(date){
        return this.filteredAvailabilities.find(day => date.isSame(day.date, 'day')).availabilities
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
      updateBlockPosition(position, day){
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
      isPendingEventToday(pendingEvent, day){
        return pendingEvent
          ? day.isSame(pendingEvent.day, 'day')
            ? pendingEvent
            : undefined
          : undefined
      },
      setDate(date){
        this.$store.dispatch('services/date/setDate', date)
      },
    },
  }
</script>
