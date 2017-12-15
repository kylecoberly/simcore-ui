<template lang="html">
  <header v-if="title || subtitle" class="sim-slide--header">
    <h2 v-if="title" class="sim-slide--title">{{ title }}</h2>
    <div v-if="subtitle" class="sim-slide--subtitle">{{ subtitle }}</div>
  </header>
</template>

<script>
  export default {
    props: ['title', 'subtitle'],
  }
</script>
