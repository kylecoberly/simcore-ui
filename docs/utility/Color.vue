<template lang="html">
  <div>{{ color }}</div>
</template>

<script>
  export default {
    name: 'sim-color',
    props: ['color']
}
</script>

<style lang="scss">
  @import '../../docs/assets/sass/color';
</style>

