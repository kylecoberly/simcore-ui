<template>
  <div class="sim-calendar-day sim-calendar--grid--day"
    :class="dayClasses"
  >
    <div class="local--day">
      <SimTimeLines v-if="showTimelines"
        class="sim-calendar--grid--day--timelines"
        :showHalfHourTicks="false"
        @createTimeBlock="createTimeBlock"
      />
      <div class="sim-calendar--grid--date">{{ day.format('D') }}</div>
      <div class="local--day--blocks local--day--event-blocks"></div>
      <div v-if="!isBeforeToday" class="local--day--blocks local--day--time-blocks">
        <template v-for="(block, index) in availabilities">
          <SimTimeBlock
            theme="available"
            :key="index"
            :index="index"
            :block="block"
            @removeTimeBlock="removeTimeBlock"
            @updateTimeBlock="updateTimeBlock"
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
  import SimTimeBlock from './TimeBlock'

  export default {
    components: {
      SimIconText,
      SimTimeLines,
      SimTimeBlock,
    },
    props: {
      day: Object,
      availabilities: Array,
      showExpandedWeek: Boolean,
    },
    data() {
      return {
        timeBlockDefaultDuration: 1,
      }
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
        const classes = [`day-${dayOfWeek}`]

        const isBeforeToday = this.day.isBefore(this.today, 'day')
        const isToday = this.day.isSame(this.today, 'day')
        const isAfterToday = this.day.isAfter(this.today, 'day')
        if (isBeforeToday) {
          classes.push('is-before-today')
        } else if (isToday) {
          classes.push('is-today')
        } else if (isAfterToday) {
          classes.push('is-after-today')
        }

        const weekdayClassName = [0, 6].includes(dayOfWeek) ? 'is-weekend' : 'is-weekday'
        classes.push(weekdayClassName)

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
      createTimeBlock(hour) {
        const newBlock = {
          startTime: hour,
          duration: this.timeBlockDefaultDuration,
        }
        const availabilities = [...this.availabilities]
        availabilities.push(newBlock)
        this.updateAvailabilities(this.day, availabilities)
      },
      updateAvailabilities(date, availabilities) {
        this.$emit('updateAvailabilities', date, availabilities)
      },
      removeTimeBlock(index) {
        const availabilities = [...this.availabilities]
        availabilities.splice(index, 1)
        this.updateAvailabilities(this.day, availabilities)
      },
      updateTimeBlock(index, value) {
        const availabilities = [...this.availabilities]
        availabilities[index] = value
        this.updateAvailabilities(this.day, availabilities)
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/calendar-day';
</style>
