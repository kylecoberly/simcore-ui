// import axios from 'axios'

export default {
  base_url: '',
  // TODO: // Get data from a remote api. - Chad
  events() {
    return {
      '2017-12-19': [
        {
          start: 2,
          duration: 10.5,
        },
        {
          start: 15,
          duration: 3.5,
        },
      ],
      '2017-12-18': [
        {
          start: 8,
          duration: 3.5,
        },
        {
          start: 14,
          duration: 2.5,
        },
      ],
      '2017-12-15': [
        {
          start: 8.5,
          duration: 3.5,
        },
        {
          start: 13,
          duration: 4,
        },
      ],
    }
  },
}
