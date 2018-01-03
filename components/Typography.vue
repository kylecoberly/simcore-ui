<template lang="html">
  <span>
    {{ type }}
  </span>
</template>

<script>
  export default {
    name: 'sim-type',
    props: ['type']
}
</script>

<style lang="scss">
  @import '../styles/typography';
</style>

