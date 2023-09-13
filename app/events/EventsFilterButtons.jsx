import React, { useEffect, useMemo, useState } from 'react'
import { filterIncomingData } from '@/utils/functions'

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
    <div className='font-mono'>
      <h2>FILTER</h2>
      <div className='flex flex-wrap items-center'>
        <label> MATERIALS | </label>
        <div className='[&:hover]:bg-red-400 float-left m-2 overflow-hidden rounded border-[1px] border-livable'>
          <label className=' filter-label float-left h-6 w-auto rounded text-center'>
            <input
              className='text-white absolute hidden'
              type='checkbox'
              onClick={() => handleFilterClicked('metal')}
              disabled={!moredata?.pages?.length}
            />
            <span className='block px-2 text-center '> metal </span>
          </label>
        </div>
        <div className='[&:hover]:bg-red-400 float-left m-2 overflow-hidden rounded border-[1px] border-livable'>
          <label className=' filter-label float-left h-6 w-auto rounded text-center'>
            <input
              className='text-white absolute hidden'
              type='checkbox'
              onClick={() => handleFilterClicked('ceramic')}
              disabled={!moredata?.pages?.length}
            />
            <span className='block px-2 text-center '> ceramic </span>
          </label>
        </div>
        <div className='[&:hover]:bg-red-400 float-left m-2 overflow-hidden rounded border-[1px] border-livable'>
          <label className=' filter-label float-left h-6 w-auto rounded text-center'>
            <input
              className='text-white absolute hidden'
              type='checkbox'
              onClick={() => handleFilterClicked('wood')}
              disabled={!moredata?.pages?.length}
            />
            <span className='block px-2 text-center '> wood </span>
          </label>
        </div>
        <div className='[&:hover]:bg-red-400 float-left m-2 overflow-hidden rounded border-[1px] border-livable'>
          <label className=' filter-label float-left h-6 w-auto rounded  text-center'>
            <input
              className='text-white absolute hidden'
              type='checkbox'
              onClick={() => handleFilterClicked('mixed-media')}
              disabled={!moredata?.pages?.length}
            />
            <span className='block px-2 text-center '> mixed-media </span>
          </label>
        </div>
      </div>

      <div className='flex flex-wrap items-center'>
        <label> FORMATS | </label>
        <div className='[&:hover]:bg-red-400 float-left m-2 overflow-hidden rounded border-[1px] border-livable'>
          <label className=' filter-label float-left h-6 w-auto rounded text-center'>
            <input
              className='text-white absolute hidden'
              type='checkbox'
              onClick={() => handleFilterClicked('workshop')}
              disabled={!moredata?.pages?.length}
            />
            <span className='block px-2 text-center '> workshop </span>
          </label>
        </div>
        <div className='[&:hover]:bg-red-400 float-left m-2 overflow-hidden rounded border-[1px] border-livable'>
          <label className=' filter-label float-left h-6 w-auto rounded text-center'>
            <input
              className='text-white absolute hidden'
              type='checkbox'
              onClick={() => handleFilterClicked('exhibition')}
              disabled={!moredata?.pages?.length}
            />
            <span className='block px-2 text-center '> exhibition </span>
          </label>
        </div>
      </div>
      <div className='flex flex-wrap items-center'>
        <label> DATE | </label>
        <div className='[&:hover]:bg-red-400 float-left m-2 overflow-hidden rounded border-[1px] border-livable'>
          <label className=' filter-label float-left h-6 w-auto rounded text-center'>
            <input
              className='text-white absolute hidden'
              type='checkbox'
              onClick={() => handleFilterClicked('OCT_2023')}
              disabled={!moredata?.pages?.length}
            />
            <span className='block px-2 text-center '> OCT_2023 </span>
          </label>
        </div>
        <div className='[&:hover]:bg-red-400 float-left m-2 overflow-hidden rounded border-[1px] border-livable'>
          <label className=' filter-label float-left h-6 w-auto rounded text-center'>
            <input
              className='text-white absolute hidden'
              type='checkbox'
              onClick={() => handleFilterClicked('NOV_2023')}
              disabled={!moredata?.pages?.length}
            />
            <span className='block px-2 text-center '> NOV_2023 </span>
          </label>
        </div>

        <div className='[&:hover]:bg-red-400 float-left m-2 overflow-hidden rounded border-[1px] border-livable'>
          <label className=' filter-label float-left h-6 w-auto rounded text-center'>
            <input
              className='text-white absolute hidden'
              type='checkbox'
              onClick={() => handleFilterClicked('archive')}
              disabled={!moredata?.pages?.length}
            />
            <span className='block px-2 text-center '> archive </span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default EventsFilterButtons
