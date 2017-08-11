<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox :open="true">
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <p><sim-switch v-model="mySwitch" left-label="off" right-label="on" /></p>
        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html">&lt;sim-switch v-model="mySwitch" left-label="off" right-label="on" /></code></pre>
        </template>
        <template slot="js">
          <pre><code class="javascript">mySwitch: {{ mySwitch }}</code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
import Demobox from '../utility/Demobox'
import SimSwitch from '../../components/Switch'

export default {
  name: 'switch-doc',
  components: {
    Demobox,
    SimSwitch,
  },
  data() {
    return {
      msg: 'Toggle Switch',
      mySwitch: true,
    }
  },
}
</script>
