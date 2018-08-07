import moment from 'moment'
import dayjs from 'dayjs'

export const getBoundariesOfMonth = (date) => {
  date = dayjs(date)
  return {
    startDate: date.startOf('month').format('YYYY-MM-DD'),
    endDate: date.endOf('month').format('YYYY-MM-DD'),
  }
}

export const formatDateForDisplay = (date, format) => {
  return dayjs(date).format(format)
}

export const formatHoursAsMeridians = (hour) => {
  hour = hour === 0 || hour === 24
    ? 'Midnight'
    : hour === 12
      ? 'Noon'
      : hour

  return hour > 12 ? `${hour - 12}p` : (+hour ? `${hour}a` : hour)
}

export const formatTimeMeridians = (time) => {
  return time.replace(':00', '').replace('12am', 'Midnight').replace('12pm', 'Noon')
}

export const formatTimesForDisplay = (start, duration) => {
  const day = dayjs().startOf('day')

  const startTime   = day.add(start, 'hours').format('h:mma')
  const endTime     = day.add(start + duration, 'hours').format('h:mma')

  return `${formatTimeMeridians(startTime)} – ${formatTimeMeridians(endTime)}`
}

export const formatBlockHoursForDisplay = (duration) => {
  const output = duration.toString()
    .replace(/\.5/, '½')
    .replace(/^0/, '') || 0

  return `${output} ${(duration > 0 && duration <= 1 ? 'hour' : 'hours')}`
}
