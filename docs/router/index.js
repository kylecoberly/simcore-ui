import Vue from 'vue'
import Router from 'vue-router'

// Docs: Components
import DocIconText from '../pages/components/IconText'
import DocSelection from '../pages/components/Selection'
import DocSwitch from '../pages/components/Switch'
import DocDatalist from '../pages/components/Datalist'
import DocOverlay from '../pages/components/Overlay'
import DocPanel from '../pages/components/Panel'
import DocTooltip from '../pages/components/Tooltip'
import DocAutocomplete from '../pages/components/Autocomplete'

// Nav
import Hello from '../Hello'
import GettingStarted from '../GettingStarted'
import ComponentLibrary from '../ComponentLibrary'
import StyleLibrary from '../StyleLibrary'
import Extras from '../Extras'

// Docs: Styles
import GuideIntro from '../pages/styles/Intro'
import GuideButtons from '../pages/styles/Buttons'

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
