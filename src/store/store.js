import Vue from 'vue'
import Vuex from 'vuex'
import settings from './settings'

import { getField, updateField } from 'vuex-map-fields'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    settings,
  },
  state: {
    user: null,
    searchText: '',
    products: [],
    productsBag: [],
  },
  getters: {
    getField,
    user: state => state.user,
    getProductById: state => id => state.products.find(product => product._id === id),
    getProductIndexById: state => product => state.productsBag.indexOf(product),
  },
  mutations: {
    updateField,
    UPDATE_USER(state, user) {
      state.user = user
    },
    UPDATE_USER_POINTS(state, amount) {
      state.user.points += amount
    },
  },
  actions: {},
})
