<template lang="html">
  <article>

    <h2 class="library-section-title">{{ msg }}</h2>

    <demobox :open="true">

        <template slot="intro">
          Normal / Default
        </template>

        <template slot="view">
          <section class="module-section module-section--">
            <h3 class="module-label" id=""></h3>
            <div class="module module--demo">
              <div class="module--demo--item">

              </div>
              <div class="module--demo--info">
                <p>label: value</p>
                <p>label: value</p>
                <p>label: value</p>
              </div>
            </div>
          </section>
        </template>

        <template slot="html">
          <pre v-highlightjs><code class="html">&lt;</code></pre>
        </template>

        <template slot="js">
          <pre v-highlightjs><code class="javascript"></code></pre>
        </template>

      </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimIconText from '../../../components/IconText'
  import SimColor from '../../utility/Color'
  
export default {
  name: 'guide-color',
  components: {
    Demobox,
    SimIconText,
    SimColor,
  },
  data() {
    return {
      msg: 'Color',
    }
  },
}
</script>
