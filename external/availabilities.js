// import axios from 'axios'

export default {
  base_url: '',
  // TODO: // Get data from a remote api. - Chad
  availabilities() {
    return {
      '2017-12-11': [
        {
          start: 2,
          duration: 10.5,
          user_ids: [1, 2, 4, 6, 7, 9, 10, 14, 16],
        },
        {
          start: 15,
          duration: 3.5,
          user_ids: [5, 13, 18, 20, 21, 23],
        },
      ],
      '2017-12-12': [
        {
          start: 8,
          duration: 3.5,
          user_ids: [1, 2, 4, 6, 7, 9, 10, 14, 16],
        },
        {
          start: 14,
          duration: 2.5,
          user_ids: [3, 4, 5, 7, 8, 11],
        },
      ],
      '2017-12-13': [
        {
          start: 8.5,
          duration: 3.5,
          user_ids: [5, 13, 18, 20, 21, 23],
        },
        {
          start: 13,
          duration: 4,
          user_ids: [6, 12, 17, 21, 22, 25],
        },
      ],
    }
  },
}
