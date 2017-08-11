<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox :open="true">
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <p><button @click="toggleOverlay">Toggle Overlay</button></p>
          <p><button @click="openOverlay" class="secondary">Open Overlay</button></p>
          <p><button @click="closeOverlay" class="secondary">Close Overlay</button></p>
        </template>
        <template slot="js">
          <pre><code class="javascript">methods: {
  toggleOverlay () {
    Events.toggleOverlay()
  },
  openOverlay () {
    Events.openOverlay()
  },
  closeOverlay () {
    Events.closeOverlay()
  }
}</code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
import Demobox from '../../utility/Demobox'

export default {
  name: 'overlay-doc',
  components: {
    Demobox,
  },
  data() {
    return {
      msg: 'Overlay',
    }
  },
  methods: {
    toggleOverlay() {},
    openOverlay() {},
    closeOverlay() {},
  },
}
</script>
