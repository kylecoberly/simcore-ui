import moment from 'moment/moment'

const dateFormatRaw = 'YYYY-MM-DD'

const activeDate = {
  state: {
    date: moment(),
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
