<template lang="html">
  <article>

    <h2 class="library-section-title">{{ msg }}</h2>

    <demobox :open="true" class="typeface--demo">

        <template slot="intro">
          Normal / Default
        </template>

        <template slot="view">          
          <div class="library-module typeface--intro">
            <p class="library-label">Typeface</p>
            <h2>Montserrat 300</h2>
            <h2>Montserrat 500</h2>
            <h2>Montserrat 700</h2>
          </div>          
          <div class="library-module typeface--headlines">
            <p class="library-label">Headlines</p>
            <h1>
              <SimType :type="h1"></SimType>
              <span class="demo-info">
                <p>font-size: 3.25rem</p>
                <p>font-weight: 700</p>
                <p>line-height: 1.1</p>
              </span>
            </h1>
            <h2>
              <SimType :type="h2"></SimType>
              <span class="demo-info">
                <p>font-size: 2.5rem</p>
                <p>font-weight: 700</p>
                <p>line-height: 1.4</p>
              </span>
            </h2>
            <h3>
              <SimType :type="h3"></SimType>
              <span class="demo-info">
                <p>font-size: 2rem</p>
                <p>font-weight: 700</p>
                <p>line-height: 1.4</p>
              </span>
            </h3>
            <h4>
              <SimType :type="h4"></SimType>
              <span class="demo-info">
                <p>font-size: 1.5rem</p>
                <p>font-weight: 500</p>
                <p>line-height: 1.4</p>
              </span>
            </h4>
            <h5>
              <SimType :type="h5"></SimType>
              <span class="demo-info">
                <p>font-size: 1.25rem</p>
                <p>font-weight: 500</p>
                <p>line-height: 1.4</p>
              </span>
            </h5>
            <h6>
              <SimType :type="h6"></SimType>
              <span class="demo-info">
                <p>font-size: .875rem</p>          
                <p>font-weight: 500</p>
                <p>line-height: 1.4</p>
              </span>
            </h6>
          </div>
          <div class="library-module typeface-text">
            <p class="library-label">Text</p>
            <p>This is a paragraph. Dignissimos adipisci consequatur architecto fugit perferendis sint assumenda vitae impedit ipsa. Repellendus perferendis in, repellat consectetur similique sunt officiis quasi doloribus autem sint. Impedit earum ullam labore nulla.</p>
            <p><a href="#0">This is a link</a></p>
            <p><strong>This line is bold</strong>.</p>
            <p><u>This line is underlined</u>.</p>
            <p><em>This is italicized to show emphasis</em>.</p>
            <p>This is a text highlight example. <span class="text-highlight">Look out honey, 'cause I'm using technology!</span> It can make things more readable and suggest the content is of importance to the reader.</p>
          </div>
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
  import SimType from '../../utility/Typography'
  
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

