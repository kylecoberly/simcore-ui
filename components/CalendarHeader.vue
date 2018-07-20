<template>
  <div class="sim-calendar--header">
    <div class="sim-calendar--header--controls sim-calendar--header--controls--months">
      <span class="load-previous-month" @click="$emit('loadPreviousMonth')">
        <SimIconText icon="fa-arrow-left fa-fw"></SimIconText>
      </span>
      <span class="current-month">
        {{ displayDate }}
      </span>
      <span class="load-next-month" @click="$emit('loadNextMonth')">
        <SimIconText icon="fa-arrow-right fa-fw"></SimIconText>
      </span>
    </div>
    <div class="sim-calendar--header--mode" v-if="canScheduleEvents">
      <SimSwitch :value="context" @change="toggleContext" left-label="My Availability" right-label="Schedule Events"/>
    </div>
    <div class="sim-calendar--header--controls sim-calendar--header--controls--days">
      <span class="load-previous-day" @click="$emit('loadPreviousDay')">
        <SimIconText icon="fa-arrow-left fa-fw"></SimIconText>
      </span>
      <span class="load-today" @click="$emit('loadToday')">
        today
      </span>
      <span class="load-next-day" @click="$emit('loadNextDay')">
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
    data(){
      return {
        context: false,
      }
    },
    props: {
      selectedDate: {
        type: Object,
        required: true,
      },
      canScheduleEvents: Boolean,
    },
    computed: {
      displayDate(){
        return this.selectedDate.format('MMMM YYYY')
      }
    },
    methods: {
      toggleContext(){
        this.context = !this.context
        this.$emit('toggleContext')
      },
    },
  }
</script>
