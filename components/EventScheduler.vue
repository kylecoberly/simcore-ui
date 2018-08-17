<template>
  <form @submit.prevent="submitEvent">
    <header>
      <IconText icon="#icon--event-duration" icon-type="svg" text="Duration" />
      <h3>New Event</h3>
      <div class="schedule">
        <time class="event-date">{{eventDate}}</time>
        <time class="event-time">{{eventTime}}</time>
      </div>
    </header>
    <main>
      <ol>
        <li>
          <fieldset>
            <h4>Event Information</h4>
            <label for="title">Title</label>
            <input type="text" id="title" required v-model="event.title" />
            <label for="description">Description</label>
            <textarea id="description" required v-model="event.description"></textarea>
            <label for="category">Category</label>
            <select id="category">
              <option
                v-for="(category, id) in categories"
                :key="id"
              >
                {{category}}
              </option>
            </select>
            <label>Department</label>
            <AutoFinder
                id="department"
                placeholder="Start typing to find a Department"
                :options="departments"
                :canRemove="false"
                :selectedItem="event.department"
            />
          </fieldset>
        </li>
        <li>
          <fieldset>
            <h4>Scenarios</h4>
          </fieldset>
        </li>
        <li>
          <fieldset>
            <h4>People</h4>
          </fieldset>
        </li>
        <li>
          <fieldset>
            <h4>Communication</h4>
          </fieldset>
        </li>
      </ol>
    </main>
    <footer>
      <button @click="saveDraft">Save Draft</button>
      <input type="submit" value="Submit For Approval" />
    </footer>
  </form>
</template>

<script>
import IconText from './IconText'
import AutoFinder from './Autofinder'
import { getHour, formatTimesForDisplay } from '../utilities/date'

export default {
  components: {
    IconText,
    AutoFinder,
  },
  props: {
    event: Object,
    departments: Array,
    categories: Array,
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
  },
  methods: {
    saveDraft() {
    },
  },
}
</script>

<style lang="scss">
</style>
