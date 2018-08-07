<template>
  <transition name="fade">
    <ul class="sim-timelines">
      <li v-for="segment in segments"
        :class="getHourClasses(segment)"
        @mousedown="createTimeBlock($event, segment)"
      >
        <div v-if="segment === 12" class="sim-timeline--time sim-timeline--icon sim-timeline--icon--noon">
          <SimIconText icon="fa-sun-o"></SimIconText>
        </div>
        <div v-else-if="segment === 0 || segment === 24" class="sim-timeline--time sim-timeline--icon sim-timeline--icon--midnight">
          <SimIconText icon="fa-moon-o"></SimIconText>
        </div>
        <div v-else-if="segment % 1 === 0" class="sim-timeline--time">
          {{ displayHour(segment) }}
        </div>
      </li>
    </ul>
  </transition>
</template>

<script>
  /* eslint no-nested-ternary: 0, comma-dangle: 0 */
  import SimIconText from './IconText'
  import { formatHoursAsMeridians } from '../utilities/date'

  export default {
    components: {
      SimIconText,
    },
    props: {
      showHalfHourTicks: {
        type: Boolean,
        default: true,
      },
    },
    computed: {
      segments() {
        const segments = []
        for (let index = 0; index <= 24; index += this.showHalfHourTicks ? 0.5 : 1) {
          segments.push(index)
        }
        return segments
      },
    },
    methods: {
      displayHour(hour) {
        return formatHoursAsMeridians(hour)
      },
      getHourClasses(hour) {
        const classes = []

        classes.push(
          hour >= 6 && hour <= 17.5
            ? 'is-daytime'
            : 'is-nighttime'
        )
        classes.push(
          hour === 0 || hour === 24
            ? 'is-midnight'
            : (hour === 12)
              ? 'is-noon'
              : ''
        )
        classes.push(
          hour % 1 === 0
            ? `is-hour is-hour-${hour}`
            : `is-half-hour is-hour-${Math.floor(hour)}-half`
        )

        return classes
      },
      createTimeBlock(event, hour) {
        if (event.which === 1) {
          this.$emit('createTimeBlock', hour)
        }
      },
    },
  }
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity 300ms ease-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
