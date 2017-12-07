webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(252)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(206),
  /* template */
  __webpack_require__(510),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(253)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(167),
  /* template */
  __webpack_require__(513),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  capitalizeFirstLetter: string => string.charAt(0).toUpperCase() + string.slice(1),

  getRandomInt: (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min,

  clone: (collection, property) => collection.map(item => (property ? item[property] : item)),

  unique: array => {
    const t = {}
    return array.filter(item => {
      if (Object.prototype.hasOwnProperty.call(t, item)) {
        return false
      }
      return (t[item] = true)
    })
  },

  sortByKey: (list, key) => list.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1
    } else if (a[key] > b[key]) {
      return 1
    }
    return 0
  }),

});


/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(256)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(164),
  /* template */
  __webpack_require__(517),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(263)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(173),
  /* template */
  __webpack_require__(531),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(260)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(174),
  /* template */
  __webpack_require__(525),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(239)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(176),
  /* template */
  __webpack_require__(492),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(246)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(177),
  /* template */
  __webpack_require__(502),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_components_Autocomplete__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_components_Autocomplete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__pages_components_Autocomplete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_components_Badge__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_components_Badge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__pages_components_Badge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_components_BulkCheck__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_components_BulkCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__pages_components_BulkCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_components_Calendar__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_components_Calendar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__pages_components_Calendar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_components_Datalist__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_components_Datalist___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__pages_components_Datalist__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_components_Datepicker__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_components_Datepicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__pages_components_Datepicker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_components_FilterBy__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_components_FilterBy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__pages_components_FilterBy__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_components_IconText__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_components_IconText___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__pages_components_IconText__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_components_Loader__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_components_Loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__pages_components_Loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_components_Modal__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_components_Modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__pages_components_Modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_components_Overlay__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_components_Overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__pages_components_Overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_components_Panel__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_components_Panel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__pages_components_Panel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_components_Progress__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_components_Progress___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__pages_components_Progress__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_components_Selection__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_components_Selection___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__pages_components_Selection__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_components_Switch__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_components_Switch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__pages_components_Switch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_components_Tag__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_components_Tag___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__pages_components_Tag__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_components_TimePicker__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_components_TimePicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__pages_components_TimePicker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_components_Tooltip__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_components_Tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19__pages_components_Tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__Hello__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__Hello___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20__Hello__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__GettingStarted__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__GettingStarted___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21__GettingStarted__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ComponentLibrary__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ComponentLibrary___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22__ComponentLibrary__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__StyleLibrary__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__StyleLibrary___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23__StyleLibrary__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__Extras__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__Extras___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24__Extras__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_styles_Intro__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_styles_Intro___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25__pages_styles_Intro__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_styles_Buttons__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_styles_Buttons___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_26__pages_styles_Buttons__);



// Docs: Components



















// Nav






// Docs: Styles



__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */])

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      label: 'Home',
      icon: 'fa-home fa-fw',
      component: __WEBPACK_IMPORTED_MODULE_20__Hello___default.a,
    },
    {
      path: '/getting-started',
      name: 'getting-started',
      label: 'Getting Started',
      icon: 'fa-star fa-fw',
      component: __WEBPACK_IMPORTED_MODULE_21__GettingStarted___default.a,
    },
    {
      path: '/components',
      label: 'Component Library',
      icon: 'fa-cubes fa-fw',
      component: __WEBPACK_IMPORTED_MODULE_22__ComponentLibrary___default.a,
      children: [
        {
          path: '',
          redirect: 'icon-text',
        },
        {
          path: 'autocomplete',
          name: 'autocomplete',
          label: 'Autocomplete',
          components: {
            details: __WEBPACK_IMPORTED_MODULE_2__pages_components_Autocomplete___default.a,
          },
        },
        {
          path: 'badge',
          name: 'badge',
          label: 'Badge',
          components: {
            details: __WEBPACK_IMPORTED_MODULE_3__pages_components_Badge___default.a,
          },
        },
        {
          path: 'bulkcheck',
          name: 'bulkcheck',
          label: 'Bulk Check',
          components: {
            details: __WEBPACK_IMPORTED_MODULE_4__pages_components_BulkCheck___default.a,
          },
        },
        {
          path: 'calendar',
          name: 'calendar',
          label: 'Calendar',
          components: {
            details: __WEBPACK_IMPORTED_MODULE_5__pages_components_Calendar___default.a,
          },
        },
        {
          path: 'datalist',
          name: 'datalist',
          label: 'Datalist',
          components: {
            details: __WEBPACK_IMPORTED_MODULE_6__pages_components_Datalist___default.a,
          },
        },
        {
          path: 'datepicker',
          name: 'datepicker',
          label: 'Datepicker',
          components: {
            details: __WEBPACK_IMPORTED_MODULE_7__pages_components_Datepicker___default.a,
          },
        },
        {
          path: 'filter-by',
          name: 'filter-by',
          label: 'FilterBy',
          components: {
            details: __WEBPACK_IMPORTED_MODULE_8__pages_components_FilterBy___default.a,
          },
        },
        {
          path: 'icon-text',
          name: 'icon-text',
          label: 'Icon + Text',
          components: {
            details: __WEBPACK_IMPORTED_MODULE_9__pages_components_IconText___default.a,
          },
        },
        {
          path: 'loader',
          name: 'loader',
          label: 'Loader',
          components: {
            details: __WEBPACK_IMPORTED_MODULE_10__pages_components_Loader___default.a,
          },
        },
        {
          path: 'modal',
          name: 'modal',
          label: 'Modal',
          components: {
            details: __WEBPACK_IMPORTED_MODULE_11__pages_components_Modal___default.a,
          },
        },
        {
          path: 'overlay',
          name: 'overlay',
          label: 'Overlay',
          components: {
            details: __WEBPACK_IMPORTED_MODULE_12__pages_components_Overlay___default.a,
          },
        },
        {
          path: 'panel',
          name: 'panel',
          label: 'Panel',
          components: {
            details: __WEBPACK_IMPORTED_MODULE_13__pages_components_Panel___default.a,
          },
        },
        {
          path: 'progress',
          name: 'progress',
          label: 'Progress',
          components: {
            details: __WEBPACK_IMPORTED_MODULE_14__pages_components_Progress___default.a,
          },
        },
        {
          path: 'selection',
          name: 'selection',
          label: 'Selection',
          components: {
            details: __WEBPACK_IMPORTED_MODULE_15__pages_components_Selection___default.a,
          },
        },
        {
          path: 'switch',
          name: 'switch',
          label: 'Toggle Switch',
          components: {
            details: __WEBPACK_IMPORTED_MODULE_16__pages_components_Switch___default.a,
          },
        },
        {
          path: 'tag',
          name: 'tag',
          label: 'Tag',
          components: {
            details: __WEBPACK_IMPORTED_MODULE_17__pages_components_Tag___default.a,
          },
        },
        {
          path: 'time-picker',
          name: 'timepicker',
          label: 'Time Picker',
          components: {
            details: __WEBPACK_IMPORTED_MODULE_18__pages_components_TimePicker___default.a,
          },
        },
        {
          path: 'tooltip',
          name: 'tooltip',
          label: 'Tooltip',
          components: {
            details: __WEBPACK_IMPORTED_MODULE_19__pages_components_Tooltip___default.a,
          },
        },
      ],
    },
    {
      path: '/styles',
      label: 'Style Guide',
      icon: 'fa-paint-brush fa-fw',
      component: __WEBPACK_IMPORTED_MODULE_23__StyleLibrary___default.a,
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
            details: __WEBPACK_IMPORTED_MODULE_25__pages_styles_Intro___default.a,
          },
        },
        {
          path: 'buttons',
          name: 'buttons',
          label: 'Buttons',
          components: {
            details: __WEBPACK_IMPORTED_MODULE_26__pages_styles_Buttons___default.a,
          },
        },
      ],
    },
    {
      path: '/extras',
      name: 'extras',
      icon: 'fa-code fa-fw',
      label: 'Other Things',
      component: __WEBPACK_IMPORTED_MODULE_24__Extras___default.a,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
}));


/***/ }),
/* 157 */,
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(267)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(179),
  /* template */
  __webpack_require__(536),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_highlightjs__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_highlightjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_highlightjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins__ = __webpack_require__(12);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.







__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false

// helpers
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_highlightjs___default.a)

/* eslint-disable no-new, import/prefer-default-export */
// export const Events = new Vue({})

new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_3__router__["a" /* default */],
  mixins: [__WEBPACK_IMPORTED_MODULE_4__mixins__["a" /* default */]],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_2__App___default.a },
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
    togglePanel(callback) {
      this.$emit('toggle-panel', callback)
    },
    openPanel(callback) {
      this.$emit('open-panel', callback)
    },
    closePanel(callback) {
      this.$emit('close-panel', callback)
    },
    toggleModal(callback) {
      this.$emit('toggle-modal', callback)
    },
    openModal(callback) {
      this.$emit('open-modal', callback)
    },
    closeModal(callback) {
      this.$emit('close-modal', callback)
    },
  },
})


/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sim-autocomplete',
  props: {
    name: {
      type: String,
      default: 'autocomplete'
    },
    options: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: 'find...'
    }
  },
  data: function data() {
    return {
      isOpen: false,
      position: 0,
      keyword: ''
    };
  },

  computed: {
    filteredOptions: function filteredOptions() {
      var expression = new RegExp(this.keyword, 'i');
      return this.options.filter(function (option) {
        return option.name.match(expression);
      });
    }
  },
  methods: {
    onInput: function onInput(value) {
      this.position = 0;
      this.isOpen = !!value;
    },
    moveDown: function moveDown() {
      if (!this.isOpen) {
        return;
      }
      this.position = (this.position + 1) % this.filteredOptions.length;
    },
    moveUp: function moveUp() {
      if (!this.isOpen) {
        return;
      }
      this.position = this.position - 1 < 0 ? this.filteredOptions.length - 1 : this.position - 1;
    },
    select: function select() {
      var selectedOption = this.filteredOptions[this.position];
      this.$emit('select', selectedOption);
      this.isOpen = false;
      this.keyword = selectedOption.name;
    }
  }
});

/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sim-badge',
  props: {
    badge: [Number, String]
  }
});

/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IconText__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IconText___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__IconText__);
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sim-bulkcheck',
  components: {
    SimIconText: __WEBPACK_IMPORTED_MODULE_0__IconText___default.a
  },
  props: {
    state: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'fa-check'
    },
    text: {
      type: [String, Number],
      default: ''
    }
  },
  data: function data() {
    return {
      checkAll: this.state
    };
  },

  methods: {
    toggleState: function toggleState() {
      this.checkAll = !this.checkAll;
      this.$emit('toggle', this.checkAll);
    }
  },
  watch: {
    state: function state(value) {
      this.checkAll = value;
    }
  }
});

/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__IconText__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__IconText___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__IconText__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




var _zeroPad = function _zeroPad(num, pads) {
  pads = pads || '000';
  return (pads + num).substr(-2);
};

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sim-calendar',
  components: {
    SimIconText: __WEBPACK_IMPORTED_MODULE_2__IconText___default.a
  },
  props: ['date', 'dates', 'selectedClass'],
  data: function data() {
    return {
      dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      dateFormat: 'YYYY-MM-DD',
      weekendDays: [0, 6],
      displayMode: 'month'
    };
  },

  computed: {
    activeMoment: function activeMoment() {
      return __WEBPACK_IMPORTED_MODULE_1_moment___default()(this.date);
    },
    activeMonth: function activeMonth() {
      return this.activeMoment.month();
    },
    activeYear: function activeYear() {
      return this.activeMoment.year();
    },
    isCurrentMonth: function isCurrentMonth() {
      return __WEBPACK_IMPORTED_MODULE_1_moment___default()().isSame([this.activeYear, this.activeMonth, 1], 'month');
    },
    isMonthView: function isMonthView() {
      return this.displayMode === 'month';
    },
    isWeekView: function isWeekView() {
      return this.displayMode === 'week';
    },
    startOffset: function startOffset() {
      return __WEBPACK_IMPORTED_MODULE_1_moment___default()([this.activeYear, this.activeMonth, 1]).day();
    },
    endOffset: function endOffset() {
      return 6 - __WEBPACK_IMPORTED_MODULE_1_moment___default()([this.activeYear, this.activeMonth, this.days.length]).day();
    },
    currentWeekDays: function currentWeekDays() {
      var start = __WEBPACK_IMPORTED_MODULE_1_moment___default()(this.activeMoment).startOf('week');
      var days = [start.format(this.dateFormat)];
      for (var i = 0; i < 6; i++) {
        days.push(start.add(1, 'day').format(this.dateFormat));
      }
      // window.console.log('week', days)
      return days;
    },
    currentMonthDays: function currentMonthDays() {
      var _this = this;

      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default()(Array(this.activeMoment.daysInMonth()), function (_, day) {
        return _this.activeYear + '-' + _zeroPad(_this.activeMonth + 1) + '-' + _zeroPad(day + 1);
      });
    },
    days: function days() {
      return this.isMonthView ? this.currentMonthDays : this.currentWeekDays;
    },
    displayMonthName: function displayMonthName() {
      return this.activeMoment.format('MMMM');
    },
    displayYear: function displayYear() {
      return this.activeMoment.format('YYYY');
    },
    displayDate: function displayDate() {
      var display = this.displayMonthName + ' ' + this.displayYear;
      if (this.isWeekView) {
        display = __WEBPACK_IMPORTED_MODULE_1_moment___default()(this.currentWeekDays[0]).format('MMM Do') + ' \u2013 ' + __WEBPACK_IMPORTED_MODULE_1_moment___default()(this.currentWeekDays[6]).format('MMM Do');
      }
      return display;
    }
  },
  mounted: function mounted() {
    this.today();
  },

  methods: {
    emitDayClick: function emitDayClick(day) {
      this.$emit('calendar-day-selected', day);
    },
    loadNextDays: function loadNextDays() {
      this.emitDayClick(this.activeMoment.add(1, this.displayMode).format(this.dateFormat));
    },
    loadPrevDays: function loadPrevDays() {
      this.emitDayClick(this.activeMoment.subtract(1, this.displayMode).format(this.dateFormat));
    },
    today: function today() {
      this.emitDayClick(__WEBPACK_IMPORTED_MODULE_1_moment___default()().format(this.dateFormat));
    },
    showDayNumber: function showDayNumber(date) {
      date = date.split('-');
      return parseInt(date[2]);
    },
    setDisplayMode: function setDisplayMode(mode) {
      this.displayMode = mode;
    },
    displayHour: function displayHour(hour) {
      hour = hour === 0 || hour === 24 ? 'Midnight' : hour === 12 ? 'Noon' : hour; // (hour % 2 === 0 ? hour : ''))
      return hour > 12 ? hour - 12 + 'p' : parseInt(hour) ? hour + 'a' : hour;
    },
    setHourClasses: function setHourClasses(hour) {
      var classes = [];
      classes.push(hour >= 6 && hour <= 17 ? 'is-daytime' : 'is-nighttime');
      classes.push(hour === 0 || hour === 24 ? 'is-midnight' : hour === 12 ? 'is-noon' : '');
      // classes.push((hour === 8 ? 'is-start-dayshift' : ''))
      // classes.push((hour === 18 ? 'is-end-dayshift' : ''))
      return classes.join(' ');
    },
    setDayClasses: function setDayClasses(day) {
      var dayOfWeek = __WEBPACK_IMPORTED_MODULE_1_moment___default()(day).day();
      var classes = ['day-' + dayOfWeek];

      if (__WEBPACK_IMPORTED_MODULE_1_moment___default()().isSame(day, 'day')) {
        classes.push('is-today');
      } else if (__WEBPACK_IMPORTED_MODULE_1_moment___default()().isAfter(day, 'day')) {
        classes.push('is-before-today');
      } else {
        classes.push('is-after-today');
      }

      if (this.weekendDays.includes(dayOfWeek)) {
        classes.push('is-weekend');
      } else {
        classes.push('is-weekday');
      }

      if (__WEBPACK_IMPORTED_MODULE_1_moment___default()(this.date).isSame(day, 'day')) {
        classes.push(this.selectedClass || 'is-selected');
      }

      return classes.join(' ');
    }
  }
});

