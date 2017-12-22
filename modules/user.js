const user = {
  state: {
    last_updated: null,
  },
  mutations: {
    setCurrentUser(state, nextUser) {
      state.userId = nextUser.userId
      state.firstName = nextUser.firstName
      state.lastName = nextUser.lastName
      state.availabilities = nextUser.availabilities
      state.events = nextUser.events
    },
    setCurrentUserAvailabilities(state, availabilities) {
      const date = availabilities.date

      if (state.last_updated !== date) {
        state.last_updated = date
      }

      state.availabilities = availabilities.blocks
    },
    setUserAvailabilityBlocksForDay(state, availability) {
      const date = availability.date

      if (state.last_updated !== date) {
        state.last_updated = date
      }

      if (availability.blocks.length === 0) {
        delete state.availabilities[date]
      } else {
        state.availabilities[date] = Object.assign(availability.blocks, state.availabilities)
      }
    },
    setInstitutions(state, institutions) {
      state.institutions = institutions
    },
    setDepartments(state, departments) {
      state.departments = departments
    },
    setProfessionalTitles(state, professionalTitles) {
      state.professionalTitles = professionalTitles
    },
    setInstructors(state, instructors) {
      state.instructors = instructors
    },
  },
  actions: {},
  getters: {
    getLastUpdatedCurrentUserAvailabilityBlocks: (state) => () => {
      return state.last_updated
    },
  },
}

export default user
