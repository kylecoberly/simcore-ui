<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <p><sim-badge :badge="badge">Some text</sim-badge> Some more text</p>
          <input type="text" v-model="example" />
        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html"></code></pre>
        </template>
        <template slot="js">
          <pre><code class="javascript"></code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimBadge from '../../../components/Badge'

  export default {
    name: 'badge-doc',
    components: {
      Demobox,
      SimBadge,
    },
    data() {
      return {
        msg: 'Badge',
        example: 9
      }
    },
    computed: {
      badge() {
        return this.example // common.getRandomInt(0, 100)
      },
    },
  }
</script>

<style lang="scss">
  .sim-badge_content {
    background: rebeccapurple;
  }
</style>
