<template>
  <div class="sim-autofinder--options">
    <transition-group appear name="list" tag="ul" mode="in-out">
      <li v-for="(option, index) in matchingOptions"
        :key="index"
        :class="{highlighted: option.isHighlighted}"
        @mouseenter="setHighlightedOption(option.id)"
        @mousedown="selectOption(option.id)"
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
        position: 0,
      }
    },
    computed: {
      hasMatchingOptions(){
        return this.matchingOptions.length > 0
      }
    },
    created(){
      if (this.matchingOptions.length > 0){
        this.setHighlightedOption(this.matchingOptions[0].id)
      }
    },
    methods: {
      setHighlightedOption(option){
        this.$emit('setHighlightedOption', option)
      },
      selectOption(optionId){
        this.$emit('selectOption', optionId)
      },
    }
  }
</script>
