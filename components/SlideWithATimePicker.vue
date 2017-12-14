<template lang="html">
  <div class="sim-slide">

    <header v-if="data.title || data.subtitle" class="sim-slide--header">
      <h2 v-if="data.title" class="sim-slide--title">{{ data.title }}</h2>
      <div v-if="data.subtitle" class="sim-slide--subtitle">{{ data.subtitle }}</div>
    </header>

    <div v-if="data.intro">
      {{ data.intro }}
    </div>

    <SimTimePicker :date="$store.state.activeDate.date"
      orientation="y"
      :time-block-limit="1"
      :start-time="9"
      :end-time="20"
      />

  </div>
</template>

<script>
  import SimTimePicker from './TimePicker'

  export default {
    name: 'sim-slide',
    components: {
      SimTimePicker
    },
    props: ['data'],
  }
</script>

<style lang="scss">
  @import '../styles/slide';
</style>
