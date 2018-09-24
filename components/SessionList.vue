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
    },
    setSessions() {
      this.$emit('setSessions', this.sessions)
    },
    removeSession(sessionToRemove) {
      const sessions = this.sessions
        .filter(session => +session.id !== +sessionToRemove.id)
    },
  }
}
</script>

<style lang="scss">
.session-list {
  width: 100%;
}
</style>
