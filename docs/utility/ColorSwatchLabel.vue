<template lang="html">
  <span class="swatch-label">{{ color }}</span>
</template>

<script>
  export default {
    name: 'guide-color-label',
    props: ['color']
}
</script>

<style lang="scss">
  @import '../../docs/assets/sass/color';
</style>

