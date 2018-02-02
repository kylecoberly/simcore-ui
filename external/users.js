import axios from 'axios'
axios.defaults.crossDomain = true

const endpoint = 'users'
const action = 'purview_users'

export default {
  getUsers(baseUrl, userId) {
    return axios.get(`${baseUrl}${endpoint}/${userId}/${action}?scope=canInstruct`)
  },
  users() {
    return []
  },
}
