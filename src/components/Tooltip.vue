<template lang="html">
  <span class="sim-tooltip">
    <span class="sim-tooltip__cue"><slot name="cue"><i class="fa fa-question-circle"></i></slot></span>
    <span class="sim-tooltip__bubble" :class="popTo"><slot name="text"></slot></span>
  </span>
</template>

<script>
  export default {
    name: 'sim-tooltip',
    props: {
      pop: {
        type: String,
        default: 'up',
      },
      shift: {
        type: String,
        default: 'none',
      },
    },
    computed: {
      popTo() {
        return `sim-tooltip__bubble--${this.pop}`
      },
    },
  }
</script>

<style lang="scss">
  .sim-tooltip {
    display: inline-block;
    position: relative;
    &__cue {
      cursor: default;
    }
    &__bubble {
      display: none;
      pointer-events: none;
      user-select: none;
      opacity: 0;
      position: absolute;
      z-index: 10;
      left: 50%;
      transition: all var(--ms, var(--default-ms)) ease-out;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        border: .5em solid transparent;
        transform: translate(-50%, -100%);
      }
      &--up {
        transform: translate(-50%, 50%) scale(.5);
        bottom: calc(100% + .5em);
        &::after {
          top: calc(100% + 1em - 1px);
        }
      }
      &--down {
        transform: translate(-50%, -50%) scale(.65);
        top: calc(100% + .5em);
        &::after {
          bottom: calc(100% - 1em - 1px);
        }
      }
    }
    &:hover {
      .sim-tooltip__bubble {
        display: block;
        &--up, &--down {
          animation: tooltipsVert calc(var(--ms, var(--default-ms)) / 2) ease-out forwards;
        }
      }
    }
  }
  @keyframes tooltipsVert {
    to {
      opacity: 1;
      transform: translate(-50%, 0%) scale(1);
    }
  }

  @keyframes tooltipsHorz {
    to {
      opacity: 1;
      transform: translate(0%, -50%) scale(1);
    }
  }
</style>
