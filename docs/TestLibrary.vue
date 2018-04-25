<template lang="html">
  <main class="library library-gui">
    <h1>{{ msg }}</h1>
    <hr />
    <transition appear name="slide-left" mode="out-in">
      <router-view name="details" />
    </transition>
  </main>
</template>

<script>
  export default {
    name: 'library-gui',
    data() {
      return {
        msg: 'Test Library',
      }
    },
  }
</script>
