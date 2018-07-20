<template>
  <aside class="sim-calendar--aside" :class="filterContainerClasses">
    <div class="sim-calendar--aside--header">
      <span><b>Filters</b></span>
    </div>
    <div class="sim-calendar--aside--body" @click="closeBubble">
      <section class="sim-flex--1 sim-flex--column filter-molecule filter--duration">
        <header class="filter-molecule--heading text--orange--lighter"><SimIconText icon="#icon--event-duration" icon-type="svg" text="Duration"></SimIconText></header>
        <div class="filter-molecule--options sim-flex--handoff">
          <SimTimePicker orientation="y"
                        timeline-mode="numbers"
                        block-theme="duration"
                        :show-block-time="false"
                        :time-block-limit="1"
                        :time-block-default-duration="1"
                        :start-time="0"
                        :end-time="6"
                        :block-settings="durationFilterBlockSettings"
                        :duration-filter-blocks="durationFilterBlocks"
                        :date="date"
                        @blocksWereUpdated="updateFilterEventLength"
          />
        </div>
      </section>

      <div class="sim-flex--2">
        <section class="filter-molecule filter--instructors sim-filter">
          <header class="filter-molecule--heading text--green">
            <SimIconText icon="#icon--instructors-checked" icon-type="svg" :text="`Instructors: ${activeInstructorCount}`"></SimIconText>
          </header>
          <div class="filter-molecule--options">
            <SimDatalist :items="activeInstructors" :animate="true">
              <li slot="item" slot-scope="props" :key="props.item.seat" :class="`instructor-${props.item.id}`">
                <SimAutofinder placeholder="Any Available Instructor"
                               :tabIndex="props.index"
                               :item="props.item"
                               :index="props.index"
                               :is-alone="(activeInstructorCount === 1)"
                               :options="inactiveInstructors"
                               @select="addItemToActiveInstructorsList"
                               @clear="clearItemFromActiveInstructorsList"
                               @remove="removeFromActiveInstructorsList"
                               @add-another="addSlotToActiveInstructorsList"
                >
                  <template slot="option" slot-scope="props">
                    {{ props.option.lastname }}, {{ props.option.firstname }}
                  </template>
                </SimAutofinder>
              </li>
              <li slot="static-after" key="after">
                <span class="control--add-item" @click="addSlotToActiveInstructorsList">
                  <SimIconText icon="#icon--control--add" icon-type="svg"></SimIconText>
                </span>
              </li>
            </SimDatalist>
          </div>
        </section>
        <section v-if="false" class="filter-molecule filter--categories">
          <header class="filter-molecule--heading text--blue--lighter"><SimIconText icon="#icon--instructors-exist" icon-type="svg" text="Filters"></SimIconText></header>
          <div class="filter-molecule--options">
            <SimFilterBy xv-if="userTypeIsClient" system-echo="(Filter is not available yet)" label="Facilities" type="institution_id" :list="institutions" @filter="applyFilter"></SimFilterBy>
            <SimFilterBy system-echo="(Filter is not available yet)" label="Departments" type="department_id" :list="departments" @filter="applyFilter"></SimFilterBy>
            <SimFilterBy system-echo="(Filter is not available yet)" label="Professional Titles" type="title_id" :list="professionalTitles" @filter="applyFilter"></SimFilterBy>
          </div>
        </section>
      </div>
    </div>
  </aside>
</template>

<script>
  import SimTimePicker from './TimePicker'
  import SimFilterBy from './FilterBy'
  import SimDatalist from './Datalist'
  import SimIconText from './IconText'
  import SimAutofinder from './Autofinder'

  export default {
    components: {
      SimTimePicker,
      SimFilterBy,
      SimDatalist,
      SimIconText,
      SimAutofinder,
    },
    props: {
      filterContainerClasses: String,
      durationFilterBlockSettings: Object,
      durationFilterBlocks: Array,
      date: Object,
      activeInstructorCount: Number,
      activeInstructors: Array,
      inactiveInstructors: Array,
    },
    methods: {
      closeBubble(){
        this.$emit('closeBubble')
      },
      updateFilterEventLength(){
        this.$emit('updateFilterEventLength')
      },
      addItemToActiveInstructorsList(item, index){
        this.$emit('addItemToActiveInstructorsList', item, index)
      },
      clearItemFromActiveInstructorsList(item){
        this.$emit('clearItemFromActiveInstructorsList', item)
      },
      removeFromActiveInstructorsList(item){
        this.$emit('removeFromActiveInstructorsList', item)
      },
      addSlotToActiveInstructorsList(){
        this.$emit('addSlotToActiveInstructorsList')
      },
      applyFilter(type, data){
        this.$emit('applyFilter', type, data)
      },
    }
  }
</script>

