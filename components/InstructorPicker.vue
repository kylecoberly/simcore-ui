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
          <li :key="`general-${index}`" :class="`instructor-${instructor.id}`" v-for="(instructor, index) in selectedInstructors">
            <SimAutofinder
              :options="availableInstructors"
              :selectedItem="instructor"
              :canRemove="selectedInstructors.length > 1"
              :isFocused="index === selectedInstructors.length - 1"
              placeholder="Any Available Instructor"
              @select="selectInstructor(index, ...arguments)"
              @clear="clearInstructor(index)"
              @remove="removeInstructor(index)"
              @focusNextItem="focusNextItem(index)"
              @keyup.shift.tab="focusPreviousItem(index)"
              @click.native="focusItem(index)"
            />
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
  import Vue from 'vue'
  import SimIconText from './IconText'
  import SimAutofinder from './Autofinder'

  export default {
    components: {
      SimIconText,
      SimAutofinder,
    },
    data(){
      return {
        currentlyFocusedField: 0,
      }
    },
    props: {
      instructors: Array,
      selectedInstructors: Array,
    },
    computed: {
      selectedInstructorCount(){
        return this.selectedInstructors.length
      },
      availableInstructors(){
        const selectedInstructorIds = this.selectedInstructors.map(instructor => instructor.id)
        return this.instructors.filter(instructor => !selectedInstructorIds.includes(instructor.id))
      },
    },
    methods: {
      addInstructor(instructor){
        this.selectedInstructors.push({ id: -1 })
        this.$emit('setInstructors', this.selectedInstructors)
      },
      removeInstructor(index){
        this.selectedInstructors.splice(index, 1)
        this.$emit('setInstructors', this.selectedInstructors)
      },
      clearInstructor(index){
        Vue.set(this.selectedInstructors, index, { id: -1 })
        this.$emit('setInstructors', this.selectedInstructors)
      },
      selectInstructor(index, instructor){
        Vue.set(this.selectedInstructors, index, instructor)
        this.$emit('setInstructors', this.selectedInstructors)
      },
      focusPreviousItem(index){
        if (index > 0){
          this.currentlyFocusedField = index - 1
        }
      },
      focusItem(index){
        this.currentlyFocusedField = index
      },
      focusNextItem(index){
        if (this.currentlyFocusedField + 1 >= this.selectedInstructorCount){
          this.addInstructor()
        }
        this.currentlyFocusedField = index + 1
      },
    }
  }
</script>

<style lang="scss">
  @import "../styles/datalist";
</style>
