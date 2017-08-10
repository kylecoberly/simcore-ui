<template lang="html">
  <div id="app">
    <sim-overlay :show-dismiss="true"></sim-overlay>
    <sim-panel :show-dismiss="true"></sim-panel>
    <header class="app-header">
      <div class="greeting">
        <router-link to="/" class="logo"><span>SIM <b>UI</b></span></router-link>
        The SimCore Interface Library
      </div>
      <div class="app-nav">
        <nav>
          <li><router-link to="/getting-started"><sim-icontext round icon="fa-star" text="Getting Started" /></router-link></li>
          <li><router-link to="/components"><sim-icontext round icon="fa-cubes" text="Components" /></router-link></li>
          <li><router-link to="/styles"><sim-icontext round icon="fa-paint-brush" text="Styles" /></router-link></li>
          <li><router-link to="/extras"><sim-icontext round icon="fa-code" text="Other Things" /></router-link></li>
        </nav>
      </div>
    </header>
    <div class="app-content">
      <router-view />
      <aside>
        <directory :model="menu"></directory>
      </aside>
    </div>
  </div>
</template>

<script>
// library components
import IconText from 'sim-ui-components/IconText.vue'
import Overlay from 'sim-ui-components/Overlay.vue'
import Panel from 'sim-ui-components/Panel.vue'

// internal components
import Directory from './docs/utility/Directory.vue'

import common from './mixins'

export default {
  name: 'app',
  mixins: [common],
  components: {
    // library components
    'sim-icontext': IconText,
    'sim-overlay': Overlay,
    'sim-panel': Panel,

    // internal components
    directory: Directory,
  },
  computed: {
    routes() {
      return this.$router.options.routes
    },
  },
  data() {
    return {
      menu: [],
      // transitionName: 'slide-left',
    }
  },
  mounted() {
    this.menu = {
      children: this.routes,
    }
  },
  methods: {
    randomInt: (min, max) => common.getRandomInt(min, max),
  },
}
</script>

<style lang="scss" src="./assets/sass/main.scss"></style>
