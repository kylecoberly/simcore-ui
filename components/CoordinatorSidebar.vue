<template>
  <aside class="sim-calendar--aside sim-calendar--filters">
    <div class="sim-calendar--aside--header">
      <span><b>Filters</b></span>
    </div>
    <div class="sim-calendar--aside--body">
      <TimeMeter
         :duration="duration"
         @setDuration="setDuration"
      />
      <div class="sim-flex--2">
        <InstructorPicker
          :availableInstructors="availableInstructors"
          :selectedInstructors="selectedInstructors"
          @addInstructor="addInstructor"
          @removeInstructor="removeInstructor"
          @selectInstructor="selectInstructor"
          @clearInstructor="clearInstructor"
        />
      </div>
    </div>
  </aside>
</template>

<script>
  import TimeMeter from './TimeMeter'
  import InstructorPicker from './InstructorPicker'

  export default {
    components: {
      TimeMeter,
      InstructorPicker,
    },
    props: {
      selectedInstructors: Array,
      availableInstructors: Array,
      duration: Number,
    },
    methods: {
      setDuration(duration){
        this.$emit('setDuration', duration)
      },
      addInstructor(){
        this.$emit('addInstructor')
      },
      removeInstructor(index){
        this.$emit('removeInstructor', index)
      },
      clearInstructor(index){
        this.$emit('clearInstructor', index)
      },
      selectInstructor(index, id){
        this.$emit('selectInstructor', index, id)
      }
    }
  }
</script>
