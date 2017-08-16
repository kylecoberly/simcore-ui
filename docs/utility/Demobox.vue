<template lang="html">
  <div class="demobox" :class="{open: open || toggled}">
    <div class="demobox__intro">
      <slot name="intro"></slot>
    </div>
    <div class="demobox__content">
      <div class="demobox__view demobox--output">
        <slot name="view"></slot>
      </div>
      <div class="demobox__html demobox--output demobox--drawer">
        <slot name="html"></slot>
      </div>
      <div class="demobox__js demobox--output demobox--drawer">
        <slot name="js"></slot>
      </div>
    </div>
    <footer class="demobox__handle" @click="toggleDetails" v-if="!open">
      <sim-icontext icon="fa-code" text="details" />
    </footer>
  </div>
</template>

<script>
import SimIcontext from '../../components/IconText'

export default {
  name: 'demobox',
  components: {
    SimIcontext,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      toggled: false,
    }
  },
  methods: {
    toggleDetails() {
      this.toggled = !this.toggled
    },
  },
}
</script>

<style lang="scss">
.demobox {
  position: relative;
  &__content {
    border: 1px solid var(--cloud);
    background: var(--lightest);
    border-radius: var(--base-radius);
  }
  &--output {
    + .demobox--output {
      box-shadow: 0 1px 0 0 var(--cloud) inset;
    }
  }
  + .demobox {
    margin-top: 2em;
  }
  &__intro {
    &:not(:empty) {
      padding: 0 0 .5em 0;
    }
  }
  &__view {
    padding: 1em;
    line-height: 1.3;
  }
  &__js {
    background: var(--snow);
  }
  &__html {
    background: var(--snow);
  }
  &__handle {
    display: inline-block;
    cursor: pointer;
    padding: 1em;
    font-weight: 600;
    color: var(--helper);
    font-size: .8em;
  }
  &--drawer {
    max-height: 0;
    padding: 0 1em;
    overflow: auto;
    transition: var(--ms) ease-in-out;
  }
  &.open .demobox--drawer:not(:empty) {
    max-height: 90vh;
    padding: 1em;
  }
  pre {
    margin: 0;
    white-space: pre-wrap;
    .de-emphasize {
      color: var(--shade);
    }
    .emphasize {
      color: hotpink;
      font-weight: bold;
    }
  }
}
</style>
