<template lang="html">
  <span class="sim-icontext" :class="{ round: round }">
    <span v-if="icon" class="fa" :class="icon"></span>
    <span v-if="text">{{ text }}</span>
  </span>
</template>

<script>
  export default {
    name: 'sim-icontext',
    props: {
      icon: String,
      text: [Number, String],
      round: Boolean,
    },
  }
</script>

<style lang="scss">
  .sim-icontext {
    display: inline-flex;
    align-items: baseline;
    * + span {
      margin-left: .5em;
    }
    .fa {
      flex: 0 0 auto;
    }
    &.round .fa {
      width: 1.5em;
      height: 1.5em;
      margin: -0.75em 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 0 .125em;
      border-radius: 50%;
    }
  }
</style>
