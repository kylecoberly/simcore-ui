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
          <template v-if="context">
            <EventCalendarDay v-for="day in daysInCurrentMonth"
               :key="day.format('YYYY-MM-DD')"
               :day="day"
               :availabilities="getEventAvailabilitiesForDay(day)"
               :today="today"
               :isSelected="isSelected(day)"
               :isInActiveWeek="isInActiveWeek(day)"
               :showExpandedWeek="showExpandedWeek"
               @click.native="setDate(day)"
               @toggleExpandedWeek="toggleExpandedWeek"
            />
          </template>
          <template v-else>
            <CalendarDay v-for="day in daysInCurrentMonth"
               :key="day.format('YYYY-MM-DD')"
               :day="day"
               :availabilities="getAvailabilitiesForDay(day)"
               :today="today"
               :isSelected="isSelected(day)"
               :isInActiveWeek="isInActiveWeek(day)"
               :showExpandedWeek="showExpandedWeek"
               @updateAvailabilities="updateAvailabilities"
               @click.native="setDate(day)"
               @toggleExpandedWeek="toggleExpandedWeek"
            />
          </template>
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
</template>

<script>
  import moment from 'moment'
  import {filterAvailabilities} from '../utilities/filter-availabilities'

  import CalendarDay from './CalendarDay'
  import EventCalendarDay from './EventCalendarDay'
  import SimBubble from './Bubble'
  import SimSlidePresenter from './SlidePresenter'
  import SimLoader from './Loader'

  export default {
    components: {
      EventCalendarDay,
      CalendarDay,
      SimBubble,
      SimSlidePresenter,
      SimLoader,
    },
    data(){
      return {
        hideSlideNavigationControls: false,
        dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      }
    },
    props: {
      isLoading: Boolean,
      showExpandedWeek: Boolean,
      bubbleIsOpen: Boolean,
      availabilities: {
        type: Object,
        default: () => ({}),
      },
      selectedDate: {
        type: Object,
        required: true,
      },
      today: Object,
      context: Boolean,
      totalAvailabilities: Array,
      filters: Object,
    },
    computed: {
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
      filteredAvailabilities(){
        return filterAvailabilities([...this.totalAvailabilities], this.filters)
      }
    },
    methods: {
      toggleExpandedWeek(){
        this.$emit('toggleExpandedWeek')
      },
      setDate(date){
        this.$emit('setDate', date)
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
      isSelected(day){
        return day.isSame(this.selectedDate, 'day')
      },
      isInActiveWeek(day){
        return day.isSame(this.selectedDate, 'week')
      }
    },
  }
</script>
