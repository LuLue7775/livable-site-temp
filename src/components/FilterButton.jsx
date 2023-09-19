const FilterButton = ({ moredata, tag, handleFilterClicked }) => {
  return (
    <div className='float-left m-2 overflow-hidden rounded border-[1px] border-green-900 [&:hover]:bg-red-400/50'>
      <label className=' filter-label float-left h-6 w-auto rounded text-center'>
        <input
          className='absolute hidden text-white'
          type='checkbox'
          onClick={() => handleFilterClicked(tag)}
          disabled={!moredata?.length}
          // disabled={!moredata?.pages?.length}
        />
        <span className='block px-2 text-center '> {tag} </span>
      </label>
    </div>
  )
}
export default FilterButton
