<template lang="html">
  <ul class="sim-timelines">
    <li v-for="segment in totalSegments" @mousedown="emitCreateTimeBlock($event, segment-1)" :class="setHourClasses(segment-1)">
      <template v-if="showLineNumbersAsTime">
        <div v-if="segment === 13" class="sim-timeline--icon sim-timeline--icon--noon">
          <SimIconText icon="fa-sun-o"></SimIconText>
        </div>
        <div v-else-if="segment === 1 || segment === 25" class="sim-timeline--icon sim-timeline--icon--midnight">
          <SimIconText icon="fa-moon-o"></SimIconText>
        </div>
        <div v-else-if="isWholeNumber(segment)" class="sim-timeline--time">
          {{ displayHour(segment-1) }}
        </div>
      </template>
      <template v-else-if="showLineNumbersAsNumbers">
        <div v-if="isWholeNumber(segment)" class="sim-timepicker--time">
          {{ segment-1 }}
        </div>
      </template>
    </li>
  </ul>
</template>

<script>
  import moment from 'moment'
  import SimIconText from './IconText'

  export default {
    name: 'sim-timelines',
    components: {
      SimIconText,
    },
    props: {
      mode: {
        type: String,
        default: 'hours',
      },
      start: {
        type: Number,
        default: 0,
      },
      end: {
        type: Number,
        default: 24,
      },
    },
    computed: {
      showLineNumbersAsTime() {
        return this.mode === 'hours'
      },
      showLineNumbersAsNumbers() {
        return this.mode === 'numbers'
      },
      totalSegments() {
        const segments = []
        for (let index = this.start + 1; index <= this.end + 1; index += 0.5) {
          segments.push(index)
        }
        return segments
      },
    },
    methods: {
      isWholeNumber(value) {
        return Math.ceil(parseFloat(value)) === parseInt(value)
      },
      displayHour(hour) {
        hour = hour === 0 || hour === 24 ? 'Midnight' : (hour === 12 ? 'Noon' : hour)

        return hour > 12 ? `${hour - 12}p` : (parseInt(hour) ? `${hour}a` : hour)
      },
      setHourClasses(hour) {
        const classes = []

        if (this.timelineMode === 'hours') {
          if (hour >= 6 && hour <= 17.5) {
            classes.push('is-daytime')
          } else {
            classes.push('is-nighttime')
          }
        }

        if (this.isWholeNumber(hour)) {
          classes.push(`is-hour is-hour-${hour}`)
        } else {
          classes.push(`is-half-hour is-hour-${Math.floor(hour)}-half`)
        }

        return classes
      },
      emitCreateTimeBlock(event, hour) {
        if (event.which === 1) {
          this.$emit('create-time-block', hour)
        }
      },
    },
  }
</script>

<style lang="scss">
  // @import '../styles/timepicker';
</style>
