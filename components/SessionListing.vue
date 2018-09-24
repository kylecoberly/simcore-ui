<template>
  <section class="session-listing">
    <header>
      <AutoFinder
        :options="scenarios"
        :selectedItem="session.scenario"
        :canRemove="false"
        :isFocused="false"
        placeholder="Type to search"
        @select="selectScenario"
        @clear="clearScenario"
      />
      <IconText
        v-if="canRemove"
        class="remove"
        @click.native="$emit('remove')"
        icon="fa-trash" icon-type="fa"
      />
    </header>
    <main>
      <ul>
        <li>
          <fieldset>
            <h5>Rooms</h5>
            <AutoFinderList
              :selectedItems="selectedRooms"
              :availableItems="rooms"
              @setSelectedList="setSelectedRooms"
            />
          </fieldset>
        </li>
        <li>
          <fieldset>
            <h5>Instructors</h5>
            <AutoFinderList
              :selectedItems="selectedInstructors"
              :availableItems="instructors"
              @setSelectedList="setSelectedInstructors"
            />
          </fieldset>
        </li>
        <li>
          <fieldset>
            <h5>Learners</h5>
            <AutoFinderList
              :selectedItems="selectedLearners"
              :availableItems="learners"
              @setSelectedList="setSelectedLearners"
            />
          </fieldset>
        </li>
      </ul>
    </main>
  </section>
</template>

<script>
import IconText from './IconText'
import AutoFinderList from './AutofinderList'
import AutoFinder from './Autofinder'

export default {
  components: {
    IconText,
    AutoFinder,
    AutoFinderList,
  },
  data() {
    return {
      selectedRooms: [{id: -1}],
      selectedInstructors: [{id: -1}],
      selectedLearners: [{id: -1}],
    }
  },
  props: {
    scenarios: Array,
    session: Object,
    canRemove: Boolean,
    rooms: Array,
    instructors: Array,
    learners: Array,
  },
  methods: {
    setSelectedRooms(rooms) {
    },
    setSelectedLearners(learners) {
    },
    setSelectedInstructors(instructors) {
    },
    selectScenario() {
    },
    clearScenario() {
    },
  },
}
</script>

<style lang="scss">
.session-listing {
  width: 100%;
  background-color: #222;
  header {
    background-color: #666;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    .remove > span {
      color: hsl(0, 100%, 100%);
      cursor: pointer;
    }
  }
  main {
    > ul {
      > li, fieldset {
        padding: 0;
      }
    }
    h5 {
      margin-bottom: 0;
    }
  }
}
</style>