/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sim-datalist',
  props: ['items', 'animate']
});

/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuejs_datepicker__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuejs_datepicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuejs_datepicker__);
//
//
//
//

// https://github.com/charliekassel/vuejs-datepicker


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sim-datepicker',
  components: {
    Datepicker: __WEBPACK_IMPORTED_MODULE_0_vuejs_datepicker___default.a
  }
});

/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IconText__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__IconText___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__IconText__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Datalist__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Datalist___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Datalist__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Selection__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Selection___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Selection__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sim-filter-by',
  components: {
    SimIconText: __WEBPACK_IMPORTED_MODULE_0__IconText___default.a,
    SimDatalist: __WEBPACK_IMPORTED_MODULE_1__Datalist___default.a,
    SimSelection: __WEBPACK_IMPORTED_MODULE_2__Selection___default.a
  },
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    systemEcho: {
      type: String
    }
  },
  data: function data() {
    return {
      selectedItems: [],
      items: [],
      isOpen: false
    };
  },

  computed: {
    shouldBeActive: function shouldBeActive() {
      return this.selectedItems.length > 0;
    },
    showSystemEcho: function showSystemEcho() {
      return this.systemEcho && this.systemEcho.length && !this.list.length;
    }
  },
  methods: {
    toggleOpenList: function toggleOpenList() {
      this.isOpen = !this.isOpen;
    },
    toggleSelection: function toggleSelection(id, isSelected) {
      if (isSelected) {
        this.selectedItems.push(id);
      } else {
        this.selectedItems.splice(this.selectedItems.indexOf(id), 1);
      }
    }
  },
  watch: {
    'selectedItems': function selectedItems(newValue) {
      this.$emit('filter', this.type, newValue);
    }
  }
});

/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sim-icontext',
  props: {
    icon: String,
    text: [Number, String],
    circle: Boolean,
    round: Boolean,
    square: Boolean
  },
  computed: {
    bling: function bling() {
      if (this.circle) {
        return 'sim-icontext__circle';
      }
      if (this.round) {
        return 'sim-icontext__round';
      }
      if (this.square) {
        return 'sim-icontext__square';
      }
      return 'sim-icontext__plain';
    }
  }
});

/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'sim-loader',
    props: {
        isLoading: {
            type: Boolean,
            default: false
        }
    }
});

/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sim-modal',
  props: {
    shouldBeOpen: {
      type: Boolean,
      default: false
    },
    dismissTo: {
      type: String,
      default: ''
    },
    shouldShowDismiss: {
      type: Boolean,
      default: true
    },
    shouldShowMask: {
      type: Boolean,
      default: true
    },
    canClickMask: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    dismiss: function dismiss() {
      if (this.$router && this.dismissTo && typeof this.dismissTo === 'string') {
        this.$router.push(this.dismissTo);
      } else {
        this.$root.closeModal();
      }
    },
    clickMask: function clickMask() {
      if (this.canClickMask) {
        this.dismiss();
      }
    }
  }
});

/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sim-overlay',
  props: ['should-be-open', 'should-show-dismiss', 'dismiss-to'],
  methods: {
    dismiss: function dismiss() {
      if (this.$router && this.dismissTo && typeof this.dismissTo === 'string') {
        this.$router.replace(this.dismissTo);
      } else {
        this.$root.closeOverlay();
      }
    }
  }
});

/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sim-panel',
  props: ['should-be-open', 'should-show-dismiss', 'dismiss-to'],
  methods: {
    dismiss: function dismiss() {
      if (this.$router && this.dismissTo && typeof this.dismissTo === 'string') {
        this.$router.replace(this.dismissTo);
      } else {
        this.$root.closePanel();
      }
    }
  }
});

/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sim-progress',
  props: {
    percent: [Number, String]
  },
  computed: {
    percentComplete: function percentComplete() {
      return this.percent || 0;
    },
    stylePercentComplete: function stylePercentComplete() {
      return '--percent:' + this.percentComplete + '%';
    },
    bubbleText: function bubbleText() {
      return this.percentComplete + '% Complete';
    }
  }
});

/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sim-selection',
  props: { itemId: [String, Number], shouldBeDisabled: Boolean, shouldBeSelected: Boolean },
  data: function data() {
    return {
      selected: this.shouldBeSelected
    };
  },

  methods: {
    toggleSelection: function toggleSelection() {
      this.selected = !this.selected;
      this.$emit('toggle', this.itemId, this.selected);
    }
  },
  watch: {
    shouldBeSelected: function shouldBeSelected(value) {
      this.selected = value;
    }
  }
});

/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sim-switch',
  props: ['value', 'leftLabel', 'rightLabel'],
  data: function data() {
    return {
      checked: this.value
    };
  },

  methods: {
    change: function change() {
      this.checked = !this.checked;
      this.$emit('input', this.checked);
    }
  }
});

/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sim-tag',
  props: {
    icon: String,
    text: [String, Number]
  }
});

/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__IconText__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__IconText___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__IconText__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




var _cap = function _cap(num, previous, min, max) {
  return num < min ? min : num > max - previous ? max - previous : num;
};
var _setProperty = function _setProperty(element, property, value) {
  element.style.setProperty('--' + property, value);
};
var _getProperty = function _getProperty(element, property) {
  return element.style.getPropertyValue('--' + property);
};
var _getMetrics = function _getMetrics(event, element) {
  var blockMetrics = element.getBoundingClientRect();
  var pickerMetrics = element.parentElement.getBoundingClientRect();

  return {
    start: {
      x: event.clientX,
      y: event.clientY
    },
    axis: {
      x: blockMetrics.width,
      y: blockMetrics.height
    },
    offset: {
      x: blockMetrics.x,
      y: blockMetrics.y
    },
    max: {
      x: pickerMetrics.width,
      y: pickerMetrics.height
    },
    offset_parent: {
      x: pickerMetrics.x,
      y: pickerMetrics.y
    },
    segment: {
      x: pickerMetrics.width / 48,
      y: pickerMetrics.height / 48
    },
    durationValue: parseFloat(_getProperty(element, 'duration')),
    startValue: parseFloat(_getProperty(element, 'start'))
  };
};

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sim-timeblock',
  components: {
    SimIconText: __WEBPACK_IMPORTED_MODULE_1__IconText___default.a
  },
  props: {
    block: {
      type: Object,
      default: {}
    },
    index: {
      type: Number,
      default: 0
    },
    date: {
      type: String,
      default: ''
    },
    orientation: {
      type: String,
      default: 'x'
    },
    showControls: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      isMoving: false,
      stretchDirection: null
    };
  },

  computed: {
    orientationIsX: function orientationIsX() {
      return this.orientation === 'x';
    },
    orientationIsY: function orientationIsY() {
      return this.orientation === 'y';
    }
  },
  methods: {
    setStyle: function setStyle(block) {
      var styles = [];
      styles.push('--start: ' + block.start);
      styles.push('--duration: ' + block.duration);

      return styles.join(';');
    },
    setClass: function setClass() {
      var classes = ['sim-timeblock sim-timeblock--' + this.index + ' sim-timeblock--' + this.orientation];
      if (!this.showControls) {
        classes.push('is-display-only');
      }
      if (this.isMoving) {
        classes.push('is-moving');
      }
      if (this.stretchDirection) {
        classes.push('is-stretching is-stretching--' + this.stretchDirection);
      }

      return classes.join(' ');
    },
    displayBlockHours: function displayBlockHours() {
      var total = this.block.duration;
      var output = total.toString().replace(/\.5/, '½').replace(/^0/, '') || 0;
      var hours = output + ' ' + (total > 0 && total <= 1 ? 'hour' : 'hours');

      return hours;
    },
    displayBlockTime: function displayBlockTime() {
      var times = null;

      if (this.isMoving || this.stretchDirection) {
        var day = __WEBPACK_IMPORTED_MODULE_0_moment___default()().startOf('day');
        var start = day.add(this.block.start, 'hours').format('h:mma');
        var end = day.add(this.block.duration, 'hours').format('h:mma');
        times = start.replace(':00', '') + ' \u2014 ' + end.replace(':00', '');
      }

      return times;
    },
    removeTimeBlock: function removeTimeBlock(event) {
      event.stopPropagation();
      event.preventDefault();
      this.$emit('remove-time-block', this.index);
    },

    // ----------
    setStretchingStart: function setStretchingStart(event, mouseCoordinate) {
      // for stretch left/up
      var calc = this.metrics.offset[this.orientation] + mouseCoordinate - this.metrics.start[this.orientation] - this.metrics.offset_parent[this.orientation];
      var currentStart = Math.floor(calc / this.metrics.segment[this.orientation]) / 2;
      this.block.start = _cap(currentStart, 0, 0, this.metrics.startValue + this.metrics.durationValue - 0.5);

      // @FIXME dont make this a global setter?
      _setProperty(this.$el, 'start', this.block.start);

      return currentStart;
    },
    setMovingStart: function setMovingStart(event) {
      var mouseCoordinate = this.orientation === 'x' ? event.clientX : event.clientY;
      var calc = this.metrics.offset[this.orientation] + mouseCoordinate - this.metrics.start[this.orientation] - this.metrics.offset_parent[this.orientation];
      var currentStart = _cap(calc, this.metrics.axis[this.orientation], 0, this.metrics.max[this.orientation]);
      this.block.start = Math.round(currentStart / this.metrics.segment[this.orientation]) / 2;

      // @FIXME dont make this a global setter?
      _setProperty(this.$el, 'start', this.block.start);
    },
    setDurationFromEnd: function setDurationFromEnd(event, mouseCoordinate) {
      // For down or right
      var currentDuration = Math.round((this.metrics.axis[this.orientation] + mouseCoordinate - this.metrics.start[this.orientation]) / this.metrics.segment[this.orientation]) / 2;
      this.block.duration = _cap(currentDuration, 0, 0.5, 24 - this.block.start);

      // @FIXME dont make this a global setter?
      _setProperty(this.$el, 'duration', this.block.duration);
    },
    setDurationFromStart: function setDurationFromStart(event, mouseCoordinate, currentStart) {
      // For up or left
      var currentDuration = this.metrics.durationValue - Math.floor((mouseCoordinate - this.metrics.start[this.orientation]) / this.metrics.segment[this.orientation]) / 2;
      this.block.duration = _cap(currentDuration, 0, 0.5, currentStart < 0 ? this.block.duration : 24);

      // @FIXME dont make this a global setter?
      _setProperty(this.$el, 'duration', this.block.duration);
    },

    // ----------
    move: function move(event) {
      this.setMovingStart(event, event.clientX);
    },
    doneMoving: function doneMoving() {
      this.isMoving = false;
      this.$emit('is-moving', false);
      this.$emit('block-updated', this.date);
      removeEventListener('mousemove', this.move);
      removeEventListener('mouseup', this.doneMoving);
    },
    startMove: function startMove(event) {
      if (event.which === 1) {
        window.console.log('start move', this.orientation);
        // event.preventDefault()
        // event.stopPropagation()
        this.isMoving = true;
        this.metrics = _getMetrics(event, this.$el);
        this.$emit('is-moving', true);
        addEventListener('mousemove', this.move);
        addEventListener('mouseup', this.doneMoving);
      }
    },

    // ----------
    stretchRight: function stretchRight(event) {
      this.setDurationFromEnd(event, event.clientX);
    },
    doneStretchingRight: function doneStretchingRight() {
      this.stretchDirection = null;
      this.$emit('is-stretching', false);
      this.$emit('block-updated', this.date);
      removeEventListener('mousemove', this.stretchRight);
      removeEventListener('mouseup', this.doneStretchingRight);
    },
    startStretchRight: function startStretchRight(event) {
      if (event.which === 1) {
        event.preventDefault();
        event.stopPropagation();
        this.stretchDirection = 'right';
        this.metrics = _getMetrics(event, this.$el);
        this.$emit('is-stretching', true);
        addEventListener('mousemove', this.stretchRight);
        addEventListener('mouseup', this.doneStretchingRight);
      }
    },

    // ----------
    stretchDown: function stretchDown(event) {
      this.setDurationFromEnd(event, event.clientY);
    },
    doneStretchingDown: function doneStretchingDown() {
      this.stretchDirection = null;
      this.$emit('is-stretching', false);
      this.$emit('block-updated', this.date);
      removeEventListener('mousemove', this.stretchDown);
      removeEventListener('mouseup', this.doneStretchingDown);
    },
    startStretchDown: function startStretchDown(event) {
      if (event.which === 1) {
        event.preventDefault();
        event.stopPropagation();
        this.stretchDirection = 'down';
        this.metrics = _getMetrics(event, this.$el);
        this.$emit('is-stretching', true);
        addEventListener('mousemove', this.stretchDown);
        addEventListener('mouseup', this.doneStretchingDown);
      }
    },

    // ----------
    stretchLeft: function stretchLeft(event) {
      var currentStart = this.setStretchingStart(event, event.clientX);
      this.setDurationFromStart(event, event.clientX, currentStart);
    },
    doneStretchingLeft: function doneStretchingLeft() {
      this.stretchDirection = null;
      this.$emit('is-stretching', false);
      this.$emit('block-updated', this.date);
      removeEventListener('mousemove', this.stretchLeft);
      removeEventListener('mouseup', this.doneStretchingLeft);
    },
    startStretchLeft: function startStretchLeft(event) {
      if (event.which === 1) {
        event.preventDefault();
        event.stopPropagation();
        this.stretchDirection = 'left';
        this.metrics = _getMetrics(event, this.$el);
        this.$emit('is-stretching', true);
        addEventListener('mousemove', this.stretchLeft);
        addEventListener('mouseup', this.doneStretchingLeft);
      }
    },

    // ----------
    stretchUp: function stretchUp(event) {
      var currentStart = this.setStretchingStart(event, event.clientY);
      this.setDurationFromStart(event, event.clientY, currentStart);
    },
    doneStretchingUp: function doneStretchingUp() {
      this.stretchDirection = null;
      this.$emit('is-stretching', false);
      this.$emit('block-updated', this.date);
      removeEventListener('mousemove', this.stretchUp);
      removeEventListener('mouseup', this.doneStretchingUp);
    },
    startStretchUp: function startStretchUp(event) {
      if (event.which === 1) {
        event.preventDefault();
        event.stopPropagation();
        this.stretchDirection = 'up';
        this.metrics = _getMetrics(event, this.$el);
        this.$emit('is-stretching', true);
        addEventListener('mousemove', this.stretchUp);
        addEventListener('mouseup', this.doneStretchingUp);
      }
    }
  }
});

