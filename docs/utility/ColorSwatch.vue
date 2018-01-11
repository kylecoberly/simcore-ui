<template lang="html">
  <div class="color-swatch">
    <span class="color-swatch--example" :class="setTextColorClass()" :style="{'background': hexCode }">&nbsp;</span>
    <span class="color-swatch--name bg--lightest text--dark">
      <b>{{ colorVariable }}</b><br/>
      <small class="ghost">{{ hexCode }}</small>
    </span>
  </div>    
</template>

<script>
  export default {
    name: 'guide-color-swatch',
    props: ['hex-code', 'color-variable'],
    methods: {
      determineBrightness (hex) {
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return (r * 299 + g * 587 + b * 114) / 1000
      },
      setTextColorClass () {
        return this.determineBrightness(this.hexCode) > 165 ? 'text--dark' : 'text--light'
      },
      setClasses () {
        let classes = []
        classes.push(this.setTextColorClass())
        return classes.join(' ')
      }
    }
  }
</script>

<style lang="scss">
  @import '../../docs/assets/sass/color-swatch';
</style>

