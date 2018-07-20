<template>
  <div class="sim-timepicker sim-timepicker--y">
    <TimePickerControls
       :selectedDate="selectedDate"
       :userAvailabilities="userAvailabilities"
       @loadPreviousDay="$emit('loadPreviousDay')"
       @loadNextDay="$emit('loadNextDay')"
       @removeAllTimeBlocks="removeAllTimeBlocks"
    />
    <div class="sim-timepicker--inner" :class="timelineClasses">
      <SimTimeLines @createTimeBlock="createTimeBlock" />
      <SimTimeBlock v-for="(block, index) in userAvailabilities"
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
      userAvailabilities: Array,
      selectedDate: Object,
    },
    data() {
      return {
        isMoving: false,
        isStretching: false,
        timeBlockDefaultDuration: 1,
      }
    },
    computed: {
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
        const userAvailabilities = [...this.userAvailabilities]
        userAvailabilities.push(newBlock)
        this.$emit('updateAvailabilities', this.selectedDate, userAvailabilities)
      },
      removeTimeBlock(index) {
        const userAvailabilities = [...this.userAvailabilities]
        userAvailabilities.splice(index, 1)
        this.$emit('updateAvailabilities', this.selectedDate, userAvailabilities)
      },
      removeAllTimeBlocks() {
        this.$emit('updateAvailabilities', this.selectedDate, [])
      },
      updateTimeBlock(index, value){
        const userAvailabilities = [...this.userAvailabilities]
        userAvailabilities[index] = value
        this.$emit('updateAvailabilities', this.selectedDate, userAvailabilities)
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/timepicker';
</style>
