const dateFormatDisplay = 'dddd, MMMM Do'
const dateFormatDisplayShort = 'dddd, MMM Do'
const dateFormatRaw = 'YYYY-MM-DD'

const calendar = {
  state: {
    settings: {
      date_format: {
        raw: dateFormatRaw,
        display: dateFormatDisplay,
        short: dateFormatDisplayShort,
        month_name: 'MMMM',
        year: 'Y',
        month_short_day_ordinal: 'MMM Do',
      },
      day_names: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weekend_days: [0, 6],
    },
    expand_week: false,
  },
  mutations: {
    setCalendarExpandWeek(state, shouldBeExpanded) {
      if (shouldBeExpanded !== undefined) {
        state.expand_week = shouldBeExpanded
      } else {
        state.expand_week = !state.expand_week
      }
    },
  },
}

export default calendar
