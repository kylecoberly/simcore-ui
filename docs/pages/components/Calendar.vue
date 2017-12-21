<template lang="html">
  <article>
    <h2>{{ title }}</h2>

    <demobox>
      <template slot="intro">
        Normal / Default
      </template>
      <template slot="view">

        <SimCalendar :can-schedule-events="shouldBeAbleToScheduleEvents"></SimCalendar>

      </template>
      <template slot="html">
        <pre v-highlightjs><code class="html"></code></pre>
      </template>
      <template slot="js">
        <pre><code class="javascript"></code></pre>
      </template>
    </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimCalendar from '../../../components/Calendar'

  export default {
    name: 'calendar-doc',
    components: {
      Demobox,
      SimCalendar,
    },
    data() {
      return {
        title: 'Calendar',
        shouldBeAbleToScheduleEvents: true,
      }
    },
  }
</script>
