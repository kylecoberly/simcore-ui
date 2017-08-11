<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox :open="true">
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <p><button @click="togglePanel">Toggle Panel</button></p>
          <p><button @click="openPanel" class="secondary">Open Panel</button></p>
          <p><button @click="closePanel" class="secondary">Close Panel</button></p>
        </template>
        <template slot="js">
          <pre><code class="javascript">methods: {
  togglePanel () {
    Events.togglePanel()
  },
  openPanel () {
    Events.openPanel()
  },
  closePanel () {
    Events.closePanel()
  }
}</code></pre>
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
  methods: {
    togglePanel() {},
    openPanel() {},
    closePanel() {},
  },
}
</script>
