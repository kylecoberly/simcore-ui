<template>
  <div class="sim-calendar--header">
    <div class="sim-calendar--header--controls sim-calendar--header--controls--months">
      <span class="load-previous-month" @click="loadPreviousMonth">
        <SimIconText icon="fa-arrow-left fa-fw"></SimIconText>
      </span>
      <span class="load-current-month" @click="setTheActiveDateToToday">
        {{ displayDate }}
      </span>
      <span class="load-next-month" @click="loadNextMonth">
        <SimIconText icon="fa-arrow-right fa-fw"></SimIconText>
      </span>
    </div>
    <div class="sim-calendar--header--mode" v-if="canScheduleEvents">
      <SimSwitch :context="context" @click="toggleContext" left-label="My Availability" right-label="Schedule Events"/>
    </div>
    <div class="sim-calendar--header--controls sim-calendar--header--controls--days">
      <span class="load-previous-day" @click="loadPrevDay">
        <SimIconText icon="fa-arrow-left fa-fw"></SimIconText>
      </span>
      <span class="load-today" @click="setTheActiveDateToToday">
        today
      </span>
      <span class="load-next-day" @click="loadNextDay">
        <SimIconText icon="fa-arrow-right fa-fw"></SimIconText>
      </span>
    </div>
  </div>
</template>

<script>
  import SimIconText from './IconText'
  import SimSwitch from './Switch'

  export default {
    components: {
      SimIconText,
      SimSwitch
    },
    props: {
      displayDate: String,
      context: Boolean,
      canScheduleEvents: Boolean,
    },
    methods: {
      loadPrevDay(){
        this.$emit('loadPrevDay')
      },
      setTheActiveDateToToday(){
        this.$emit('setTheActiveDateToToday')
      },
      loadNextDay(){
        this.$emit('loadNextDay')
      },
      loadPreviousMonth(){
        this.$emit('loadPreviousMonth')
      },
      loadNextMonth(){
        this.$emit('loadNextMonth')
      },
      toggleContext(){
        this.$emit('toggleContext')
      },
    },
  }
</script>
