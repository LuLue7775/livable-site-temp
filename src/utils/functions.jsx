import gsap from 'gsap'

export const convertSpaceToDashLowerCase = (string) => {
  return string.replace(/\s+/g, '-').toLowerCase()
}
export const convertIdToTitle = (string) => {
  return string.replace(/-/g, ' ').toUpperCase()
}

// data[0]?.expires_on?.toDate()
export const convertTimestampToDateAndTime = (date) => {
  const dataArray = date.toDate().toString().split(' ')
  const covertedData = {
    year: dataArray[3],
    date: [dataArray[1].toUpperCase(), dataArray[2]].join(' '),
    time: dataArray[4].slice(0, 5),
    week: dataArray[0].toUpperCase(),
    originalDate: date.toMillis(),
  }
  return covertedData
}

export const filterIncomingData = (data, filters) => {
  return data?.reduce((acc, item) => {
    if (!item.tags.length) return acc

    // OR operator
    let checkSatisfied = filters.some((filter) => {
      return item.tags.includes(filter)
    })
    if (checkSatisfied) acc.push(item)
    return acc
  }, [])
}


export const setRefs = (element, targetId, refMap) => {
  const cleanId = targetId.replace(' ', '') // remove space
  refMap.current[cleanId] = element
}
