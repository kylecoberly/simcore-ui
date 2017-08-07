<template lang="html">
  <div class="sim-datalist">
    <header>
      <slot name="header"></slot>
    </header>
    <transition-group appear name="list" tag="ul" mode="in-out">
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
  .sim-datalist {
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    li {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      transition: all var(--ms, var(--default-ms)) cubic-bezier(1,.02,0,1.05), background 0ms;
      transition-delay: calc(var(--delay, 0) * 15ms);
    }
  }
</style>
