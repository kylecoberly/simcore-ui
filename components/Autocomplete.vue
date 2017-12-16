<template lang="html">
  <div class="sim-autocomplete">
    <input v-model="keyword"
      :placeholder="placeholder"
      @input="onInput($event.target.value)"
      @keyup.esc="isOpen = false"
      @blur="isOpen = true"
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
          @mousedown="select"
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
  export default {
    name: 'sim-autocomplete',
    props: {
      name: {
        type: String,
        default: 'autocomplete',
      },
      options: {
        type: Array,
        required: true,
      },
      placeholder: {
        type: String,
        default: 'find...',
      },
      field: {
        type: String,
        required: true
      }
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
        const expression = new RegExp(this.keyword, 'i')
        return this.options.filter(option => option[this.field].match(expression))
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
        this.isOpen = false
        this.keyword = null // selectedOption[this.field]
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/autocomplete';
</style>
