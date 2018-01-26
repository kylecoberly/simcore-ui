<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <div v-if="tagVisible">
            <SimTag>

            </SimTag>
          </div>
        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html">
&lt;SimTag>&lt;/SimTag></code></pre>
        </template>
        <template slot="js">
          <pre><code class="javascript"></code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimTag from '../../../components/Tag'

  export default {
    name: 'tag-doc',
    components: {
      Demobox,
      SimTag,
    },
    data() {
      return {
        msg: 'Tag',
        tagVisible: true,
        icon: 'fa-bars',
        text: 'Vuejs',
      }
    },
    computed: {
      tagIcon () {
        return this.icon
      },
      tagText () {
        return this.text
      },
    }
  }
</script>
