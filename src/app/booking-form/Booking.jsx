'use client'
import BookingForm from './BookingForm'
import { useSearchParams, useRouter } from 'next/navigation'
import { useDateFormatter } from 'react-aria'
import { useRef } from 'react'

const Booking = () => {
  const mainScopeRef = useRef(null)
  const router = useRouter()

  const searchParams = useSearchParams()
  const time = searchParams?.get('time')
  const eventEn = searchParams?.get('eventEn')
  const eventZh = searchParams?.get('eventZh')
  const dateFormatter = useDateFormatter({ dateStyle: 'full' })
  const timeFormatter = useDateFormatter({ timeStyle: 'short' })
  const formattedTime = time ? `${dateFormatter.format(new Date(time))} at ${timeFormatter.format(new Date(time))}` : ''

  return (
    <div
      ref={mainScopeRef}
      className='mt-4 flex h-full w-full translate-y-16 flex-col items-end overflow-x-hidden text-green-900'
    >
      <div
        className={
          'content-head relative h-[52px] w-full min-w-[350px] translate-x-12 justify-end md:w-[calc(100%-200px)]'
        }
      >
        <p
          style={{ opacity: 0 }}
          className='horizontal-line relative flex h-[52px] w-full border-t border-green-900/60'
        />
      </div>

      <div
        style={{ opacity: 0 }}
        className='content-body relative 
                  bottom-0 min-h-[600px] 
                  w-full min-w-[350px] translate-x-[-4px] translate-y-[1px] border-l border-green-900/60 p-6 md:w-[calc(100%-200px)]'
      >
        <button
          data-testid='booking-return'
          className='cursor-pointer hover:text-red-400'
          onClick={() => router.push(`/events/${eventEn}`)}
        >
          [ &lt;- back to event ]
        </button>

        <h1 data-testid='booking-title' className='text-xl'>
          即將為您預約 {eventZh}
        </h1>
        <h2 data-testid='booking-title' className='text-xl'>
          You are about to book {eventEn}
        </h2>
        <div data-testid='booking-date' className='space-y-2 '>
          <p>
            <strong>{formattedTime}</strong>
          </p>
          <p>請確實填寫正確資訊 Please fill in the form below to confirm.</p>
        </div>

        <BookingForm mainScopeRef={mainScopeRef} eventEn={eventEn} time={time} />
      </div>
    </div>
  )
}
export default Booking
