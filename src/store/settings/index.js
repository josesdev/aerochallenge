import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const STORED_SETTINGS = storedSettings => {
  const settings = {}
  Object.keys(storedSettings).forEach(key => {
    const item = JSON.parse(localStorage.getItem(`app.settings.${key}`))
    settings[key] = item === null ? storedSettings[key] : item
  })
  return settings
}

export default {
  state: {
    ...STORED_SETTINGS({
      isMobileView: false,
      isTabletView: false,
    }),
  },
  mutations: {
    CHANGE_SETTING(state, payload) {
      window.localStorage.setItem(`app.settings.${payload.setting}`, payload.value)
      state[payload.setting] = payload.value
    },
  },
  actions: {},
  getters: {
    state: state => state,
  },
}
