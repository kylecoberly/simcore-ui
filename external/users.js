import axios from 'axios'
axios.defaults.crossDomain = true
import purviewUsers from '../test/e2e/fixtures/purview_users.json'

const endpoint = 'users'
const action = 'purview_users'

export default {
  getUsers(baseUrl, userId) {
    //return axios.get(`${baseUrl}${endpoint}/${userId}/${action}?scope=canInstruct`)
    console.log("getUsers called")
    return Promise.resolve().then(() => {
      return {data: purviewUsers}
    })
  },
  users() {
    return []
  },
}
