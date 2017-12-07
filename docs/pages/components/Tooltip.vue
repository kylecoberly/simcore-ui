<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox :open="true">
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <p>
            Never gonna give you up
            <sim-tooltip pop="up">
              <span slot="text">Never gonna let you down</span>
            </sim-tooltip>
          </p>
          <p>
            Never gonna make you cry
            <sim-tooltip pop="down">
              <span slot="text">Never gonna say goodbye</span>
            </sim-tooltip>
          </p>
        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html">&lt;sim-icontext icon="fa-star" text="Getting Started" /></code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
import Demobox from '../../utility/Demobox'
import SimTooltip from '../../../components/Tooltip'

export default {
  name: 'icontext-doc',
  components: {
    Demobox,
    SimTooltip,
  },
  data() {
    return {
      msg: 'Tooltip',
    }
  },
}
</script>
