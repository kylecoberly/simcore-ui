<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <p>Progress component</p>
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
  import SimProgress from '../../../components/Progress'

  export default {
    name: 'progress-doc',
    components: {
      Demobox,
      SimProgress,
    },
    data() {
      return {
        msg: 'Progress',
      }
    },
    computed: {
    },
  }
</script>
