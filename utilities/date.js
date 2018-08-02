import moment from 'moment'

export const formatDateForDisplay = (date, format) => {
  return moment(date).format(format)
}

export const formatTimeMeridians = (time) => {
  return time.replace(':00', '').replace('12am', 'Midnight').replace('12pm', 'Noon')
}

export const formatTimesForDisplay = (start, duration) => {
  const day = moment().startOf('day')

  const startTime   = day.add(start, 'hours').format('h:mma')
  const endTime     = day.add(duration, 'hours').format('h:mma')

  return `${formatTimeMeridians(startTime)} – ${formatTimeMeridians(endTime)}`
}

export const formatBlockHoursForDisplay = (duration) => {
  const output = duration.toString()
    .replace(/\.5/, '½')
    .replace(/^0/, '') || 0

  return `${output} ${(duration > 0 && duration <= 1 ? 'hour' : 'hours')}`
}
