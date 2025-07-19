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

// {seconds: 1700038800, nanoseconds: 0} => 2023-11-15T17:00
export const convertTimestampToFormatDate = (timestampData) => {
  if (!timestampData) return
  const seconds = timestampData?.seconds
  const milliseconds = timestampData?.nanoseconds / 1000000 // Convert nanoseconds to milliseconds
  const date = new Date(seconds * 1000 + milliseconds)
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset()) // Set the timezone to UTC
  const formattedDate = date.toISOString().slice(0, 16)

  return formattedDate
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
  if (!refMap?.current) return
  const cleanId = targetId?.replace(' ', '') || 'unknownID' // remove space
  refMap.current[cleanId] = element
}

class ResponseError extends Error {
  constructor(response) {
    super(`${response.status} ${response.statusText}`)
    this.name = 'ResponseError'
    this.response = response
  }
}

export const mapError = (error) => {
  if (!error) return undefined
  if (error instanceof ResponseError) return error.response.statusText
  if (error instanceof Error) return error.message
  return 'Unknown error'
}

export const sortFunctionMap = (sortStatus, prop) => {
  switch (sortStatus) {
    case 'asc':
      return (a, b) => {
        if (prop === 'editedAt.seconds') return a.editedAt?.seconds - b.editedAt?.seconds
        else return a.price - b.price
      }
    case 'dsc':
      return (a, b) => {
        if (prop === 'editedAt.seconds') return b.editedAt?.seconds - a.editedAt?.seconds
        else return b.price - a.price
      }
  }
}

/**
 * Prevents adjacent items with the same grid_size while preserving original order
 * @param {Array} products - Array of products with grid_size property
 * @returns {Array} - Reordered products with no adjacent same grid_size
 */
export const preventAdjacentSameGridSize = (products) => {
  if (!products || products.length <= 1) return products

  const result = [...products]
  let i = 1
  let swaps = 0

  while (i < result.length) {
    const current = result[i]
    const previous = result[i - 1]
    
    // If current and previous have the same grid_size, try to swap with next item
    if (current.grid_size === previous.grid_size) {
      // Look for a different grid_size in the next few items (prefer optimal swaps)
      let swapIndex = -1
      for (let j = i + 1; j < Math.min(i + 4, result.length); j++) {
        if (result[j].grid_size !== current.grid_size && result[j].grid_size !== previous.grid_size) {
          swapIndex = j
          break
        }
      }
      
      // If no optimal swap found, look for any different grid_size
      if (swapIndex === -1) {
        for (let j = i + 1; j < result.length; j++) {
          if (result[j].grid_size !== current.grid_size) {
            swapIndex = j
            break
          }
        }
      }
      
      // Perform the swap if found
      if (swapIndex !== -1) {
        [result[i], result[swapIndex]] = [result[swapIndex], result[i]]
        swaps++
        // Don't increment i here, check the new current item again
        continue
      }
    }
    
    i++
  }

  // Debug logging (remove in production)
  if (swaps > 0) {
    console.log(`Grid size randomization: ${swaps} swaps made to prevent adjacent same grid_size`)
  }

  return result
}

/**
 * Evenly spreads products by grid_size, interleaving them for a more dynamic layout.
 * Preserves original order within each grid_size group.
 * @param {Array} products
 * @returns {Array}
 */
export const interleaveByGridSize = (products) => {
  if (!products || products.length <= 1) return products

  // Group by grid_size
  const groups = {}
  products.forEach((p) => {
    const size = p.grid_size || 'sm'
    if (!groups[size]) groups[size] = []
    groups[size].push(p)
  })

  // Sort group keys by largest group first for best spread
  const groupKeys = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length)

  const result = []
  let exhausted = 0
  let i = 0
  while (result.length < products.length && exhausted < groupKeys.length) {
    exhausted = 0
    for (const key of groupKeys) {
      if (groups[key].length > 0) {
        result.push(groups[key].shift())
      } else {
        exhausted++
      }
    }
    i++
    if (i > products.length * 2) break // safety
  }
  return result
}
