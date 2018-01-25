<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox :open="true">
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <p><sim-icontext icon="fa-star" text="Getting Started" /></p>
          <p><sim-icontext icon="fa-star" :text="3" /></p>
          <p><sim-icontext icon="fa-star fa-3x" text="That's Huge" /></p>
        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html">&lt;sim-icontext icon="fa-star" text="Getting Started" /></code></pre>
          <pre v-highlightjs><code class="html">&lt;sim-icontext icon="fa-star" :text="3" /></code></pre>
          <pre v-highlightjs><code class="html">&lt;sim-icontext icon="fa-star fa-3x" text="That's Huge" /></code></pre>
        </template>
      </demobox>

      <demobox :open="true">
        <template slot="intro">
          Circle
        </template>
        <template slot="view">
          <p><sim-icontext icon="fa-star" text="Getting Started" circle /></p>
        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html"><span class="de-emphasize">&lt;sim-icontext icon="fa-star" text="Getting Started"</span> <span class="emphasize">circle</span> <span class="de-emphasize">/></span></code></pre>
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
          <pre v-highlightjs><code class="html"><span class="de-emphasize">&lt;sim-icontext icon="fa-star" text="Getting Started"</span> <span class="emphasize">round</span> <span class="de-emphasize">/></span></code></pre>
        </template>
      </demobox>

      <demobox :open="true">
        <template slot="intro">
          Square
        </template>
        <template slot="view">
          <p><sim-icontext icon="fa-star" text="Getting Started" square /></p>
        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html"><span class="de-emphasize">&lt;sim-icontext icon="fa-star" text="Getting Started"</span> <span class="emphasize">square</span> <span class="de-emphasize">/></span></code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
import Demobox from '../../utility/Demobox'
import SimIcontext from '../../../components/IconText'

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