/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__IconText__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__IconText___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__IconText__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TimeBlock__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TimeBlock___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__TimeBlock__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





var _zeroPad = function _zeroPad(num, pads) {
  pads = pads || '000';
  return (pads + num).substr(-2);
};

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sim-timepicker',
  components: {
    SimIconText: __WEBPACK_IMPORTED_MODULE_1__IconText___default.a,
    SimTimeBlock: __WEBPACK_IMPORTED_MODULE_2__TimeBlock___default.a
  },
  props: {
    date: {
      type: String,
      default: ''
    },
    blocks: {
      type: Array
    },
    shouldShowDate: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      isMoving: false,
      isStretching: false,
      orientation: 'x'
    };
  },

  computed: {
    activeMoment: function activeMoment() {
      return __WEBPACK_IMPORTED_MODULE_0_moment___default()(this.date);
    },
    displayDate: function displayDate() {
      return __WEBPACK_IMPORTED_MODULE_0_moment___default()(this.date).format('dddd, MMMM Do');
    },
    totalHours: function totalHours() {
      return this.blocks.map(function (block) {
        return block.duration;
      }).reduce(function (sum, value) {
        return sum + value;
      }, 0);
    },
    displayDateTotalHours: function displayDateTotalHours() {
      var output = this.totalHours.toString().replace(/\.5/, '½').replace(/^0/, '') || 0;
      var hours = output + ' ' + (this.totalHours > 0 && this.totalHours <= 1 ? 'hour' : 'hours');
      return hours;
    }
  },
  methods: {
    sortBlocks: function sortBlocks() {
      this.blocks.sort(function (a, b) {
        return parseFloat(a.start) - parseFloat(b.start);
      });
    },
    setClass: function setClass() {
      var classes = [];
      if (this.isMoving) {
        classes.push('is-moving');
      }
      if (this.isStretching) {
        classes.push('is-stretching');
      }
      return classes.join(' ');
    },
    setMovingState: function setMovingState(bool) {
      this.isMoving = bool;
    },
    setStretchingState: function setStretchingState(bool) {
      this.isStretching = bool;
    },
    displayHour: function displayHour(hour) {
      hour = hour === 0 || hour === 24 ? 'Midnight' : hour === 12 ? 'Noon' : hour;
      return hour > 12 ? hour - 12 + 'p' : parseInt(hour) ? hour + 'a' : hour;
    },
    setHourClass: function setHourClass(hour) {
      return hour >= 6 && hour <= 17 ? 'is-daytime' : 'is-nighttime';
    },
    createTimeBlock: function createTimeBlock(hour) {
      this.blocks.push({ start: hour, duration: 1 });
      this.sortBlocks();
      this.$emit('time-block-created', this.date, this.blocks);
    },
    removeTimeBlock: function removeTimeBlock(index) {
      this.blocks.splice(index, 1);
      this.$emit('time-block-removed', this.date, this.blocks);
    },
    removeAllTimeBlocks: function removeAllTimeBlocks() {
      this.blocks.splice(0, this.blocks.length);
      this.$emit('all-time-blocks-removed', this.date);
    },
    emitDayClick: function emitDayClick(day) {
      this.$emit('calendar-day-selected', day);
    },
    blockWasUpdated: function blockWasUpdated(date) {
      this.sortBlocks();
      this.$emit('time-block-updated', date);
    },
    nextDay: function nextDay() {
      this.emitDayClick(this.activeMoment.add(1, 'day').format('YYYY-MM-DD'));
    },
    prevDay: function prevDay() {
      this.emitDayClick(this.activeMoment.subtract(1, 'day').format('YYYY-MM-DD'));
    }
  }
});

/***/ }),
/* 178 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sim-tooltip',
  props: {
    pop: {
      type: String,
      default: 'up'
    },
    shift: {
      type: String,
      default: 'none'
    }
  },
  computed: {
    popTo: function popTo() {
      return 'sim-tooltip__bubble--' + this.pop;
    }
  }
});

/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Layout__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Layout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Layout__);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app',
  components: {
    Layout: __WEBPACK_IMPORTED_MODULE_0__Layout___default.a
  }
});

/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'library-ui',
  computed: {
    routes: function routes() {
      return this.$router.options.routes;
    }
  },
  data: function data() {
    return {
      msg: 'Components',
      menu: []
    };
  },
  mounted: function mounted() {
    this.menu = {
      label: 'Home',
      children: this.routes.map(function (route) {
        return route;
      })
    };
  }
});

/***/ }),
/* 181 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'extras',
  data: function data() {
    return {
      msg: 'Other Things'
    };
  }
});

/***/ }),
/* 182 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_Demobox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_Demobox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__utility_Demobox__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'getting-started',
  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins__["a" /* default */]],
  data: function data() {
    return {
      list: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'.split(' '),
      sortKey: 'index',
      search: ''
    };
  },

  computed: {
    myList: function myList() {
      var list = this.list.map(function (item, index) {
        return { index: index, item: item };
      });
      return __WEBPACK_IMPORTED_MODULE_0__mixins__["a" /* default */].sortByKey(list, this.sortKey);
    },
    filteredList: function filteredList() {
      var _this = this;

      return this.myList.filter(function (item) {
        return item.item.toLowerCase().includes(_this.search.toLowerCase());
      });
    }
  },
  methods: {
    randomInt: function randomInt(min, max) {
      return __WEBPACK_IMPORTED_MODULE_0__mixins__["a" /* default */].getRandomInt(min, max);
    }
  }
});

/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'hello',
  data: function data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  }
});

/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Overlay__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Overlay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Overlay__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Panel__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Panel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Panel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_IconText__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_IconText___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_IconText__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utility_Directory__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utility_Directory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__utility_Directory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins__ = __webpack_require__(12);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Layout',
  mixins: [__WEBPACK_IMPORTED_MODULE_4__mixins__["a" /* default */]],
  components: {
    SimOverlay: __WEBPACK_IMPORTED_MODULE_0__components_Overlay___default.a,
    SimPanel: __WEBPACK_IMPORTED_MODULE_1__components_Panel___default.a,
    SimIconText: __WEBPACK_IMPORTED_MODULE_2__components_IconText___default.a,
    Directory: __WEBPACK_IMPORTED_MODULE_3__utility_Directory___default.a
  },
  data: function data() {
    return {
      menu: [],
      shouldOverlayBeOpen: false,
      overlayDismissTo: '',
      shouldPanelBeOpen: false,
      panelDismissTo: ''
    };
  },

  computed: {
    routes: function routes() {
      return this.$router.options.routes;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.menu = {
      children: this.routes
    };
    var _caller = function _caller(callback) {
      if (callback && typeof callback === 'function') {
        callback.call();
      }
    };
    this.$root.$on('toggle-overlay', function (dismissTo) {
      _this.shouldOverlayBeOpen = !_this.shouldOverlayBeOpen;
      _this.overlayDismissTo = dismissTo;
    });
    this.$root.$on('open-overlay', function (dismissTo) {
      _this.shouldOverlayBeOpen = true;
      _this.overlayDismissTo = dismissTo;
    });
    this.$root.$on('close-overlay', function (dismissTo) {
      _this.shouldOverlayBeOpen = false;
      _this.overlayDismissTo = dismissTo;
    });
    this.$root.$on('toggle-panel', function (dismissTo) {
      _this.shouldPanelBeOpen = !_this.shouldPanelBeOpen;
      _this.panelDismissTo = dismissTo;
    });
    this.$root.$on('open-panel', function (dismissTo) {
      _this.shouldPanelBeOpen = true;
      _this.panelDismissTo = dismissTo;
    });
    this.$root.$on('close-panel', function (dismissTo) {
      _this.shouldPanelBeOpen = false;
      _this.panelDismissTo = dismissTo;
    });
    this.$root.$on('toggle-modal', function (callback) {
      _this.shouldModalBeOpen = !_this.shouldModalBeOpen;
      _caller(callback);
    });
    this.$root.$on('open-modal', function (callback) {
      _this.shouldModalBeOpen = true;
      _caller(callback);
    });
    this.$root.$on('close-modal', function (callback) {
      _this.shouldModalBeOpen = false;
      _caller(callback);
    });
  },

  methods: {
    randomInt: function randomInt(min, max) {
      return __WEBPACK_IMPORTED_MODULE_4__mixins__["a" /* default */].getRandomInt(min, max);
    }
  }
});

/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'library-gui',
  data: function data() {
    return {
      msg: 'Style Guide'
    };
  }
});

/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utility_Demobox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Autocomplete__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Autocomplete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Autocomplete__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'autocomplete-doc',
  components: {
    Demobox: __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default.a,
    SimAutocomplete: __WEBPACK_IMPORTED_MODULE_1__components_Autocomplete___default.a
  },
  data: function data() {
    return {
      msg: 'Autocomplete',
      name: 'film',
      selectedOption: {},
      options: [{
        name: 'Arrival',
        description: 'lorem ipsum dolor amet.'
      }, {
        name: 'Happy Gilmore',
        description: 'lorem ipsum dolor amet.'
      }, {
        name: 'Ip Man 2',
        description: 'lorem ipsum dolor amet.'
      }, {
        name: 'Spider-Man Homecoming',
        description: 'lorem ipsum dolor amet.'
      }]
    };
  },

  methods: {
    onSelect: function onSelect(option) {
      this.selectedOption = option;
    }
  }
});

