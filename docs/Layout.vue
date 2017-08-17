<template lang="html">
  <div class="app-layout">
    <SimOverlay :should-show-dismiss="true" class="animator parallax in-from-top" :should-be-open="shouldOverlayBeOpen">
      <button @click="$root.togglePanel">panelize</button>
    </SimOverlay>
    <SimPanel :should-show-dismiss="true" class="animator parallax in-from-left" :should-be-open="shouldPanelBeOpen"></SimPanel>
    <header class="app-header animatable">
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
    <div class="app-content animatable">
      <router-view />
      <aside>
        <Directory :model="menu"></Directory>
      </aside>
    </div>
  </div>
</template>

<script>
  import SimOverlay from '../components/Overlay'
  import SimPanel from '../components/Panel'
  import SimIconText from '../components/IconText'
  import Directory from './utility/Directory'
  import common from './mixins'

  export default {
    name: 'Layout',
    mixins: [common],
    components: {
      SimOverlay,
      SimPanel,
      SimIconText,
      Directory,
    },
    data () {
      return {
        menu: [],
        shouldOverlayBeOpen: false,
        shouldPanelBeOpen: false,
      }
    },
    computed: {
      routes() {
        return this.$router.options.routes
      },
    },
    mounted() {
      this.menu = {
        children: this.routes,
      },
      this.$root.$on('toggle-overlay', () => {
        this.shouldOverlayBeOpen = !this.shouldOverlayBeOpen
      })
      this.$root.$on('open-overlay', () => {
        this.shouldOverlayBeOpen = true
      })
      this.$root.$on('close-overlay', () => {
        this.shouldOverlayBeOpen = false
      })
      this.$root.$on('toggle-panel', () => {
        this.shouldPanelBeOpen = !this.shouldPanelBeOpen
      })
      this.$root.$on('open-panel', () => {
        this.shouldPanelBeOpen = true
      })
      this.$root.$on('close-panel', () => {
        this.shouldPanelBeOpen = false
      })
    },
    methods: {
      randomInt: (min, max) => common.getRandomInt(min, max),
    },
  }
</script>

<style lang="scss">
.sim-panel.active {
  --element-width: var(--panel-width);
  ~ .animatable {
    --parallax-amount: 0;
  }
}
.sim-overlay.active {
  ~ .animatable {
    --parallax-amount: 15vh;
  }
}
</style>
