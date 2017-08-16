<template lang="html">
  <article>

      <h2>{{ msg }}</h2>
      @STUCK - how to open a component without event bus at the app root level?
      <demobox :open="true">
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <p><button @click="toggleOverlay">Toggle Overlay</button></p>
          <p><button @click="openOverlay" class="secondary">Open Overlay</button></p>
          <p><button @click="closeOverlay" class="secondary">Close Overlay</button></p>
        </template>
        <template slot="html">
          <pre><code class="html">&lt;SimOverlay :show-dismiss="true" :should-be-open="shouldBeOpen">&lt;/SimOverlay></code></pre>
        </template>
        <template slot="js">
          <pre><code class="javascript">methods: {
  toggleOverlay () {
    this.shouldBeOpen = !this.shouldBeOpen
  },
  openOverlay () {
    this.shouldBeOpen = true
  },
  closeOverlay () {
    this.shouldBeOpen = false
  }
}</code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
import Demobox from '../../utility/Demobox'
// import SimOverlay from '../../../components/Overlay'

export default {
  name: 'overlay-doc',
  components: {
    Demobox,
    // SimOverlay
  },
  data() {
    return {
      msg: 'Overlay',
      shouldBeOpen: false
    }
  },
  methods: {
    toggleOverlay() {
      this.$emit('overlay-toggle')
    },
    openOverlay() {
      this.shouldBeOpen = true
    },
    closeOverlay() {
      this.shouldBeOpen = false
    },
  },
}
</script>
