<template lang="html">
  <article>
      <h2>{{ msg }}</h2>

      <demobox>
        <template slot="intro">
          Normal / Default
        </template>
        <template slot="view">

          <sim-datalist :items="items">
            <template slot="header">
              Datalist Header
            </template>
            <template slot="static-before">
              <li :key="'before'" class="title">
                <span>Static item before <samp>items</samp> loop</span>
              </li>
            </template>
            <template slot="item" slot-scope="props">
              <li :key="props.index">
                  {{ props.item.name }}
              </li>
            </template>
            <template slot="static-after">
              <li :key="'before'" class="title">
                <span>Static item after <samp>items</samp> loop</span>
              </li>
            </template>
            <template slot="footer">
              Datalist Footer
            </template>
          </sim-datalist>

        </template>
        <template slot="html">
          <pre v-highlightjs><code class="html" v-pre>&lt;sim-datalist :items="items">
  &lt;template slot="header">
    Datalist Header
  &lt;/template>
  &lt;template slot="static-before">
    &lt;li :key="'before'" class="title">
      &lt;span>Static item before &lt;samp>items&lt;/samp> loop&lt;/span>
    &lt;/li>
  &lt;/template>
  &lt;template slot="item" slot-scope="props">
    &lt;li :key="props.index">
        {{ props.item.name }}
    &lt;/li>
  &lt;/template>
  &lt;template slot="static-after">
    &lt;li :key="'before'" class="title">
      &lt;span>Static item after &lt;samp>items&lt;/samp> loop&lt;/span>
    &lt;/li>
  &lt;/template>
  &lt;template slot="footer">
    Datalist Footer
  &lt;/template>
&lt;/sim-datalist></code></pre>
        </template>
        <template slot="js">
          <pre v-highlightjs><code class="javascript">items: {{ items }}</code></pre>
        </template>
      </demobox>

  </article>
</template>

<script>
import Demobox from '../../utility/Demobox'
import SimDatalist from '../../../components/Datalist'

export default {
  name: 'datalist-doc',
  components: {
    Demobox,
    SimDatalist,
  },
  data() {
    return {
      msg: 'Datalist',
      items: [
        { id: 1, name: 'Medical Assistant' },
        { id: 2, name: 'Nursing Assistant' },
        { id: 3, name: 'Home Health Aide' },
        { id: 4, name: 'Licensed Practical Nurse' },
        { id: 5, name: 'Physician' },
        { id: 6, name: 'Therapist' },
        { id: 7, name: 'Registered Nurse' },
        { id: 8, name: 'Pharmacy Technician' },
        { id: 9, name: 'Physician Assistant' },
      ],
    }
  },
}
</script>
