<template lang="html">
  <article>
    <h2 class="library-section-title">{{ msg }}</h2>
    <demobox :open="true">

        <template slot="intro">
          Normal / Default
        </template>

        <template slot="view">
          <sim-button :button="SimButton"></sim-button>
          <sim-button :button="SimButtonActive" class="active"></sim-button>
          <sim-button :button="SimButtonPrimary" class="sim-button--primary"></sim-button>
          <sim-button :button="SimButtonSecondary" class="sim-button--secondary"></sim-button>          
          <sim-button :button="SimCalendarButton" class="sim-calendar-button"></sim-button>
          <sim-button :button="SimButtonPlain" class="sim-button--link"></sim-button>
          <sim-button :button="SimButtonDisabled" disabled></sim-button>&nbsp;
          <SimIconText icon="fa-arrow-circle-right fa-lg"></SimIconText>
        </template>

        <template slot="html">
          <pre v-highlightjs><code class="html">&lt;button class="sim-button">Button&lt;/button></code></pre>
          <br>
          <pre v-highlightjs><code class="html">&lt;button class="sim-button active">Active&lt;/button></code></pre>
          <br>
          <pre v-highlightjs><code class="html">&lt;button class="sim-button sim-button--primary">Primary&lt;/button></code></pre>
          <br>
          <pre v-highlightjs><code class="html">&lt;button class="sim-button sim-button--secondary">Secondary&lt;/button></code></pre>
          <br>          
          <pre v-highlightjs><code class="html">&lt;button class="sim-button sim-calendar-button">Calendar&lt;/button></code></pre>
          <br>
          <pre v-highlightjs><code class="html">&lt;button class="sim-button sim-button--link">Link&lt;/button></code></pre>
          <br>
          <pre v-highlightjs><code class="html">&lt;span class="sim-icontext sim-icontext__plain">
    &lt;span class="sim-icon fa fa-arrow-circle-right fa-lg" aria-hidden="true">&lt;/span>
&lt;/span>
</code></pre>
        </template>

      </demobox>
  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimIconText from '../../../components/IconText'
  import SimButton from '../../../components/Button'
  
export default {
  name: 'guide-buttons',
  components: {
    Demobox,
    SimIconText,
    SimButton,
  },
  data() {
    return {
      msg: 'Buttons',
      SimButton: 'Button',
      SimButtonPrimary: 'Primary',
      SimButtonSecondary: 'Secondary',
      SimButtonActive: 'Active',
      SimCalendarButton: 'Calendar',
      SimButtonPlain: 'Link',
      SimButtonDisabled: 'Disabled',
    }
  },
}
</script>
