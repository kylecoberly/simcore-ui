<template>
  <CalendarDay
    :day="day"
    @toggleExpandedWeek="$emit('toggleExpandedWeek')"
  >
    <TimeLines
      v-if="showTimelines"
      slot="timelines"
      class="sim-calendar--grid--day--timelines"
      :showHalfHourTicks="false"
    />
    <div class="local--day--blocks local--day--event-blocks"></div>
    <div class="local--day--blocks local--day--pending-blocks">
      <TimeBlockPendingEvent
        v-if="pendingEvent"
        :block="pendingEvent"
        @updatePosition="updateBlockPosition"
        @updatePendingEvent="updatePendingEvent"
        @clearPendingEvent="$emit('clearPendingEvent')"
      />
    </div>
    <div class="local--day--blocks local--day--aggregate-blocks">
      <template v-if="availabilities.length">
        <div v-for="(block, index) in availabilities">
          <TimeBlockAggregateAvailability
            :key="index"
            :block="block"
            @click.native="createPendingEvent(block, day)"
          />
        </div>
      </template>
      <template v-else><TimeBlockNull /></template>
    </div>
  </CalendarDay>
</template>

<script>
  import CalendarDay from './CalendarDay'
  import TimeLines from './TimeLines'
  import TimeBlockAggregateAvailability from './TimeBlockAggregateAvailability'
  import TimeBlockPendingEvent from './TimeBlockPendingEvent'
  import TimeBlockNull from './TimeBlockNull'

  export default {
    components: {
      CalendarDay,
      TimeLines,
      TimeBlockAggregateAvailability,
      TimeBlockPendingEvent,
      TimeBlockNull,
    },
    props: {
      day: Object,
      availabilities: Array,
      showExpandedWeek: Boolean,
      pendingEvent: Object,
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
    },
    methods: {
      createPendingEvent(block, day) {
        block.day = day
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