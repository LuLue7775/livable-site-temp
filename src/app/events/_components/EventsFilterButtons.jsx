import React, { useEffect, useState } from 'react'
import { filterIncomingData } from '@/utils/functions'
import FilterButton from '@/components/FilterButton'

const EventsFilterButtons = ({ flattenedStoreData, setFilteredData }) => {
  const [filters, setFilters] = useState([])

  const handleFilterClicked = (addfilter) => {
    if (!flattenedStoreData?.length) return
    if ((filters === undefined || filters.length) && filters.includes(addfilter)) {
      // If filter is already selected, remove it.
      setFilters((prevfilter) => {
        return prevfilter.filter((item) => item !== addfilter)
      })
    } else {
      // otherwise add in
      setFilters((prevfilter) => {
        return [...prevfilter, addfilter]
      })
    }
  }

  useEffect(() => {
    // if filters is empty, reset all data back to view.
    if (filters && (filters === undefined || !filters.length)) {
      setFilteredData(flattenedStoreData)
      return
    }
    // recheck all data in store if filter is added (or operator)
    const filteredData = filterIncomingData(flattenedStoreData, filters)
    setFilteredData(filteredData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, flattenedStoreData])

  return (
    <div>
      <h2>FILTER</h2>
      <div className='flex flex-wrap items-center'>
        <label> MATERIALS | </label>
        <FilterButton flattenedStoreData={flattenedStoreData} tag={'metal'} handleFilterClicked={handleFilterClicked} />
        <FilterButton
          flattenedStoreData={flattenedStoreData}
          tag={'ceramic'}
          handleFilterClicked={handleFilterClicked}
        />
        <FilterButton
          flattenedStoreData={flattenedStoreData}
          tag={'mixed-media'}
          handleFilterClicked={handleFilterClicked}
        />
      </div>

      <div className='flex flex-wrap items-center'>
        <label> FORMATS | </label>
        <FilterButton
          flattenedStoreData={flattenedStoreData}
          tag={'workshop'}
          handleFilterClicked={handleFilterClicked}
        />
        <FilterButton
          flattenedStoreData={flattenedStoreData}
          tag={'exhibition'}
          handleFilterClicked={handleFilterClicked}
        />
      </div>
      {/* <div className='flex flex-wrap items-center'>
        <label> DATE | </label>
        <FilterButton
          flattenedStoreData={flattenedStoreData}
          tag={'NOV_2023'}
          handleFilterClicked={handleFilterClicked}
        />
        <FilterButton
          flattenedStoreData={flattenedStoreData}
          tag={'DEC_2023'}
          handleFilterClicked={handleFilterClicked}
        />
        <FilterButton
          flattenedStoreData={flattenedStoreData}
          tag={'archive'}
          handleFilterClicked={handleFilterClicked}
        />
      </div> */}
    </div>
  )
}

export default EventsFilterButtons
