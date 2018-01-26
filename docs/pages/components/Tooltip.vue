<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <p>
            Never give up
            <SimTooltip pop="up">
              <span slot="text">
                It always seems impossible until it's done.
              </span>
            </SimTooltip>
          </p>
          <p>
            Never surrender
            <SimTooltip pop="down">
              <span slot="text">When something really matters, you should never give up or give in.</span>
            </SimTooltip>
          </p>
        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html">&lt;SimTooltip pop="up">
    &lt;span slot="text">It always seems impossible until it's done.&lt;/span>
  &lt;/SimTooltip>

  &lt;SimTooltip pop="down">
    &lt;span slot="text">When something really matters, you should never give up or give in.&lt;/span>
  &lt;/SimTooltip></code></pre>
        </template>
        <template slot="js">
          <pre v-highlightjs><code class="javascript">props: {
  pop: {
    type: String,
    default: 'up',
  },
  shift: {
    type: String,
    default: 'none',
  },
},
computed: {
  popTo() {
    return `sim-tooltip__bubble--${this.pop}`
  },
},</code></pre>
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
