<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <SimDatepicker required></SimDatepicker>
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
  import SimDatepicker from '../../../components/Datepicker'

  export default {
    name: 'filter-by-doc',
    components: {
      Demobox,
      SimDatepicker,
    },
    data() {
      return {
        msg: 'Datepicker',
      }
    },
    computed: {
    },
  }
</script>
