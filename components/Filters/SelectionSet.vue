<template>
  <section>
    <sim-autocomplete
      :options='this.remainingItems'
      @select='didSelectAnItem'
      searchKey="title"
    >
      <template slot="item" slot-scope="props">
        <article class='media'>
          <p>
            <strong>{{ props.option.title }}</strong>
            <br> {{ props.option.description }}
          </p>
        </article>
      </template>
    </sim-autocomplete>

    <sim-datalist
      :items="selectedItems"
    >
      <li slot="item" slot-scope="props">
        <sim-selection
          :item="props.item"
          :item-id="props.item.id"
          :disabled="props.item.disabled"
          :should-be-selected="true"
        >
          {{ props.item.title }}
          <small class="ghost" v-if="props.item.description">{{ props.item.description }}</small>
        </sim-selection>
      </li>
    </sim-datalist>

  </section>
</template>
<script>
import _ from 'lodash'

import dumData from './dumData'

import SimAutocomplete from '../Autocomplete'
import SimDatalist from '../Datalist'
import SimSelection from '../Selection'

export default {
  components: {
    SimSelection,
    SimDatalist,
    SimAutocomplete,
  },
  data() {
    return {
      sourceItems: dumData(),
      remainingItems: [],
      selectedItems: [],
    }
  },
  mounted() {
    this.remainingItems = this.sourceItems
  },
  methods: {
    didSelectAnItem(selectedItem) {
      this.selectedItems.push(selectedItem)

      this.remainingItems = _.difference(this.sourceItems, this.selectedItems)
    },
  },
}
</script>
