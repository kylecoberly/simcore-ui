<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <sim-autocomplete :options="options" name="film" placeholder="find a movie..." @select="onSelect">
            <template slot="item" scope="props">
              <article class="media">
                <p>
                  <strong>{{ props.option.name }}</strong>
                  <br> {{ props.option.description }}
                </p>
              </article>
            </template>
          </sim-autocomplete>
          <br />
          <p>
            Data
            <pre><code class="javascript">selectedOption = {{ selectedOption }}</code></pre>
          </p>
        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html" v-pre>&lt;sim-autocomplete :options="options" name="film" placeholder="find a movie..." @select="onSelect">
  &lt;template slot="item" scope="props">
    &lt;article class="media">
      &lt;p>
        &lt;strong>{{ props.option.name }}&lt;/strong>
        &lt;br> {{ props.option.description }}
      &lt;/p>
    &lt;/article>
  &lt;/template>
&lt;/sim-autocomplete></code></pre>
        </template>
        <template slot="js">
          <pre v-highlightjs><code class="javascript">options = [
  {
    name: 'Arrival',
    description: 'lorem ipsum dolor amet.'
  }, {
    name: 'Happy Gilmore',
    description: 'lorem ipsum dolor amet.'
  }, {
    name: 'Ip Man 2',
    description: 'lorem ipsum dolor amet.'
  }, {
    name: 'Spider-Man Homecoming',
    description: 'lorem ipsum dolor amet.'
  }
]</code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
import Demobox from '../../utility/Demobox'
import SimAutocomplete from '../../../components/Autocomplete'

export default {
  name: 'autocomplete-doc',
  components: {
    Demobox,
    SimAutocomplete,
  },
  data() {
    return {
      msg: 'Autocomplete',
      name: 'film',
      selectedOption: {},
      options: [
        {
          name: 'Arrival',
          description: 'lorem ipsum dolor amet.',
        }, {
          name: 'Happy Gilmore',
          description: 'lorem ipsum dolor amet.',
        }, {
          name: 'Ip Man 2',
          description: 'lorem ipsum dolor amet.',
        }, {
          name: 'Spider-Man Homecoming',
          description: 'lorem ipsum dolor amet.',
        },
      ],
    }
  },
  methods: {
    onSelect(option) {
      this.selectedOption = option
    },
  },
}
</script>
