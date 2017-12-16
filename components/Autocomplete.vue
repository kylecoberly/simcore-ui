<template lang="html">
  <div class="sim-autocomplete" :class="{'sim-autocomplete--options-visible': isOpen}">
    <div class="sim-autocomplete--search-icon">
      <SimIconText icon="fa-search"></SimIconText>
    </div>
    <input v-model="keyword"
      type="search"
      :placeholder="placeholder"
      @input="onInput($event.target.value)"
      @keyup.esc="reset"
      @focus="focus"
      @blur="blur"
      @keydown.down="moveDown"
      @keydown.up="moveUp"
      @keydown.enter="select"
      />
    <div class="sim-autocomplete--items" v-show="isOpen">
      <transition-group appear name="list" tag="ul" mode="in-out">
        <li v-for="(option, index) in filteredOptions"
          :key="index"
          :class="{highlighted: index === position}"
          @mouseenter="position = index"
          @mousedown="clickSelect"
          >
          <slot name="item" :option="option"></slot>
        </li>
      </transition-group>
    </div>
    <div class="sim-autocomplete--item-count">
      {{ filteredOptionsCount }}
    </div>
  </div>
</template>

<script>
  import SimIconText from './IconText'

  export default {
    name: 'sim-autocomplete',
    components: {
      SimIconText
    },
    props: {
      options: {
        type: Array,
        required: true,
      },
      placeholder: {
        type: String,
        default: 'find...',
      },
    },
    data() {
      return {
        isOpen: false,
        position: 0,
        keyword: '',
      }
    },
    computed: {
      filteredOptions() {
        return this.options.filter((option) => {
          return Object.keys(option).some((prop) => {
            return option[prop].toString().toLowerCase().includes(this.keyword.toLowerCase())
          })
        })
      },
      filteredOptionsCount() {
        return this.filteredOptions.length
      },
    },
    methods: {
      onInput(value) {
        this.position = 0
        this.isOpen = !!value
      },
      moveDown() {
        if (!this.isOpen) {
          return
        }
        this.position = (this.position + 1) % this.filteredOptions.length
      },
      moveUp() {
        if (!this.isOpen) {
          return
        }
        this.position = (this.position - 1 < 0 ? this.filteredOptions.length - 1 : this.position - 1)
      },
      select() {
        const selectedOption = this.filteredOptions[this.position]
        this.$emit('select', selectedOption)
      },
      clickSelect() {
        this.select()
        this.reset()
      },
      reset() {
        this.isOpen = false
        this.keyword = ''
      },
      blur() {
        this.isOpen = false
      },
      focus() {
        this.isOpen = true
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/autocomplete';
</style>
