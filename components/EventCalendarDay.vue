<template>
  <CalendarDay
    :day="day"
    @toggleExpandedWeek="$emit('toggleExpandedWeek')"
  >
    <TimeLines v-if="showTimelines"
      slot="timelines"
      class="sim-calendar--grid--day--timelines"
      :showHalfHourTicks="false"
    />
    <div
      class="local--day--blocks local--day--event-blocks"
      slot="events"
    ></div>
    <div
      class="local--day--blocks local--day--pending-blocks"
      slot="pending-events"
    >
      <PendingEventBlock v-if="pendingEvent"
        :block="pendingEvent"
        @updatePosition="updateBlockPosition"
        @updatePendingEvent="updatePendingEvent"
        @clearPendingEvent="$emit('clearPendingEvent')"
      />
    </div>
    <div
      v-if="!isBeforeToday"
      class="local--day--blocks local--day--aggregate-blocks"
      slot="aggregates"
    >
      <div v-for="(block, index) in availabilities"
        slot="aggregates"
      >
        <EventAvailabilityBlock
          :index="index"
          :block="block"
          @click.native="createPendingEvent(block)"
        />
      </div>
    </div>
  </CalendarDay>
</template>

<script>
  import CalendarDay from './CalendarDay'
  import TimeLines from './TimeLines'
  import EventAvailabilityBlock from './EventAvailabilityBlock'
  import PendingEventBlock from './PendingEventBlock'

  export default {
    components: {
      CalendarDay,
      TimeLines,
      EventAvailabilityBlock,
      PendingEventBlock,
    },
    props: {
      day: Object,
      availabilities: [Array, Object],
      showExpandedWeek: Boolean,
      pendingEvent: Object, // Needs to be an array, could be multiple
    },
    computed: {
      dateService() {
        return this.$store.state.services.date
      },
      isSelected() {
        return this.dateService.selectedDate.isSame(this.day, 'day')
      },
      showTimelines() {
        return this.isSelected && this.showExpandedWeek
      },
      today() {
        return this.dateService.today
      },
      isBeforeToday() {
        return this.today.isAfter(this.day, 'day')
      },
    },
    methods: {
      createPendingEvent(block) {
        block.day = this.day
        this.$emit('createPendingEvent', block)
      },
      updateBlockPosition(position) {
        this.$emit('updateBlockPosition', position)
      },
      updatePendingEvent(block) {
        this.$emit('updatePendingEvent', block)
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/calendar-day';
</style>
