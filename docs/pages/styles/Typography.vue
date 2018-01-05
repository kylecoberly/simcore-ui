<template lang="html">
  <article>

    <h2 class="library-section-title">{{ msg }}</h2>

    <demobox :open="true" class="typography-demo">

        <template slot="intro">
          Normal / Default
        </template>

        <template slot="view">          
          <section class="module-section module-section--font-family">
            <h3 class="module-label" id="font-family">Font Family</h3>
            <div class="module module--demo">
              <div class="module--demo--item">
                <p class="h2">Montserrat 300</p>
              </div>
              <div class="module--demo--info">
                <p>AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz</p>
                <p>0123456789</p>
                <p>!@#$%^&amp;*()_+</p>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <p class="h2">Montserrat 500</p>
              </div>
              <div class="module--demo--info">
                <p>AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz</p>
                <p>0123456789</p>
                <p>!@#$%^&amp;*()_+</p>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <p class="h2">Montserrat 700</p>
              </div>
              <div class="module--demo--info">
                <p>AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz</p>
                <p>0123456789</p>
                <p>!@#$%^&amp;*()_+</p>
              </div>
            </div>
          </section>          
          <section class="module-section module-section--headings">
            <h3 class="module-label" id="type-headings">Headings</h3>
            <div class="module module--demo">
              <div class="module--demo--item">
                <h1>Heading h1</h1>
              </div>
              <div class="module--demo--info">
                <p>font-size: 3.25rem</p>
                <p>font-weight: 700</p>
                <p>line-height: 1.4</p>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <h2>Heading h2</h2>
              </div>
              <div class="module--demo--info">
                <p>font-size: 2.5rem</p>
                <p>font-weight: 700</p>
                <p>line-height: 1.4</p>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <h3>Heading h3</h3>
              </div>
              <div class="module--demo--info">
                <p>font-size: 2rem</p>
                <p>font-weight: 700</p>
                <p>line-height: 1.4</p>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <h4>Heading h4</h4>
              </div>
              <div class="module--demo--info">
                <p>font-size: 1.5rem</p>
                <p>font-weight: 500</p>
                <p>line-height: 1.4</p>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <h5>Heading h5</h5>
              </div>
              <div class="module--demo--info">
                <p>font-size: 1.25rem</p>
                <p>font-weight: 500</p>
                <p>line-height: 1.4</p>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <h6>Heading h6</h6>
              </div>
              <div class="module--demo--info">
                <p>font-size: .875rem</p>          
                <p>font-weight: 500</p>
                <p>line-height: 1.4</p>
              </div>
            </div>
          </section>
          <section class="module-section module-section--copy">
            <h3 class="module-label" id="copy">Copy</h3>
            <div class="module module--demo">
              <div class="module--demo--item">
                <p>This is a paragraph. Dignissimos adipisci consequatur architecto fugit perferendis sint assumenda vitae impedit ipsa. Repellendus perferendis in, repellat consectetur similique sunt officiis quasi doloribus autem sint. Impedit earum ullam labore nulla.</p>
              </div>
              <div class="module--demo--info">
                <p>font-size: 1rem</p>          
                <p>font-weight: normal</p>
                <p>line-height: 1.658</p>
              </div>
            </div>
            <div class="module module--demo">
              <div class="module--demo--item">
                <p class="drop-caps">This is a paragraph with drop caps applied. Dignissimos adipisci consequatur architecto fugit perferendis sint assumenda vitae impedit ipsa. Repellendus perferendis in, repellat consectetur similique sunt officiis quasi doloribus autem sint. Impedit earum ullam labore nulla.</p>
              </div>
              <div class="module--demo--info">
                <p>font-size: 1rem</p>          
                <p>font-weight: normal</p>
                <p>line-height: 1.658</p>
              </div>
            </div>
            <p><a href="#0">This is a link</a></p>
            <p><strong>This line is bold</strong>.</p>
            <p><u>This line is underlined</u>.</p>
            <p><em>This is italicized to show emphasis</em>.</p>
            <p>This is a text highlight example. <span class="text-highlight">Look out honey, 'cause I'm using technology!</span> It can make things more readable and suggest the content is of importance to the reader.</p>
          </section>
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
  
export default {
  name: 'guide-typography',
  components: {
    Demobox,
    SimIconText,
  },
  data() {
    return {
      msg: 'Typography',
    }
  },
}
</script>

<style lang="scss">
  @import '../../../styles/typography';
</style>

