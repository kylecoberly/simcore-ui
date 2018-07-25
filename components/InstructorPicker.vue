<template>
  <section class="filter-molecule filter--instructors sim-filter">
    <header class="filter-molecule--heading text--green">
      <SimIconText icon="#icon--instructors-checked" icon-type="svg" :text="`Instructors: ${selectedInstructorCount}`"></SimIconText>
    </header>
    <div class="filter-molecule--options">
      <div class="sim-datalist">
        <transition-group
          name="sim-datalist"
          tag="ul"
          mode="out-in"
        >
          <li :key="`general-${index}`" :class="`instructor-${instructor}`" v-for="(instructor, index) in selectedInstructorsWithFocus">
            <SimAutofinder
              :index="index"
              :options="instructorsWithLabel"
              :canRemove="selectedInstructors.length > 1"
              :selectedItem="instructor"
              placeholder="Any Available Instructor"
              @select="selectInstructor"
              @add="addInstructor"
              @remove="removeInstructor(index)"
              @clear="clearInstructor(index)"
              @focusNextItem="focusNextItem(index)"
            >
            </SimAutofinder>
          </li>
          <li key="add">
            <span class="control--add-item" @click="addInstructor">
              <SimIconText icon="#icon--control--add" icon-type="svg"></SimIconText>
            </span>
          </li>
        </transition-group>
      </div>
    </div>
  </section>
</template>

<script>
  import SimIconText from './IconText'
  import SimAutofinder from './Autofinder'

  export default {
    components: {
      SimIconText,
      SimAutofinder,
    },
    data(){
      return {
        currentlySelectedIndex: 0,
      }
    },
    props: {
      availableInstructors: Array,
      selectedInstructors: Array,
    },
    computed: {
      instructorsWithLabel(){
        return this.availableInstructors.map(instructor => {
          instructor.label = `${instructor.lastname}, ${instructor.firstname}`
          return instructor
        })
      },
      selectedInstructorCount(){
        return this.selectedInstructors.length
      },
      selectedInstructorsWithFocus(){
        return this.selectedInstructors.map((instructor, index) => {
          instructor.isFocused = index == this.currentlySelectedIndex
          return instructor
        })
      }
    },
    methods: {
      addInstructor(){
        this.$emit('addInstructor')
      },
      removeInstructor(index){
        this.$emit('removeInstructor', index)
      },
      selectInstructor(index, id){
        this.$emit('selectInstructor', index, id)
      },
      clearInstructor(index){
        this.$emit('clearInstructor', index)
      },
      focusNextItem(index){
        this.currentlySelectedIndex = index + 1
        if (this.currentlySelectedIndex >= this.selectedInstructorCount - 1){
          this.addInstructor()
        }
      },
    }
  }
</script>

<style lang="scss">
  @import "../styles/datalist";
</style>
