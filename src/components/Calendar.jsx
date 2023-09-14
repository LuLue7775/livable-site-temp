'use client'

import { getLocalTimeZone, parseDateTime, isSameDay, isToday, today } from '@internationalized/date'
import {
  Calendar as AriaCalendar,
  CalendarGrid,
  CalendarHeaderCell,
  CalendarGridHeader,
  Heading,
  CalendarGridBody,
  CalendarCell,
  Button as AriaButton,
} from 'react-aria-components'
import cx from 'classnames'
import { useSelectedDate } from '@/context/calendarContext'
import { getMapDocsFromFirestore } from '@/utils/firebase/firebase.utils'
import { useQuery } from '@tanstack/react-query'
import { convertSpaceToDashLowerCase } from '@/utils/functions'
import { usePathname } from 'next/navigation'

const Calendar = () => {
  const { setSelectedDate } = useSelectedDate()

  const { data: bookingAvailabilities, isFetching } = useQuery({
    queryKey: ['event-availabilities'],
    queryFn: async () => await getMapDocsFromFirestore('event-availabilities'),
    refetchOnWindowFocus: false,
  })

  const pathname = usePathname()
  const getPathname = pathname.split('/')[2]
  const eventId = convertSpaceToDashLowerCase(decodeURI(getPathname))

  // find available time THAT SELECTED DAY
  const availabilities = bookingAvailabilities?.[eventId] && Object.values(bookingAvailabilities?.[eventId])
  // console.log(bookingAvailabilities)
  if (isFetching) return <div> isLoading..</div>
  return (
    <AriaCalendar
      aria-label='Booking availabilities'
      onChange={setSelectedDate}
      minValue={today(getLocalTimeZone())}
      maxValue={today(getLocalTimeZone()).add({ months: 5 })}
      className='text-green-900'
    >
      <header className='flex w-full items-center justify-between'>
        <MonthsNavigation />
      </header>

      <CalendarGrid className='w-full table-fixed border-separate ' weekdayStyle='long'>
        <CalendarGridHeader>
          {(day) => (
            <CalendarHeaderCell>
              <abbr
                className='cursor-help text-sm font-semibold uppercase tracking-wider text-slate-700 no-underline'
                title={day}
              >
                {day.slice(0, 3)}
              </abbr>
            </CalendarHeaderCell>
          )}
        </CalendarGridHeader>

        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              date={date}
              className={({ isSelected, isDisabled }) => {
                const baseClasses = `relative mx-auto grid aspect-square w-12 max-w-full place-items-center rounded-full 
                    focus:outline-none focus:ring-1 focus:ring-green-900 focus:ring-primary-400 focus:ring-offset-1`

                return availabilities
                  ? getCalendarCellClasses({
                      date,
                      isSelected,
                      isDisabled,
                      availabilities,
                      baseClasses,
                    })
                  : baseClasses
              }}
            >
              {({ isSelected, formattedDate }) => (
                <>
                  <span> {formattedDate}</span>
                  {isToday(date, getLocalTimeZone()) && (
                    <span
                      className={cx(
                        'absolute bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full',
                        isSelected ? 'bg-white' : 'bg-primary-600',
                      )}
                    ></span>
                  )}
                </>
              )}
            </CalendarCell>
          )}
        </CalendarGridBody>
      </CalendarGrid>
    </AriaCalendar>
  )
}

export default Calendar

function MonthsNavigation() {
  const monthNavigationButtonClasses = `
     aspect-square w-10 max-w-full place-items-center rounded-full 
    border border-green-900 text-green-900 hover:text-primary-600 hover:bg-red-400/50
    focus:outline-none focus:ring focus:ring-green-900 focus:ring-offset-1 
    disabled:border-green-900 disabled:text-slate-300 disabled:hover:text-white disabled:hover:bg-gray-400/50
  `
  return (
    <div className='flex w-full items-center justify-around gap-2'>
      <AriaButton slot='previous' className={monthNavigationButtonClasses}>
        {' '}
        &lt;{' '}
      </AriaButton>
      <Heading className='text-lg font-semibold' />

      <AriaButton slot='next' className={monthNavigationButtonClasses}>
        {' '}
        &gt;{' '}
      </AriaButton>
    </div>
  )
}

function getCalendarCellClasses({ date, isSelected, isDisabled, availabilities, baseClasses }) {
  /**@TODO 這方式每個日期都要iterate一次， 必須把資料結構改成map提升效能*/
  // check if this date has vacant. any time period is available, make that day available.
  const hasAvailability = availabilities.some((availability) => {
    // console.log(parseDateTime(availability.startTime), date)
    return isSameDay(parseDateTime(availability.startTime), date)
  })

  const isCurrentDay = isToday(date, getLocalTimeZone())

  const getStatus = () => {
    if (isSelected) return 'SELECTED'
    if (isDisabled) return 'DISABLED'
    if (hasAvailability) return 'VACANCY'
    return isCurrentDay ? 'TODAY_NO_VACANCY' : 'NO_VACANCY'
  }

  /**@TODO select animation bg-stripes */
  const statusClasses = {
    SELECTED: 'bg-primary-600 font-bold',
    DISABLED: 'pointer-events-none text-slate-300 bg-slate-100',
    VACANCY: 'bg-primary-100 font-bold text-primary-700 hover:bg-red-400/50',
    NO_VACANCY: 'text-slate-800/80 hover:bg-slate-100',
    TODAY_NO_VACANCY: 'font-bold text-primary-700 hover:bg-slate-100 hover:text-slate-800',
  }

  return cx(baseClasses, statusClasses[getStatus()])
}
