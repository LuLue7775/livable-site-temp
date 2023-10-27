'use client'

import Calendar from '@/components/Calendar'
import TimePicker from '@/components/TimePicker'
import { SelectedDateProvider } from '@/context/calendarContext'

const EventDateTime = ({ formRef, eventTitleZh, eventTitleEn }) => {
  return (
    <SelectedDateProvider>
      <div
        ref={formRef}
        style={{ opacity: 0 }}
        className='relative  h-auto min-h-[358px]
                  w-full
                  place-items-center
                  md:h-[40%]
                  md:min-w-[1000px] 
                  flex
                  flex-col
                  md:flex-row
                  '
      >
        <div className='h-full w-full px-6 sm:px-8 md:basis-2/5 md:min-w-[450px] md:max-w-[600px] xl:px-10'>
          <Calendar />
        </div>
        <div className='h-full w-full border-l md:basis-[300px] md:overflow-y-scroll'>
          <TimePicker eventTitleZh={eventTitleZh} eventTitleEn={eventTitleEn} />
        </div>
        <div className='flex-grow flex justify-end h-full orientation-sideways vertical-writing-rl p-4 '>
          <p> scroll down </p>
          
        </div>
      </div>
    </SelectedDateProvider>
  )
}

export default EventDateTime
