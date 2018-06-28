<template lang="html">
  <article>
    <h2 class="library--section-title">{{ msg }}</h2>

    <demobox>

        <template slot="intro">
          Normal / Default
        </template>

        <template slot="view">

        </template>

        <template slot="html">
          <pre v-highlightjs><code class="html"></code></pre>
        </template>

        <template slot="scss">
          <pre v-highlightjs><code class="scss"></code></pre>
        </template>

        <template slot="js">
          <pre v-highlightjs><code class="javascript"></code></pre>
        </template>

      </demobox>



  </article>
</template>

<script>
  import Demobox from '../../../docs/utility/Demobox'

  export default {
    name: 'beanstalker',

    components: {
      Demobox,
    },
    data() {
      return {
        msg: 'Tests',
      }
    },
  }
</script>
