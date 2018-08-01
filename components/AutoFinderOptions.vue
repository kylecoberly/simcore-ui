<template>
  <div class="sim-autofinder--options">
    <transition-group appear name="list" tag="ul" mode="in-out">
      <li v-for="(option, index) in matchingOptions"
        :key="index"
        :class="{highlighted: isHighlightedOption(option)}"
        @mouseenter="setHighlightedOption(option)"
        @mousedown="selectOption(option)"
      >
        <p>{{ option.label }}</p>
      </li>
      <li key="no-results" v-if="!hasMatchingOptions">
        <i class="ghost">No results for "{{searchTerm}}"</i>
      </li>
    </transition-group>
  </div>
</template>

<script>
  export default {
    props: {
      searchTerm: String,
      matchingOptions: Array,
    },
    data(){
      return {
        highlightedOption: null,
      }
    },
    computed: {
      hasMatchingOptions(){
        return this.matchingOptions.length > 0
      }
    },
    created(){
      if (this.hasMatchingOptions){
        this.setHighlightedOption(this.matchingOptions[0])
      }
    },
    methods: {
      setHighlightedOption(option){
        this.highlightedOption = option
      },
      selectOption(option){
        this.$emit('selectOption', option)
      },
      isHighlightedOption(option){
        return option.id === this.highlightedOption.id
      }
    }
  }
</script>
