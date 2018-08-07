<template>
  <section class="sim-flex--1 sim-flex--column filter-molecule filter--duration">
    <header class="filter-molecule--heading text--orange--lighter">
      <SimIconText icon="#icon--event-duration" icon-type="svg" text="Duration"></SimIconText>
    </header>
    <div class="filter-molecule--options sim-flex--handoff">
      <div class="sim-timepicker sim-timepicker--y">
        <div class="sim-timepicker--inner" :class="{'is-stretching': isStretching}">
          <TimeMeterLines
             :maximumDuration="maximumDuration"
          />
          <TimeMeterBlock
             :duration="duration"
             :maximumDuration="maximumDuration"
             @setDuration="setDuration"
             @setStretching="setStretching"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import TimeMeterLines from './TimeMeterLines'
  import TimeMeterBlock from './TimeMeterBlock'
  import SimIconText from './IconText'

  export default {
    components: {
      TimeMeterLines,
      TimeMeterBlock,
      SimIconText,
    },
    data() {
      return {
        isStretching: false,
        maximumDuration: 6,
      }
    },
    props: {
      duration: Number,
    },
    methods: {
      setStretching(value) {
        this.isStretching = value
      },
      setDuration(value) {
        this.$emit('setDuration', value)
      },
    },
  }
</script>
