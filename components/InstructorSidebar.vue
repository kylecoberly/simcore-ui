<template>
  <aside class="sim-calendar--aside" :class="filterContainerClasses">
    <div class="sim-calendar--aside--header">
      <b>My Availability</b>
    </div>
    <div class="sim-calendar--aside--body">
      <SimTimePicker
        orientation="y"
        timeline-action="mousedown"
        :blocks="currentUserAvailabilityBlocksForCurrentDate"
        :date="date"
        :should-show-date="true"
        :initialEventBlocks="currentDay.eventBlocks"
        :initialPendingEventBlocks="currentDay.pendingEventBlocks"
        :initial-current-user-availability-blocks="currentDay.currentUserAvailabilityBlocks"
        :initialAggregateUserAvailabilityBlocks="currentDay.aggregateUserAvailabilityBlocks"
        @blocksWereUpdated="$emit('saveUpdatedBlocksFromACalendarDay', blocksToUpdate)"
      />
    </div>
  </aside>
</template>

<script>
  import SimTimePicker from './TimePicker'

  export default {
    components: {
      SimTimePicker
    },
    props: {
      date: Object,
      monthDays: Object,
      currentUserAvailabilityBlocksForCurrentDate: Array,
      filterContainerClasses: String,
    },
    computed: {
      defaultCurrentDay() {
        return {
          eventBlocks: [],
          pendingEventBlocks: [],
          currentUserAvailabilityBlocks: [],
          aggregateUserAvailabilityBlocks: [],
          allBlocks: [],
          aggregateUserAvailabilitySegments: [],
          allSegments: [],
        }
      },
      currentDay() {
        let currentDay = this.monthDays[this.dateString]
        return currentDay ? currentDay : this.defaultCurrentDay
      },
      dateString() {
        return this.date.format('YYYY-MM-DD')
      }
    },
  }
</script>
