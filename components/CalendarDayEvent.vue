<template>
  <CalendarDay
    @toggleExpandedWeek="$emit('toggleExpandedWeek')"
    :showExpandedWeek="showExpandedWeek"
    :day="day"
  >
    <TimeLines
      v-if="showTimelines"
      slot="timelines"
      class="sim-calendar--grid--day--timelines"
      :showHalfHourTicks="false"
      @createTimeBlock="createPendingEvent"
    />
    <div class="local--day--blocks local--day--event-blocks">
      <template v-for="event in events">
        <TimeBlockEvent
          :block="event"
          ref="timeBlockEvent"
          @click.native.stop="selectEvent(event)"
        />
      </template>
    </div>
    <div class="local--day--blocks local--day--pending-blocks">
      <TimeBlockPendingEvent
        v-if="pendingEvent"
        ref="pendingEvent"
        :block="pendingEvent"
        @click.native.stop="openBubble"
        @updatePosition="updateBlockPosition"
        @updateTimeBlock="updatePendingEvent"
        @clearPendingEvent="$emit('clearPendingEvent')"
      />
    </div>
    <div
      class="local--day--blocks local--day--aggregate-blocks"
      @click="expandWeek"
     >
    <!--
      <template v-if="availabilities.length">
        <div v-for="(block, index) in availabilities">
          <TimeBlockSpecificAvailability
            v-if="hasOnlySpecificInstructors(block)"
            :key="index"
            :block="block"
            @click.native="createPendingEvent(block, day)"
          />
          <TimeBlockAggregateAvailability
            v-else
            :key="index"
            :block="block"
            @click.native="createPendingEvent(block, day)"
          />
        </div>
      </template>
      <template v-else><TimeBlockNull /></template>
    -->
    </div>
  </CalendarDay>
</template>

<script>
  import CalendarDay from './CalendarDay'
  import TimeLines from './TimeLines'
  import TimeBlockAggregateAvailability from './TimeBlockAggregateAvailability'
  import TimeBlockSpecificAvailability from './TimeBlockSpecificAvailability'
  import TimeBlockPendingEvent from './TimeBlockPendingEvent'
  import TimeBlockEvent from './TimeBlockEvent'
  import TimeBlockNull from './TimeBlockNull'

  export default {
    components: {
      CalendarDay,
      TimeLines,
      TimeBlockAggregateAvailability,
      TimeBlockSpecificAvailability,
      TimeBlockPendingEvent,
      TimeBlockNull,
      TimeBlockEvent,
    },
    extends: CalendarDay,
    props: {
      day: Object,
      availabilities: Array,
      showExpandedWeek: Boolean,
      pendingEvent: Object,
      events: Array,
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
      createPendingEvent(startTime) {
        this.$emit('createPendingEvent', this.day, startTime)
      },
      updateBlockPosition() {
        this.$emit('updateBlockPosition', {
          // Uh oh
          domPosition: this.$refs.timeBlockEvent[0].$el.getBoundingClientRect(),
          offset: {
            x: 0,
            y: 0,
          },
        })
      },
      updatePendingEvent(block) {
        this.$emit('updatePendingEvent', block)
      },
      openBubble() {
        console.log('here?')
        this.$store.dispatch('services/bubble/setOpen', true)
        this.updateBlockPosition()
      },
      hasOnlySpecificInstructors(block) {
          return block.specificInstructors.length
          && !block.generalInstructors.length
      },
      selectEvent(event) {
        this.openBubble()
        this.$emit('selectEvent', event)
      }
    },
  }
</script>

<style lang="scss">
  @import '../styles/calendar-day';
  .local--day--event-blocks {
    margin-left: 1em;
  }
</style>
