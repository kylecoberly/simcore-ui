// import axios from 'axios'

export default {
  base_url: '',
  // TODO: // Get data from a remote api. - Chad
  availabilities() {
    return {
      '2017-12-16': [
        {
          start: 8,
          duration: 3.5,
          user_ids: [1, 2, 3, 4, 5],
        },
        {
          start: 14,
          duration: 2.5,
          user_ids: [1, 2, 3],
        },
      ],
      '2017-12-07': [
        {
          start: 8.5,
          duration: 3.5,
          user_ids: [3, 4, 5],
        },
      ],
    }
  },
}
