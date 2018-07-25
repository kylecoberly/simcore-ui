<template>
  <div class="sim-autofinder sim-autofinder--visible-options">
    <label class="sim-autofinder--search">
      <SimIconText :icon="icon" icon-type="svg"></SimIconText>
      <input type="text" class="sim-autofinder--search--input"
        ref="input"
        :placeholder="placeholder"
        :value="inputValue"
        @input="updateInput"
        @blur="blur"
        @keydown.down="highlightPrevious"
        @keydown.up="highlightNext"
        @keydown.enter="select"
        @keydown.tab="select"
        @keyup.esc="blur"
      />
      <div v-if="canRemove" class="sim-autofinder--remove-item" @click="remove">
        <SimIconText icon="#icon--control--x" icon-type="svg"></SimIconText>
      </div>
    </label>
    <AutoFinderOptions v-if="optionsOpen"
      :searchTerm="searchTerm"
      :matchingOptions="matchingOptions"
      @selectOption="select"
      @setHighlightedOption="setHighlightedOption"
    />
  </div>
</template>

<script>
  import SimIconText from './IconText'
  import AutoFinderOptions from './AutoFinderOptions'

  export default {
    components: {
      SimIconText,
      AutoFinderOptions,
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
      canRemove: Boolean,
      isFocused: Boolean,
      selectedItem: Object,
      index: Number,
    },
    mounted(){
      if (this.selectedItem.isFocused){
        this.$refs.input.focus()
      }
      this.highlightedId = this.firstId
    },
    data() {
      return {
        searchTerm: '',
        highlightedId: -1,
      }
    },
    computed: {
      inputValue(){
        return this.foundItem
          ? this.selectedItem.label
          : this.searchTerm
      },
      icon() {
        return this.foundItem ? '#icon--checkbox--checked' : '#icon--checkbox--available'
      },
      optionsOpen() {
        return this.searchTerm.length > 0 && !this.foundItem
      },
      foundItem(){
        return this.selectedItem.id > 0
      },
      firstId() {
        return this.matchingOptions[0]
          ? this.matchingOptions[0].id
          : -1
      },
      currentIndex(){
        return this.matchingOptions.map(option => option.id).indexOf(this.highlightedId)
      },
      nextIndex(){
        return this.currentIndex < this.matchingOptions.length - 1
          ? this.currentIndex + 1
          : this.currentIndex
      },
      previousIndex(){
        return this.currentIndex > 0
          ? this.currentIndex - 1
          : this.currentIndex
      },
      matchingOptions() {
        return this.options.filter((option) => {
          return option.label.toLowerCase().includes(this.searchTerm.toLowerCase())
        }).map(option => {
          option.isHighlighted = option.id == this.highlightedId
          return option
        })
      },
    },
    methods: {
      setHighlightedOption(id){
        this.highlightedId = id
      },
      highlightPrevious() {
        this.highlightedId = this.matchingOptions[this.previousIndex].id
      },
      highlightNext() {
        this.highlightedId = this.matchingOptions[this.nextIndex].id
      },
      blur() {
        if (!this.foundItem) {
          this.searchTerm = ''
        }
      },
      updateInput(event) {
        if (this.foundItem){
          this.$emit('clear')
          this.highlightedId = -1
        }
        this.searchTerm = event.target.value
      },
      select() {
        if (this.foundItem) {
          this.$emit('focusNextItem')
        } else if (this.highlightedId > 0) {
          this.$emit('select', this.index, this.highlightedId)
          this.$emit('focusNextItem')
        }
      },
      remove(){
        this.$emit('remove')
      },
    },
  }
</script>

<style lang="scss">
  @import '../styles/autofinder';
</style>
