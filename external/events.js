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


const proposedEvents = {
  '2017-12-19': {
    2: [
      {
        start: 2,
        duration: 3.5,
        user_ids: [],
      },
      {
        start: 2,
        duration: 10.5,
        user_ids: [],
      },
    ],
    15: [
      {
        start: 15,
        duration: 3.5,
        user_ids: [],
      },
    ],
  },
  '2017-12-18': {
    8: [
      {
        start: 8,
        duration: 3.5,
        user_ids: [],
      },
    ],
    14: [
      {
        start: 14,
        duration: 2.5,
        user_ids: [],
      },
    ],
  },
  '2017-12-15': {
    8.5: [
      {
        start: 8.5,
        duration: 3.5,
        user_ids: [],
      },
    ],
    13: [
      {
        start: 13,
        duration: 4,
        user_ids: [],
      },
    ],
  },
}
