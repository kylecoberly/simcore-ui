<template>
  <form class="event-scheduler" @submit.prevent="submitEvent" v-on-clickaway="closeBubble">
    <EventSchedulerHeader
      :time="event.time"
      :duration="event.duration"
    />
    <main>
      <ol>
        <li>
          <EventSchedulerInformation
            :title="event.title"
            :description="event.description"
            :department="event.department"
            :category="event.category"
            @updateEventProperty="updateEventProperty"
          />
        </li>
        <!--
        <li>
          <EventSchedulerScenarios
            :scenarios="event.scenarios"
            @addScenario="addScenario"
          />
        </li>
        -->
        <li>
          <fieldset>
            <h4>Sessions</h4>
            <SessionList
              :sessions="event.sessions"
              :scenarios="scenarios"
              :rooms="rooms"
              :learners="learners"
              :instructors="instructors"
              @setSessions="setSessions"
            />
          </fieldset>
        </li>
        <li>
          <fieldset>
            <h4>Equipment</h4>
            <AutoFinderList
              :selectedItems="selectedEquipment"
              :availableItems="availableEquipment"
              @setSelectedList="setSelectedEquipment"
            />
          </fieldset>
        </li>
        <li class="attachments">
          <fieldset>
            <h4>Attachments</h4>
            <ul>
              <li>
                <label for="file-upload">Upload a file</label>
                <input id="file-upload" type="file" />
              </li>
            </ul>
          </fieldset>
        </li>
        <li>
          <fieldset>
            <h4>Note</h4>
            <textarea v-model="event.note"></textarea>
          </fieldset>
        </li>
      </ol>
    </main>
    <footer>
      <button class="save-draft" @click="saveDraft">Save Draft</button>
      <input type="submit" value="Submit For Approval" />
    </footer>
  </form>
</template>

<script>
import IconText from './IconText'
import AutoFinderList from './AutofinderList'
import DataList from './Datalist'
import SimSelection from './Selection'
import SessionList from './SessionList'

import EventSchedulerHeader from './EventSchedulerHeader'
import EventSchedulerInformation from './EventSchedulerInformation'
import EventSchedulerScenarios from './EventSchedulerScenarios'
import EventSchedulerPeople from './EventSchedulerPeople'

import { getHour, formatTimesForDisplay } from '../utilities/date'
import { mixin as clickaway } from 'vue-clickaway'

export default {
  components: {
    IconText,
    AutoFinderList,
    DataList,
    SimSelection,
    EventSchedulerHeader,
    EventSchedulerInformation,
    EventSchedulerScenarios,
    EventSchedulerPeople,
    SessionList,
  },
  mixins: [ clickaway ],
  data() {
    return {
      selectedEquipment: [{
        id: 3,
        label: 'Aloha',
      }, {
        id: -1,
      }],
    }
  },
  props: {
    event: Object,
    equipment: Array,
    scenarios: Array,
    rooms: Array,
    learners: Array,
    instructors: Array,
  },
  computed: {
    eventDate() {
      return this.event.time.format('dddd, MMMM Do, YYYY')
    },
    eventHour() {
      return getHour(this.event.time)
    },
    eventTime() {
      return formatTimesForDisplay(this.eventHour, this.event.duration)
    },
    availableEquipment() {
      return this.equipment.filter(equipment => {
        return !this.selectedEquipment
          .find(selectedEquipment => +selectedEquipment.id === +equipment.id)
      })
    },
    selectedEquipmentIds() {
      return this.selectedEquipment
        .map(this.getIds)
        .filter(this.getNonBlanks)
    },
  },
  methods: {
    closeBubble() {
      this.$store.dispatch('services/bubble/setOpen', false)
    },
    saveDraft() {
      this.$emit('saveDraft', this.event)
    },
    submitEvent() {
      this.event.equipment = this.selectedEquipmentIds
      this.event.date = this.event.time.format('YYYY-MM-DD')
      this.event.startTime = this.event.time.format('H')
      this.$emit('submitEvent', this.event)
    },
    getEquipmentIds(){
      return this.selectedEquipment
        .map(this.getIds)
        .filter(this.getNonBlanks)
    },
    getNonBlanks(item) {
      return +item >= 0
    },
    getIds(item) {
      return item.id
    },
    updateEventProperty(property, value) {
      this.$emit('updateEventProperty', property, value)
    },
    addScenario(scenario) {
      this.$emit('addScenario', scenario)
    },
    setSelectedEquipment(equipment) {
      this.selectedEquipment = equipment
    },
    setSessions(sessions) {
      this.event.sessions = sessions;
    },
  },
}
</script>

<style lang="scss">
.event-scheduler {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 100%;
  header, main, footer {
    padding: 0.5rem;
  }
  #category {
    background-color: var(--dark);
    color: var(--light);
  }
  header {
    background-color: #fff;
    span {
      color: orange;
      font-size: 1rem;
    }
    .schedule {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      color: black;
    }
  }
  .sim-slide--content--section--specific, .sim-slide--content--section--general {
    header {
      padding-left: 0;
      background-color: var(--dark-grey);
    }
  }
  main {
    flex: 1;
    overflow-y: auto;
    padding: 0;
    > ol {
      counter-reset: event-planning-counter;
      list-style-type: none;
      padding-left: 0;
      > li {
        display: flex;
        flex-flow: row no-wrap;
        &:not(:last-child) {
          border-bottom: 2px solid #333;
        }
        h4 {
          margin-bottom: 0;
          color: orange;
        }
        h4::before {
          content: counter(event-planning-counter);
          counter-increment: event-planning-counter;
          color: orange;
          font-size: 2rem;
          margin-right: 0.5rem;
        }
        input, textarea, select {
          background-color: #eee;
          margin-bottom: 0.5rem;
        }
      }
      .attachments {
        input {
          position: static;
          opacity: 1;
          background-color: #333;
          padding: 0.25rem;
          height: auto;
          width: 100%;
        }
      }
    }
    fieldset {
      border: none;
      width: 100%;
      padding: 0;
    }
    textarea {
      resize: none;
    }
  }
  footer {
    display: flex;
    justify-content: space-between;
    .save-draft {
      padding: 1rem;
      background-color: orange;
      color: white;
      border-radius: 4px;
    }
    [type=submit] {
      padding: 1rem;
      background-color: #ccc;
      color: #999;
      border-radius: 4px;
    }
  }
}
</style>
