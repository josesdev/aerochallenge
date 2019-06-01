import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = 'https://coding-challenge-api.aerolab.co'
    Vue.axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2RmNDU4MDU4YzIzNzAwNmQxMDk0NGUiLCJpYXQiOjE1NTgxMzYxOTJ9.tPlWKbmh533Wgz7-1SrUOkd9pckGrLzUpqlwWfTZyrM`
  },
  query (resource, params) {
    return Vue.axios
      .get(resource, params)
      .catch((error) => {
        throw new Error(`ApiService query ${error}`)
      })
  },
  get (resource, plug) {
    return Vue.axios
      .get(plug ? `${resource}/${plug}` : resource)
      .catch((error) => {
        throw new Error(`ApiService get ${error}`)
      })
  },
  post (resource, params) {
    return Vue.axios
      .post(`${resource}`, params)
      .catch((error) => {
        throw new Error(`ApiService create ${error}`)
      })
  },
  update (resource, params) {
    return Vue.axios
      .put(`${resource}`, params)
      .catch((error) => {
        throw new Error(`ApiService update ${error}`)
      })
  },
  delete (resource) {
    return Vue.axios
      .delete(resource)
      .catch((error) => {
        throw new Error(`ApiService ${error}`)
      })
  },
}
export default ApiService
