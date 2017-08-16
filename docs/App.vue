<template lang="html">
  <div id="app">
    <SimOverlay :should-show-dismiss="true" :should-be-open="shouldOverlayBeOpen"></SimOverlay>
    <SimPanel :should-show-dismiss="true" :should-be-open="shouldPanelBeOpen"></SimPanel>
    <header class="app-header">
      <div class="greeting">
        <router-link to="/" class="logo"><span>SIM <b>UI</b></span></router-link>
        The SimCore Interface Library
      </div>
      <div class="app-nav">
        <nav>
          <li><router-link to="/getting-started"><SimIconText circled icon="fa-star" text="Getting Started"></SimIconText></router-link></li>
          <li><router-link to="/components"><SimIconText circled icon="fa-cubes" text="Components"></SimIconText></router-link></li>
          <li><router-link to="/styles"><SimIconText circled icon="fa-paint-brush" text="Styles"></SimIconText></router-link></li>
          <li><router-link to="/extras"><SimIconText circled icon="fa-code" text="Other Things"></SimIconText></router-link></li>
        </nav>
      </div>
    </header>
    <div class="app-content">
      <router-view />
      <aside>
        <Directory :model="menu"></Directory>
      </aside>
    </div>
  </div>
</template>

<script>
// library pages
import SimIconText from '../components/IconText'
import SimOverlay from '../components/Overlay'
import SimPanel from '../components/Panel'

// internal pages
import Directory from './utility/Directory'

import common from './mixins'

export default {
  name: 'app',
  mixins: [common],
  components: {
    // library pages
    SimIconText,
    SimOverlay,
    SimPanel,

    // internal pages
    Directory,
  },
  computed: {
    routes() {
      return this.$router.options.routes
    },
  },
  data() {
    return {
      menu: [],
      shouldOverlayBeOpen: false,
      shouldPanelBeOpen: false,
      // transitionName: 'slide-left',
    }
  },
  mounted() {
    this.menu = {
      children: this.routes,
    }
    this.$on('overlay-toggle', function() {
      console.log('overlay-toggle')
      this.shouldOverlayBeOpen = !this.shouldOverlayBeOpen
    })
    this.$on('panel-toggle', function() {
      this.shouldPanelBeOpen = !this.shouldPanelBeOpen
    })
  },
  methods: {
    randomInt: (min, max) => common.getRandomInt(min, max),
  },
}
</script>

<style lang="scss" src="./assets/sass/main.scss"></style>
