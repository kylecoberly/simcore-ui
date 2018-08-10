<template>
  <div class="sim-calendar-day sim-calendar--grid--day"
    :class="dayClasses"
  >
    <div class="local--day">
      <slot name="timelines" />
      <div class="sim-calendar--grid--date">{{ day.format('D') }}</div>
      <slot name="events" />
      <slot name="pending-events" />
      <slot name="availabilities" />
      <slot name="aggregates" />
      <div class="sim-calendar--grid--tools">
        <span @click="toggleExpandedWeek">
          <IconText :icon="expandIcon" icon-type="svg" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import IconText from './IconText'

  export default {
    components: {
      IconText,
    },
    props: {
      day: Object,
      availabilities: Array,
      showExpandedWeek: Boolean,
    },
    computed: {
      dateService() {
        return this.$store.state.services.date
      },
      today() {
        return this.dateService.today
      },
      isSelected() {
        return this.dateService.selectedDate.isSame(this.day, 'day')
      },
      isInActiveWeek() {
        return this.dateService.selectedDate.isSame(this.day, 'week')
      },
      isBeforeToday() {
        return this.today.isAfter(this.day, 'day')
      },
      dayClasses() {
        const dayOfWeek = this.day.day()
        const classes = {
          'is-before-today': this.day.isBefore(this.today, 'day'),
          'is-today': this.day.isSame(this.today, 'day'),
          'is-after-today': this.day.isAfter(this.today, 'day'),
          'is-weekend': [0, 6].includes(dayOfWeek),
          'is-weekday': ![0, 6].includes(dayOfWeek),
          'is-in-active-week': this.isInActiveWeek,
          'is-selected': this.isSelected,
        }
        classes[`day-${dayOfWeek}`] = true
        return classes
      },
      expandIcon() {
        return this.showExpandedWeek && this.isInActiveWeek ? '#icon--control--contract' : '#icon--control--expand'
      },
    },
    methods: {
      toggleExpandedWeek() {
        this.$emit('toggleExpandedWeek')
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/calendar-day';
</style>
