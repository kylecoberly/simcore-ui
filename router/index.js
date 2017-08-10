import Vue from 'vue'
import Router from 'vue-router'

// Docs: Components
import DocIconText from 'sim-ui-components/IconText.vue'
import DocSelection from 'sim-ui-components/Selection.vue'
import DocSwitch from 'sim-ui-components/Switch.vue'
import DocDatalist from 'sim-ui-components/Datalist.vue'
import DocOverlay from 'sim-ui-components/Overlay.vue'
import DocPanel from 'sim-ui-components/Panel.vue'
import DocTooltip from 'sim-ui-components/Tooltip.vue'
import DocAutocomplete from 'sim-ui-components/Autocomplete.vue'

// Nav
import Hello from '../docs/Hello.vue'
import GettingStarted from '../docs/GettingStarted.vue'
import ComponentLibrary from '../docs/ComponentLibrary.vue'
import StyleLibrary from '../docs/StyleLibrary.vue'
import Extras from '../docs/Extras.vue'

// Docs: Styles
import GuideIntro from '../docs/styles/Intro.vue'
import GuideButtons from '../docs/styles/Buttons.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      label: 'Home',
      icon: 'fa-home fa-fw',
      component: Hello,
    },
    {
      path: '/getting-started',
      name: 'getting-started',
      label: 'Getting Started',
      icon: 'fa-star fa-fw',
      component: GettingStarted,
    },
    {
      path: '/components',
      label: 'Component Library',
      icon: 'fa-cubes fa-fw',
      component: ComponentLibrary,
      children: [
        {
          path: '',
          redirect: 'icon-text',
        },
        {
          path: 'icon-text',
          name: 'icon-text',
          label: 'Icon + Text',
          components: {
            details: DocIconText,
          },
        },
        {
          path: 'selection',
          name: 'selection',
          label: 'Selection',
          components: {
            details: DocSelection,
          },
        },
        {
          path: 'switch',
          name: 'switch',
          label: 'Toggle Switch',
          components: {
            details: DocSwitch,
          },
        },
        {
          path: 'datalist',
          name: 'datalist',
          label: 'Datalist',
          components: {
            details: DocDatalist,
          },
        },
        {
          path: 'overlay',
          name: 'overlay',
          label: 'Overlay',
          components: {
            details: DocOverlay,
          },
        },
        {
          path: 'panel',
          name: 'panel',
          label: 'Panel',
          components: {
            details: DocPanel,
          },
        },
        {
          path: 'tooltip',
          name: 'tooltip',
          label: 'Tooltip',
          components: {
            details: DocTooltip,
          },
        },
        {
          path: 'autocomplete',
          name: 'autocomplete',
          label: 'Autocomplete',
          components: {
            details: DocAutocomplete,
          },
        },
      ],
    },
    {
      path: '/styles',
      label: 'Style Guide',
      icon: 'fa-paint-brush fa-fw',
      component: StyleLibrary,
      children: [
        {
          path: '',
          redirect: 'intro',
        },
        {
          path: 'intro',
          name: 'intro',
          label: 'Intro',
          components: {
            details: GuideIntro,
          },
        },
        {
          path: 'buttons',
          name: 'buttons',
          label: 'Buttons',
          components: {
            details: GuideButtons,
          },
        },
      ],
    },
    {
      path: '/extras',
      name: 'extras',
      icon: 'fa-code fa-fw',
      label: 'Other Things',
      component: Extras,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
})
