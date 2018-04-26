<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <SimAutofinder placeholder="Anyone Available"
                         :tabIndex="index"
                         :item="item"
                         :index="index"
                         :is-alone="(activeCount === 1)"
                         :options="inactiveItems"
                         @select="addItemToActiveList"
                         @clear="clearItemFromActiveList"
                         @remove="removeFromActiveList"
                         @add-another="addSlotToActiveList"
          >
            <template slot="option" slot-scope="props">
              {{ props.option.lastname }}, {{ props.option.firstname }}
            </template>
          </SimAutofinder>
          <br />
          <p>
            Data
            <pre><code class="javascript">activeItems = {{ activeItems }}</code></pre>
          </p>
        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html" v-pre>&lt;SimAutofinder placeholder="Anyone Available"
  :tabIndex="index"
  :item="item"
  :index="index"
  :is-alone="(activeCount === 1)"
  :options="inactiveItems"
  @select="addItemToActiveList"
  @clear="clearItemFromActiveList"
  @remove="removeFromActiveList"
  @add-another="addSlotToActiveList"
&gt;
  &lt;template slot="option" slot-scope="props"&gt;
    {{ props.option.lastname }}, {{ props.option.firstname }}
  &lt;/template&gt;
&lt;/SimAutofinder&gt;</code></pre>
        </template>
        <template slot="js">
          <pre v-highlightjs><code class="javascript">inactiveItems = [
  {
    firstname: '',
    lastname: '',
  }, {
    firstname: '',
    lastname: '',
  }, {
    firstname: '',
    lastname: '',
  }, {
    firstname: '',
    lastname: '',
  },
]</code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
import Demobox from '../../utility/Demobox'
import SimAutofinder from '../../../components/Autofinder'

export default {
  name: 'autofinder-doc',
  components: {
    Demobox,
    SimAutofinder,
  },
  data() {
    return {
      msg: 'Autofinder',
      name: 'people',

      index: 0,
      item: {},
      activeCount: 0,
      activeItems: [],
      inactiveItems: [
        {
          firstname: '',
          lastname: '',
        }, {
          firstname: '',
          lastname: '',
        }, {
          firstname: '',
          lastname: '',
        }, {
          firstname: '',
          lastname: '',
        },
      ],
    }
  },
  methods: {
    addItemToActiveList () {

    },
    clearItemFromActiveList () {

    },
    removeFromActiveList () {

    },
    addSlotToActiveList () {

    },
  },
}
</script>
