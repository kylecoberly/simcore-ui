function filterAvailabilities(instructors, filters) {
  if (!(instructors instanceof Array)){
    instructors = normalize(instructors)
  }
  return deepClone(instructors)
    .map(filterDuration(filters.duration))
    .map(splitLongDurations(filters.duration))
    .reduce(aggregateDays, [])
    .map(filterEnoughInstructors(filters.instructorCount))
    .map(filterRequiredInstructors(filters.instructors))
}

function deepClone(object) {
  return JSON.parse(JSON.stringify(object))
}

// Reorganizes the API response to something workable
function normalize(unnormalizedUsers) {
  return Object.keys(unnormalizedUsers).map(id => {
    return {
      id: +id,
      days: unnormalizedUsers[id].map(dayAvailability => {
        const date = Object.keys(dayAvailability)[0]
        return {
          date: stripTime(date),
          startTime: dayAvailability[date].startTime,
          duration: dayAvailability[date].duration,
        }
      })
    }
  }).map(user => {
    user.days = stripKeys(user.days.reduce(groupUserDays, {}))
    return user
  })
}

function groupUserDays(groupedAvailabilities, availability) {
  groupedAvailabilities[availability.date]
    ? groupedAvailabilities[availability.date].availabilities.push({
      startTime: availability.startTime,
      duration: availability.duration,
    })
    : groupedAvailabilities[availability.date] = initializeAvailabilityDate(availability)
  return groupedAvailabilities

  function initializeAvailabilityDate(availability) {
    return {
      date: availability.date,
      availabilities: [{
        startTime: availability.startTime,
        duration: availability.duration,
      }]
    }
  }
}

function filterDuration(duration) {
  return function(user){
    user.days = user.days.map(day => {
      day.availabilities = day.availabilities
        .filter(availability => availability.duration >= duration)
      return day
    })
    return user
  }
}

function splitLongDurations(duration){
  return function(user){
    user.days = user.days.map(day => {
      day.availabilities = expandAvailabilitiesByDuration(day.availabilities, duration)
      return day
    })
    return user
  }
}

function filterEnoughInstructors(count) {
  return function(day){
    day.availabilities = day.availabilities
      .filter(availability => availability.instructors.length >= count)
    return day
  }
}

function filterRequiredInstructors(instructors) {
  return function(day){
    if (!instructors || instructors.length < 1) return day
    day.availabilities = day.availabilities
      .filter(availability => instructors
        .every(instructor => availability.instructors.includes(instructor))
      )
    return day
  }
}

// Utilities
function stripKeys(object) {
  return Object.keys(object).reduce((array, key) => {
    array.push(object[key])
    return array
  }, [])
}

function stripTime(datetime) {
  return datetime.split(' ')[0]
}

function expandAvailabilitiesByDuration(availabilities, duration){
  return availabilities.reduce((expandedAvailabilities, availability) => {
    const newAvailabilities = expandedAvailabilities.concat(expandAvailability(availability, duration))
    return newAvailabilities
  }, [])
}

function expandAvailability(availability, duration) {
  const endTime = availability.startTime + availability.duration
  const availabilities = []
  for (let startTime = availability.startTime; startTime + duration <= endTime; startTime += 0.5){
    availabilities.push({ startTime, duration })
  }
  return availabilities
}

function aggregateDays(aggregateDays, user) {
  return user.days.reduce((aggregateDays, userDay) => {
    const aggregateDay = findOrAdd(aggregateDays, userDay, 'date')
    userDay.availabilities.reduce(foldUserAvailabilityIntoAggregateDay(user.id), aggregateDay)

    return aggregateDays
  }, aggregateDays)
}

function foldUserAvailabilityIntoAggregateDay(userId){
  return function foldAvailabilityIntoAggregateDay(aggregateDay, userAvailability){
    const currentAvailability = findOrAdd(aggregateDay.availabilities, userAvailability, 'startTime')
    addUserToAvailability(userId)(currentAvailability)

    return aggregateDay
  }

  function addUserToAvailability(userId) {
    return function addToAvailability(availability){
      availability.instructors
        ? availability.instructors.push(userId)
        : availability.instructors = [userId]
      return availability
    }
  }
}

function findOrAdd(list, item, property) {
  let currentItem = list.find(existingItem => existingItem[property] === item[property])
  if (!currentItem){
    currentItem = item
    list.push(currentItem)
    list = sortTimeBy(list, property)
  }
  return currentItem

  function sortTimeBy(list, property) {
    const moment = require('moment')
    return list.sort((a, b) => {
      let sortOrder
      if (moment(a[property]).isBefore(b[property])){
        sortOrder = -1
      } else if (moment(a[property]).isAfter(b[property])) {
        sortOrder = 1
      } else {
        sortOrder = 0
      }
      return sortOrder
    })
  }
}

module.exports = {
  filterAvailabilities,
  expandAvailabilitiesByDuration,
  expandAvailability,
  aggregateDays,
  normalize,
};
