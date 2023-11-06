'use client'

import { useCart } from '@/context/cartContext'
import { convertIdToTitle } from '@/utils/functions'
import AttendantForm from './AttendantForm'
import useDelayRouting from '@/utils/hooks/useDelayRouting'

const CheckoutEvents = () => {
  const { eventItems } = useCart()
  const routerMiddleware = useDelayRouting()

  return (
    <>
      <h2 className='py-2 font-serif font-bold '> Event list </h2>
      {eventItems
        ? Object.entries(eventItems).map(([eventId, bookTime]) =>
            Object.values(bookTime).flat().length ? (
              <div key={eventId}>
                <a onClick={() => routerMiddleware.push(`/events/${eventId}`)}>
                  <h5 className='max-w-[250px] cursor-pointer font-serif hover:text-red-400'>
                    {convertIdToTitle(eventId)}
                  </h5>
                </a>
                {Object.entries(bookTime).map(([time, attendants]) => (
                  <div key={time} className='flex w-[300px] flex-wrap p-2 font-mono'>
                    <h5>時間 time: {time}</h5>
                    {attendants?.map((attendant) => (
                      <AttendantForm key={attendant.uuid} attendant={attendant} timeId={time} eventId={eventId} />
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              ''
            ),
          )
        : ''}
    </>
  )
}

export default CheckoutEvents
