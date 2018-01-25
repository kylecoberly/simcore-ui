<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">
          <button @click="toggleModalVisibility">Modal</button>
          <SimModal
            :class="{active: shouldBeOpen}"
            >
            <p>Modal Content</p>
            </SimModal>
        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html" v-pre>
&lt;SimModal :class="{active: shouldBeOpen}">&lt;/SimModal>
            </code></pre>
        </template>
        <template slot="js">
          <pre v-highlightjs><code class="javascript">data() {
  return {
    shouldBeOpen: false,
  }
},
computed: {
  modalIsOpen() {
    return this.shouldBeOpen
  },
},
methods: {
  toggleModalVisibility() {
    this.shouldBeOpen = true
  }
},</code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
  import Demobox from '../../utility/Demobox'
  import SimModal from '../../../components/Modal'

  export default {
    name: 'modal-doc',
    components: {
      Demobox,
      SimModal,
    },
    data() {
      return {
        msg: 'Modal',
        shouldBeOpen: false,
      }
    },
    computed: {
      modalIsOpen() {
        return this.shouldBeOpen
      },
    },
    methods: {
      toggleModalVisibility() {
        this.shouldBeOpen = true
      }
    },
  }
</script>
