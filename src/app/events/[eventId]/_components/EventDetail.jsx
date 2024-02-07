'use client'
import EventImages from './EventImages'
import LoadingIcon from '@/components/LoadingIcon'
import useEventSingleAnimation from '@/utils/hooks/useEventSingleAnimation'
// import useDelayRouting from '@/utils/hooks/useDelayRouting'
import { Suspense } from 'react'
import { sanitize } from 'isomorphic-dompurify'

const EventDetail = ({ event, setLightboxIndex, setLightboxOpened, mainScopeRef }) => {
  // const routerMiddleware = useDelayRouting()
  useEventSingleAnimation({ mainScopeRef })

  return (
    <>
      <div
        style={{ opacity: 0 }}
        className={
          'content-head relative w-[calc(100%-200px)] min-w-[350px] translate-x-4 justify-end md:translate-x-20'
        }
      >
        <p className='horizontal-line relative flex w-full border-t border-green-900/60' />
        <div
          style={{ opacity: 0 }}
          className='head-line absolute right-4 inline-flex w-full max-w-[300px] flex-wrap justify-end px-4 font-mono '
        >
          {/* <a onClick={ () => routerMiddleware.push(`/`)}  className='hover:text-red-400'>
              
              [ view relavent shop ]
            </a>
            <a onClick={ () => routerMiddleware.push(`/`)}  className='hover:text-red-400'>
              
              [ view relavent archive ]
            </a> */}
        </div>
      </div>

      <div className='flex w-[calc(100%-200px)] min-w-[350px] translate-x-4 translate-y-[51px] items-end md:translate-x-20'>
        <div
          style={{ opacity: 0 }}
          className='content-body relative mb-4 inline-flex h-auto w-full translate-x-[-53px] 
                  translate-y-[1px] gap-4 border-l border-green-900/60'
        >
          <div className='relative px-4 pb-[300px]'>
            <div data-testid='event-detail' className='border-b border-green-900/20 py-4'>
              <p className='zh'>
                開始時間 <span className='font-mono'>START AT : {event?.event_date.start.time} </span>
              </p>
              <p className='zh'>
                活動時間 <span className='font-mono'>DURATION : {event?.duration} hr </span>
              </p>
              <p className='zh'>
                活動費用 <span className='font-mono'>FEE : NTD$ {event?.price}</span>
              </p>
            </div>
            <div className='border-b border-green-900/20 py-4'>
              <div
                className='zh max-w-[800px]'
                dangerouslySetInnerHTML={{ __html: sanitize(event?.description?.zh) }}
              />
              <div
                className='max-w-[800px] font-mono'
                dangerouslySetInnerHTML={{ __html: sanitize(event?.description?.en) }}
              />

              {event?.host?.zh ? <p className='zh pt-4'>藝術家: {event?.host?.zh}</p> : ''}
              {event?.host?.en ? <p className='font-mono'>Artist: {event?.host?.en}</p> : ''}

              {event?.host_bio?.zh && (
                <div
                  className='zh max-w-[1000px]'
                  dangerouslySetInnerHTML={{ __html: sanitize(event?.host_bio?.zh) }}
                />
              )}
              {event?.host_bio?.en && (
                <div
                  className='max-w-[1000px] font-mono'
                  dangerouslySetInnerHTML={{ __html: sanitize(event?.host_bio?.en) }}
                />
              )}
            </div>

            <Suspense fallback={<LoadingIcon />}>
              <EventImages event={event} setLightboxIndex={setLightboxIndex} setLightboxOpened={setLightboxOpened} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventDetail
