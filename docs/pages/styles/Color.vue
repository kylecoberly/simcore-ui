<template lang="html">
  <article>

    <h2 class="library-section-title">{{ msg }}</h2>

    <demobox :open="true">

        <template slot="intro">
          Normal / Default
        </template>

        <template slot="view">  
          <section class="module-section module-section--base-colors">
            <span id="base-colors"></span>
            <h3 class="module-label">Base Colors</h3>
            <div class="module module--demo module--demo--colors">
              <div class="module--demo--item">
                <ColorSwatch :hexCode="darkestHex" :color-variable="darkest"></ColorSwatch>
              </div>


              <div class="module--demo--item">
                <div class="color-swatch bg--darkest text--light">                  
                  <ColorSwatch :hexCode="darkestHex"></ColorSwatch>
                  <ColorSwatchLabel :color="darkest"></ColorSwatchLabel>
                </div>
              </div>
              <div class="module--demo--item">
                <div class="color-swatch bg--darker text--light">
                  <ColorSwatch :hexCode="darkerHex"></ColorSwatch>
                  <ColorSwatchLabel :color="darker"></ColorSwatchLabel>
                </div>
              </div>
              <div class="module--demo--item">
                <div class="color-swatch bg--dark text--light">
                  <ColorSwatch :hexCode="darkHex"></ColorSwatch>
                  <ColorSwatchLabel :color="dark"></ColorSwatchLabel>
                </div>
              </div>
              <div class="module--demo--item">
                <div class="color-swatch bg--dark-grey text--light">
                   <ColorSwatch :hexCode="darkGreyHex"></ColorSwatch>
                  <ColorSwatchLabel :color="darkGrey"></ColorSwatchLabel>
                </div>
              </div>
              <div class="module--demo--item">
                <div class="color-swatch bg--grey text--light">
                  <ColorSwatch :hexCode="greyHex"></ColorSwatch>
                  <ColorSwatchLabel :color="grey"></ColorSwatchLabel>
                </div>
              </div>
              <div class="module--demo--item">
                <div class="color-swatch bg--medium-grey text--light">
                  <ColorSwatch :hexCode="mediumGreyHex"></ColorSwatch>
                  <ColorSwatchLabel :color="mediumGrey"></ColorSwatchLabel>
                </div>
              </div>
              <div class="module--demo--item">
                <div class="color-swatch bg--light-grey">
                  <ColorSwatch :hexCode="lightGreyHex"></ColorSwatch>
                  <ColorSwatchLabel :color="lightGrey"></ColorSwatchLabel>
                </div>
              </div>
              <div class="module--demo--item">
                <div class="color-swatch bg--lighter-grey">                  
                  <ColorSwatch :hexCode="lighterGreyHex"></ColorSwatch>
                  <ColorSwatchLabel :color="lighterGrey"></ColorSwatchLabel>
                </div>
              </div>
              <div class="module--demo--item">
                <div class="color-swatch bg--light">                  
                  <ColorSwatch :hexCode="lightHex"></ColorSwatch>
                  <ColorSwatchLabel :color="light"></ColorSwatchLabel>
                </div>
              </div>
              <div class="module--demo--item">
                <div class="color-swatch bg--lighter">
                  <ColorSwatch :hexCode="lighterHex"></ColorSwatch>
                  <ColorSwatchLabel :color="lighter"></ColorSwatchLabel>
                </div>
              </div>
              <div class="module--demo--item">
                <div class="color-swatch bg--lightest">
                  <ColorSwatch :hexCode="lightestHex"></ColorSwatch>
                  <ColorSwatchLabel :color="lightest"></ColorSwatchLabel>
                </div>
              </div>
            </div>
          </section>
          <section class="module-section module-section--brand-colors">
            <span id="brand-colors"></span>
            <h3 class="module-label">Brand Colors</h3>
            <div class="module module--demo module--demo--colors">
              <div class="module--demo--item">
                <div class="color-swatch bg--blue text--light">
                  <ColorSwatch :hexCode="blueHex"></ColorSwatch>
                  <ColorSwatchLabel :color="blue"></ColorSwatchLabel>
                </div>
              </div>
              <div class="module--demo--item">
                <div class="color-swatch bg--blue-film text--light">
                  <ColorSwatch :hexCode="blueFilmHex"></ColorSwatch>
                  <ColorSwatchLabel :color="blueFilm"></ColorSwatchLabel>
                </div>
              </div>
              <div class="module--demo--item">
                <div class="color-swatch bg--blue-film-heavy text--light">
                  <ColorSwatch :hexCode="blueFilmHeavyHex"></ColorSwatch>
                  <ColorSwatchLabel :color="blueFilmHeavy"></ColorSwatchLabel>
                </div>
              </div>
            </div>
          </section>
          <section class="module-section module-section--brand-colors">
            <div class="module module--demo module--demo--colors">
              <div class="module--demo--item">
                <div class="color-swatch bg--red text--light">
                  <ColorSwatch :hexCode="redHex"></ColorSwatch>
                  <ColorSwatchLabel :color="red"></ColorSwatchLabel>
                </div>
              </div>
              <div class="module--demo--item">
                <div class="color-swatch bg--red-film text--light">
                  <ColorSwatch :hexCode="redFilmHex"></ColorSwatch>
                  <ColorSwatchLabel :color="redFilm"></ColorSwatchLabel>
                </div>
              </div>
              <div class="module--demo--item">
                <div class="color-swatch bg--orange text--light">
                  <ColorSwatch :hexCode="orangeHex"></ColorSwatch>
                  <ColorSwatchLabel :color="orange"></ColorSwatchLabel>
                </div>
              </div>
            </div>
          </section>
        </template>

        <!-- <template slot="scss">
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

    // state
    --action: var(--blue);
    --active: var(--blue-film-heavy);
    --focus: var(--aqua);

    // feedback
    --success: var(--green);
    --danger: var(--red);
    --warning: var(--orange);
    --alert: var(--yellow);
    --royal: var(--purple);

    // accents
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
        </template> -->

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

      darkest: 'var(--darkest)',
      darkestHex: '#ababab',
      darker: 'var(--darker)',
      darkerHex: '#222',
      dark: 'var(--dark)',
      darkHex: '#333',
      darkGrey: 'var(--dark-grey)',
      darkGreyHex: '#444',
      grey: 'var(--grey)',
      greyHex: '#565656',
      mediumGrey: 'var(--medium-grey)',
      mediumGreyHex: '#777',
      lightGrey: 'var(--light-grey)',
      lightGreyHex: '#CCC',
      lighterGrey: 'var(--lighter-grey)',
      lighterGreyHex: '#DDD',
      light: 'var(--light)',
      lightHex: '#EEE',
      lighter: 'var(--lighter)',
      lighterHex: '#FAFAFA',
      lightest: 'var(--lightest)',
      lightestHex: '#FFF',

      blue: 'var(--blue)',
      blueHex: '#4A93B9',
      blueFilm: 'var(--blue-film)',
      blueFilmHex: 'rgba(#4A93B9, .5)',
      blueFilmHeavy: 'var(--blue-film-heavy)',
      blueFilmHeavyHex: 'rgba(#0E6796, .9)',
      red: 'var(--red)',
      redHex: '#CA1E34',
      redFilm: 'var(--red)',
      redFilmHex: 'rgba(#CA1E34, .5)',
      orange: 'var(--orange)',
      orangeHex: '#FF7042',
      orangeFilm: 'var(--orange-film)',
      ornageFilmHex: 'rgba(#FF7042, .5)',

    }
  },
}
</script>