/***/ }),
/* 187 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utility_Demobox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Badge__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Badge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Badge__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'badge-doc',
  components: {
    Demobox: __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default.a,
    SimBadge: __WEBPACK_IMPORTED_MODULE_1__components_Badge___default.a
  },
  data: function data() {
    return {
      msg: 'Badge',
      example: 9
    };
  },

  computed: {
    badge: function badge() {
      return this.example; // common.getRandomInt(0, 100)
    }
  }
});

/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utility_Demobox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BulkCheck__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BulkCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_BulkCheck__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'badge-doc',
  components: {
    Demobox: __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default.a,
    SimBulkCheck: __WEBPACK_IMPORTED_MODULE_1__components_BulkCheck___default.a
  },
  data: function data() {
    return {
      msg: 'Bulk Check',
      items: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      selectedItems: []
    };
  },

  computed: {
    badge: function badge() {
      return this.example; // common.getRandomInt(0, 100)
    }
  },
  methods: {
    setSelectedItems: function setSelectedItems(items) {
      this.selectedItems = items;
    }
  }
});

/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utility_Demobox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utility_Demobox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__utility_Demobox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Switch__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Switch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Switch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Calendar__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Calendar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_Calendar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_TimeBlock__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_TimeBlock___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_TimeBlock__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_TimePicker__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_TimePicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_TimePicker__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'calendar-doc',
  components: {
    Demobox: __WEBPACK_IMPORTED_MODULE_2__utility_Demobox___default.a,
    SimSwitch: __WEBPACK_IMPORTED_MODULE_3__components_Switch___default.a,
    SimCalendar: __WEBPACK_IMPORTED_MODULE_4__components_Calendar___default.a,
    SimTimeBlock: __WEBPACK_IMPORTED_MODULE_5__components_TimeBlock___default.a,
    SimTimePicker: __WEBPACK_IMPORTED_MODULE_6__components_TimePicker___default.a
  },
  data: function data() {
    return {
      msg: 'TimePicker',
      dateFormat: 'YYYY-MM-DD',
      date: __WEBPACK_IMPORTED_MODULE_1_moment___default()().format('YYYY-MM-DD'),
      displayDate: __WEBPACK_IMPORTED_MODULE_1_moment___default()().format('dddd, MMMM Do'),
      weekendDays: [0, 6],
      user_dates: {
        '2017-12-04': [{
          start: 8,
          duration: 3.5
        }, {
          start: 14,
          duration: 2.5
        }],
        '2017-12-05': [{
          start: 8.5,
          duration: 3.5
        }]
      },
      density: [{
        percent: 100,
        start: 0,
        end: 6
      }, {
        percent: 35,
        start: 6,
        end: 12
      }, {
        percent: 65,
        start: 12,
        end: 18
      }, {
        percent: 10,
        start: 18,
        end: 24
      }],
      stagedData: {},
      user_events: {},
      blocks: [],
      events: [],
      block: {},
      contextSwitch: false
    };
  },

  computed: {
    isInstructorContext: function isInstructorContext() {
      return this.contextSwitch === false;
    },
    isCoordinatorContext: function isCoordinatorContext() {
      return this.contextSwitch === true;
    },
    user_data: function user_data() {
      return this.isInstructorContext ? this.user_dates : this.user_events;
    },
    contextLabel: function contextLabel() {
      return this.isInstructorContext ? 'instructor' : 'coordinator';
    }
  },
  methods: {
    setHourClasses: function setHourClasses(hour) {
      var classes = [];
      classes.push(hour >= 6 && hour <= 17 ? 'is-daytime' : 'is-nighttime');
      classes.push(hour === 0 || hour === 24 ? 'is-midnight' : hour === 12 ? 'is-noon' : '');
      return classes.join(' ');
    },
    setBlockStyles: function setBlockStyles(block) {
      var styles = [];
      styles.push('--start: ' + block.start);
      styles.push('--duration: ' + block.duration);
      return styles.join(';');
    },
    setContext: function setContext(context) {
      this.context = context;
      this.manageDayControlPanel(this.date);
    },
    manageDayControlPanel: function manageDayControlPanel(date) {
      var dayMoment = __WEBPACK_IMPORTED_MODULE_1_moment___default()(date);
      this.displayDate = dayMoment.format('dddd, MMMM Do');
      this.date = dayMoment.format('YYYY-MM-DD');
      this.blocks = this.user_data[this.date] || [];
      if (this.blocks.length) {
        this.user_data[this.date] = this.blocks;
      }
    },
    allTimeBlocksRemoved: function allTimeBlocksRemoved(date) {
      delete this.user_data[date];
      this.doUpdateStuff(date);
    },
    createTimeBlock: function createTimeBlock(date, hour) {
      if (this.date === date) {
        var blocks = [];
        blocks = this.user_data[date] || [];
        blocks.push({ start: hour, duration: 1 });
        blocks.sort(function (a, b) {
          return parseFloat(a.start) - parseFloat(b.start);
        });
        this.timeBlockCreated(date, blocks);
      }
    },
    timeBlockCreated: function timeBlockCreated(date, blocks) {
      this.user_data[date] = blocks;
      this.doUpdateStuff(date);
    },
    removeTimeBlock: function removeTimeBlock(index) {
      this.blocks.splice(index, 1);
    },
    timeBlockRemoved: function timeBlockRemoved(date, blocks) {
      this.user_data[date] = blocks;
      this.doUpdateStuff(date);
    },
    timeBlocks: function timeBlocks(day) {
      return this.user_data[day];
    },
    doUpdateStuff: function doUpdateStuff(date) {
      this.stagedData[date] = JSON.parse(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(this.user_data[date]));
      window.console.log('staged data:', this.stagedData);
      // this.postData(this.stagedData) - example of what to do with stuff
      this.$forceUpdate();
    }
  }
});

/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utility_Demobox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Datalist__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Datalist___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Datalist__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'datalist-doc',
  components: {
    Demobox: __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default.a,
    SimDatalist: __WEBPACK_IMPORTED_MODULE_1__components_Datalist___default.a
  },
  data: function data() {
    return {
      msg: 'Datalist',
      items: [{ id: 1, name: 'Medical Assistant' }, { id: 2, name: 'Nursing Assistant' }, { id: 3, name: 'Home Health Aide' }, { id: 4, name: 'Licensed Practical Nurse' }, { id: 5, name: 'Physician' }, { id: 6, name: 'Therapist' }, { id: 7, name: 'Registered Nurse' }, { id: 8, name: 'Pharmacy Technician' }, { id: 9, name: 'Physician Assistant' }]
    };
  }
});

/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utility_Demobox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Datepicker__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Datepicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Datepicker__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'filter-by-doc',
  components: {
    Demobox: __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default.a,
    SimDatepicker: __WEBPACK_IMPORTED_MODULE_1__components_Datepicker___default.a
  },
  data: function data() {
    return {
      msg: 'Datepicker'
    };
  },

  computed: {}
});

/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utility_Demobox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_FilterBy__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_FilterBy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_FilterBy__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'filter-by-doc',
  components: {
    Demobox: __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default.a,
    SimFilterBy: __WEBPACK_IMPORTED_MODULE_1__components_FilterBy___default.a
  },
  data: function data() {
    return {
      msg: 'FilterBy'
    };
  },

  computed: {}
});

/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utility_Demobox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_IconText__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_IconText___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_IconText__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'icontext-doc',
  components: {
    Demobox: __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default.a,
    SimIcontext: __WEBPACK_IMPORTED_MODULE_1__components_IconText___default.a
  },
  data: function data() {
    return {
      msg: 'Icon + Text'
    };
  }
});

/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utility_Demobox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Loader__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Loader__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'loader-doc',
  components: {
    Demobox: __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default.a,
    SimLoader: __WEBPACK_IMPORTED_MODULE_1__components_Loader___default.a
  },
  data: function data() {
    return {
      msg: 'Loader'
    };
  },

  computed: {}
});

/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utility_Demobox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Modal__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Modal__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'modal-doc',
  components: {
    Demobox: __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default.a,
    SimModal: __WEBPACK_IMPORTED_MODULE_1__components_Modal___default.a
  },
  data: function data() {
    return {
      msg: 'Modal'
    };
  },

  computed: {}
});

/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utility_Demobox__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'overlay-doc',
  components: {
    Demobox: __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default.a
  },
  data: function data() {
    return {
      msg: 'Overlay',
      shouldBeOpen: false
    };
  },

  methods: {}
});

/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utility_Demobox__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'panel-doc',
  components: {
    Demobox: __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default.a
  },
  data: function data() {
    return {
      msg: 'Panel'
    };
  }
});

/***/ }),
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utility_Demobox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Progress__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Progress___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Progress__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'progress-doc',
  components: {
    Demobox: __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default.a,
    SimProgress: __WEBPACK_IMPORTED_MODULE_1__components_Progress___default.a
  },
  data: function data() {
    return {
      msg: 'Progress'
    };
  },

  computed: {}
});

/***/ }),
/* 199 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utility_Demobox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Selection__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Selection___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Selection__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'selection-doc',
  components: {
    Demobox: __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default.a,
    SimSelection: __WEBPACK_IMPORTED_MODULE_1__components_Selection___default.a
  },
  data: function data() {
    return {
      msg: 'Selection',
      items: [{
        id: 1,
        name: 'Pepsi',
        disabled: true
      }, {
        id: 2,
        name: 'Root Beer',
        disabled: false
      }, {
        id: 3,
        name: 'Coke',
        disabled: false
      }, {
        id: 4,
        name: 'Sunkist',
        disabled: false
      }],
      selectedItems: [2, 4]
    };
  }
});

/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utility_Demobox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Switch__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Switch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Switch__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'switch-doc',
  components: {
    Demobox: __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default.a,
    SimSwitch: __WEBPACK_IMPORTED_MODULE_1__components_Switch___default.a
  },
  data: function data() {
    return {
      msg: 'Toggle Switch',
      mySwitch: true
    };
  }
});

/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utility_Demobox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Tag__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Tag___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Tag__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'tag-doc',
  components: {
    Demobox: __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default.a,
    SimTag: __WEBPACK_IMPORTED_MODULE_1__components_Tag___default.a
  },
  data: function data() {
    return {
      msg: 'Tag'
    };
  },

  computed: {}
});

/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_Demobox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_Demobox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__utility_Demobox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_TimePicker__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_TimePicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_TimePicker__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'time-picker-doc',
  components: {
    Demobox: __WEBPACK_IMPORTED_MODULE_1__utility_Demobox___default.a,
    SimTimePicker: __WEBPACK_IMPORTED_MODULE_2__components_TimePicker___default.a
  },
  data: function data() {
    return {
      msg: 'TimePicker',
      dateFormat: 'YYYY-MM-DD',
      date: __WEBPACK_IMPORTED_MODULE_0_moment___default()().format('YYYY-MM-DD'),
      displayDate: __WEBPACK_IMPORTED_MODULE_0_moment___default()().format('dddd, MMMM Do'),
      user_dates: {},
      blocks: [],
      block: {}
    };
  },

  computed: {},
  methods: {
    manageDayControlPanel: function manageDayControlPanel(date) {
      var dayMoment = __WEBPACK_IMPORTED_MODULE_0_moment___default()(date);
      // let dayMoment = moment([dateObject.year, dateObject.month-1, dateObject.day])
      this.displayDate = dayMoment.format('dddd, MMMM Do');
      this.date = dayMoment.format('YYYY-MM-DD');
      this.blocks = this.user_dates[this.date] || [];
      if (this.blocks.length) {
        this.user_dates[this.date] = this.blocks;
      }
    },
    allTimeBlocksRemoved: function allTimeBlocksRemoved(date) {
      delete this.user_dates[date];
    },
    timeBlockCreated: function timeBlockCreated(date, blocks) {
      this.user_dates[date] = blocks;
    },
    timeBlockRemoved: function timeBlockRemoved(date, blocks) {
      this.user_dates[date] = blocks;
    }
  }
});

/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utility_Demobox__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Tooltip__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Tooltip__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'icontext-doc',
  components: {
    Demobox: __WEBPACK_IMPORTED_MODULE_0__utility_Demobox___default.a,
    SimTooltip: __WEBPACK_IMPORTED_MODULE_1__components_Tooltip___default.a
  },
  data: function data() {
    return {
      msg: 'Tooltip'
    };
  }
});

/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'guide-buttons',
  data: function data() {
    return {
      msg: 'Buttons'
    };
  }
});

/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'guide-intro',
  data: function data() {
    return {
      msg: 'Intro'
    };
  }
});

/***/ }),
/* 206 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_IconText__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_IconText___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_IconText__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'demobox',
  components: {
    SimIcontext: __WEBPACK_IMPORTED_MODULE_0__components_IconText___default.a
  },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      toggled: false
    };
  },

  methods: {
    toggleDetails: function toggleDetails() {
      this.toggled = !this.toggled;
    }
  }
});

/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_IconText__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_IconText___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_IconText__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'directory',
  components: {
    SimIcontext: __WEBPACK_IMPORTED_MODULE_0__components_IconText___default.a
  },
  props: ['model'],
  mounted: function mounted() {
    // console.log(this.model.label, this.model)
  },

  computed: {
    hasChildren: function hasChildren() {
      return this.model.children && this.model.children.length;
    }
  }
});

/***/ }),
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 240 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 241 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 242 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 243 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 244 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 245 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 246 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 247 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 248 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 249 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 250 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 251 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 252 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 253 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 254 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 255 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 256 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 257 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 258 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 259 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 260 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 261 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 262 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 263 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 264 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 265 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 266 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 267 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 33,
	"./af.js": 33,
	"./ar": 40,
	"./ar-dz": 34,
	"./ar-dz.js": 34,
	"./ar-kw": 35,
	"./ar-kw.js": 35,
	"./ar-ly": 36,
	"./ar-ly.js": 36,
	"./ar-ma": 37,
	"./ar-ma.js": 37,
	"./ar-sa": 38,
	"./ar-sa.js": 38,
	"./ar-tn": 39,
	"./ar-tn.js": 39,
	"./ar.js": 40,
	"./az": 41,
	"./az.js": 41,
	"./be": 42,
	"./be.js": 42,
	"./bg": 43,
	"./bg.js": 43,
	"./bm": 44,
	"./bm.js": 44,
	"./bn": 45,
	"./bn.js": 45,
	"./bo": 46,
	"./bo.js": 46,
	"./br": 47,
	"./br.js": 47,
	"./bs": 48,
	"./bs.js": 48,
	"./ca": 49,
	"./ca.js": 49,
	"./cs": 50,
	"./cs.js": 50,
	"./cv": 51,
	"./cv.js": 51,
	"./cy": 52,
	"./cy.js": 52,
	"./da": 53,
	"./da.js": 53,
	"./de": 56,
	"./de-at": 54,
	"./de-at.js": 54,
	"./de-ch": 55,
	"./de-ch.js": 55,
	"./de.js": 56,
	"./dv": 57,
	"./dv.js": 57,
	"./el": 58,
	"./el.js": 58,
	"./en-au": 59,
	"./en-au.js": 59,
	"./en-ca": 60,
	"./en-ca.js": 60,
	"./en-gb": 61,
	"./en-gb.js": 61,
	"./en-ie": 62,
	"./en-ie.js": 62,
	"./en-nz": 63,
	"./en-nz.js": 63,
	"./eo": 64,
	"./eo.js": 64,
	"./es": 67,
	"./es-do": 65,
	"./es-do.js": 65,
	"./es-us": 66,
	"./es-us.js": 66,
	"./es.js": 67,
	"./et": 68,
	"./et.js": 68,
	"./eu": 69,
	"./eu.js": 69,
	"./fa": 70,
	"./fa.js": 70,
	"./fi": 71,
	"./fi.js": 71,
	"./fo": 72,
	"./fo.js": 72,
	"./fr": 75,
	"./fr-ca": 73,
	"./fr-ca.js": 73,
	"./fr-ch": 74,
	"./fr-ch.js": 74,
	"./fr.js": 75,
	"./fy": 76,
	"./fy.js": 76,
	"./gd": 77,
	"./gd.js": 77,
	"./gl": 78,
	"./gl.js": 78,
	"./gom-latn": 79,
	"./gom-latn.js": 79,
	"./gu": 80,
	"./gu.js": 80,
	"./he": 81,
	"./he.js": 81,
	"./hi": 82,
	"./hi.js": 82,
	"./hr": 83,
	"./hr.js": 83,
	"./hu": 84,
	"./hu.js": 84,
	"./hy-am": 85,
	"./hy-am.js": 85,
	"./id": 86,
	"./id.js": 86,
	"./is": 87,
	"./is.js": 87,
	"./it": 88,
	"./it.js": 88,
	"./ja": 89,
	"./ja.js": 89,
	"./jv": 90,
	"./jv.js": 90,
	"./ka": 91,
	"./ka.js": 91,
	"./kk": 92,
	"./kk.js": 92,
	"./km": 93,
	"./km.js": 93,
	"./kn": 94,
	"./kn.js": 94,
	"./ko": 95,
	"./ko.js": 95,
	"./ky": 96,
	"./ky.js": 96,
	"./lb": 97,
	"./lb.js": 97,
	"./lo": 98,
	"./lo.js": 98,
	"./lt": 99,
	"./lt.js": 99,
	"./lv": 100,
	"./lv.js": 100,
	"./me": 101,
	"./me.js": 101,
	"./mi": 102,
	"./mi.js": 102,
	"./mk": 103,
	"./mk.js": 103,
	"./ml": 104,
	"./ml.js": 104,
	"./mr": 105,
	"./mr.js": 105,
	"./ms": 107,
	"./ms-my": 106,
	"./ms-my.js": 106,
	"./ms.js": 107,
	"./my": 108,
	"./my.js": 108,
	"./nb": 109,
	"./nb.js": 109,
	"./ne": 110,
	"./ne.js": 110,
	"./nl": 112,
	"./nl-be": 111,
	"./nl-be.js": 111,
	"./nl.js": 112,
	"./nn": 113,
	"./nn.js": 113,
	"./pa-in": 114,
	"./pa-in.js": 114,
	"./pl": 115,
	"./pl.js": 115,
	"./pt": 117,
	"./pt-br": 116,
	"./pt-br.js": 116,
	"./pt.js": 117,
	"./ro": 118,
	"./ro.js": 118,
	"./ru": 119,
	"./ru.js": 119,
	"./sd": 120,
	"./sd.js": 120,
	"./se": 121,
	"./se.js": 121,
	"./si": 122,
	"./si.js": 122,
	"./sk": 123,
	"./sk.js": 123,
	"./sl": 124,
	"./sl.js": 124,
	"./sq": 125,
	"./sq.js": 125,
	"./sr": 127,
	"./sr-cyrl": 126,
	"./sr-cyrl.js": 126,
	"./sr.js": 127,
	"./ss": 128,
	"./ss.js": 128,
	"./sv": 129,
	"./sv.js": 129,
	"./sw": 130,
	"./sw.js": 130,
	"./ta": 131,
	"./ta.js": 131,
	"./te": 132,
	"./te.js": 132,
	"./tet": 133,
	"./tet.js": 133,
	"./th": 134,
	"./th.js": 134,
	"./tl-ph": 135,
	"./tl-ph.js": 135,
	"./tlh": 136,
	"./tlh.js": 136,
	"./tr": 137,
	"./tr.js": 137,
	"./tzl": 138,
	"./tzl.js": 138,
	"./tzm": 140,
	"./tzm-latn": 139,
	"./tzm-latn.js": 139,
	"./tzm.js": 140,
	"./uk": 141,
	"./uk.js": 141,
	"./ur": 142,
	"./ur.js": 142,
	"./uz": 144,
	"./uz-latn": 143,
	"./uz-latn.js": 143,
	"./uz.js": 144,
	"./vi": 145,
	"./vi.js": 145,
	"./x-pseudo": 146,
	"./x-pseudo.js": 146,
	"./yo": 147,
	"./yo.js": 147,
	"./zh-cn": 148,
	"./zh-cn.js": 148,
	"./zh-hk": 149,
	"./zh-hk.js": 149,
	"./zh-tw": 150,
	"./zh-tw.js": 150
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 447;

