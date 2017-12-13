const dateFormatDisplay = 'dddd, MMMM Do'
const dateFormatRaw = 'YYYY-MM-DD'

const calendar = {
  state: {
    settings: {
      date_format: {
        raw: dateFormatRaw,
        display: dateFormatDisplay,
        month_name: 'MMMM',
        year: 'Y',
        month_short_day_ordinal: 'MMM Do',
      },
      day_names: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weekend_days: [0, 6],
    },
  },
}

export default calendar
