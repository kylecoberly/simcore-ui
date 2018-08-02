import DateService from './date-service'
import LoadingService from './loading-service'

export default {
  namespaced: true,
  modules: {
    date: DateService,
    loading: LoadingService,
  },
}
