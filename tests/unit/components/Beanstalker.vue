<template lang="html">
  <article style="flex: 1">
    <h2>{{ title }}</h2>

    <demobox>
      <template slot="intro">
        Normal / Default
      </template>
      <template slot="view">

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
  import beans from '../../../test/beanstalk/beans'

  import Demobox from '../../../docs/utility/Demobox'

  export default {
    components: {
      Demobox,
    },
    data() {
      return {
        title: 'Tests',
      }
    },
    mounted() {
      beans.run()
    },
  }
</script>
