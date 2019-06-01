import Api from '@/services/api.service'

export default {
  fetchProducts () {
    return Api.get('products')
  },
  get (projectId) {
    return Api.get('projects', projectId)
  },
  executeScript(params) {
    return Api.post('scripts_execution', params)
  },
  post (params) {
    return Api.post('projects', params)
  },
  update (params) {
    return Api.update(`projects/${params.id}`, params)
  },
  redeem (productId) {
    return Api.post('redeem', { productId })
  },
  getPost (params) {
    return Api.get('posts/page/' + params.id)
  },
  delete (id) {
    return Api.delete('projects/' + id)
  },
  uploadFile (forms) {
    return Api.post('posts/upload', forms)
  },
}