/***/ }),
/* 448 */,
/* 449 */,
/* 450 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(249)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(160),
  /* template */
  __webpack_require__(506),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 451 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(247)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(161),
  /* template */
  __webpack_require__(503),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 452 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(261)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(162),
  /* template */
  __webpack_require__(529),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 453 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(242)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(163),
  /* template */
  __webpack_require__(497),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 454 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(254)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(165),
  /* template */
  __webpack_require__(514),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 455 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(266)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(166),
  /* template */
  __webpack_require__(535),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 456 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(265)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(168),
  /* template */
  __webpack_require__(533),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 457 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(248)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(169),
  /* template */
  __webpack_require__(505),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 458 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(264)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(170),
  /* template */
  __webpack_require__(532),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 459 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(257)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(171),
  /* template */
  __webpack_require__(518),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 460 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(255)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(172),
  /* template */
  __webpack_require__(516),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 461 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(259)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(175),
  /* template */
  __webpack_require__(523),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 462 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(244)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(178),
  /* template */
  __webpack_require__(500),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 463 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(180),
  /* template */
  __webpack_require__(499),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 464 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(181),
  /* template */
  __webpack_require__(527),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 465 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(262)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(182),
  /* template */
  __webpack_require__(530),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-b6d7af4a",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 466 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(240)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(183),
  /* template */
  __webpack_require__(493),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 467 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(258)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(184),
  /* template */
  __webpack_require__(520),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 468 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(185),
  /* template */
  __webpack_require__(524),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 469 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(186),
  /* template */
  __webpack_require__(526),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 470 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(250)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(187),
  /* template */
  __webpack_require__(507),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 471 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(245)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(188),
  /* template */
  __webpack_require__(501),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 472 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(243)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(189),
  /* template */
  __webpack_require__(498),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 473 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(190),
  /* template */
  __webpack_require__(512),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 474 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(191),
  /* template */
  __webpack_require__(528),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 475 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(192),
  /* template */
  __webpack_require__(534),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 476 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(193),
  /* template */
  __webpack_require__(515),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 477 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(194),
  /* template */
  __webpack_require__(504),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 478 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(195),
  /* template */
  __webpack_require__(508),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 479 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(196),
  /* template */
  __webpack_require__(521),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 480 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(197),
  /* template */
  __webpack_require__(522),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 481 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(198),
  /* template */
  __webpack_require__(519),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 482 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(241)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(199),
  /* template */
  __webpack_require__(496),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 483 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(200),
  /* template */
  __webpack_require__(495),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 484 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(201),
  /* template */
  __webpack_require__(491),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 485 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(202),
  /* template */
  __webpack_require__(537),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 486 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(203),
  /* template */
  __webpack_require__(494),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 487 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(204),
  /* template */
  __webpack_require__(511),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 488 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(205),
  /* template */
  __webpack_require__(490),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 489 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(251)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(207),
  /* template */
  __webpack_require__(509),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 490 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('h2', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('p', [_vm._v("CSS Rules.")])])
},staticRenderFns: []}

