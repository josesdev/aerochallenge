<template>
  <div style="display: flex;">
    <a-input
      class="width-200"
      :class="$style.extInput"
      placeholder="Search product"
      ref="outerInput"
      v-model="searchText">
      <a-icon slot="prefix" type="search"/>
      <a-icon slot="addonAfter" type="close" @click="cleanInput"/>
    </a-input>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  data: function () {
    return {
    }
  },
  computed: {
    ...mapFields([
      'searchText',
    ]),
  },
  methods: {
    cleanInput() {
      this.searchText = ''
    },
  },
}
</script>

<style lang="scss" module>
@import "./style.module.scss";
</style>
