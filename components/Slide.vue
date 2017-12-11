<template lang="html">
  <div class="sim-slide">

    <header v-if="data.title || data.subtitle">
      <h2 v-if="data.title" class="sim-slide--title">{{ data.title }}</h2>
      <div v-if="data.subtitle" class="sim-slide--subtitle">{{ data.subtitle }}</div>
    </header>

    <SimDatalist v-if="data.items" :items="data.items">
      <template slot="item" slot-scope="props">
        <li :key="props.index">
            {{ props.item.name }}
        </li>
      </template>
    </SimDatalist>

    <div v-if="data.content">
      {{ data.content }}
    </div>

  </div>
</template>

<script>
import SimDatalist from './Datalist'

export default {
  name: 'sim-slide',
  components: {
    SimDatalist,
  },
  props: ['data'],
  methods: {
  },
}
</script>

<style lang="scss">
  @import '../styles/slide';
</style>
