// import axios from 'axios'

export default {
  base_url: '',
  // TODO: // Get data from a remote api. - Chad
  user() {
    return {
      userId: 1996,
      firstName: 'Bob',
      lastName: 'Dole',
      availabilities: {
        '2017-12-22': [
          {
            start: 8,
            duration: 3.5,
          },
          {
            start: 14,
            duration: 2.5,
          },
        ],
        '2017-12-26': [
          {
            start: 8.5,
            duration: 3.5,
          },
        ],
      },
      events: {},
    }
  },
}
