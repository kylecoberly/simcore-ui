// import axios from 'axios'

export default {
  base_url: '',
  // TODO: // Get data from a remote api. - Chad
  events() {
    return {
      '2016-12-20': [
        {
          id: 482,
          parent_id: null,
          department_id: 2,
          user_id: 12,
          scenario_id: null,
          title: 'Event (4p-5p)',
          description: null,
          note: null,
          room_id: null,
          url: '/calendar/show/id/482',
          css_class: 'event-success',
          started_at: '2016-11-11 16:00:00',
          ended_at: '2016-11-11 17:00:00',
          is_all_day: 1,
          recurring_type: 0,
          created_at: '2016-11-11 22:36:10',
          attachment_path: null,
          attachment_name: null,
        },
      ],
      '2016-12-21': [
        {
          id: 483,
          parent_id: null,
          department_id: 2,
          user_id: 12,
          scenario_id: null,
          title: 'Event (4-5p)',
          description: null,
          note: null,
          room_id: null,
          url: '/calendar/show/id/483',
          css_class: 'event-success',
          started_at: '2016-11-04 17:00:00',
          ended_at: '2016-11-04 18:00:00',
          start: 17,
          duration: 1,
          is_all_day: 1,
          recurring_type: 0,
          created_at: '2016-11-11 22:59:22',
          attachment_path: null,
          attachment_name: null,
        },
      ],
      // '2017-12-19': [
      //   {
      //     start: 11,
      //     duration: 2.5,
      //   },
      //   {
      //     start: 15,
      //     duration: 3.5,
      //   },
      // ],
      // '2017-12-18': [
      //   {
      //     start: 8,
      //     duration: 3.5,
      //   },
      //   {
      //     start: 14,
      //     duration: 2.5,
      //   },
      // ],
      // '2017-12-15': [
      //   {
      //     start: 8.5,
      //     duration: 3.5,
      //   },
      //   {
      //     start: 13,
      //     duration: 4,
      //   },
      // ],
    }
  },
}
