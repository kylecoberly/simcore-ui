// import axios from 'axios'

export default {
  base_url: '',
  // TODO: // Get data from a remote api. - Chad
  scenarios() {
    return [
      {
        id: 504,
        user_id: 704,
        category_id: 1,
        complexity_level_id: 2,
        department_id: 41,
        name: 'Abdominal Sepsis',
        description: 'differential diagnosis and initial management of the surgical patient with sepsis:',
        rating: 0,
        is_private: 0,
        completess: 0,
        created_at: '2017-01-26 16:09:18',
        deleted_at: '2017-01-26 16:09:48',
      },
      {
        id: 519,
        user_id: 704,
        category_id: 1,
        complexity_level_id: 2,
        department_id: 319,
        name: 'Neonatal Rescusitation',
        description: 'Differential diagnosis and initial management of the surgical patient with sepsis:',
        rating: 0,
        is_private: 0,
        completess: 0,
        created_at: '2017-02-01 17:46:58',
        deleted_at: '2017-02-01 17:47:31',
      },
    ]
  },
}
