<template lang="html">
  <article>
    <h2>{{ title }}</h2>

    <demobox>
      <template slot="intro">
        Normal / Default
      </template>
      <template slot="view">

        <FilterSet></FilterSet>

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
import FilterSet from '../../../components/Filters/FilterSet'

export default {
  name: 'filterset-doc',
  components: {
    Demobox,
    FilterSet,
  },
  data() {
    return {
      title: 'FilterSet',
    }
  },
}
</script>
