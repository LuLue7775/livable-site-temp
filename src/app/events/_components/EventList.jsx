'use client'
import { setRefs } from '@/utils/functions'
import Event from './Event'
import { useRef } from 'react'
import useEvents from '@/utils/queries/useEvents'
import LoadingIcon from '@/components/LoadingIcon'

const EventList = ({ events, reachBottom }) => {
  const mainScopeRef = useRef(null)
  const containerRefs = useRef({})
  const { isFetching } = useEvents()

  return (
    <>
      <div ref={mainScopeRef} className='relative min-h-[1000px] '>
        {events?.length
          ? events?.map((item, index) => (
              <div
                ref={(element) => setRefs(element, item?.id, containerRefs)}
                key={item?.id}
                className='flex flex-col items-end'
              >
                <Event index={index} item={item} mainScopeRef={mainScopeRef} containerRefs={containerRefs} />
              </div>
            ))
          : !isFetching && (
              <h3 className='flex justify-center'>
                There is currently no events.
                <br /> Please stay tuned.
              </h3>
            )}
        <div ref={reachBottom} className='z-20 flex h-[120px] w-full items-center justify-center'>
          {isFetching && <LoadingIcon />}
        </div>
      </div>
    </>
  )
}
EventList.displayName = 'EventList'

export default EventList
