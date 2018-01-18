<template lang="html">
  <article>

    <h2 class="library-section-title">{{ msg }}</h2>

    <demobox :open="true">

        <template slot="intro">
          Normal / Default
        </template>

        <template slot="view">
          <section class="module-section module-section--brand-logo">
            <h3 id="brand-logo" class="module-label">Brand Logo</h3>
            <div class="module module--demo module--demo--logo">
              <div class="module--demo--item">
                <div class="brand-logo brand-logo--color"><img src="../../assets/images/HealthScholars/logo/HealthScholars-logo-color.svg" alt=""></div>
              </div>
              <div class="module--demo--info">
                <p>Logo: Full Color</p>
                <pre v-highlightjs><code class="html">&lt;img src="HealthScholars-logo-color.svg" alt="Health Scholars"></code></pre>
              </div>
            </div>
            <div class="grid grid--two-col">
              <div class="module module--demo module--demo--logo">
                <div class="module--demo--item">
                  <div class="brand-logo brand-logo--color"><img src="../../assets/images/HealthScholars/logo/HealthScholars-logo-color.svg" alt=""></div>
                </div>
                <div class="module--demo--info">
                  <p>Logo: Full Color</p>
                  <pre v-highlightjs><code class="html">&lt;img src="HealthScholars-logo-color.svg" alt="Health Scholars"></code></pre>
                </div>
              </div>
              <div class="module module--demo module--demo--logo">
                <div class="module--demo--item">
                  <div class="brand-logo brand-logo--light"><img src="../../assets/images/HealthScholars/logo/HealthScholars-logo-light.svg" alt="Health Scholars logo"></div>
                </div>
                <div class="module--demo--info">
                  <p>Logo: Reversed</p>
                  <pre v-highlightjs><code class="html">&lt;img src="HealthScholars-logo-light.svg" alt="Health Scholars"></code></pre>
                </div>
              </div>
            </div>
          </section>
          <section class="module-section module-section--brand-logo">
            <h3 id="brand-logo" class="module-label">Logo Icon</h3>
            <div class="grid grid--three-col">
              <div class="module module--demo">
                <div class="module--demo--item">
                  <div class="brand-logo brand-logo--icon brand-logo--color"><img src="../../assets/images/HealthScholars/logo/HealthScholars-icon-color.svg" alt="Health Scholars"></div>
                </div>
                <div class="module--demo--info">
                  <p>Logo Dots: Full Color</p>
                  <pre v-highlightjs><code class="html">&lt;img src="HealthScholars-icon-color.svg" alt="Health Scholars"></code></pre>
                </div>
              </div>
              <div class="module module--demo">
                <div class="module--demo--item">
                  <div class="brand-logo brand-logo--icon brand-logo--dark"><img src="../../assets/images/HealthScholars/logo/HealthScholars-icon-dark.svg" alt="Health Scholars"></div>
                </div>
                <div class="module--demo--info">
                  <p>Logo Dots: Full Black</p>
                  <pre v-highlightjs><code class="html">&lt;img src="HealthScholars-icon-dark.svg" alt="Health Scholars"></code></pre>
                </div>
              </div>
              <div class="module module--demo">
                <div class="module--demo--item">
                  <div class="brand-logo brand-logo--icon brand-logo--light"><img src="../../assets/images/HealthScholars/logo/HealthScholars-icon-light.svg" alt="Health Scholars"></div>
                </div>
                <div class="module--demo--info">
                  <p>Logo Dots: Reversed</p>
                  <pre v-highlightjs><code class="html">&lt;img src="HealthScholars-icon-light.svg" alt="Health Scholars"></code></pre>
                </div>
              </div>
            </div>
          </section>
        </template>

        <template slot="html">
          <pre v-highlightjs><code class="html">&lt;</code></pre>
        </template>

        <template slot="scss">
          <pre v-highlightjs><code class="scss">$var-name: #333;</code></pre>
        </template>

        <template slot="js">
          <pre v-highlightjs><code class="javascript"></code></pre>
        </template>

      </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  
export default {
  name: 'guide-logo',
  components: {
    Demobox,
  },
  data() {
    return {
      msg: 'Brand Logo',
    }
  },
}
</script>