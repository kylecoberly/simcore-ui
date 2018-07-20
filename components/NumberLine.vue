<template>
  <transition name="fade">
    <ul class="sim-timelines">
      <li v-for="segment in segments"
        :class="getHourClasses(segment)"
        @mousedown="createTimeblock($event, segment)"
      >
        <div v-if="isWholeNumber(segment)" class="sim-timeline--time">
          {{ segment }}
        </div>
      </li>
    </ul>
  </transition>
</template>

<script>
  export default {
    computed: {
      segments() {
        let segments = []
        for (let index = 0; index <= 24; index += 0.5) {
          segments.push(index)
        }
        return segments
      },
    },
    methods: {
      isWholeNumber(value) {
        return Math.ceil(parseFloat(value)) === parseInt(value)
      },
      getHourClasses(hour) {
        const classes = []

        classes.push(
          (hour >= 6 && hour <= 17.5)
            ? 'is-daytime'
            : 'is-nighttime'
        )
        classes.push(
          (hour === 0 || hour === 24)
            ? 'is-midnight'
            : (hour === 12)
              ? 'is-noon'
              : ''
        )
        classes.push(
          this.isWholeNumber(hour)
            ? `is-hour is-hour-${hour}`
            : `is-half-hour is-hour-${Math.floor(hour)}-half`
        )

        return classes
      },
      createTimeBlock(event, hour) {
        if (event.which === 1) {
          this.$emit('createTimeblock', hour)
        }
      },
    },
  }
</script>

<style lang="scss">
  // @import '../styles/timelines';
  .fade-enter-active, .fade-leave-active {
    transition: opacity 300ms ease-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

