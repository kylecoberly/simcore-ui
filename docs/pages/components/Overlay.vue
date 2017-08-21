<template lang="html">
  <article>

      <h2>{{ msg }}</h2>
      @STUCK - how to open a component without event bus at the app root level?
      <demobox :open="false">
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <p><button @click="$root.toggleOverlay">Toggle Overlay</button></p>
          <p><button @click="$root.openOverlay" class="secondary">Open Overlay</button></p>
          <p><button @click="$root.closeOverlay" class="secondary">Close Overlay</button></p>
        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html">&lt;!-- somewhere in your app -->
&lt;button @click="$root.toggleOverlay">Toggle Overlay&lt;/button></code></pre>
          <hr />
          <pre v-highlightjs><code class="html">&lt;!-- put in your root layout component -->
&lt;SimOverlay :show-dismiss="true" :should-be-open="shouldOverlayBeOpen">
<i>... your content here ...</i>
&lt;/SimOverlay></code></pre>
        </template>
        <template slot="js">
          <pre v-highlightjs><code class="javascript">// These methods are needed in your main.js component.
// They are helper methods for a localized event-bus in your root layout component.
methods: {
  toggleOverlay() {
    this.$emit('toggle-overlay')
  },
  openOverlay() {
    this.$emit('open-overlay')
  },
  closeOverlay() {
    this.$emit('close-overlay')
  },
}</code></pre>
          <hr />
          <pre v-highlightjs><code class="javascript">// These listeners complete a local event-bus
// and are needed in your root Layout component.
mounted () {
  this.$root.$on('toggle-overlay', () => {
    this.shouldOverlayBeOpen = !this.shouldOverlayBeOpen
  })
  this.$root.$on('open-overlay', () => {
    this.shouldOverlayBeOpen = true
  })
  this.$root.$on('close-overlay', () => {
    this.shouldOverlayBeOpen = false
  })
}</code></pre>
        </template>
      </demobox>

      <demobox :open="false">
        <template slot="intro">
          With vue-router
        </template>
        <template slot="view">
          <small>Modify your methods and mounted codes (see details) to handle sending route paths around. <i>More info coming soon about how to user this with vue-router...</i></small>
        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html">&lt;!-- put in your root layout component -->
&lt;SimOverlay :show-dismiss="true" :should-be-open="shouldOverlayBeOpen">
  &lt;router-view name="overlay">&lt;/router-view>
&lt;/SimOverlay></code></pre>
        </template>
        <template slot="js">
          <pre v-highlightjs><code class="javascript">// These methods are needed in your main.js component.
// They are helper methods for a localized event-bus in your root layout component.
methods: {
  toggleOverlay(callback) {
    this.$emit('toggle-overlay', callback)
  },
  openOverlay(callback) {
    this.$emit('open-overlay', callback)
  },
  closeOverlay(callback) {
    this.$emit('close-overlay', callback)
  },
}</code></pre>
          <hr />
          <pre v-highlightjs><code class="javascript">// These listeners complete a local event-bus and are needed in your root Layout component.
mounted () {
  this.$root.$on('toggle-overlay', (dismissTo) => {
    this.shouldOverlayBeOpen = !this.shouldOverlayBeOpen
    this.overlayDismissTo = dismissTo
  })
  this.$root.$on('open-overlay', (dismissTo) => {
    this.shouldOverlayBeOpen = true
    this.overlayDismissTo = dismissTo
  })
  this.$root.$on('close-overlay', (dismissTo) => {
    this.shouldOverlayBeOpen = false
    this.overlayDismissTo = dismissTo
  })
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
      shouldBeOpen: false,
    }
  },
  methods: {
  },
}
</script>
