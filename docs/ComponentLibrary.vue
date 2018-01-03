<template lang="html">
  <main class="library library-ui">
    <h1 class="library-page-title">{{ msg }}</h1>
    <hr />
    <transition appear name="slide-left" mode="out-in">
      <router-view name="details" />
    </transition>
  </main>
</template>

<script>
export default {
  name: 'library-ui',
  computed: {
    routes() {
      return this.$router.options.routes
    },
  },
  data() {
    return {
      msg: 'Components',
      menu: [],
    }
  },
  mounted() {
    this.menu = {
      label: 'Home',
      children: this.routes.map((route) => route),
    }
  },
}
</script>
