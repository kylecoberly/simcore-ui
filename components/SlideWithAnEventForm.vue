<template lang="html">
  <div class="sim-slide sim-slide--with-form">

    <SimSlideHeader :title="content.title" :subtitle="content.subtitle" />

    <SimSlideIntro :content="content.intro" />

    <div class="sim-slide--content">

      <div class="form-molecule">
        <p><label for="event-title"><b>Event title</b></label></p>
        <p><textarea id="event-title" placeholder="..." rows="2"></textarea></p>
      </div>

      <div class="form-molecule">
        <p><label><b>Description</b></label></p>
        <p><textarea placeholder="..." rows="3"></textarea></p>
      </div>

      <div class="form-molecule">
        <p><label><b>Notes</b></label></p>
        <p><textarea placeholder="..." rows="3"></textarea></p>
      </div>

      <div class="form-molecule">
        <p><label><b>Department</b></label></p>
        <p>
          <select>
            <option>...</option>
          </select>
        </p>
      </div>

      <div class="form-molecule">
        <p><label><b>Instructors</b></label></p>
        <SimDatalist :items="activeInstructors" :animate="true">
          <li slot="item" slot-scope="props" :key="props.item.id" :class="`instructor-${props.item.id}`">
            <SimSelection
              :item="props.item"
              :item-id="props.item.id"
              :disabled="props.item.disabled"
              :should-be-selected="props.item.selected"
              @toggle="toggleItemInSelectedInstructors"
              >
              {{ props.item.first_name }} {{ props.item.last_name }}
            </SimSelection>
            <span class="item-remover" @click="removeFromActiveInstructorList(props.item)">
              <SimIconText icon="fa-times fa-fw"></SimIconText>
            </span>
          </li>
        </SimDatalist>
        <br />
        <SimAutocomplete
          :options="inactiveInstructors"
          placeholder="find instructors..."
          @select="addToInstructorList"
          >
          <div class="item-tag" slot="item" slot-scope="props">
            {{ props.option.first_name }} {{ props.option.last_name }}
          </div>
        </SimAutocomplete>
      </div>

      <div class="form-molecule">
        <p><label><b>Scenario</b></label></p>
        <p>
          <select>
            <option>...</option>
          </select>
        </p>
      </div>

      <div class="form-molecule">
        <p><label><b>Equipment</b></label></p>
        <p>
          <select>
            <option>...</option>
          </select>
        </p>
      </div>

      <div class="form-molecule">
        <p><label><b>Learners</b></label></p>
        <p><textarea placeholder="..." rows="3"></textarea></p>
      </div>

      <div class="form-molecule">
        <p><label><b>Others</b></label></p>
        <p><textarea placeholder="..." rows="3"></textarea></p>
      </div>

      <div class="form-molecule">
        <p><label><b>PDF</b></label></p>
        <p><input type="file" /></p>
      </div>

      <div class="form-molecule">
        <p><label><b>Room #</b></label></p>
        <p>
          <select>
            <option>...</option>
          </select>
        </p>
      </div>

      Time period

    </div>

  </div>
</template>

<script>
import SimSlideHeader from './SlideHeader'
import SimSlideIntro from './SlideIntro'
import SimDatalist from './Datalist'
import SimSelection from './Selection'
import SimIconText from './IconText'
import SimAutocomplete from './Autocomplete'

  export default {
    name: 'sim-slide-with-a-form',
    components: {
      SimSlideHeader,
      SimSlideIntro,
      SimDatalist,
      SimSelection,
      SimIconText,
      SimAutocomplete,
    },
    props: ['content'],
    data() {
      return {
        instructors: [],
        activeInstructors: [],
        inactiveInstructors: [],
        selectedInstructors: [],
      }
    },
    mounted() {
      this.instructors = this.$store.state.users.all
    },
    watcher: {
      timeBlock(newBlock) {
        if (newBlock !== null) {
          const nextSlide = this.$store.state.slideDeck.slideTemplates.event_form
          nextSlide.title = this.content.title
          nextSlide.start_time = this.content.content.start_time
          nextSlide.end_time = this.content.content.end_time

          this.$emit('theSlideHasAnUpdate', {
            nextSlide,
          })
        }
      },
    },
    methods: {
      sortItemsByProperty(items, property) {
        items.sort((a, b) => {
          return (a[property] > b[property]) - (a[property] < b[property])
        })
      },
      addToInstructorList(item) {
        const foundItem = this.activeInstructors.find((instructor) => instructor.id === item.id)
        if (!foundItem) {
          this.activeInstructors.push(item)
          this.inactiveInstructors.splice(this.inactiveInstructors.indexOf(item), 1)
          this.toggleItemInSelectedInstructors(item.id, true)
          this.sortItemsByProperty(this.activeInstructors, 'last_name')
          this.sortItemsByProperty(this.inactiveInstructors, 'last_name')
        } else {
          lodestar(this.$el, 'lodestar', `.instructor-${item.id}`, 'value')
        }
      },
      removeFromActiveInstructorList(item) {
        const foundItem = this.activeInstructors.find((instructor) => instructor.id === item.id)
        this.toggleItemInSelectedInstructors(item.id, false)
        this.activeInstructors.splice(this.activeInstructors.indexOf(item), 1)
        this.inactiveInstructors.push(foundItem)
        this.sortItemsByProperty(this.activeInstructors, 'last_name')
        this.sortItemsByProperty(this.inactiveInstructors, 'last_name')
      },
      toggleItemInSelectedInstructors(itemId, value) {
        let selectedItemsWasUpdated = false

        const foundItem = this.activeInstructors.find((item) => item.id === itemId)

        if (foundItem) {
          if (value === true) {
            foundItem.selected = true
            this.selectedInstructors.push(foundItem)
          } else if (value === false) {
            this.selectedInstructors.splice(this.selectedInstructors.indexOf(foundItem), 1)
          }
          selectedItemsWasUpdated = true
        }
      },
      resetInactiveInstructors() {
        this.inactiveInstructors = JSON.parse(JSON.stringify(this.instructors))
        this.sortItemsByProperty(this.inactiveInstructors, 'last_name')
      },
      clearAllActiveInstructors() {
        this.activeInstructors.splice(0, this.activeInstructors.length)
        this.selectedInstructors.splice(0, this.selectedInstructors.length)
        this.resetInactiveInstructors()
      },
    },
  }
</script>

<style lang="scss">
  // uses: '../styles/slide';
</style>
