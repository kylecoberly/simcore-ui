<template lang="html">
  <article>

    <h2 class="library-section-title">{{ msg }}</h2>

    <demobox :open="true">

        <template slot="intro">
          Normal / Default
        </template>

        <template slot="view">

        </template>

        <template slot="html">
          <pre v-highlightjs><code class="html">&lt;</code></pre>
        </template>

        <template slot="js">
          <pre v-highlightjs><code class="javascript"></code></pre>
        </template>

      </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimIconText from '../../../components/IconText'
  import SimColor from '../../utility/Color'
  
export default {
  name: 'guide-color',
  components: {
    Demobox,
    SimIconText,
    SimColor,
  },
  data() {
    return {
      msg: 'Color',
    }
  },
}
</script>