/***/ }),
/* 491 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('h2', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('demobox', [_c('template', {
    slot: "intro"
  }, [_vm._v("\n        Normal / Default\n      ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('p', [_vm._v("Tag component")])]), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "html"
  })])]), _vm._v(" "), _c('template', {
    slot: "js"
  }, [_c('pre', [_c('code', {
    staticClass: "javascript"
  })])])], 2)], 1)
},staticRenderFns: []}

/***/ }),
/* 492 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: _vm.setClass(),
    style: (_vm.setStyle(_vm.block))
  }, [(_vm.showControls) ? [_c('div', {
    staticClass: "sim-timeblock--remover",
    on: {
      "click": _vm.removeTimeBlock
    }
  }, [_c('SimIconText', {
    attrs: {
      "icon": "fa-times-circle fa-lg"
    }
  })], 1), _vm._v(" "), (_vm.orientationIsX) ? _c('div', {
    staticClass: "sim-timeblock--handle sim-timeblock--handle--x sim-timeblock--handle--left",
    on: {
      "mousedown": _vm.startStretchLeft
    }
  }) : _vm._e(), _vm._v(" "), (_vm.orientationIsY) ? _c('div', {
    staticClass: "sim-timeblock--handle sim-timeblock--handle--y sim-timeblock--handle--up",
    on: {
      "mousedown": _vm.startStretchUp
    }
  }) : _vm._e(), _vm._v(" "), (_vm.orientationIsX) ? _c('div', {
    staticClass: "sim-timeblock--handle sim-timeblock--handle--x sim-timeblock--handle--right",
    on: {
      "mousedown": _vm.startStretchRight
    }
  }) : _vm._e(), _vm._v(" "), (_vm.orientationIsY) ? _c('div', {
    staticClass: "sim-timeblock--handle sim-timeblock--handle--y sim-timeblock--handle--down",
    on: {
      "mousedown": _vm.startStretchDown
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "sim-timeblock--mover",
    on: {
      "mousedown": _vm.startMove
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "sim-timeblock--info"
  }, [_c('div', {
    staticClass: "sim-timeblock--info--hours"
  }, [_vm._v(_vm._s(_vm.displayBlockHours()))]), _vm._v(" "), _c('div', {
    staticClass: "sim-timeblock--info--time"
  }, [_vm._v(_vm._s(_vm.displayBlockTime()))])])] : _vm._e()], 2)
},staticRenderFns: []}

/***/ }),
/* 493 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('main', [_c('h1', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('h2', [_vm._v("Essential Links")]), _vm._v(" "), _vm._m(0, false, false), _vm._v(" "), _c('h2', [_vm._v("Ecosystem")]), _vm._v(" "), _vm._m(1, false, false)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', [_c('li', [_c('a', {
    attrs: {
      "href": "https://vuejs.org",
      "target": "_blank"
    }
  }, [_vm._v("Core Docs")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "https://forum.vuejs.org",
      "target": "_blank"
    }
  }, [_vm._v("Forum")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "https://gitter.im/vuejs/vue",
      "target": "_blank"
    }
  }, [_vm._v("Gitter Chat")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "https://twitter.com/vuejs",
      "target": "_blank"
    }
  }, [_vm._v("Twitter")])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "http://vuejs-templates.github.io/webpack/",
      "target": "_blank"
    }
  }, [_vm._v("Docs for This Template")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('ul', [_c('li', [_c('a', {
    attrs: {
      "href": "http://router.vuejs.org/",
      "target": "_blank"
    }
  }, [_vm._v("vue-router")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "http://vuex.vuejs.org/",
      "target": "_blank"
    }
  }, [_vm._v("vuex")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "http://vue-loader.vuejs.org/",
      "target": "_blank"
    }
  }, [_vm._v("vue-loader")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "https://github.com/vuejs/awesome-vue",
      "target": "_blank"
    }
  }, [_vm._v("awesome-vue")])])])
}]}

/***/ }),
/* 494 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('h2', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('demobox', {
    attrs: {
      "open": true
    }
  }, [_c('template', {
    slot: "intro"
  }, [_vm._v("\n        Normal / Default\n      ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('p', [_vm._v("\n          Never gonna give you up\n          "), _c('sim-tooltip', {
    attrs: {
      "pop": "up"
    }
  }, [_c('span', {
    attrs: {
      "slot": "text"
    },
    slot: "text"
  }, [_vm._v("Never gonna let you down")])])], 1), _vm._v(" "), _c('p', [_vm._v("\n          Never gonna make you cry\n          "), _c('sim-tooltip', {
    attrs: {
      "pop": "down"
    }
  }, [_c('span', {
    attrs: {
      "slot": "text"
    },
    slot: "text"
  }, [_vm._v("Never gonna say goodbye")])])], 1)]), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "html"
  }, [_vm._v("<sim-icontext icon=\"fa-star\" text=\"Getting Started\" />")])])])], 2)], 1)
},staticRenderFns: []}

/***/ }),
/* 495 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('h2', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('demobox', {
    attrs: {
      "open": true
    }
  }, [_c('template', {
    slot: "intro"
  }, [_vm._v("\n        Normal / Default\n      ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('p', [_c('sim-switch', {
    attrs: {
      "left-label": "off",
      "right-label": "on"
    },
    model: {
      value: (_vm.mySwitch),
      callback: function($$v) {
        _vm.mySwitch = $$v
      },
      expression: "mySwitch"
    }
  })], 1)]), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "html"
  }, [_vm._v("<sim-switch v-model=\"mySwitch\" left-label=\"off\" right-label=\"on\" />")])])]), _vm._v(" "), _c('template', {
    slot: "js"
  }, [_c('pre', [_c('code', {
    staticClass: "javascript"
  }, [_vm._v("mySwitch: " + _vm._s(_vm.mySwitch))])])])], 2)], 1)
},staticRenderFns: []}

/***/ }),
/* 496 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('h1', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('demobox', [_c('template', {
    slot: "view"
  }, _vm._l((_vm.items), function(item) {
    return _c('p', [_c('sim-selection', {
      attrs: {
        "item": item,
        "disabled": item.disabled,
        "selected-items": _vm.selectedItems
      }
    }, [_vm._v("\n            " + _vm._s(item.name) + "\n          ")])], 1)
  })), _vm._v(" "), _c('template', {
    slot: "js"
  }, [_c('div', {
    staticClass: "flex-baseline flex-1-all"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', [_vm._v("items: " + _vm._s(_vm.items))])]), _vm._v(" "), _c('pre', [_c('code', [_vm._v("selectedItems: " + _vm._s(_vm.selectedItems))])])])]), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    pre: true,
    attrs: {
      "class": "html"
    }
  }, [_vm._v("<p v-for=\"item in items\">\n  <sim-selection :item=\"item\" :disabled=\"item.disabled\" :selected-items=\"selectedItems\">\n    {{ item.name }}\n  </sim-selection>\n</p>")])])])], 2)], 1)
},staticRenderFns: []}

/***/ }),
/* 497 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "sim-calendar",
    class: {
      'is-current-month': _vm.isCurrentMonth, 'is-week-view': _vm.isWeekView, 'is-month-view': _vm.isMonthView
    }
  }, [_c('div', {
    staticClass: "sim-calendar--header"
  }, [_c('div', {
    staticClass: "sim-calendar--title"
  }, [_vm._v(_vm._s(_vm.displayDate))]), _vm._v(" "), _c('div', {
    staticClass: "sim-calendar--context"
  }, [_vm._t("context-controls")], 2), _vm._v(" "), _c('div', {
    staticClass: "sim-calendar--modes"
  }, [_c('span', {
    staticClass: "sim-calendar-button",
    class: {
      active: _vm.isMonthView
    },
    on: {
      "click": function($event) {
        _vm.setDisplayMode('month')
      }
    }
  }, [_vm._v("Month")]), _vm._v(" "), _c('span', {
    staticClass: "sim-calendar-button",
    class: {
      active: _vm.isWeekView
    },
    on: {
      "click": function($event) {
        _vm.setDisplayMode('week')
      }
    }
  }, [_vm._v("Week")])]), _vm._v(" "), _c('div', {
    staticClass: "sim-calendar--controls"
  }, [_c('span', {
    on: {
      "click": _vm.loadPrevDays
    }
  }, [_c('SimIconText', {
    attrs: {
      "icon": "fa-arrow-left fa-fw"
    }
  })], 1), _vm._v(" "), _c('span', {
    on: {
      "click": _vm.today
    }
  }, [_vm._v("\n        today\n      ")]), _vm._v(" "), _c('span', {
    on: {
      "click": _vm.loadNextDays
    }
  }, [_c('SimIconText', {
    attrs: {
      "icon": "fa-arrow-right fa-fw"
    }
  })], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "sim-calendar--body",
    style: ({
      '--start-offset': _vm.startOffset
    })
  }, [_c('div', {
    staticClass: "sim-calendar--grid"
  }, [_c('div', {
    staticClass: "sim-calendar--grid--header"
  }, _vm._l((_vm.dayNames), function(day, index) {
    return _c('div', {
      staticClass: "sim-calendar--grid--header--day"
    }, [_c('span', {
      staticClass: "sim-calendar--grid--header--dayname"
    }, [_vm._v("\n            " + _vm._s(day) + "\n          ")]), _vm._v(" "), (_vm.isWeekView) ? _c('span', {
      staticClass: "sim-calendar--grid--header--date",
      class: _vm.setDayClasses(_vm.days[index])
    }, [_vm._v("\n            " + _vm._s(_vm.showDayNumber(_vm.days[index])) + "\n          ")]) : _vm._e()])
  })), _vm._v(" "), _c('div', {
    staticClass: "sim-calendar--grid--body"
  }, [(_vm.isWeekView) ? _c('ul', {
    staticClass: "sim-calendar--grid--timelines"
  }, _vm._l((25), function(hour) {
    return _c('li', {
      class: _vm.setHourClasses(hour - 1)
    }, [_c('div', [(hour === 13) ? _c('SimIconText', {
      attrs: {
        "icon": "fa-sun-o"
      }
    }) : (hour === 1 || hour === 25) ? _c('SimIconText', {
      attrs: {
        "icon": "fa-moon-o"
      }
    }) : _c('span', [_vm._v("\n                " + _vm._s(_vm.displayHour(hour - 1)) + "\n              ")])], 1)])
  })) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "sim-calendar--grid--days"
  }, [(_vm.startOffset > 0) ? _c('div', {
    staticClass: "sim-calendar--grid--before",
    style: ({
      '--offset': _vm.startOffset
    })
  }) : _vm._e(), _vm._v(" "), _vm._l((_vm.days), function(day) {
    return _c('div', {
      staticClass: "sim-calendar--grid--day",
      class: _vm.setDayClasses(day),
      on: {
        "mousedown": function($event) {
          _vm.emitDayClick(day)
        }
      }
    }, [(_vm.isMonthView) ? _c('div', {
      staticClass: "sim-calendar--grid--date"
    }, [_vm._v(_vm._s(_vm.showDayNumber(day)))]) : _vm._e(), _vm._v(" "), _vm._t("day", null, {
      day: day,
      mode: _vm.displayMode
    })], 2)
  }), _vm._v(" "), (_vm.endOffset > 0) ? _c('div', {
    staticClass: "sim-calendar--grid--after"
  }) : _vm._e()], 2)])]), _vm._v(" "), _vm._t("day-control-panel", null, {
    mode: _vm.displayMode
  })], 2)])
},staticRenderFns: []}

/***/ }),
/* 498 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('h2', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('demobox', [_c('template', {
    slot: "intro"
  }, [_vm._v("\n          Normal / Default\n        ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('SimCalendar', {
    class: ("is-" + _vm.contextLabel + "-context"),
    attrs: {
      "date": _vm.date,
      "dates": _vm.user_data
    },
    on: {
      "calendar-day-selected": _vm.manageDayControlPanel
    },
    scopedSlots: _vm._u([{
      key: "day",
      fn: function(props) {
        return _c('div', {
          staticClass: "local--day"
        }, [(props.mode === 'week') ? _c('ul', {
          staticClass: "sim-calendar--grid--day--timelines"
        }, _vm._l((25), function(hour) {
          return _c('li', {
            class: _vm.setHourClasses(hour - 1),
            on: {
              "dblclick": function($event) {
                _vm.createTimeBlock(props.day, hour - 1)
              }
            }
          })
        })) : _vm._e(), _vm._v(" "), _c('div', {
          staticClass: "local--day--time-blocks"
        }, [_vm._l((_vm.timeBlocks(props.day)), function(block, index) {
          return [(props.mode == 'week') ? _c('SimTimeBlock', {
            attrs: {
              "block": block,
              "index": index,
              "date": props.day,
              "orientation": "y"
            },
            on: {
              "remove-time-block": _vm.removeTimeBlock,
              "block-updated": _vm.doUpdateStuff
            }
          }) : _c('SimTimeBlock', {
            attrs: {
              "block": block,
              "index": index,
              "orientation": "x",
              "show-controls": false
            }
          })]
        })], 2), _vm._v(" "), (_vm.isCoordinatorContext && props.mode === 'month') ? _c('div', {
          staticClass: "calendar-quadrants--outer"
        }, _vm._l((_vm.density), function(quad) {
          return _c('div', {
            staticClass: "calendar-quadrant",
            style: (("--percent: " + ((quad.percent / 100))))
          })
        })) : _vm._e()])
      }
    }, {
      key: "day-control-panel",
      fn: function(props) {
        return _c('div', {
          staticClass: "day-control-panel"
        }, [(_vm.isInstructorContext && props.mode === 'month') ? _c('SimTimePicker', {
          attrs: {
            "date": _vm.date,
            "blocks": _vm.blocks,
            "should-show-date": true
          },
          on: {
            "calendar-day-selected": _vm.manageDayControlPanel,
            "all-time-blocks-removed": _vm.allTimeBlocksRemoved,
            "time-block-removed": _vm.timeBlockRemoved,
            "time-block-created": _vm.timeBlockCreated,
            "time-block-updated": _vm.doUpdateStuff
          }
        }) : _vm._e(), _vm._v(" "), _c('div', {
          staticClass: "bubble-boy"
        }, [_c('div', [_vm._v("here's a bubble for this thing")])])], 1)
      }
    }])
  }, [_c('div', {
    attrs: {
      "slot": "context-controls"
    },
    slot: "context-controls"
  }, [_c('SimSwitch', {
    attrs: {
      "left-label": "Instructor",
      "right-label": "Coordinator"
    },
    model: {
      value: (_vm.contextSwitch),
      callback: function($$v) {
        _vm.contextSwitch = $$v
      },
      expression: "contextSwitch"
    }
  })], 1)]), _vm._v(" "), _c('br'), _vm._v(" "), _c('p', [_vm._v("Data")]), _vm._v(" "), _c('div', {
    staticClass: "flex-baseline-around"
  }, [_c('pre', [_c('code', {
    staticClass: "javascript"
  }, [_vm._v(_vm._s(_vm.date))])]), _vm._v(" "), _c('pre', [_c('code', {
    staticClass: "javascript"
  }, [_vm._v(_vm._s(_vm.user_dates))])])])], 1), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "html"
  }, [_vm._v("<div slot=\"day\" slot-scope=\"props\" class=\"sim-calendar--grid--time-blocks\">\n  ...\n</div>")])])]), _vm._v(" "), _c('template', {
    slot: "js"
  }, [_c('pre', [_c('code', {
    staticClass: "javascript"
  })])])], 2)], 1)
},staticRenderFns: []}

/***/ }),
/* 499 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('main', {
    staticClass: "library library-ui"
  }, [_c('h1', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('transition', {
    attrs: {
      "appear": "",
      "name": "slide-left",
      "mode": "out-in"
    }
  }, [_c('router-view', {
    attrs: {
      "name": "details"
    }
  })], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 500 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "sim-tooltip"
  }, [_c('span', {
    staticClass: "sim-tooltip__cue"
  }, [_vm._t("cue", [_c('i', {
    staticClass: "fa fa-question-circle"
  })])], 2), _vm._v(" "), _c('span', {
    staticClass: "sim-tooltip__bubble",
    class: _vm.popTo
  }, [_vm._t("text")], 2)])
},staticRenderFns: []}

/***/ }),
/* 501 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('h2', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('demobox', [_c('template', {
    slot: "intro"
  }, [_vm._v("\n        Normal / Default\n      ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('p', [_c('SimBulkCheck', {
    attrs: {
      "items": _vm.items
    },
    on: {
      "toggle": _vm.setSelectedItems
    }
  }), _vm._v(" " + _vm._s(_vm.selectedItems) + " selected items")], 1)]), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "html"
  })])]), _vm._v(" "), _c('template', {
    slot: "js"
  }, [_c('pre', [_c('code', {
    staticClass: "javascript"
  })])])], 2)], 1)
},staticRenderFns: []}

/***/ }),
/* 502 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "sim-timepicker"
  }, [(_vm.shouldShowDate) ? _c('div', {
    staticClass: "sim-timepicker--controls"
  }, [_c('div', {
    staticClass: "sim-timepicker--prev-day",
    on: {
      "click": _vm.prevDay
    }
  }, [_c('SimIconText', {
    attrs: {
      "icon": "fa-arrow-left"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "sim-timepicker--display-date"
  }, [_c('span', [_vm._v(_vm._s(_vm.displayDate) + " — "), _c('b', [_vm._v(_vm._s(_vm.displayDateTotalHours))])]), _vm._v(" "), (_vm.totalHours > 0) ? _c('span', {
    staticClass: "sim-timepicker--remove-blocks",
    on: {
      "click": _vm.removeAllTimeBlocks
    }
  }, [_c('SimIconText', {
    attrs: {
      "icon": "fa-times"
    }
  })], 1) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "sim-timepicker--next-day",
    on: {
      "click": _vm.nextDay
    }
  }, [_c('SimIconText', {
    attrs: {
      "icon": "fa-arrow-right"
    }
  })], 1)]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "sim-timepicker--inner",
    class: _vm.setClass()
  }, [_c('ul', _vm._l((25), function(hour) {
    return _c('li', {
      class: _vm.setHourClass(hour - 1),
      on: {
        "mousedown": function($event) {
          _vm.createTimeBlock(hour - 1)
        }
      }
    }, [(hour === 13) ? _c('div', {
      staticClass: "sim-timepicker--time sim-timepicker--noon"
    }, [_c('SimIconText', {
      attrs: {
        "icon": "fa-sun-o"
      }
    })], 1) : (hour === 1 || hour === 25) ? _c('div', {
      staticClass: "sim-timepicker--time sim-timepicker--midnight"
    }, [_c('SimIconText', {
      attrs: {
        "icon": "fa-moon-o"
      }
    })], 1) : _c('div', {
      staticClass: "sim-timepicker--time"
    }, [_vm._v("\n          " + _vm._s(_vm.displayHour(hour - 1)) + "\n        ")])])
  })), _vm._v(" "), _vm._l((_vm.blocks), function(block, index) {
    return _c('SimTimeBlock', {
      key: index,
      attrs: {
        "block": block,
        "index": index,
        "date": _vm.date,
        "orientation": _vm.orientation
      },
      on: {
        "remove-time-block": _vm.removeTimeBlock,
        "is-moving": _vm.setMovingState,
        "is-stretching": _vm.setStretchingState,
        "block-updated": _vm.blockWasUpdated
      }
    })
  })], 2)])
},staticRenderFns: []}

/***/ }),
/* 503 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "sim-badge"
  }, [_c('span', {
    staticClass: "sim-badge__text"
  }, [_vm._t("default")], 2), _vm._v(" "), (_vm.badge) ? _c('transition', {
    attrs: {
      "name": "sim-badge",
      "appear": ""
    }
  }, [_c('span', {
    staticClass: "sim-badge__content"
  }, [_vm._v(_vm._s(_vm.badge))])]) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 504 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('h2', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('demobox', [_c('template', {
    slot: "intro"
  }, [_vm._v("\n        Normal / Default\n      ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('p', [_vm._v("Loader component")])]), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "html"
  })])]), _vm._v(" "), _c('template', {
    slot: "js"
  }, [_c('pre', [_c('code', {
    staticClass: "javascript"
  })])])], 2)], 1)
},staticRenderFns: []}

/***/ }),
/* 505 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "sim-modal",
    class: {
      active: _vm.shouldBeOpen
    }
  }, [(_vm.shouldShowMask) ? _c('div', {
    staticClass: "sim-modal__mask",
    on: {
      "click": _vm.clickMask
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "sim-modal__wrapper"
  }, [_vm._t("default"), _vm._v(" "), (_vm.shouldShowDismiss) ? _c('div', {
    staticClass: "sim-modal__dismiss",
    on: {
      "click": _vm.dismiss
    }
  }, [_vm._v("×")]) : _vm._e()], 2)])
},staticRenderFns: []}

/***/ }),
/* 506 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "sim-autocomplete"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.keyword),
      expression: "keyword"
    }],
    attrs: {
      "placeholder": _vm.placeholder
    },
    domProps: {
      "value": (_vm.keyword)
    },
    on: {
      "input": [function($event) {
        if ($event.target.composing) { return; }
        _vm.keyword = $event.target.value
      }, function($event) {
        _vm.onInput($event.target.value)
      }],
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27, $event.key)) { return null; }
        _vm.isOpen = false
      },
      "blur": function($event) {
        _vm.isOpen = false
      },
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "down", 40, $event.key)) { return null; }
        _vm.moveDown($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "up", 38, $event.key)) { return null; }
        _vm.moveUp($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
        _vm.select($event)
      }]
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isOpen),
      expression: "isOpen"
    }]
  }, [_c('transition-group', {
    attrs: {
      "appear": "",
      "name": "list",
      "tag": "ul",
      "mode": "in-out"
    }
  }, _vm._l((_vm.filteredOptions), function(option, index) {
    return _c('li', {
      key: index,
      class: {
        highlighted: index === _vm.position
      },
      on: {
        "mouseenter": function($event) {
          _vm.position = index
        },
        "mousedown": _vm.select
      }
    }, [_vm._t("item", null, {
      option: option
    })], 2)
  }))], 1)])
},staticRenderFns: []}

/***/ }),
/* 507 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('h2', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('demobox', [_c('template', {
    slot: "intro"
  }, [_vm._v("\n        Normal / Default\n      ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('p', [_c('SimBadge', {
    attrs: {
      "badge": _vm.badge
    }
  }, [_vm._v("Some text")]), _vm._v(" Some more text")], 1), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.example),
      expression: "example"
    }],
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.example)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.example = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "html"
  })])]), _vm._v(" "), _c('template', {
    slot: "js"
  }, [_c('pre', [_c('code', {
    staticClass: "javascript"
  })])])], 2)], 1)
},staticRenderFns: []}

/***/ }),
/* 508 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('h2', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('demobox', [_c('template', {
    slot: "intro"
  }, [_vm._v("\n        Normal / Default\n      ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('p', [_vm._v("Modal component")])]), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "html"
  })])]), _vm._v(" "), _c('template', {
    slot: "js"
  }, [_c('pre', [_c('code', {
    staticClass: "javascript"
  })])])], 2)], 1)
},staticRenderFns: []}

/***/ }),
/* 509 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.model.name) ? _c('li', [_c('router-link', {
    attrs: {
      "to": {
        name: _vm.model.name
      }
    }
  }, [_c('sim-icontext', {
    attrs: {
      "icon": _vm.model.icon,
      "text": _vm.model.label
    }
  })], 1), _vm._v(" "), (_vm.hasChildren) ? _c('ul', _vm._l((_vm.model.children), function(model, index) {
    return _c('directory', {
      key: index,
      attrs: {
        "model": model
      }
    })
  })) : _vm._e()], 1) : (_vm.model.label) ? _c('section', [_c('header', [_c('sim-icontext', {
    attrs: {
      "icon": _vm.model.icon,
      "text": _vm.model.label
    }
  })], 1), _vm._v(" "), (_vm.hasChildren) ? _c('ul', _vm._l((_vm.model.children), function(model, index) {
    return _c('directory', {
      key: index,
      attrs: {
        "model": model
      }
    })
  })) : _vm._e()]) : (_vm.hasChildren) ? _c('ul', {
    staticClass: "app-menu"
  }, _vm._l((_vm.model.children), function(model, index) {
    return _c('directory', {
      key: index,
      attrs: {
        "model": model
      }
    })
  })) : _vm._e()
},staticRenderFns: []}

/***/ }),
/* 510 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "demobox",
    class: {
      open: _vm.open || _vm.toggled
    }
  }, [_c('div', {
    staticClass: "demobox__intro"
  }, [_vm._t("intro")], 2), _vm._v(" "), _c('div', {
    staticClass: "demobox__content"
  }, [_c('div', {
    staticClass: "demobox__view demobox--output"
  }, [_vm._t("view")], 2), _vm._v(" "), _c('div', {
    staticClass: "demobox__html demobox--output demobox--drawer"
  }, [_vm._t("html")], 2), _vm._v(" "), _c('div', {
    staticClass: "demobox__js demobox--output demobox--drawer"
  }, [_vm._t("js")], 2)]), _vm._v(" "), (!_vm.open) ? _c('footer', {
    staticClass: "demobox__handle",
    on: {
      "click": _vm.toggleDetails
    }
  }, [_c('sim-icontext', {
    attrs: {
      "icon": "fa-code",
      "text": "details"
    }
  })], 1) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 511 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('h1', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('p', [_vm._v("pushing them all")])])
},staticRenderFns: []}

/***/ }),
/* 512 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('h2', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('demobox', [_c('template', {
    slot: "intro"
  }, [_vm._v("\n          Normal / Default\n        ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('sim-datalist', {
    attrs: {
      "items": _vm.items
    },
    scopedSlots: _vm._u([{
      key: "item",
      fn: function(props) {
        return [_c('li', {
          key: props.index
        }, [_vm._v("\n                  " + _vm._s(props.item.name) + "\n              ")])]
      }
    }])
  }, [_c('template', {
    slot: "header"
  }, [_vm._v("\n              Datalist Header\n            ")]), _vm._v(" "), _c('template', {
    slot: "static-before"
  }, [_c('li', {
    key: 'before',
    staticClass: "title"
  }, [_c('span', [_vm._v("Static item before "), _c('samp', [_vm._v("items")]), _vm._v(" loop")])])]), _vm._v(" "), _c('template', {
    slot: "static-after"
  }, [_c('li', {
    key: 'before',
    staticClass: "title"
  }, [_c('span', [_vm._v("Static item after "), _c('samp', [_vm._v("items")]), _vm._v(" loop")])])]), _vm._v(" "), _c('template', {
    slot: "footer"
  }, [_vm._v("\n              Datalist Footer\n            ")])], 2)], 1), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    pre: true,
    attrs: {
      "class": "html"
    }
  }, [_vm._v("<sim-datalist :items=\"items\">\n  <template slot=\"header\">\n    Datalist Header\n  </template>\n  <template slot=\"static-before\">\n    <li :key=\"'before'\" class=\"title\">\n      <span>Static item before <samp>items</samp> loop</span>\n    </li>\n  </template>\n  <template slot=\"item\" slot-scope=\"props\">\n    <li :key=\"props.index\">\n        {{ props.item.name }}\n    </li>\n  </template>\n  <template slot=\"static-after\">\n    <li :key=\"'before'\" class=\"title\">\n      <span>Static item after <samp>items</samp> loop</span>\n    </li>\n  </template>\n  <template slot=\"footer\">\n    Datalist Footer\n  </template>\n</sim-datalist>")])])]), _vm._v(" "), _c('template', {
    slot: "js"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "javascript"
  }, [_vm._v("items: " + _vm._s(_vm.items))])])])], 2)], 1)
},staticRenderFns: []}

/***/ }),
/* 513 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "sim-icontext",
    class: _vm.bling
  }, [(_vm.icon) ? _c('span', {
    staticClass: "sim-icon fa",
    class: _vm.icon
  }) : _vm._e(), _vm._v(" "), (_vm.text) ? _c('span', [_vm._v(_vm._s(_vm.text))]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 514 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('Datepicker', {
    staticClass: "sim-datepicker"
  })
},staticRenderFns: []}

/***/ }),
/* 515 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('h2', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('demobox', {
    attrs: {
      "open": true
    }
  }, [_c('template', {
    slot: "intro"
  }, [_vm._v("\n        Normal / Default\n      ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('p', [_c('sim-icontext', {
    attrs: {
      "icon": "fa-star",
      "text": "Getting Started"
    }
  })], 1), _vm._v(" "), _c('p', [_c('sim-icontext', {
    attrs: {
      "icon": "fa-star",
      "text": 3
    }
  })], 1), _vm._v(" "), _c('p', [_c('sim-icontext', {
    attrs: {
      "icon": "fa-star fa-3x",
      "text": "That's Huge"
    }
  })], 1)]), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "html"
  }, [_vm._v("<sim-icontext icon=\"fa-star\" text=\"Getting Started\" />")])]), _vm._v(" "), _c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "html"
  }, [_vm._v("<sim-icontext icon=\"fa-star\" :text=\"3\" />")])]), _vm._v(" "), _c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "html"
  }, [_vm._v("<sim-icontext icon=\"fa-star fa-3x\" text=\"That's Huge\" />")])])])], 2), _vm._v(" "), _c('demobox', {
    attrs: {
      "open": true
    }
  }, [_c('template', {
    slot: "intro"
  }, [_vm._v("\n        Circle\n      ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('p', [_c('sim-icontext', {
    attrs: {
      "icon": "fa-star",
      "text": "Getting Started",
      "circle": ""
    }
  })], 1)]), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', [_c('code', {
    staticClass: "html"
  }, [_c('span', {
    staticClass: "de-emphasize"
  }, [_vm._v("<sim-icontext icon=\"fa-star\" text=\"Getting Started\"")]), _vm._v(" "), _c('span', {
    staticClass: "emphasize"
  }, [_vm._v("circle")]), _vm._v(" "), _c('span', {
    staticClass: "de-emphasize"
  }, [_vm._v("/>")])])])])], 2), _vm._v(" "), _c('demobox', {
    attrs: {
      "open": true
    }
  }, [_c('template', {
    slot: "intro"
  }, [_vm._v("\n        Round\n      ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('p', [_c('sim-icontext', {
    attrs: {
      "icon": "fa-star",
      "text": "Getting Started",
      "round": ""
    }
  })], 1)]), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', [_c('code', {
    staticClass: "html"
  }, [_c('span', {
    staticClass: "de-emphasize"
  }, [_vm._v("<sim-icontext icon=\"fa-star\" text=\"Getting Started\"")]), _vm._v(" "), _c('span', {
    staticClass: "emphasize"
  }, [_vm._v("round")]), _vm._v(" "), _c('span', {
    staticClass: "de-emphasize"
  }, [_vm._v("/>")])])])])], 2), _vm._v(" "), _c('demobox', {
    attrs: {
      "open": true
    }
  }, [_c('template', {
    slot: "intro"
  }, [_vm._v("\n        Square\n      ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('p', [_c('sim-icontext', {
    attrs: {
      "icon": "fa-star",
      "text": "Getting Started",
      "square": ""
    }
  })], 1)]), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', [_c('code', {
    staticClass: "html"
  }, [_c('span', {
    staticClass: "de-emphasize"
  }, [_vm._v("<sim-icontext icon=\"fa-star\" text=\"Getting Started\"")]), _vm._v(" "), _c('span', {
    staticClass: "emphasize"
  }, [_vm._v("square")]), _vm._v(" "), _c('span', {
    staticClass: "de-emphasize"
  }, [_vm._v("/>")])])])])], 2)], 1)
},staticRenderFns: []}

/***/ }),
/* 516 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "sim-progress",
    style: (_vm.stylePercentComplete),
    attrs: {
      "tooltip": _vm.bubbleText
    }
  }, [_c('div', {
    staticClass: "sim-progress__completed"
  })])
},staticRenderFns: []}

/***/ }),
/* 517 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "sim-datalist"
  }, [_c('header', [_vm._t("header")], 2), _vm._v(" "), (_vm.animate) ? _c('transition-group', {
    attrs: {
      "name": "sim-datalist",
      "tag": "ul",
      "mode": "out-in"
    }
  }, [_vm._t("static-before"), _vm._v(" "), _vm._l((_vm.items), function(item, index) {
    return _vm._t("item", null, {
      item: item,
      index: index
    })
  }), _vm._v(" "), _vm._t("static-after")], 2) : _c('ul', [_vm._t("static-before"), _vm._v(" "), _vm._l((_vm.items), function(item, index) {
    return _vm._t("item", null, {
      item: item,
      index: index
    })
  }), _vm._v(" "), _vm._t("static-after")], 2), _vm._v(" "), _c('footer', [_vm._t("footer")], 2)], 1)
},staticRenderFns: []}

/***/ }),
/* 518 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "sim-panel",
    class: {
      active: _vm.shouldBeOpen
    }
  }, [_vm._t("default"), _vm._v(" "), (_vm.shouldShowDismiss) ? _c('div', {
    staticClass: "sim-panel__dismiss",
    on: {
      "click": _vm.dismiss
    }
  }, [_vm._v("×")]) : _vm._e()], 2)
},staticRenderFns: []}

/***/ }),
/* 519 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('h2', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('demobox', [_c('template', {
    slot: "intro"
  }, [_vm._v("\n        Normal / Default\n      ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('p', [_vm._v("Progress component")])]), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "html"
  })])]), _vm._v(" "), _c('template', {
    slot: "js"
  }, [_c('pre', [_c('code', {
    staticClass: "javascript"
  })])])], 2)], 1)
},staticRenderFns: []}

/***/ }),
/* 520 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "app-layout"
  }, [_c('SimOverlay', {
    staticClass: "animator parallax in-from-top",
    attrs: {
      "should-show-dismiss": true,
      "dismiss-to": _vm.overlayDismissTo,
      "should-be-open": _vm.shouldOverlayBeOpen
    }
  }, [_c('button', {
    on: {
      "click": _vm.$root.togglePanel
    }
  }, [_vm._v("panelize")])]), _vm._v(" "), _c('SimPanel', {
    staticClass: "animator parallax in-from-left",
    attrs: {
      "should-show-dismiss": true,
      "dismiss-to": _vm.panelDismissTo,
      "should-be-open": _vm.shouldPanelBeOpen
    }
  }), _vm._v(" "), _c('header', {
    staticClass: "app-header animatable"
  }, [_c('div', [_c('router-link', {
    staticClass: "logo",
    attrs: {
      "to": "/"
    }
  }, [_c('span', [_vm._v("SIM "), _c('b', [_vm._v("UI")])])]), _vm._v(" "), _c('span', {
    staticClass: "greeting"
  }, [_vm._v("The SimCore Interface Library")])], 1), _vm._v(" "), _c('div', {
    staticClass: "app-nav"
  }, [_c('nav', [_c('li', [_c('router-link', {
    attrs: {
      "to": "/getting-started"
    }
  }, [_c('SimIconText', {
    attrs: {
      "circle": "",
      "icon": "fa-star",
      "text": "Getting Started"
    }
  })], 1)], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/components"
    }
  }, [_c('SimIconText', {
    attrs: {
      "circle": "",
      "icon": "fa-cubes",
      "text": "Components"
    }
  })], 1)], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/styles"
    }
  }, [_c('SimIconText', {
    attrs: {
      "circle": "",
      "icon": "fa-paint-brush",
      "text": "Styles"
    }
  })], 1)], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/extras"
    }
  }, [_c('SimIconText', {
    attrs: {
      "circle": "",
      "icon": "fa-code",
      "text": "Other Things"
    }
  })], 1)], 1)])])]), _vm._v(" "), _c('div', {
    staticClass: "app-content animatable"
  }, [_c('router-view'), _vm._v(" "), _c('aside', [_c('Directory', {
    attrs: {
      "model": _vm.menu
    }
  })], 1)], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 521 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('h2', [_vm._v(_vm._s(_vm.msg))]), _vm._v("\n      @STUCK - how to open a component without event bus at the app root level?\n      "), _c('demobox', {
    attrs: {
      "open": false
    }
  }, [_c('template', {
    slot: "intro"
  }, [_vm._v("\n          Normal / Default\n        ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('p', [_c('button', {
    on: {
      "click": _vm.$root.toggleOverlay
    }
  }, [_vm._v("Toggle Overlay")])]), _vm._v(" "), _c('p', [_c('button', {
    staticClass: "secondary",
    on: {
      "click": _vm.$root.openOverlay
    }
  }, [_vm._v("Open Overlay")])]), _vm._v(" "), _c('p', [_c('button', {
    staticClass: "secondary",
    on: {
      "click": _vm.$root.closeOverlay
    }
  }, [_vm._v("Close Overlay")])])]), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "html"
  }, [_vm._v("<!-- somewhere in your app -->\n<button @click=\"$root.toggleOverlay\">Toggle Overlay</button>")])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "html"
  }, [_vm._v("<!-- put in your root layout component -->\n<SimOverlay :show-dismiss=\"true\" :should-be-open=\"shouldOverlayBeOpen\">\n"), _c('i', [_vm._v("... your content here ...")]), _vm._v("\n</SimOverlay>")])])]), _vm._v(" "), _c('template', {
    slot: "js"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "javascript"
  }, [_vm._v("// These methods are needed in your main.js component.\n// They are helper methods for a localized event-bus in your root layout component.\nmethods: {\n  toggleOverlay() {\n    this.$emit('toggle-overlay')\n  },\n  openOverlay() {\n    this.$emit('open-overlay')\n  },\n  closeOverlay() {\n    this.$emit('close-overlay')\n  },\n}")])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "javascript"
  }, [_vm._v("// These listeners complete a local event-bus\n// and are needed in your root Layout component.\nmounted () {\n  this.$root.$on('toggle-overlay', () => {\n    this.shouldOverlayBeOpen = !this.shouldOverlayBeOpen\n  })\n  this.$root.$on('open-overlay', () => {\n    this.shouldOverlayBeOpen = true\n  })\n  this.$root.$on('close-overlay', () => {\n    this.shouldOverlayBeOpen = false\n  })\n}")])])])], 2), _vm._v(" "), _c('demobox', {
    attrs: {
      "open": false
    }
  }, [_c('template', {
    slot: "intro"
  }, [_vm._v("\n          With vue-router\n        ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('small', [_vm._v("Modify your methods and mounted codes (see details) to handle sending route paths around. "), _c('i', [_vm._v("More info coming soon about how to user this with vue-router...")])])]), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "html"
  }, [_vm._v("<!-- put in your root layout component -->\n<SimOverlay :show-dismiss=\"true\" :should-be-open=\"shouldOverlayBeOpen\">\n  <router-view name=\"overlay\"></router-view>\n</SimOverlay>")])])]), _vm._v(" "), _c('template', {
    slot: "js"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "javascript"
  }, [_vm._v("// These methods are needed in your main.js component.\n// They are helper methods for a localized event-bus in your root layout component.\nmethods: {\n  toggleOverlay(callback) {\n    this.$emit('toggle-overlay', callback)\n  },\n  openOverlay(callback) {\n    this.$emit('open-overlay', callback)\n  },\n  closeOverlay(callback) {\n    this.$emit('close-overlay', callback)\n  },\n}")])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "javascript"
  }, [_vm._v("// These listeners complete a local event-bus and are needed in your root Layout component.\nmounted () {\n  this.$root.$on('toggle-overlay', (dismissTo) => {\n    this.shouldOverlayBeOpen = !this.shouldOverlayBeOpen\n    this.overlayDismissTo = dismissTo\n  })\n  this.$root.$on('open-overlay', (dismissTo) => {\n    this.shouldOverlayBeOpen = true\n    this.overlayDismissTo = dismissTo\n  })\n  this.$root.$on('close-overlay', (dismissTo) => {\n    this.shouldOverlayBeOpen = false\n    this.overlayDismissTo = dismissTo\n  })\n}")])])])], 2)], 1)
},staticRenderFns: []}

/***/ }),
/* 522 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('h2', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('demobox', {
    attrs: {
      "open": true
    }
  }, [_c('template', {
    slot: "intro"
  }, [_vm._v("\n        Normal / Default\n      ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('p', [_c('button', {
    on: {
      "click": _vm.$root.togglePanel
    }
  }, [_vm._v("Toggle Panel")])]), _vm._v(" "), _c('p', [_c('button', {
    staticClass: "secondary",
    on: {
      "click": _vm.$root.openPanel
    }
  }, [_vm._v("Open Panel")])]), _vm._v(" "), _c('p', [_c('button', {
    staticClass: "secondary",
    on: {
      "click": _vm.$root.closePanel
    }
  }, [_vm._v("Close Panel")])])]), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "html"
  }, [_vm._v("<button @click=\"$root.togglePanel\">Toggle Panel</button>")])])])], 2)], 1)
},staticRenderFns: []}

/***/ }),
/* 523 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "sim-tag"
  }, [(_vm.icon) ? _c('span', {
    staticClass: "fa",
    class: _vm.icon
  }) : _vm._e(), _vm._v(" "), (_vm.text) ? _c('span', [_vm._v(_vm._s(_vm.text))]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 524 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('main', {
    staticClass: "library library-gui"
  }, [_c('h1', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('transition', {
    attrs: {
      "appear": "",
      "name": "slide-left",
      "mode": "out-in"
    }
  }, [_c('router-view', {
    attrs: {
      "name": "details"
    }
  })], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 525 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "sim-switch"
  }, [_c('label', [_c('span', [_vm._v(_vm._s(_vm.leftLabel))]), _vm._v(" "), _c('input', {
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "value": true,
      "checked": _vm.checked
    },
    on: {
      "change": _vm.change
    }
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.rightLabel))])])])
},staticRenderFns: []}

/***/ }),
/* 526 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('h2', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('demobox', [_c('template', {
    slot: "intro"
  }, [_vm._v("\n          Normal / Default\n        ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('sim-autocomplete', {
    attrs: {
      "options": _vm.options,
      "name": "film",
      "placeholder": "find a movie..."
    },
    on: {
      "select": _vm.onSelect
    },
    scopedSlots: _vm._u([{
      key: "item",
      fn: function(props) {
        return [_c('article', {
          staticClass: "media"
        }, [_c('p', [_c('strong', [_vm._v(_vm._s(props.option.name))]), _vm._v(" "), _c('br'), _vm._v(" " + _vm._s(props.option.description) + "\n                ")])])]
      }
    }])
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('p', [_vm._v("\n            Data\n            "), _c('pre', [_c('code', {
    staticClass: "javascript"
  }, [_vm._v("selectedOption = " + _vm._s(_vm.selectedOption))])])])], 1), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    pre: true,
    attrs: {
      "class": "html"
    }
  }, [_vm._v("<sim-autocomplete :options=\"options\" name=\"film\" placeholder=\"find a movie...\" @select=\"onSelect\">\n  <template slot=\"item\" slot-scope=\"props\">\n    <article class=\"media\">\n      <p>\n        <strong>{{ props.option.name }}</strong>\n        <br> {{ props.option.description }}\n      </p>\n    </article>\n  </template>\n</sim-autocomplete>")])])]), _vm._v(" "), _c('template', {
    slot: "js"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "javascript"
  }, [_vm._v("options = [\n  {\n    name: 'Arrival',\n    description: 'lorem ipsum dolor amet.'\n  }, {\n    name: 'Happy Gilmore',\n    description: 'lorem ipsum dolor amet.'\n  }, {\n    name: 'Ip Man 2',\n    description: 'lorem ipsum dolor amet.'\n  }, {\n    name: 'Spider-Man Homecoming',\n    description: 'lorem ipsum dolor amet.'\n  }\n]")])])])], 2)], 1)
},staticRenderFns: []}

/***/ }),
/* 527 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('main', [_c('h1', [_vm._v(_vm._s(_vm.msg))])])
},staticRenderFns: []}

/***/ }),
/* 528 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('h2', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('demobox', [_c('template', {
    slot: "intro"
  }, [_vm._v("\n        Normal / Default\n      ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('SimDatepicker', {
    attrs: {
      "required": ""
    }
  })], 1), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "html"
  })])]), _vm._v(" "), _c('template', {
    slot: "js"
  }, [_c('pre', [_c('code', {
    staticClass: "javascript"
  })])])], 2)], 1)
},staticRenderFns: []}

/***/ }),
/* 529 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('button', {
    staticClass: "sim-bulkcheck",
    class: {
      active: _vm.checkAll
    },
    on: {
      "click": _vm.toggleState
    }
  }, [_c('SimIconText', {
    attrs: {
      "icon": (_vm.icon + " fa-fw")
    }
  }), _vm._v(" "), _c('SimIconText', {
    attrs: {
      "icon": (_vm.icon + " fa-fw")
    }
  }), _vm._v(" "), _c('SimIconText', {
    attrs: {
      "icon": (_vm.icon + " fa-fw"),
      "text": _vm.text
    }
  })], 1)
},staticRenderFns: []}

/***/ }),
/* 530 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('main', [_c('h1', [_vm._v("SimCore UI Components")]), _vm._v(" "), _c('p', [_vm._v("Component Library for SimCore apps")]), _vm._v(" "), _c('h2', [_vm._v("To Use In Your Project")]), _vm._v(" "), _c('p', [_vm._v("# in your package.json")]), _vm._v(" "), _c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    pre: true,
    attrs: {
      "class": "html"
    }
  }, [_vm._v("\n\"dependencies\": {\n  \"simcore-ui\": \"git+ssh@github.com:SimCoreTechnology/simcore-ui.git#master\"\n}")])]), _vm._v(" "), _c('h2', [_vm._v("Documentation / Work on Library Directly")]), _vm._v(" "), _vm._m(0, false, false), _vm._v(" "), _vm._m(1, false, false), _vm._v(" "), _c('p', [_c('label', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.sortKey),
      expression: "sortKey"
    }],
    attrs: {
      "type": "radio",
      "value": "index"
    },
    domProps: {
      "checked": _vm._q(_vm.sortKey, "index")
    },
    on: {
      "change": function($event) {
        _vm.sortKey = "index"
      }
    }
  }), _vm._v(" by index")]), _vm._v(" "), _c('label', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.sortKey),
      expression: "sortKey"
    }],
    attrs: {
      "type": "radio",
      "value": "item"
    },
    domProps: {
      "checked": _vm._q(_vm.sortKey, "item")
    },
    on: {
      "change": function($event) {
        _vm.sortKey = "item"
      }
    }
  }), _vm._v(" by alpha")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.search),
      expression: "search"
    }],
    attrs: {
      "type": "search",
      "placeholder": "filter..."
    },
    domProps: {
      "value": (_vm.search)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.search = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('transition-group', {
    attrs: {
      "tag": "ul",
      "name": "list",
      "mode": "in-out"
    }
  }, _vm._l((_vm.filteredList), function(item, index) {
    return _c('li', {
      key: index,
      style: ('--delay:' + index)
    }, [_vm._v("\n        " + _vm._s(index) + ". " + _vm._s(item.item) + " (" + _vm._s(item.index) + ")\n      ")])
  })), _vm._v(" "), _vm._m(2, false, true)], 2)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "highlight highlight-source-shell"
  }, [_c('pre', [_c('span', {
    staticClass: "pl-c"
  }, [_c('span', {
    staticClass: "pl-c"
  }, [_vm._v("#")]), _vm._v(" install dependencies")]), _vm._v("\n    npm install\n\n    "), _c('span', {
    staticClass: "pl-c"
  }, [_c('span', {
    staticClass: "pl-c"
  }, [_vm._v("#")]), _vm._v(" serve with hot reload at localhost:8080")]), _vm._v("\n    npm run dev\n\n    "), _c('span', {
    staticClass: "pl-c"
  }, [_c('span', {
    staticClass: "pl-c"
  }, [_vm._v("#")]), _vm._v(" build for production with minification")]), _vm._v("\n    npm run build\n\n    "), _c('span', {
    staticClass: "pl-c"
  }, [_c('span', {
    staticClass: "pl-c"
  }, [_vm._v("#")]), _vm._v(" build for production and view the bundle analyzer report")]), _vm._v("\n    npm run build --report\n\n    "), _c('span', {
    staticClass: "pl-c"
  }, [_c('span', {
    staticClass: "pl-c"
  }, [_vm._v("#")]), _vm._v(" run unit tests")]), _vm._v("\n    npm run unit\n\n    "), _c('span', {
    staticClass: "pl-c"
  }, [_c('span', {
    staticClass: "pl-c"
  }, [_vm._v("#")]), _vm._v(" run e2e tests")]), _vm._v("\n    npm run e2e\n\n    "), _c('span', {
    staticClass: "pl-c"
  }, [_c('span', {
    staticClass: "pl-c"
  }, [_vm._v("#")]), _vm._v(" run all tests")]), _vm._v("\n    npm "), _c('span', {
    staticClass: "pl-c1"
  }, [_vm._v("test")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_vm._v("For detailed explanation on how things work, checkout the "), _c('a', {
    attrs: {
      "href": "http://vuejs-templates.github.io/webpack/"
    }
  }, [_vm._v("guide")]), _vm._v(" and "), _c('a', {
    attrs: {
      "href": "http://vuejs.github.io/vue-loader"
    }
  }, [_vm._v("docs for vue-loader")]), _vm._v(".")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._l((_vm.randomInt(5, 10)), function(n) {
    return _c('article', [_c('header', [_vm._v("\n        testing " + _vm._s(n) + "\n      ")]), _vm._v(" "), _vm._l((_vm.randomInt(1, 100)), function(n) {
      return _c('p', [_vm._v("\n        " + _vm._s(n) + "\n      ")])
    })], 2)
  })
}]}

/***/ }),
/* 531 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "sim-selection",
    class: {
      selected: _vm.selected
    }
  }, [_c('label', {
    class: {
      disabled: _vm.shouldBeDisabled
    }
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "disabled": _vm.shouldBeDisabled
    },
    domProps: {
      "checked": _vm.selected
    },
    on: {
      "change": _vm.toggleSelection
    }
  }), _vm._v(" "), _c('span', [_vm._t("default")], 2)])])
},staticRenderFns: []}

/***/ }),
/* 532 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "sim-overlay",
    class: {
      active: _vm.shouldBeOpen
    }
  }, [_vm._t("default"), _vm._v(" "), (_vm.shouldShowDismiss) ? _c('div', {
    staticClass: "sim-overlay__dismiss",
    on: {
      "click": _vm.dismiss
    }
  }, [_vm._v("×")]) : _vm._e()], 2)
},staticRenderFns: []}

/***/ }),
/* 533 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "loader",
      "appear": ""
    }
  }, [(_vm.isLoading) ? _c('svg', {
    staticClass: "sim-loader",
    attrs: {
      "viewBox": "0 0 50 50"
    }
  }, [_c('circle', {
    attrs: {
      "cx": "25",
      "cy": "25",
      "r": "22.5"
    }
  })]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 534 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('h2', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('demobox', [_c('template', {
    slot: "intro"
  }, [_vm._v("\n        Normal / Default\n      ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('p', [_vm._v("FilterBy component")])]), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "html"
  })])]), _vm._v(" "), _c('template', {
    slot: "js"
  }, [_c('pre', [_c('code', {
    staticClass: "javascript"
  })])])], 2)], 1)
},staticRenderFns: []}

/***/ }),
/* 535 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "sim-filter sim-accordion",
    class: {
      active: _vm.shouldBeActive, open: _vm.isOpen
    }
  }, [_c('div', {
    staticClass: "sim-filter__header sim-accordion__label",
    on: {
      "click": _vm.toggleOpenList
    }
  }, [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('SimDatalist', {
    staticClass: "sim-filter__items sim-accordion__items",
    attrs: {
      "items": _vm.list,
      "animate": true
    },
    scopedSlots: _vm._u([{
      key: "item",
      fn: function(props) {
        return [_c('li', {
          key: props.item.id,
          staticClass: "no-wrap"
        }, [_c('SimSelection', {
          attrs: {
            "item-id": props.item.id,
            "should-be-selected": false
          },
          on: {
            "toggle": _vm.toggleSelection
          }
        }, [_vm._v("\n          " + _vm._s(props.item.name) + "\n        ")])], 1)]
      }
    }])
  }, [_c('template', {
    slot: "static-before"
  }, [(_vm.showSystemEcho) ? _c('li', {
    key: "static-before",
    staticClass: "static system-echo"
  }, [_vm._v("\n        " + _vm._s(_vm.systemEcho) + "\n      ")]) : _vm._e()])], 2)], 1)
},staticRenderFns: []}

/***/ }),
/* 536 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('Layout')], 1)
},staticRenderFns: []}

/***/ }),
/* 537 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('h2', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _c('demobox', [_c('template', {
    slot: "intro"
  }, [_vm._v("\n        Normal / Default\n      ")]), _vm._v(" "), _c('template', {
    slot: "view"
  }, [_c('SimTimePicker', {
    attrs: {
      "date": _vm.date,
      "blocks": _vm.blocks,
      "should-show-date": true
    },
    on: {
      "calendar-day-selected": _vm.manageDayControlPanel,
      "all-time-blocks-removed": _vm.allTimeBlocksRemoved,
      "time-block-removed": _vm.timeBlockRemoved,
      "time-block-created": _vm.timeBlockCreated
    }
  }), _vm._v(" "), _c('br'), _vm._v(" "), _c('p', [_vm._v("Data")]), _vm._v(" "), _c('div', {
    staticClass: "flex-baseline-around"
  }, [_c('pre', [_c('code', {
    staticClass: "javascript"
  }, [_vm._v(_vm._s(_vm.blocks))])]), _vm._v(" "), _c('pre', [_c('code', {
    staticClass: "javascript"
  }, [_vm._v(_vm._s(_vm.user_dates))])])])], 1), _vm._v(" "), _c('template', {
    slot: "html"
  }, [_c('pre', {
    directives: [{
      name: "highlightjs",
      rawName: "v-highlightjs"
    }]
  }, [_c('code', {
    staticClass: "html"
  })])]), _vm._v(" "), _c('template', {
    slot: "js"
  }, [_c('pre', [_c('code', {
    staticClass: "javascript"
  })])])], 2)], 1)
},staticRenderFns: []}

/***/ })
],[159]);
//# sourceMappingURL=app.889ec194bf6c074007ec.js.map