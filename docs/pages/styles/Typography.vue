<template lang="html">
  <article>

    <h2 class="library-section-title">{{ msg }}</h2>

    <demobox :open="true">

        <template slot="intro">
          Normal / Default
        </template>

        <template slot="view">
          <p class="library-label">Typeface</p>
          <div class="h3 fw300 mb-sm">Montserrat 300</div>
          <div class="h3 fw500 mb-sm">Montserrat 500</div>
          <div class="h3 fw700 mb-sm">Montserrat 700</div>
          <p class="library-label">Headlines</p>
          <h1><sim-type :type="h1"></sim-type><div class="demo-info"><p>font-size: 3.25rem</p>
          <p>font-weight: 700</p><p>line-height: 1.1</p></div></h1>
          <h2><sim-type :type="h2"></sim-type><div class="demo-info"><p>font-size: 2.5rem</p>
          <p>font-weight: 700</p><p>line-height: 1.4</p></div></h2>
          <h3><sim-type :type="h3"></sim-type><div class="demo-info"><p>font-size: 2rem</p>
          <p>font-weight: 700</p><p>line-height: 1.4</p></div></h3>
          <h4><sim-type :type="h4"></sim-type><div class="demo-info"><p>font-size: 1.5rem</p>
          <p>font-weight: 500</p><p>line-height: 1.4</p></div></h4>
          <h5><sim-type :type="h5"></sim-type><div class="demo-info"><p>font-size: 1.25rem</p>
          <p>font-weight: 500</p><p>line-height: 1.4</p></div></h5>
          <h6><sim-type :type="h6"></sim-type><div class="demo-info"><p>font-size: .875rem</p>
          <p>font-weight: 500</p><p>line-height: 1.4</p></div></h6>
          <p class="library-label">Text</p>
          <p>This is a paragraph. Consectetur adipisicing elit <strong>this is emphasized</strong>. Laboriosam enim saepe a, vitae rerum sapiente velit, <a href="#">this is a link</a> incidunt at eligendi illo blanditiis quasi. Amet sint eveniet alias quasi <u>this is underlined</u> nulla ad optio, quod necessitatibus numquam pariatur eaque, vitae <em>this is italicized</em> illum illo molestiae qui corrupti eum tenetur voluptas. Ex voluptate velit dolor eligendi.</p>
          <p>Veritatis ad ea sint cum facilis, laborum quo ex impedit. <span class="text-highlight">Laborum sint velit dolores provident obcaecati doloribus natus officiis, repellendus aliquid nobis</span>, eum aperiam fugiat in incidunt itaque. Illo perferendis qui maxime exercitationem, dolore iusto. Odio ex nobis totam cupiditate adipisci, voluptas iusto maxime quas, eaque omnis enim temporibus.</p>
        </template>

        <template slot="html">
          <pre v-highlightjs><code class="html">&lt;h1>Headline h1&lt;/h1>
&lt;h2>Headline h2&lt;/h2>
&lt;h3>Headline h3&lt;/h3></code></pre>
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
  import SimType from '../../../components/Typography'
  
export default {
  name: 'guide-typography',
  components: {
    Demobox,
    SimIconText,
    SimType,
  },
  data() {
    return {
      msg: 'Typography',
      h1: 'Headline h1',
      h2: 'Headline h2',
      h3: 'Headline h3',
      h4: 'Headline h4',
      h5: 'Headline h5',
      h6: 'Headline h6',
    }
  },
}
</script>

