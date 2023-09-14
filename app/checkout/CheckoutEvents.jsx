'use client'

import { useCart } from '@/context/cartContext'
import { convertIdToTitle } from '@/utils/functions'
import AttendantForm from './AttendantForm'
import Link from 'next/link'

const CheckoutEvents = () => {
  const { eventItems } = useCart()

  return (
    <>
      <h2 className='pb-4'> Event list </h2>
      {eventItems
        ? Object.entries(eventItems).map(([eventId, bookTime]) =>
            Object.values(bookTime).flat().length ? (
              <div key={eventId}>
                <Link href={`/events/${eventId}`}>
                  <h5 className='max-w-[300px] hover:text-red-400'>{convertIdToTitle(eventId)}</h5>
                </Link>
                {Object.entries(bookTime).map(([time, attendants]) => (
                  <div key={time} className='flex w-[300px] flex-wrap p-2'>
                    <h5>{time}</h5>
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
