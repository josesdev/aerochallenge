import Api from '@/services/api.service'

export default {
  fetchUser () {
    return Api.get('user/me')
  },
  incrementPoints (payload) {
    return Api.post('user/points', payload)
  },
}
