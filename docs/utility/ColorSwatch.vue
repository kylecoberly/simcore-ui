<template lang="html">
  <span class="swatch">{{ hexCode }}</span>    
</template>

<script>
  export default {
    name: 'guide-color-swatch',
    props: ['hexCode']
}
</script>

<style lang="scss">
  @import '../../docs/assets/sass/color';
</style>

