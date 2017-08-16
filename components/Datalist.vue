<template lang="html">
  <div class="sim-datalist">
    <header>
      <slot name="header"></slot>
    </header>
    <transition-group appear name="sim-datalist" tag="ul" mode="in-out">
      <slot name="static-before"></slot>
      <slot name="item" v-for="(item, index) in items" :item="item" :index="index"></slot>
      <slot name="static-after"></slot>
    </transition-group>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'sim-datalist',
    props: ['items'],
  }
</script>

<style lang="scss">
  @import '../styles/datalist';
</style>
