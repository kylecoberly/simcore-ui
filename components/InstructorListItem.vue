<template>
  <div class="sim-autofinder sim-autofinder--visible-options">
    <label class="sim-autofinder--search">
      <SimIconText icon="#icon--checkbox--checked" icon-type="svg"></SimIconText>
      <input type="text" class="sim-autofinder--search--input" :value="instructor.label" />
      <div class="sim-autofinder--remove-item" @click="removeSpecificInstructor(instructor.id)">
        <SimIconText icon="#icon--control--x" icon-type="svg"></SimIconText>
      </div>
    </label>
  </div>
</template>

<script>
  import SimIconText from './IconText'

  export default {
    components: {
      SimIconText,
    },
    props: {
      instructor: Object,
    },
    methods: {
      removeSpecificInstructor() {
        this.$emit('removeSpecificInstructor', this.instructor.id)
      },
    },
  }
</script>
