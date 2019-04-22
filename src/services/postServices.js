import api from '@/services/api'

export default {
  fetchData () {
    return api().get('/')
  }
}
