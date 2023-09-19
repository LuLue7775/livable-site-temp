import React, { useEffect, useMemo, useState } from 'react'
import { filterIncomingData } from '@/utils/functions'
import FilterButton from '@/components/FilterButton'

const EventsFilterButtons = ({ moredata, setFilteredData }) => {
  const [filters, setFilters] = useState([])

  const handleFilterClicked = (addfilter) => {
    if (!moredata?.pages?.length) return
    // If filter is already selected, remove it.
    if ((filters === undefined || filters.length) && filters.includes(addfilter)) {
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

  const flattenData = useMemo(() => {
    if (moredata?.pages?.length <= 1) return moredata?.pages[0]?.data
    return moredata?.pages?.flatMap((page) => page.data)
  }, [moredata])

  useEffect(() => {
    // if filters is empty, reset all data back to view.
    if (filters && (filters === undefined || !filters.length)) {
      setFilteredData(flattenData)
      return
    }
    // otherwise filter what's stored in tanstack-query
    const filteredData = filterIncomingData(flattenData, filters)
    setFilteredData(filteredData)
  }, [filters, flattenData])
  return (
    <div className='font-mono '>
      <h2 >FILTER</h2>
      <div className='flex flex-wrap items-center'>
        <label> MATERIALS | </label>
        <FilterButton  moredata={moredata} tag={'metal'} handleFilterClicked={handleFilterClicked} />
        <FilterButton  moredata={moredata} tag={'ceramic'} handleFilterClicked={handleFilterClicked} />
        <FilterButton  moredata={moredata} tag={'wood'} handleFilterClicked={handleFilterClicked} />
        <FilterButton  moredata={moredata} tag={'mixed-media'} handleFilterClicked={handleFilterClicked} />
      </div>

      <div className='flex flex-wrap items-center'>
        <label> FORMATS | </label>
        <FilterButton  moredata={moredata} tag={'workshop'} handleFilterClicked={handleFilterClicked} />
        <FilterButton  moredata={moredata} tag={'exhibition'} handleFilterClicked={handleFilterClicked} />
      </div>
      <div className='flex flex-wrap items-center'>
        <label> DATE | </label>
        <FilterButton  moredata={moredata} tag={'OCT_2023'} handleFilterClicked={handleFilterClicked} />
        <FilterButton  moredata={moredata} tag={'NOV_2023'} handleFilterClicked={handleFilterClicked} />
        <FilterButton  moredata={moredata} tag={'archive'} handleFilterClicked={handleFilterClicked} />
      </div>
    </div>
  )
}

export default EventsFilterButtons
