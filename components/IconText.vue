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
  @import '../styles/icontext';
</style>
