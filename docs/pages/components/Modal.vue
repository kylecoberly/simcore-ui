<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <p>Modal component</p>
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
  import SimModal from '../../../components/Modal'

  export default {
    name: 'modal-doc',
    components: {
      Demobox,
      SimModal,
    },
    data() {
      return {
        msg: 'Modal',
      }
    },
    computed: {
    },
  }
</script>
