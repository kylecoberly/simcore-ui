<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox :open="true">
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <p>
            Never give up
            <sim-tooltip pop="up">
              <span slot="text">It always seems impossible until it's done.</span>
            </sim-tooltip>
          </p>
          <p>
            Never surrender
            <sim-tooltip pop="down">
              <span slot="text">When something really matters, you should never give up or give in.</span>
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
