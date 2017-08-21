<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox :open="true">
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <p><button @click="$root.togglePanel">Toggle Panel</button></p>
          <p><button @click="$root.openPanel" class="secondary">Open Panel</button></p>
          <p><button @click="$root.closePanel" class="secondary">Close Panel</button></p>
        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html">&lt;button @click="$root.togglePanel">Toggle Panel&lt;/button></code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'

  export default {
    name: 'panel-doc',
    components: {
      Demobox,
    },
    data() {
      return {
        msg: 'Panel',
      }
    },
  }
</script>
