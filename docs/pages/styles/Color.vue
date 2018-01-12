<template lang="html">
  <article>

    <h2 class="library-section-title">{{ msg }}</h2>

    <demobox :open="true">

        <template slot="intro">
          Normal / Default
        </template>

        <template slot="view">  
          <section class="module-section module-section--base-colors">
            <h3 id="base-colors" class="module-label">Base Colors</h3>
            <div class="module module--demo module--demo--colors">
              <div class="module--demo--item">
                <ColorSwatch :hexCode="darkestHex" :color-variable="darkest"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="darkerHex" :color-variable="darker"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="darkHex" :color-variable="dark"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="darkGreyHex" :color-variable="darkGrey"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="greyHex" :color-variable="grey"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="mediumGreyHex" :color-variable="mediumGrey"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="lightGreyHex" :color-variable="lightGrey"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="lighterGreyHex" :color-variable="lighterGrey"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="lightHex" :color-variable="light"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="lighterHex" :color-variable="lighter"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="lightestHex" :color-variable="lightest" class="bg--lightest"></ColorSwatch>
              </div>
            </div>
          </section>
          <section class="module-section module-section--brand-colors">
            <h3 class="module-label">Brand Colors</h3>
            <div class="module module--demo module--demo--colors">
              <div class="module--demo--item">
                <ColorSwatch :hexCode="blueHex" :color-variable="blue"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="blueFilmHex" :color-variable="blueFilm" :opacity="blueFilmHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="blueFilmHeavyHex" :color-variable="blueFilmHeavy" :opacity="blueFilmHeavyHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="redHex" :color-variable="red"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="redFilmHex" :color-variable="redFilm"  :opacity="redFilmHexAlpha"></ColorSwatch>
              </div>              
              <div class="module--demo--item">
                <ColorSwatch :hexCode="orangeHex" :color-variable="orange"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="orangeFilmHex" :color-variable="orangeFilm"  :opacity="orangeFilmHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="yellowHex" :color-variable="yellow"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="yellowFilmHex" :color-variable="yellowFilm"  :opacity="yellowFilmHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="greenHex" :color-variable="green"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="greenFilmHex" :color-variable="greenFilm"  :opacity="greenFilmHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="aquaHex" :color-variable="aqua"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="aquaFilmHex" :color-variable="aquaFilm"  :opacity="aquaFilmHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="purpleHex" :color-variable="purple"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="purpleFilmHex" :color-variable="purpleFilm"  :opacity="purpleFilmHexAlpha"></ColorSwatch>
              </div>
            </div>
          </section>
          <section class="module-section module-section--accent-colors">
            <h3 id="state-colors" class="module-label">State Colors</h3>
            <div class="module module--demo module--demo--colors">
              <div class="module--demo--item">
                <ColorSwatch :hexCode="accentHex" :color-variable="accent"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="actionHex" :color-variable="action"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="activeHex" :color-variable="active" :opacity="activeHexAlpha"></ColorSwatch>
              </div>
              <div class="module--demo--item">
                <ColorSwatch :hexCode="focusHex" :color-variable="focus"></ColorSwatch>
              </div>
            </div>
          </section>
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
  import ColorSwatch from '../../utility/ColorSwatch'
  
export default {
  name: 'guide-color',
  components: {
    Demobox,
    SimIconText,
    ColorSwatch,
  },
  data() {
    return {
      msg: 'Color',
      darkest: 'var(--darkest)',
      darkestHex: '#000000',
      darker: 'var(--darker)',
      darkerHex: '#222222',
      dark: 'var(--dark)',
      darkHex: '#333333',
      darkGrey: 'var(--dark-grey)',
      darkGreyHex: '#444444',
      grey: 'var(--grey)',
      greyHex: '#565656',
      mediumGrey: 'var(--medium-grey)',
      mediumGreyHex: '#777777',
      lightGrey: 'var(--light-grey)',
      lightGreyHex: '#CCCCCC',
      lighterGrey: 'var(--lighter-grey)',
      lighterGreyHex: '#DDDDDD',
      light: 'var(--light)',
      lightHex: '#EEEEEE',
      lighter: 'var(--lighter)',
      lighterHex: '#FAFAFA',
      lightest: 'var(--lightest)',
      lightestHex: '#FFFFFF',
      blue: 'var(--blue)',
      blueHex: '#4A93B9',
      blueFilm: 'var(--blue-film)',
      blueFilmHex: '#4A93B9',
      blueFilmHexAlpha: 0.5,
      blueFilmHeavy: 'var(--blue-film-heavy)',
      blueFilmHeavyHex: '#0E6796',
      blueFilmHeavyHexAlpha: 0.9,
      red: 'var(--red)',
      redHex: '#CA1E34',
      redFilm: 'var(--red)',
      redFilmHex: '#CA1E34',
      redFilmHexAlpha: 0.5,
      orange: 'var(--orange)',
      orangeHex: '#FF7042',
      orangeFilm: 'var(--orange-film)',
      orangeFilmHex: '#FF7042',
      orangeFilmHexAlpha: 0.5,
      yellow: 'var(--yellow)',
      yellowHex: '#FFC929',
      yellowFilm: 'var(--yellow-film)',
      yellowFilmHex: '#FFC929',
      yellowFilmHexAlpha: 0.5,
      green: 'var(--green)',
      greenHex: '#9CCC66',
      greenFilm: 'var(--green-film)',
      greenFilmHex: '#9CCC66',
      greenFilmHexAlpha: 0.5,
      aqua: 'var(--aqua)',
      aquaHex: '#00C1D9',
      aquaFilm: 'var(--aqua-film)',
      aquaFilmHex: '#00C1D9',
      aquaFilmHexAlpha: 0.5,
      purple: 'var(--purple)',
      purpleHex: '#AB47BD',
      purpleFilm: 'var(--purple-film)',
      purpleFilmHex: '#AB47BD',
      purpleFilmHexAlpha: 0.5,
      accent: 'var(--accent)',
      accentHex: '#777777',
      action: 'var(--blue)',
      actionHex: '#4A93B9',
      active: 'var(--blue-film-heavy)',
      activeHex: '#0E6796',
      activeHexAlpha: 0.9,
      focus: 'var(--aqua)',
      focusHex: '#00C1D9',
      
    }
  },
}
</script>
