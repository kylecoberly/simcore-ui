<template>
  <aside class="sim-calendar--aside sim-calendar--filters">
    <div class="sim-calendar--aside--header">
      <span><b>Filters</b></span>
    </div>
    <div class="sim-calendar--aside--body">
      <TimeMeter
        :duration="filters.duration"
        @setDuration="setDuration"
      />
      <div class="sim-flex--2">
        <InstructorPicker
          :instructors="instructors"
          :selectedInstructors="filters.instructors"
          @setInstructors="setInstructors"
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
      filters: Object,
      instructors: Array,
    },
    methods: {
      setDuration(duration) {
        const filters = this.deepClone(this.filters)
        filters.duration = duration
        this.$emit('updateFilters', filters)
      },
      setInstructors(instructors) {
        const filters = this.deepClone(this.filters)
        filters.instructors = instructors
        this.$emit('updateFilters', filters)
      },
      deepClone(object){
        return JSON.parse(JSON.stringify(object))
      },
    },
  }
</script>
