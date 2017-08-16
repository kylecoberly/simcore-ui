<template lang="html">
  <span class="sim-icontext" :class="{ circled: circled, rounded: rounded, squared: squared }">
    <span v-if="icon" class="sim-icon fa" :class="icon"></span>
    <span v-if="text">{{ text }}</span>
  </span>
</template>

<script>
  export default {
    name: 'sim-icontext',
    props: {
      icon: String,
      text: [Number, String],
      circled: Boolean,
      rounded: Boolean,
      squared: Boolean,
    },
  }
</script>

<style lang="scss">
  .sim-icontext {
    display: inline-flex;
    * + span {
      margin-left: .5em;
    }
    .sim-icon {
      flex: 0 0 auto;
    }
    &.circled .sim-icon,
    &.rounded .sim-icon,
    &.squared .sim-icon {
      width: 1.5em;
      height: 1.5em;
      margin: -0.75em 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 0 .125em;
    }
    &.rounded .sim-icon {
      border-radius: .3em;
    }
    &.circled .sim-icon {
      border-radius: .75em;
    }
  }
</style>
