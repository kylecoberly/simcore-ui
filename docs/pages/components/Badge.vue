<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <p><SimBadge :badge="badge">Some text</SimBadge> Some more text</p>
          <input type="text" v-model="example" />
        </template>
        <template slot="html">
<pre v-highlightjs><code class="html" v-pre>&lt;span class="sim-badge">
  &lt;span class="sim-badge__text">&lt;slot>&lt;/slot>&lt;/span>
  &lt;transition name="sim-badge" appear v-if="badge">
    &lt;span class="sim-badge__content">{{ badge }}&lt;/span>
  &lt;/transition>
&lt;/span></code></pre>
        </template>
        <template slot="js"><pre v-highlightjs><code class="javascript">data() {
  return {
    example: 9
  }
},
computed: {
  badge() {
    return this.example
  },
},</code></pre>
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
