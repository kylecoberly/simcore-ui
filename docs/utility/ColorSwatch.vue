<template lang="html">
  <div class="color-swatch">
    <span class="color-swatch--example" :class="textColorClass" :style="{'background': hexCode }"></span>
    <span class="color-swatch--name bg--lightest text--dark">
      <b>{{ colorVariable }}</b>
      <small class="ghost">{{ hexCode }}</small>
    </span>
  </div>    
</template>

<script>
  export default {
    name: 'guide-color-swatch',
    props: ['hex-code', 'color-variable'],
    computed: {
      brightness () {
        const r = parseInt(this.hexCode.slice(1, 3), 16)
        const g = parseInt(this.hexCode.slice(3, 5), 16)
        const b = parseInt(this.hexCode.slice(5, 7), 16)
        return (r * 299 + g * 587 + b * 114) / 1000
      },
      textColorClass () {
        return this.brightness > 165 ? 'text--dark' : 'text--light'
      },
    },
    methods: {
      
    }
  }
</script>

<style lang="scss">
  @import '../../docs/assets/sass/color-swatch';
</style>

