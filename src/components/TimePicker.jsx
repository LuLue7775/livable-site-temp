'use client'
import Button from '@/components/Button'
import { useSelectedDate } from '@/context/calendarContext'
import useDelayRouting from '@/utils/hooks/useDelayRouting'
import { convertSpaceToDashLowerCase } from '@/utils/functions'
import { useRouter, usePathname } from 'next/navigation'
import cx from 'classnames'
import { useState } from 'react'
import { useDateFormatter } from 'react-aria'
import { getMapDocsFromFirestore } from '@/utils/firebase/firebase.utils'
import { useQuery } from '@tanstack/react-query'
import { getLocalTimeZone, isSameDay, parseDateTime } from '@internationalized/date'

const TimePicker = ({ eventTitleZh, eventTitleEn }) => {
  const { selectedDate } = useSelectedDate()
  const formatter = useDateFormatter({ dataStyle: 'full' })

  const { data: bookingAvailabilities } = useQuery({
    queryKey: ['event-availabilities'],
    queryFn: async () => await getMapDocsFromFirestore('event-availabilities'),
    refetchOnWindowFocus: false,
  })

  const pathname = usePathname()
  const getPathname = pathname.split('/')[2]
  const eventId = convertSpaceToDashLowerCase(decodeURI(getPathname))

  // find available time THAT SELECTED DAY
  const availabilities =
    bookingAvailabilities?.[eventId] &&
    Object.values(bookingAvailabilities?.[eventId]).filter((availability) => {
      return isSameDay(parseDateTime(availability.startTime), selectedDate)
    })
  const hasAvailability = availabilities?.length > 0
  availabilities?.sort((a, b) => {
    const startTimeA = new Date(a.startTime).getTime()
    const startTimeB = new Date(b.startTime).getTime()
    return startTimeA - startTimeB
  })

  return (
    <div className='relative grid h-full w-full grid-rows-[auto,1fr] overflow-x-hidden px-4 sm:px-8 lg:px-6 xl:px-10'>
      <div className='flex h-12 w-full items-center justify-center text-green-900'>
        <h2 className='text-lg font-semibold'> {formatter.format(selectedDate.toDate(getLocalTimeZone()))} </h2>
      </div>
      <div className='relative '>
        {/* Blur mask for days without availability */}
        <div
          className={cx(
            'absolute -inset-x-4 -inset-y-1 backdrop-blur-sm backdrop-saturate-0 transition',
            hasAvailability ? 'pointer-events-none z-0 opacity-0 duration-300 ease-out' : 'z-10 opacity-100 ease-in',
          )}
        ></div>

        {hasAvailability ? (
          <ul className='space-y-2 pt-2 sm:pb-8 md:pb-40'>
            {availabilities.map((availability) => (
              <TimeSlot
                key={availability.startTime}
                availability={availability}
                eventId={eventId}
                eventTitleZh={eventTitleZh}
                eventTitleEn={eventTitleEn}
              />
            ))}
          </ul>
        ) : (
          <ul className='space-y-2 py-2' aria-hidden='true'>
            {['8:00 AM', '9:00 AM', '2:00 PM', '4:00 PM'].map((time) => {
              return (
                <li
                  key={time}
                  className=' rounded-lg px-5 py-3 text-center font-semibold opacity-50
                    [@supports_not_(backdrop-filter:blur(0))]:line-through [@supports_not_(backdrop-filter:blur(0))]:opacity-30'
                >
                  {time}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default TimePicker

function TimeSlot({ availability, eventId, eventTitleZh, eventTitleEn }) {
  const routerMiddleware = useDelayRouting()
  const timeFormatter = useDateFormatter({ timeStyle: 'short', hour12: false })
  const [selectedTime, setSelectedTime] = useState(null)

  const isSelected = selectedTime === availability.startTime

  {
    /** @TODO 之後 eventId 改為 eventTitleEn 後台若改了TITLE要自動刪除原ID、用舊資料成立新ID加回。 因為TILE應該要跟著ID*/
  }

  return (
    <li
      className={cx(
        'flex items-center gap-1 overflow-hidden rounded text-green-900 border-b border-green-900/20',
        isSelected && 'bg-primary-600 bg-stripes',
      )}
    >
      <div className={cx('shrink-0 transition-all', isSelected ? 'basis-1/2 ease-out' : 'basis-full')}>
        <button
          impact={isSelected ? 'none' : 'light'}
          disabled={isSelected}
          className={cx(
            'w-full focus:ring-inset focus:ring-offset-0 active:translate-y-0',
            isSelected && 'disabled:opacity-100',
          )}
          onClick={() => setSelectedTime(availability.startTime)}
        >
          {timeFormatter.format(new Date(availability.startTime))}
          <p className='zh text-sm'>
            {' '}
            名額 <span className='font-mono'> seats:</span> {availability?.stock}{' '}
          </p>
        </button>
      </div>
      <div className='m-2 basis-1/2'>
        <Button
          size='small'
          impact='light'
          tabIndex={isSelected ? 0 : -1}
          className='w-full hover:text-red-400 focus-visible:ring-inset focus-visible:ring-offset-0'
          onClick={() =>
            routerMiddleware.push(
              `/booking-form?time=${availability.startTime}&eventEn=${eventId}&eventZh=${eventTitleZh}`,
            )
          }
        >
          CONFIRM
        </Button>
      </div>
    </li>
  )
}
