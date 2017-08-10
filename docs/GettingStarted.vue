<template lang="html">
  <main>
    <h1>{{ msg }}</h1>
    <hr />
    <p>Boo</p>
    <p>
      <label><input type="radio" v-model="sortKey" value="index" /> by index</label>
      <label><input type="radio" v-model="sortKey" value="item" /> by alpha</label>
      <input type="search" v-model="search" placeholder="filter..." />
    </p>
    <transition-group tag="ul" name="list" mode="in-out">
      <li v-for="(item, index) in filteredList" :key="index" :style="'--delay:' + index">
        {{index}}. {{item.item}} ({{item.index}})
      </li>
    </transition-group>
    <article v-for="n of randomInt(5, 10)" v-once>
      <header>
        testing {{ n }}
      </header>
      <p v-for="n of randomInt(1, 100)">
        {{ n }}
      </p>
    </article>
  </main>
</template>

<script>
import common from '../mixins'

export default {
  name: 'getting-started',
  mixins: [common],
  data() {
    return {
      msg: 'Getting Started',
      list: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'.split(' '),
      sortKey: 'index',
      search: '',
    }
  },
  computed: {
    myList() {
      const list = this.list.map((item, index) => ({ index, item }))
      return common.sortByKey(list, this.sortKey)
    },
    filteredList() {
      return this.myList.filter(item => item.item.toLowerCase().includes(this.search.toLowerCase()))
    },
  },
  methods: {
    randomInt: (min, max) => common.getRandomInt(min, max),
  },
}
</script>

<style scoped>
article {
  margin-bottom: 1em;
}
li {
  display: inline-block;
  margin-right: 1ch;
}
p {
  margin: .5em 0;
}
</style>
