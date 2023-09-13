'use client'

import Calendar from '@/components/Calendar'
import TimePicker from '@/components/TimePicker'
import { SelectedDateProvider } from '@/context/calendarContext'

const EventDateTime = ({eventTitleZh, eventTitleEn}) => {
  return (
    <SelectedDateProvider>
      <div
        className='relative grid h-auto min-h-[358px] w-full
                  place-items-center
                  overflow-hidden 
                  md:h-[40%]
                  md:w-3/5
                  md:min-w-[800px] md:max-w-[1200px] md:grid-cols-[1fr,250px] md:divide-x
                  lg:grid-cols-[1fr,30%]
                  xl:grid-cols-[1fr,300px]      '
      >
        <div className='h-full w-full px-6 sm:px-8  xl:px-10'>
          <Calendar />
        </div>
        <div className='h-full w-full border-l md:overflow-y-scroll'>
          <TimePicker eventTitleZh={eventTitleZh} eventTitleEn={eventTitleEn}/>
        </div>
      </div>
    </SelectedDateProvider>
  )
}

export default EventDateTime
