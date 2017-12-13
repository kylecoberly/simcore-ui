// import axios from 'axios'

export default {
  base_url: '',
  // TODO: // Get data from a remote api. - Chad
  availabilities() {
    return {
      '2017-12-12': [
        {
          start: 8,
          duration: 3.5,
        },
        {
          start: 14,
          duration: 2.5,
        },
      ],
      '2017-12-07': [
        {
          start: 8.5,
          duration: 3.5,
        },
      ],
    }
  },
}
