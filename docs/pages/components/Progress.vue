<template lang="html">
  <article>
      <h2>{{ msg }}</h2>
      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <div v-if="progressLoading">
            <SimProgress
              :style="stylePercentComplete" :tooltip="bubbleText"
              :progress-loading="true"
              ></SimProgress>
            </div>
        </template>
        <template slot="html">
        <pre v-highlightjs><code class="html">&lt;SimProgress 
  :style="stylePercentComplete" 
  :tooltip="bubbleText" 
  :progress-loading="true"
  >&lt;/SimProgress></code></pre>
        </template>
        <template slot="js">
          <pre v-highlightjs><code class="javascript">computed: {
  percentComplete () {
    return this.percent || 50
  },
  stylePercentComplete () {
    return `--percent:${this.percentComplete}%`
  },
  bubbleText () {
    return `${this.percentComplete}% Complete`
  },
},</code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimProgress from '../../../components/Progress'

  export default {
    name: 'progress-doc',
    components: {
      Demobox,
      SimProgress,
    },
    data() {
      return {
        msg: 'Progress',
        progressLoading: true,
      }
    },
    computed: {
      percentComplete () {
        return this.percent || 50
      },
      stylePercentComplete () {
        return `--percent:${this.percentComplete}%`
      },
      bubbleText () {
        return `${this.percentComplete}% Complete`
      },
    },
  }
</script>
