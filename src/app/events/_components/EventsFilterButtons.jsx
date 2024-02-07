import FilterButton from '@/components/FilterButton'

const EventsFilterButtons = ({ events, eventsFilters, setEventsFilters }) => {
  const handleFilterClicked = (addfilter) => {
    if (eventsFilters.includes(addfilter)) {
      // If filter is already selected, remove it.
      setEventsFilters((prevfilter) => {
        return prevfilter.filter((item) => item !== addfilter)
      })
    } else {
      // otherwise add in
      setEventsFilters((prevfilter) => {
        return [...prevfilter, addfilter]
      })
    }
  }

  return (
    <>
      <h2>FILTER</h2>
      <div className='flex flex-wrap items-center'>
        <label> MATERIALS | </label>
        <FilterButton events={events} tag={'metal'} handleFilterClicked={handleFilterClicked} />
        <FilterButton events={events} tag={'ceramic'} handleFilterClicked={handleFilterClicked} />
        <FilterButton events={events} tag={'mixed-media'} handleFilterClicked={handleFilterClicked} />
      </div>
      <div className='flex flex-wrap items-center'>
        <label> FORMATS | </label>
        <FilterButton events={events} tag={'workshop'} handleFilterClicked={handleFilterClicked} />
        <FilterButton events={events} tag={'exhibition'} handleFilterClicked={handleFilterClicked} />
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
    </>
  )
}

export default EventsFilterButtons
