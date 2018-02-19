<template lang="html">
  <div class="sim-autofinder" :class="{'sim-autofinder--visible-options': isOpen}">
    <label class="sim-autofinder--search">
      <SimIconText :icon="icon" icon-type="svg"></SimIconText>
      <input type="text"
            class="sim-autofinder--search--input"
            v-model="search"
            :placeholder="placeholder"
            :disabled="isDisabled"
            @blur="blur"
            @focus="focus"
            @keydown.down="moveDown"
            @keydown.up="moveUp"
            @keydown.enter="select"
            @keydown.tab="select"
            @keyup.esc="blur"
            @input="onInput($event.target.value)"
            />
      <div class="sim-autofinder--remove-item" @click="removeItem">
        <SimIconText icon="#icon--control--x" icon-type="svg"></SimIconText>
      </div>
    </label>
    <div class="sim-autofinder--options" v-if="isOpen">
      <transition-group appear name="list" tag="ul" mode="in-out">
        <li v-for="(option, optionIndex) in foundOptions"
            :key="optionIndex"
            :class="{highlighted: optionIndex === position}"
            @mouseenter="position = optionIndex"
            @mousedown="clickSelect"
            >
          <slot name="option" :option="option"></slot>
        </li>
        <li key="no-results" v-if="noOptions">
          <i class="ghost">No results for "{{search}}"</i>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import SimIconText from './IconText'

  export default {
    name: 'sim-autofinder',
    components: {
      SimIconText,
    },
    props: {
      item: {
        type: Object,
      },
      index: {
        type: Number,
      },
      isAlone: {
        type: Boolean,
        default: true,
      },
      options: {
        type: Array,
        required: true,
      },
      placeholder: {
        type: String,
        default: 'find...',
      },
      shouldBeDisabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isOpen: false,
        position: 0,
        search: '',
        foundItem: null,
        previousValueLength: 0
      }
    },
    computed: {
      icon() {
        return this.foundItem ? '#icon--checkbox--checked' : '#icon--checkbox--available'
      },
      foundOptions() {
        return this.options.filter((option) => {
          return `${option.lastname}, ${option.firstname}`.toLowerCase().includes(this.search.toLowerCase())
        })
      },
      noOptions() {
        return !this.foundOptions.length
      },
      isDisabled() {
        return this.shouldBeDisabled
      },
    },
    mounted() {
      if (this.item && this.item.lastname) {
        this.foundItem = this.item
        this.search = `${this.foundItem.lastname}, ${this.foundItem.firstname}`
      }
    },
    methods: {
      onInput(value) {
        this.isOpen = (this.search.length > 2)
        this.position = 0

        // @NOTE if we have an item in context AND subtract-altering the search string, reset the input - Jase
        if (this.foundItem && this.search.length <= this.previousValueLength) {
          this.$emit('clear', this.foundItem)
          this.search = '';
          this.previousValueLength = this.search.legth
          this.foundItem = null
          this.isOpen = false
        }

        this.previousValueLength = this.search.length
      },
      moveDown() {
        if (!this.isOpen) {
          return
        }

        this.position = (this.position + 1) % this.foundOptions.length
      },
      moveUp() {
        if (!this.isOpen) {
          return
        }

        this.position = (this.position - 1 < 0 ? this.foundOptions.length - 1 : this.position - 1)
      },
      select() {
        if (this.isOpen && this.foundOptions.length) {
          this.foundItem = Object.assign(this.item, this.foundOptions[this.position])
          this.$emit('select', this.foundItem, this.index)
          this.search = `${this.foundItem.lastname}, ${this.foundItem.firstname}`
          this.previousValueLength = this.search.length

          this.isOpen = false
        }
      },
      clickSelect() {
        this.select()
      },
      removeItem() {
        if (this.isAlone) {
          this.onInput('')
        } else {
          this.$emit('remove', (this.foundItem ? this.foundItem : this.item))
        }
      },
      blur() {
        if (!this.foundItem) {
          this.search = ''
        }

        this.isOpen = false
      },
      focus() {
        this.isOpen = (!this.foundItem && this.foundOptions.length && this.search.length > 2 ? true : false)
        this.previousValueLength = this.search.length
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/autofinder';
</style>
