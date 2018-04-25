import axios from 'axios'
axios.defaults.crossDomain = true

const endpoint = 'users'

export default {
  user() {
    const user = {
      userId: 1996,
      firstName: 'Bob',
      lastName: 'Dole',
      availabilities: {},
      events: {},
    }

    return user
  },
  availabilities(baseUrl, userId, startDate, endDate) {
    return axios.get(`${baseUrl}${endpoint}/${userId}/availabilities?start_date=${startDate}&end_date=${endDate}`)
  },
  saveAvailabilities(baseUrl, userId, availabilities) {
    return axios.post(`${baseUrl}${endpoint}/${userId}/availabilities`, { dates: { [availabilities.date]: availabilities.blocks } })
  },
  userType() { return 'institution' },
  instructors() {},
  institutions() {},
  professionalTitles() {},
  courseCategories() {},
  departments() {},
}
