/* eslint no-unused-vars: 0 */
/* eslint quote-props: 0 */
/* eslint comma-dangle: 0 */


// 3 hours (6 segments),  4 instructors
const expectedSingleDayBlocksFourInstructorsFiveHours = {
  '2018-03-01': {
    '5': {
      'startSegment': 10,
      'endSegment': 47,
      'startTime': 5,
      'endTime': 24,
      'numberOfSegments': 38,
      'duration': 19,
      'segments': {
        '15': [       'bbb',                                                  'aaa',                                                  'ccc',                  'ddd',  'eee'],
        '16': [                                                               'aaa',          'fff',                  'ggg',          'ccc',  'hhh',          'ddd',  'eee'],
        '17': [                                                               'aaa',          'iii',  'fff',  'jjj',                  'ccc',  'hhh',  'kkk',  'ddd',  'eee'],
        '18': [               'lll',                  'mmm',                  'aaa',          'iii',  'fff',  'jjj',                  'ccc',  'hhh',  'kkk',  'ddd',  'eee'],
        '19': [               'lll',                  'mmm',          'ooo',  'aaa',          'iii',  'fff',  'jjj',          'nnn',  'ccc',  'hhh',  'kkk',  'ddd',  'eee'],
        '20': [               'lll',                  'mmm',          'ooo',  'aaa',          'iii',  'fff',  'jjj',          'nnn',  'ccc',  'hhh',  'kkk',  'ddd',  'eee'],
        '21': [               'lll',                  'mmm',          'ooo',  'aaa',          'iii',  'fff',  'jjj',          'nnn',  'ccc',  'hhh',  'kkk',  'ddd',  'eee'],
        '22': ['ttt',         'lll',          'ppp',  'mmm',          'ooo',  'aaa',  'sss',  'iii',  'fff',  'jjj',          'nnn',  'ccc',  'hhh',  'kkk',  'ddd',  'eee'],
        '23': ['ttt',         'lll',          'ppp',  'mmm',          'ooo',  'aaa',  'sss',  'iii',  'fff',  'jjj',          'nnn',  'ccc',  'hhh',  'kkk',  'ddd',  'eee',  'rrr'], // a15, c15,  d15,  e15 -- l18
        '24': ['ttt',                         'ppp',  'mmm',  'qqq',  'ooo',          'sss',  'iii',  'fff',  'jjj',          'nnn',          'hhh',  'kkk',  'ddd',  'eee',  'rrr'], // m18
        '25': ['ttt',                         'ppp',          'qqq',  'ooo',          'sss',  'iii',  'fff',  'jjj',          'nnn',          'hhh',  'kkk',  'ddd',  'eee',  'rrr'],
        '26': ['ttt',                         'ppp',          'qqq',  'ooo',          'sss',  'iii',  'fff',  'jjj',          'nnn',          'hhh',  'kkk',  'ddd',  'eee',  'rrr'], // e15
        '27': ['ttt',                         'ppp',          'qqq',  'ooo',          'sss',  'iii',  'fff',  'jjj',          'nnn',          'hhh',  'kkk',  'ddd',          'rrr'],
        '28': ['ttt',                         'ppp',          'qqq',  'ooo',          'sss',  'iii',  'fff',  'jjj',          'nnn',          'hhh',  'kkk',  'ddd',          'rrr'], // k17
        '29': ['ttt', 'bbb',                  'ppp',          'qqq',  'ooo',          'sss',  'iii',  'fff',  'jjj',          'nnn',          'hhh',          'ddd',          'rrr'], // b, q, s, r
        '30': ['ttt', 'bbb',                  'ppp',          'qqq',  'ooo',          'sss',  'iii',  'fff',  'jjj',  'ggg',  'nnn',          'hhh',          'ddd',          'rrr'], // f16
        '31': ['ttt', 'bbb',                  'ppp',          'qqq',  'ooo',          'sss',  'iii',          'jjj',  'ggg',  'nnn',          'hhh',          'ddd',          'rrr'],
        '32': ['ttt', 'bbb',                  'ppp',          'qqq',  'ooo',          'sss',  'iii',          'jjj',  'ggg',  'nnn',          'hhh',          'ddd',          'rrr'], // h16, n19
        '33': [       'bbb',                  'ppp',          'qqq',  'ooo',          'sss',  'iii',          'jjj',  'ggg',                                  'ddd',          'rrr'],
        '34': [       'bbb',                  'ppp',          'qqq',  'ooo',          'sss',  'iii',          'jjj',  'ddd',                                                  'rrr'], // d15, j17
        '35': [       'bbb',          'mmm',                  'qqq',  'ooo',  'aaa',  'sss',  'iii',                                                                  'eee',  'rrr'], // i17
        '36': [       'bbb',          'mmm',                  'qqq',  'ooo',  'aaa',  'sss',                                                                          'eee',  'rrr'], // o19
        '37': [       'bbb',          'mmm',                  'qqq',          'aaa',  'sss',                                                                          'eee',  'rrr'], // b, q, s, r
    // '38': [       'bbb',          'mmm',                                  'aaa',                                                                                  'eee',  'rrr'],
    // '43': ['ttt', 'bbb',                                                                          'fff',                                          'kkk',  'ddd'],
    // '44': ['ttt', 'bbb',  'lll',                                                         'iii',   'fff',                                          'kkk',  'ddd'],
    // '45': ['ttt', 'bbb',  'lll',                                                         'iii',   'fff',                          'ccc',          'kkk',  'ddd'],
    // '46': ['ttt', 'bbb',  'lll',                                                         'iii',   'fff',  'jjj',                  'ccc',          'kkk',  'ddd'],
    // '47': ['ttt',         'lll',                                                         'iii',   'fff',  'jjj',                  'ccc',          'kkk',  'ddd'],
      },
      'uniqueInstructorIds': ['bbb',  'ccc',  'eee',  'aaa',  'ddd',  'fff',  'ggg',  'hhh',  'iii',  'jjj',  'kkk',  'lll',  'mmm',  'ooo',  'nnn',  'ttt',  'ppp',  'sss',  'rrr',  'qqq'],
      'numberOfInstructors': 20
    }
  },
}
