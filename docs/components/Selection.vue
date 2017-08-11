<template lang="html">
  <article>
    <h1>{{ msg }}</h1>

    <demobox>
      <template slot="view">
        <p v-for="item in items">
          <sim-selection :item="item" :disabled="item.disabled" :selected-items="selectedItems">
            {{ item.name }}
          </sim-selection>
        </p>
      </template>
      <template slot="js">
        <div class="flex-baseline flex-1-all">
          <pre v-highlightjs><code>items: {{ items }}</code></pre>
          <pre><code>selectedItems: {{ selectedItems }}</code></pre>
        </div>
      </template>
      <template slot="html">
        <pre v-highlightjs><code class="html" v-pre>&lt;p v-for="item in items">
  &lt;sim-selection :item="item" :disabled="item.disabled" :selected-items="selectedItems">
    {{ item.name }}
  &lt;/sim-selection>
&lt;/p></code></pre>
      </template>
    </demobox>

  </article>
</template>

<script>
import Demobox from '../utility/Demobox'
import SimSelection from '../../components/Selection'

export default {
  name: 'selection-doc',
  components: {
    Demobox,
    SimSelection,
  },
  data() {
    return {
      msg: 'Selection',
      items: [
        {
          id: 1,
          name: 'Pepsi',
          disabled: true,
        }, {
          id: 2,
          name: 'Root Beer',
          disabled: false,
        }, {
          id: 3,
          name: 'Coke',
          disabled: false,
        }, {
          id: 4,
          name: 'Sunkist',
          disabled: false,
        },
      ],
      selectedItems: [2, 4],
    }
  },
}
</script>

<style lang="scss">
// experiment
// .demobox .sim-selection input {
//   --checked-icon: var(--icon-cloud-download);
// }
</style>
