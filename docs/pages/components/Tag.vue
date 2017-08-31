<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <p>Tag component</p>
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
  import SimTag from '../../../components/Tag'

  export default {
    name: 'tag-doc',
    components: {
      Demobox,
      SimTag,
    },
    data() {
      return {
        msg: 'Tag',
      }
    },
    computed: {
    },
  }
</script>
