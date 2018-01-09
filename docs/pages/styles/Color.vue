<template lang="html">
  <article>

    <h2 class="library-section-title">{{ msg }}</h2>

    <demobox :open="true">

        <template slot="intro">
          Normal / Default
        </template>

        <template slot="view">
          <section class="module-section module-section--brand-colors">
            <span id="brand-colors"></span>
            <h3 class="module-label">Brand Colors</h3>
            <div class="module module--demo module--demo--colors">
              <div class="module--demo--item">
                <div class="color-swatch color-swatch--light" style="background: var(--blue);">
                  <ColorSwatchLabel :color="blue"></ColorSwatchLabel>
                  <ColorSwatch :hexCode="blueHex"></ColorSwatch>
                </div>
              </div>
              <div class="module--demo--item">
                <div class="color-swatch color-swatch--light" style="background: var(--red);">
                  <ColorSwatchLabel :color="red"></ColorSwatchLabel>
                  <ColorSwatch :hexCode="redHex"></ColorSwatch>
                </div>
              </div>
              <div class="module--demo--item">
                <div class="color-swatch" style="background: var(--light);">
                  <ColorSwatchLabel :color="light"></ColorSwatchLabel>
                  <ColorSwatch :hexCode="lightHex"></ColorSwatch>
                </div>
              </div>
              <!-- <div class="module--demo--info" pre-label="scss">
                <pre v-highlightjs><code class="html">var(--blue);</code></pre>
              </div> -->
            </div>
          </section>
        </template>

        <template slot="scss">
<pre v-highlightjs><code class="scss">
  :root {
    --darkest: #000;
    --darker: #222;
    --dark: #333;
    --dark-grey: #444;
    --grey: #565656;
    --medium-grey: #777;
    --light-grey: #ccc;
    --lighter-grey: #ddd;
    --light: #eee;
    --lighter: #fafafa;
    --lightest: #fff;

    // colors
    --red: #ca1e34;
    --red-film: rgba(#ca1e34, .5);
    --orange: #ff7042;
    --orange-film: rgba(#ff7042, .5);
    --yellow: #ffc929;
    --yellow-film: rgba(#ffc929, .5);
    --green: #9ccc66;
    --green-film: rgba(#9ccc66, .5);
    --aqua: #00c1d9;
    --aqua-film: rgba(#00c1d9, .5);
    --blue: #4A93B9;
    --blue-film: rgba(#4A93B9, .5);
    --blue-film-heavy: rgba(14, 103, 150, .9);
    --purple: #ab47bd;
    --purple-film: rgba(#ab47bd, .5);
    --accent: var(--medium-grey);
    --action: var(--blue);
    --active: var(--blue-film-heavy);
    --focus: var(--aqua);
    --success: var(--green);
    --danger: var(--red);
    --warnign: var(--orange);
    --alert: var(--yellow);
    --royal: var(--purple);

    --shadow: rgba(#000, .8);
    --twilight: rgba(#000, .5);
    --dusk: rgba(#000, .3);
    --shade: rgba(#000, .05);
    --dust: rgba(#777, .05);
    --edge: rgba(#777, .15);
    --line: rgba(#777, .5);
    --ghost: rgba(#808080, .5); // middle grey, middle opacity
    --mist: rgba(#fff, .2);
    --fog: rgba(#fff, .5);
    --frost: rgba(#fff, .8);
  }
</code></pre>
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
  import ColorSwatchLabel from '../../utility/ColorSwatchLabel'
  import ColorSwatch from '../../utility/ColorSwatch'
  
export default {
  name: 'guide-color',
  components: {
    Demobox,
    SimIconText,
    ColorSwatchLabel,
    ColorSwatch,
  },
  data() {
    return {
      msg: 'Color',
      blue: 'var(--blue)',
      blueHex: '#4A93B9',
      red: 'var(--red)',
      redHex: '#CA1E34',
      light: 'var(--light)',
      lightHex: '#EEE',
    }
  },
}
</script>
