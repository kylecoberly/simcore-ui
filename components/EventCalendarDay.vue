<template>
  <div class="sim-calendar-day sim-calendar--grid--day"
    :class="dayClasses"
  >
    <div class="local--day">
      <SimTimeLines v-if="showTimelines"
        class="sim-calendar--grid--day--timelines"
        :showHalfHourTicks="false"
      />
      <div class="sim-calendar--grid--date">{{ day.format('D') }}</div>
      <div class="local--day--blocks local--day--event-blocks"></div>
      <div class="local--day--blocks local--day--pending-blocks">
        <PendingEventBlock v-if="pendingEvent"
          :block="pendingEvent"
          @updatePosition="updateBlockPosition"
          @updatePendingEvent="updatePendingEvent"
          @clearPendingEvent="$emit('clearPendingEvent')"
        />
      </div>
      <div v-if="!isBeforeToday" class="local--day--blocks local--day--aggregate-blocks">
        <template v-for="(block, index) in availabilities">
          <EventAvailabilityBlock
            :index="index"
            :block="block"
            @click.native="createPendingEvent(block)"
          />
        </template>
      </div>
      <div class="sim-calendar--grid--tools">
        <span @click="toggleExpandedWeek">
          <SimIconText :icon="expandIcon" icon-type="svg"></SimIconText>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import SimIconText from './IconText'
  import SimTimeLines from './TimeLines'
  import EventAvailabilityBlock from './EventAvailabilityBlock'
  import PendingEventBlock from './PendingEventBlock'

  export default {
    components: {
      SimIconText,
      SimTimeLines,
      EventAvailabilityBlock,
      PendingEventBlock,
    },
    props: {
      day: Object,
      availabilities: [Array, Object],
      showExpandedWeek: Boolean,
      pendingEvent: Object,
    },
    computed: {
      dateService(){
        return this.$store.state.services.date
      },
      today(){
        return this.dateService.today
      },
      isSelected(){
        return this.dateService.selectedDate.isSame(this.day, 'day')
      },
      isInActiveWeek(){
        return this.dateService.selectedDate.isSame(this.day, 'week')
      },
      isBeforeToday() {
        return this.today.isAfter(this.day, 'day')
      },
      dayClasses() {
        const dayOfWeek = this.day.day()
        const classes = [`day-${dayOfWeek}`]

        const isBeforeToday = this.day.isBefore(this.today, 'day')
        const isToday = this.day.isSame(this.today, 'day')
        const isAfterToday = this.day.isAfter(this.today, 'day')
        if (isBeforeToday) {
          classes.push('is-before-today')
        } else if (isToday) {
          classes.push('is-today')
        } else if (isAfterToday){
          classes.push('is-after-today')
        }

        [0, 6].includes(dayOfWeek)
          ? classes.push('is-weekend')
          : classes.push('is-weekday')
        if (this.isInActiveWeek) {
          classes.push('is-in-active-week')
        }
        if (this.isSelected) {
          classes.push(this.selectedClass || 'is-selected')
        }

        return classes.join(' ')
      },
      showTimeBlockControls() {
        return this.showExpandedWeek && this.isInActiveWeek
      },
      showTimelines() {
        return this.isSelected && this.showExpandedWeek
      },
      expandIcon() {
        return this.showExpandedWeek && this.isInActiveWeek ? '#icon--control--contract' : '#icon--control--expand'
      },
    },
    methods: {
      toggleExpandedWeek() {
        this.$emit('toggleExpandedWeek')
      },
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
