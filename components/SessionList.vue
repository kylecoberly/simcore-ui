<template>
  <ul class="session-list">
    <li v-for="session in sessions">
      <SessionListing
        :session="session"
        :scenarios="scenarios"
        :rooms="rooms"
        :instructors="instructors"
        :learners="learners"
        :canRemove="true"
        @remove="removeSession(session)"
      />
    </li>
    <li key="add">
      <IconText
        class="control--add-item"
        icon="#icon--control--add"
        icon-type="svg"
        @click.native="add"
      />
    </li>
  </ul>
</template>

<script>
import SessionListing from './SessionListing'
import IconText from './IconText'
import { deepClone } from '../utilities/deep-clone'

export default {
  components: {
    SessionListing,
    IconText,
  },
  props: {
    scenarios: Array,
    sessions: Array,
    rooms: Array,
    learners: Array,
    instructors: Array,
  },
  methods: {
    add() {
      const sessions = deepClone(this.sessions)
      sessions.push({
        scenario: {},
        rooms: [],
        learners: [],
        instructors: [],
      })
      this.$emit('setSessions', sessions)
    },
    setSessions() {
      const sessions = deepClone(this.sessions)
      this.$emit('setSessions', sessions)
    },
    removeSession(sessionToRemove) {
      const sessions = this.sessions
        .filter(session => session === sessionToRemove)
      this.$emit('setSessions', sessions)
    },
  },
}
</script>

<style lang="scss">
.session-list {
  width: 100%;
}
</style>
