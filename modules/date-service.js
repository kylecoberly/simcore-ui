import moment from 'moment'

export default {
  namespaced: true,
  state: {
    today: moment('2018-07-13'),
    selectedDate: moment('2018-07-13'),
  },
  mutations: {
    setDate(state, date){
      state.selectedDate = moment(date)
      console.log('in the store', state.selectedDate.format('YYYY MM DD'))
    },
  },
  actions: {
    setDate(context, date){
      context.commit('setDate', date)
    },
  }
}
