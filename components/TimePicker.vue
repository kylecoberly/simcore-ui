<template>
  <div class="sim-timepicker sim-timepicker--y">
    <TimePickerControls
       :availabilities="availabilities"
       @removeAllTimeBlocks="removeAllTimeBlocks"
    />
    <div class="sim-timepicker--inner" :class="timelineClasses">
      <SimTimeLines @createTimeBlock="createTimeBlock" />
      <SimTimeBlock v-for="(block, index) in availabilities"
        :key="index"
        :index="index"
        :block="block"
        @setMoving="setMoving"
        @setStretching="setStretching"
        @removeTimeBlock="removeTimeBlock"
        @updateTimeBlock="updateTimeBlock"
      />
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import SimTimeBlock from './TimeBlock'
  import SimTimeLines from './TimeLines'
  import TimePickerControls from './TimePickerControls'

  export default {
    components: {
      SimTimeBlock,
      SimTimeLines,
      TimePickerControls,
    },
    props: {
      availabilities: Array,
    },
    data() {
      return {
        isMoving: false,
        isStretching: false,
        timeBlockDefaultDuration: 1,
      }
    },
    computed: {
      dateService(){
        return this.$store.state.services.date
      },
      selectedDate(){
        return this.dateService.selectedDate
      },
      timelineClasses() {
        const classes = ['is-moveable']
        if (this.isMoving) {
          classes.push('is-moving')
        }
        if (this.isStretching) {
          classes.push('is-stretching')
        }
        return classes.join(' ')
      },
    },
    methods: {
      setMoving(state) {
        this.isMoving = state
      },
      setStretching(state) {
        this.isStretching = state
      },
      createTimeBlock(hour) {
        const newBlock = {
          startTime: hour,
          duration: this.timeBlockDefaultDuration
        }
        const availabilities = [...this.availabilities]
        availabilities.push(newBlock)
        this.$emit('updateAvailabilities', this.selectedDate, availabilities)
      },
      removeTimeBlock(index) {
        const availabilities = [...this.availabilities]
        availabilities.splice(index, 1)
        this.$emit('updateAvailabilities', this.selectedDate, availabilities)
      },
      removeAllTimeBlocks() {
        this.$emit('updateAvailabilities', this.selectedDate, [])
      },
      updateTimeBlock(index, value){
        const availabilities = [...this.availabilities]
        availabilities[index] = value
        this.$emit('updateAvailabilities', this.selectedDate, availabilities)
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/timepicker';
</style>
