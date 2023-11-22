'use client'

import TimePicker from '@/components/TimePicker'
import { Calendar } from 'react-aria-components'
import { SelectedDateProvider } from '@/providers/calendarContext'

const EventDateTime = ({ formRef, eventId, eventTitleZh, eventTitleEn }) => {
  return (
    <SelectedDateProvider>
      <div
        ref={formRef}
        style={{ opacity: 0 }}
        className='relative  flex h-auto
                  min-h-[358px]
                  w-full
                  flex-col
                  place-items-center 
                  md:h-[40%]
                  md:min-w-[1000px]
                  md:flex-row
                  '
      >
        <div className='h-full w-full px-6 sm:px-8 md:min-w-[450px] md:max-w-[600px] md:basis-2/5 xl:px-10'>
          <Calendar eventId={eventId} />
        </div>
        <div className='h-full w-full border-l md:basis-[300px] md:overflow-y-scroll'>
          <TimePicker eventId={eventId} eventTitleZh={eventTitleZh} eventTitleEn={eventTitleEn} />
        </div>
        <div className='orientation-sideways vertical-writing-rl flex h-full grow justify-end p-4 '>
          <p> scroll down </p>
        </div>
      </div>
    </SelectedDateProvider>
  )
}

export default EventDateTime
