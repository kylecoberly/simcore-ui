<template>
  <aside class="sim-calendar--aside sim-calendar--filters" :class="{'sim-calendar--filters--disabled': isDisabled}">
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
  import { deepClone } from '../utilities/deep-clone'

  export default {
    components: {
      TimeMeter,
      InstructorPicker,
    },
    props: {
      filters: Object,
      instructors: Array,
      isDisabled: Boolean,
    },
    methods: {
      setDuration(duration) {
        const filters = deepClone(this.filters)
        filters.duration = duration
        this.$emit('updateFilters', filters)
      },
      setInstructors(instructors) {
        const filters = deepClone(this.filters)
        filters.instructors = instructors
        this.$emit('updateFilters', filters)
      },
    },
  }
</script>
