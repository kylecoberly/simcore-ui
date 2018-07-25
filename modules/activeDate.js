import moment from 'moment/moment'

const dateFormatRaw = 'YYYY-MM-DD'

const activeDate = {
  state: {
    date: moment("2018-07-13"),
    today: moment("2018-07-13"),
  },
  getters: {
    getActiveDate: (state) => () => { return state.date },
  },
  mutations: {
    setActiveDate(state, date) {
      state.date = date
    },
  },
}

export default activeDate
