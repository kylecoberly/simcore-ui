<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <p>FilterBy component</p>
        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html">
            </code></pre>
        </template>
        <template slot="js">
          <pre><code class="javascript"></code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimFilterBy from '../../../components/FilterBy'

  export default {
    name: 'filter-by-doc',
    components: {
      Demobox,
      SimFilterBy,
    },
    data() {
      return {
        msg: 'FilterBy',
      }
    },
    computed: {
    },
  }
</script>
