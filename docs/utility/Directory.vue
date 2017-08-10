<template lang="html">
  <li v-if="model.name">
    <router-link :to="{name: model.name}"><sim-icontext :icon="model.icon" :text="model.label" /></router-link>
    <ul v-if="hasChildren">
      <directory v-for="(model, index) in model.children" :key="index" :model="model" />
    </ul>
  </li>
  <section v-else-if="model.label">
    <header><sim-icontext :icon="model.icon" :text="model.label" /></header>
    <ul v-if="hasChildren">
      <directory v-for="(model, index) in model.children" :key="index" :model="model" />
    </ul>
  </section>
  <ul v-else-if="hasChildren" class="app-menu">
    <directory v-for="(model, index) in model.children" :key="index" :model="model" />
  </ul>
</template>

<script>
import SimIcontext from 'sim-ui-components/IconText.vue'

export default {
  name: 'directory',
  components: {
    SimIcontext,
  },
  props: ['model'],
  mounted() {
    // console.log(this.model.label, this.model)
  },
  computed: {
    hasChildren() {
      return (this.model.children && this.model.children.length)
    },
  },
}
</script>

<style lang="scss">
.app-menu {
  ul {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      padding: .5em 0;
    }
  }
  a {
    color: var(--action);
    &.router-link-exact-active {
      color: var(--shade);
    }
  }
  header {
    padding: .5em 1em;
    background: var(--cloud);
    margin: 0 -1em;
  }
  section li {
    padding: .5em 0 .5em 1.8em;
  }
}
</style>
