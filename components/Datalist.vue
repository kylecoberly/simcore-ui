<template lang="html">
  <div class="sim-datalist">
    <header>
      <slot name="header"></slot>
    </header>
    <transition-group v-if="animate" name="sim-datalist" tag="ul" mode="out-in">
        <slot name="static-before"></slot>
        <slot name="item" v-for="(item, index) in items" :item="item" :index="index"></slot>
        <slot name="static-after"></slot>
    </transition-group>
    <ul v-else>
        <slot name="static-before"></slot>
        <slot name="item" v-for="(item, index) in items" :item="item" :index="index"></slot>
        <slot name="static-after"></slot>
    </ul>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'sim-datalist',
    props: ['items','animate'],
  }
</script>

<style lang="scss">
  @import '../styles/datalist';
</style>
