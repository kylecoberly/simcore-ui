<template>
  <Calendar
    :isLoading="isLoading"
  />
</template>

<script>
import Calendar from './Calendar'

export default {
  components: {
    Calendar
  },
  created() {
  },
  computed {
    isLoading() {
        return this.$store.state.availabilities.isLoading
    }
  }
}
</script>
