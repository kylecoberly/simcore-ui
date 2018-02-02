<template lang="html">
  <div class="app-layout">
    <SimOverlay :should-show-dismiss="true" :dismiss-to="overlayDismissTo" class="animator parallax in-from-top" :should-be-open="shouldOverlayBeOpen">
      <button @click="$root.togglePanel">panelize</button>
    </SimOverlay>
    <SimPanel :should-show-dismiss="true" :dismiss-to="panelDismissTo" class="animator parallax in-from-left" :should-be-open="shouldPanelBeOpen"></SimPanel>
    <header class="app-header animatable">
      <div>
        <router-link to="/" class="logo"><span>SIM <b>UI</b></span></router-link>
        <span class="greeting">The SimCore Interface Library</span>
      </div>
      <div class="app-nav">
        <nav>
          <li><router-link to="/getting-started"><SimIconText circle icon="fa-star" text="Getting Started"></SimIconText></router-link></li>
          <li><router-link to="/components"><SimIconText circle icon="fa-cubes" text="Components"></SimIconText></router-link></li>
          <li><router-link to="/styles"><SimIconText circle icon="fa-paint-brush" text="Styles"></SimIconText></router-link></li>
          <li><router-link to="/extras"><SimIconText circle icon="fa-code" text="Other Things"></SimIconText></router-link></li>
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
    data() {
      return {
        menu: [],
        shouldOverlayBeOpen: false,
        overlayDismissTo: '',
        shouldPanelBeOpen: false,
        panelDismissTo: '',
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
      }
      const _caller = (callback) => {
        if(callback && typeof callback === 'function') {
          callback.call()
        }
      }
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
      this.$root.$on('toggle-panel', (dismissTo) => {
        this.shouldPanelBeOpen = !this.shouldPanelBeOpen
        this.panelDismissTo = dismissTo
      })
      this.$root.$on('open-panel', (dismissTo) => {
        this.shouldPanelBeOpen = true
        this.panelDismissTo = dismissTo
      })
      this.$root.$on('close-panel', (dismissTo) => {
        this.shouldPanelBeOpen = false
        this.panelDismissTo = dismissTo
      })
      this.$root.$on('toggle-modal', (callback) => {
        this.shouldModalBeOpen = !this.shouldModalBeOpen
        _caller(callback)
      })
      this.$root.$on('open-modal', (callback) => {
        this.shouldModalBeOpen = true
        _caller(callback)
      })
      this.$root.$on('close-modal', (callback) => {
        this.shouldModalBeOpen = false
        _caller(callback)
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
