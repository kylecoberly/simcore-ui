<template lang="html">
  <article>
      <h2 class="library-section-title">{{ msg }}</h2>
      <p>CSS Rules.</p>
  </article>
</template>

<script>
export default {
  name: 'guide-intro',
  data() {
    return {
      msg: 'Intro',
    }
  },
}
</script>
