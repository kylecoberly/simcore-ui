<template lang="html">
  <div class="sim-slide sim-slide--with-form">

    <SimSlideHeader :title="slide.title" :subtitle="slide.subtitle" />

    <SimSlideIntro :content="slide.intro" />

    <div class="sim-slide--content">
      <div class="sim-form sim-form--side-by-side">
        <input type="hidden" v-model="eventFormData.user_id" />

        <div class="sim-form--molecule sim-form--molecule--event-instructors">
          <div class="sim-form--molecule--label"><label>Instructors</label></div>
          <div class="sim-form--molecule--field">
            <input type="hidden" v-model="eventFormData.instructor_ids" />
            <SimDatalist :items="activeInstructors" :animate="true">
              <li slot="static-before" key="static-before" class="text--yellow" v-if="!activeInstructorsCount">
                <SimIconText icon="fa-exclamation-triangle" text="Missing Instructors"></SimIconText>
              </li>
              <li slot="item" slot-scope="props" :key="props.item.id" :class="`instructor-${props.item.id}`">
                <SimIconText icon="fa-check-circle text--green ghost" :text="`${props.item.firstname} ${props.item.lastname}`"></SimIconText>
              </li>
            </SimDatalist>
          </div>
        </div>

        <div class="sim-form--molecule sim-form--molecule--event-facility">
          <div class="sim-form--molecule--label"><label>Location</label></div>
          <div class="sim-form--molecule--field">
            <select v-model="eventFormData.facility_id">
              <option value="">Select a facility...</option>
              <option v-for="facility in facilities" :value="facility.id">
                {{facility.name}}
              </option>
            </select>
          </div>
        </div>

        <div class="sim-form--molecule sim-form--molecule--event-room">
          <div class="sim-form--molecule--label"><label>Room</label></div>
          <div class="sim-form--molecule--field">
            TODO: fetch for available rooms, based on facility
            <!-- <select v-model="eventFormData.room_id">
              <option>...</option>
            </select> -->
          </div>
        </div>

        <div class="sim-form--molecule sim-form--molecule--event-title">
          <div class="sim-form--molecule--label"><label for="event-title">Event Title</label></div>
          <div class="sim-form--molecule--field">
            <textarea class="resize--y" id="event-title" v-model="eventFormData.title" placeholder="..." rows="2"></textarea>
          </div>
        </div>

        <div class="sim-form--molecule sim-form--molecule--event-description">
          <div class="sim-form--molecule--label"><label>Description</label></div>
          <div class="sim-form--molecule--field">
            <SimIconText icon="fa-plus-circle" text="Add"></SimIconText>
            TODO: basically opt in to provviding this data.
            <textarea class="resize--y" placeholder="..." v-model="eventFormData.description" rows="2"></textarea>
          </div>
        </div>

        <div class="sim-form--molecule sim-form--molecule--event-notes">
          <div class="sim-form--molecule--label"><label>Notes</label></div>
          <div class="sim-form--molecule--field">
            <textarea class="resize--y" placeholder="..." v-model="eventFormData.notes" rows="2"></textarea>
          </div>
        </div>

        <div class="sim-form--molecule sim-form--molecule--event-department">
          <div class="sim-form--molecule--label"><label>Department</label></div>
          <div class="sim-form--molecule--field">
            <select v-model="eventFormData.department_id">
              <option value="">Select a department...</option>
              <option v-for="department in departments" :value="department.id">
                {{department.name}}
              </option>
            </select>
          </div>
        </div>

        <div class="sim-form--molecule sim-form--molecule--event-scenario">
          <div class="sim-form--molecule--label"><label>Scenario</label></div>
          <div class="sim-form--molecule--field">
            <select v-model="eventFormData.scenario_id">
              <option value="">Select a scenario...</option>
              <option v-for="scenario in scenarios" :value="scenario.id">
                {{scenario.name}}
              </option>
            </select>
          </div>
        </div>

        <div class="sim-form--molecule sim-form--molecule--event-equipment">
          <div class="sim-form--molecule--label"><label>Equipment</label></div>
          <div class="sim-form--molecule--field">
            TODO: options depend on scenario, and get fetched, and pre-checked
            <!-- <select v-model="eventFormData.equipent_ids">
              <option>...</option>
            </select> -->
          </div>
        </div>

        <div class="sim-form--molecule sim-form--molecule--event-learners">
          <div class="sim-form--molecule--label"><label>Learners</label></div>
          <div class="sim-form--molecule--field">
            <input type="hidden" v-model="eventFormData.learner_ids" />
            <SimDatalist :items="activeLearners" :animate="true">
              <li slot="static-before" key="static-before" class="text--grey" v-if="!activeLearnersCount">
                <SimIconText icon="fa-info-circle" text="No learners added yet..."></SimIconText>
              </li>
              <li slot="item" slot-scope="props" :key="props.item.id" :class="`learner-${props.item.id}`">
                <SimSelection
                  :item="props.item"
                  :item-id="props.item.id"
                  :disabled="props.item.disabled"
                  :should-be-selected="props.item.selected"
                  @toggle="toggleItemInSelectedLearners"
                  >
                  {{ props.item.firstname }} {{ props.item.lastname }}
                </SimSelection>
                <span class="item-remover" @click="removeFromActiveLearnerList(props.item)">
                  <SimIconText icon="fa-times fa-fw"></SimIconText>
                </span>
              </li>
            </SimDatalist>
            <SimAutocomplete placeholder="find learners..."
              :options="inactiveLearners"
              @select="addToLearnerList"
              >
              <div class="item-tag" slot="item" slot-scope="props">
                {{ props.option.firstname }} {{ props.option.lastname }}
              </div>
            </SimAutocomplete>
          </div>
        </div>

        <div class="sim-form--molecule sim-form--molecule--event-learners">
          <div class="sim-form--molecule--label"><label>Others</label></div>
          <div class="sim-form--molecule--field">
            <input type="hidden" v-model="eventFormData.other_ids" />
            <SimDatalist :items="activeOthers" :animate="true">
              <li slot="static-before" key="static-before" class="text--grey" v-if="!activeOthersCount">
                <SimIconText icon="fa-info-circle" text="No others added yet..."></SimIconText>
              </li>
              <li slot="item" slot-scope="props" :key="props.item.id" :class="`learner-${props.item.id}`">
                <SimSelection
                  :item="props.item"
                  :item-id="props.item.id"
                  :disabled="props.item.disabled"
                  :should-be-selected="props.item.selected"
                  @toggle="toggleItemInSelectedOthers"
                  >
                  {{ props.item.firstname }} {{ props.item.lastname }}
                </SimSelection>
                <span class="item-remover" @click="removeFromActiveOtherList(props.item)">
                  <SimIconText icon="fa-times fa-fw"></SimIconText>
                </span>
              </li>
            </SimDatalist>
            <SimAutocomplete placeholder="find others..."
              :options="inactiveOthers"
              @select="addToOtherList"
              >
              <div class="item-tag" slot="item" slot-scope="props">
                {{ props.option.firstname }} {{ props.option.lastname }}
              </div>
            </SimAutocomplete>
          </div>
        </div>

        <!-- <div class="sim-form--molecule sim-form--molecule--event-others">
          <div class="sim-form--molecule--label"><label>Others</label></div>
          <div class="sim-form--molecule--field">
            <textarea class="resize--y" v-model="eventFormData.others" placeholder="..." rows="3"></textarea>
          </div>
        </div> -->

        <div class="sim-form--molecule sim-form--molecule--event-attachment">
          <div class="sim-form--molecule--label">PDF</div>
          <div class="sim-form--molecule--field">
            <div class="sim-form--atomic-group">
              <input @change="onFileChange($event)" type="file" name="attachment" id="attachment" />
              <label for="attachment" class="sim-button sim-button--primary sim-ellipsis">
                <span>Choose a file...</span>
              </label>
              <span v-if="eventFormData.attachment" class="sim-file-input--cancel sim-button sim-button--cancel" @click="removeFile">
                <SimIconText icon="fa-times fa-fw"></SimIconText>
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import currentUser from '../external/currentUser'
  import scenarios from '../external/scenarios'

  import SimSlideHeader from './SlideHeader'
  import SimSlideIntro from './SlideIntro'
  import SimDatalist from './Datalist'
  import SimSelection from './Selection'
  import SimIconText from './IconText'
  import SimAutocomplete from './Autocomplete'

  export default {
    name: 'sim-slide-with-an-event-form',
    components: {
      SimSlideHeader,
      SimSlideIntro,
      SimDatalist,
      SimSelection,
      SimIconText,
      SimAutocomplete,
    },
    data() {
      return {
        slide: this.$store.getters.currentSlide(),
        allTheThingsAreTrue: false,

        instructors: [],
        activeInstructors: [],

        learners: [],
        activeLearners: [],
        inactiveLearners: [],
        selectedLearners: [],

        others: [],
        activeOthers: [],
        inactiveOthers: [],
        selectedOthers: [],

        eventFormData: {
          facility_id: '',
          department_id: '',
          scenario_id: '',
          otherr_ids: [],
          attachment: null
        },
        attachedFileName: '',

        facilities: currentUser.institutions(),
        departments: currentUser.departments(),
        scenarios: scenarios.scenarios(),
        learners: [],
        departmentLearnerOptions: [],
      }
    },
    created() {
      this.$store.commit('setInstructors', currentUser.instructors())
      this.instructors = this.$store.state.user.instructors
      // this.learners = [] // @FIXME this.$store.state.user.learners ?? - Jase/Chad
    },
    mounted() {
      // window.console.log(this.scenarios)

      this.$store.watch(this.$store.getters.currentSlide, (currentSlide) => {
        this.$set(this, 'slide', currentSlide)
      })

      this.activeInstructors = this.slide.instructors
      this.eventFormData.instructor_ids = this.slide.instructors.map((instructor) => instructor.id)

      this.bubbleElement = this.$el.closest('.sim-bubble')
      this.bubbleElement.style.setProperty('--width-factor', this.slide.meta.slideWidthFactor)

      this.resetInactiveLearners()

      this.$emit('theSlideHasAnUpdate', {
        nextSlide: null,
        nextControl: {text: 'Submit Event'},
      })
    },
    destroyed() {
      this.bubbleElement.style.removeProperty('--width-factor')
    },
    computed: {
      activeInstructorsCount() {
        return this.activeInstructors.length
      },
      activeLearnersCount() {
        return this.activeLearners.length
      },
      activeOthersCount() {
        return this.activeOthers.length
      },
      currentSelectedDepartment() {
        return this.eventFormData.department_id
      },
    },
    watch: {
      currentSelectedDepartment(value) {
        this.eventFormData.learner_ids = []
        // get learners by department
        this.departmentLearnerOptions = this.learners.filter((learner) => learner.department_id === value)
      }
    },
    methods: {
      manageSlideNavigator() {
        let nextSlide = null

        if (this.allTheThingsAreTrue) {
          nextSlide = this.slide
        }

        this.$emit('theSlideHasAnUpdate', {
          nextSlide,
        })
      },

      //
      // autocomplete instructor methods
      // -------------------------------
      // @TODO move to common utilities or use Lowdash? meh... - Jase
      sortItemsByProperty(items, property) {
        items.sort((a, b) => {
          return (a[property] > b[property]) - (a[property] < b[property])
        })
      },

      // Learners
      addToLearnerList(item) {
        const foundItem = this.activeLearners.find((learner) => learner.id === item.id)
        if (!foundItem) {
          this.activeLearners.push(item)
          this.inactiveLearners.splice(this.inactiveLearners.indexOf(item), 1)
          this.toggleItemInSelectedLearners(item.id, true)
          this.sortItemsByProperty(this.activeLearners, 'lastname')
          this.sortItemsByProperty(this.inactiveLearners, 'lastname')
        } else {
          lodestar(this.$el, 'lodestar', `.learner-${item.id}`, 'value')
        }
      },
      removeFromActiveLearnerList(item) {
        const foundItem = this.activeLearners.find((learner) => learner.id === item.id)
        this.toggleItemInSelectedLearners(item.id, false)
        this.activeLearners.splice(this.activeLearners.indexOf(item), 1)
        this.inactiveLearners.push(foundItem)
        this.sortItemsByProperty(this.activeLearners, 'lastname')
        this.sortItemsByProperty(this.inactiveLearners, 'lastname')
      },
      toggleItemInSelectedLearners(itemId, value) {
        let selectedItemsWasUpdated = false

        const foundItem = this.activeLearners.find((item) => item.id === itemId)

        if (foundItem) {
          if (value === true) {
            foundItem.selected = true
            this.selectedLearners.push(foundItem)
          } else if (value === false) {
            this.selectedLearners.splice(this.selectedLearners.indexOf(foundItem), 1)
          }
          selectedItemsWasUpdated = true
        }
      },
      resetInactiveLearners() {
        this.inactiveLearners = JSON.parse(JSON.stringify(this.learners))
        this.sortItemsByProperty(this.inactiveLearners, 'lastname')
      },
      clearAllactiveLearners() {
        this.activeLearners.splice(0, this.activeLearners.length)
        this.selectedLearners.splice(0, this.selectedLearners.length)
        this.resetInactiveLearners()
      },

      // Others
      addToOtherList(item) {
        const foundItem = this.activeOthers.find((learner) => learner.id === item.id)
        if (!foundItem) {
          this.activeOthers.push(item)
          this.inactiveOthers.splice(this.inactiveOthers.indexOf(item), 1)
          this.toggleItemInSelectedOthers(item.id, true)
          this.sortItemsByProperty(this.activeOthers, 'lastname')
          this.sortItemsByProperty(this.inactiveOthers, 'lastname')
        } else {
          lodestar(this.$el, 'lodestar', `.learner-${item.id}`, 'value')
        }
      },
      removeFromActiveOtherList(item) {
        const foundItem = this.activeOthers.find((learner) => learner.id === item.id)
        this.toggleItemInSelectedOthers(item.id, false)
        this.activeOthers.splice(this.activeOthers.indexOf(item), 1)
        this.inactiveOthers.push(foundItem)
        this.sortItemsByProperty(this.activeOthers, 'lastname')
        this.sortItemsByProperty(this.inactiveOthers, 'lastname')
      },
      toggleItemInSelectedOthers(itemId, value) {
        let selectedItemsWasUpdated = false

        const foundItem = this.activeOthers.find((item) => item.id === itemId)

        if (foundItem) {
          if (value === true) {
            foundItem.selected = true
            this.selectedOthers.push(foundItem)
          } else if (value === false) {
            this.selectedOthers.splice(this.selectedOthers.indexOf(foundItem), 1)
          }
          selectedItemsWasUpdated = true
        }
      },
      resetInactiveOthers() {
        this.inactiveOthers = JSON.parse(JSON.stringify(this.learners))
        this.sortItemsByProperty(this.inactiveOthers, 'lastname')
      },
      clearAllactiveOthers() {
        this.activeOthers.splice(0, this.activeOthers.length)
        this.selectedOthers.splice(0, this.selectedOthers.length)
        this.resetInactiveOthers()
      },

      // FORM STUFFS
      onFileChange(event) {
        const input = event.target
        const label	 = input.nextElementSibling.querySelector('span')

        let files = input.files || event.dataTransfer.files

        if (files && files.length > 0) {
          this.eventFormData.attachment = files[0]
          label.innerHTML = this.eventFormData.attachment.name
        } else {
          this.eventFormData.attachment = null
          label.innerHTML = 'Choose a file...'
        }
      },
      removeFile(event) {
        this.eventFormData.attachment = null;
        const trigger = event.target
        const label	= trigger.previousElementSibling.querySelector('span')
        label.innerHTML = 'Choose a file...'
      },
    },
  }
</script>

<style lang="scss">
  // uses: '../styles/slide-presenter';
</style>
