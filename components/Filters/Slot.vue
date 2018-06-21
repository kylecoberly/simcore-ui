<template>
  <li>
    <sim-autocomplete
      v-if="this.contentState === contentStates.autocomplete"
      :options='this.remainingItems'
      @select='didSelectAnItem'
      searchKey="title"
    ></sim-autocomplete>

    <sim-selection
      v-if="this.selectedItem"
      :item="this.selectedItem"
      :item-id="this.selectedItem.id"
      :disabled="this.selectedItem.disabled"
      :should-be-selected="true"
    >
      {{ this.selectedItem.title }}
      <small class="ghost" v-if="this.selectedItem.description">{{ this.selectedItem.description }}</small>
    </sim-selection>

    <span v-else>
      {{ this.emptyMessage }}
    </span>
  </li>
</template>

<script>
import SimAutocomplete from '../Autocomplete'
import SimSelection from '../Selection'

const contentStates = {
  empty: 0,
  autocomplete: 1,
  selected: 2,
}

export default {
  name: 'sim-slot',
  components: {
    SimSelection,
    SimAutocomplete,
  },
  data() {
    return {
      contentStates,
      contentState: contentStates.empty,
      remainingItems: [],
      selectedItem: null,
      emptyMessage: 'Select Any',
    }
  },
}
</script>
