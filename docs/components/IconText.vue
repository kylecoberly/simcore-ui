<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox :open="true">
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <p><sim-icontext icon="fa-star" text="Getting Started" /></p>
        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html">&lt;sim-icontext icon="fa-star" text="Getting Started" /></code></pre>
        </template>
      </demobox>

      <demobox :open="true">
        <template slot="intro">
          Round
        </template>
        <template slot="view">
          <p><sim-icontext icon="fa-star" text="Getting Started" round /></p>
        </template>
        <template slot="html">
          <pre><code class="html"><span class="de-emphasize">&lt;sim-icontext icon="fa-star" text="Getting Started"</span> <span class="emphasize">round</span> <span class="de-emphasize">/></span></code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
import Demobox from '../utility/Demobox'
import SimIcontext from '../../components/IconText'

export default {
  name: 'icontext-doc',
  components: {
    Demobox,
    SimIcontext,
  },
  data() {
    return {
      msg: 'Icon + Text',
    }
  },
}
</script>
