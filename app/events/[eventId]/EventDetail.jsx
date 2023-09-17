'use client'
import Image from 'next/image'
import { Suspense, useRef, useEffect } from 'react'
import useDelayRouting from '@/utils/hooks/useDelayRouting'
import { eventpage_revealXAnimation, eventpage_revealYAnimation } from '@/utils/animations'

import gsap from 'gsap'
import CSSRulePlugin from 'gsap/CSSRulePlugin'
gsap.registerPlugin(CSSRulePlugin)

const EventDetail = ({ event, setLightboxIndex, setLightboxOpened }) => {
    const routerMiddleware = useDelayRouting()

  const horizontalRef = useRef()
  const eventHeadRef = useRef()
  const eventBodyRef = useRef()

  useEffect(() => {
    if (!horizontalRef.current) return
    let diagonalPseudo = CSSRulePlugin.getRule('.event-item-head::before') //get pseudo element
    eventpage_revealXAnimation({ horizontalLine: horizontalRef.current, headtext: eventHeadRef.current })
    eventpage_revealYAnimation({ diagonal: diagonalPseudo, vertical: eventBodyRef.current })
  }, [])

  return (
    <>
      <div className='relative mt-4 flex h-full w-full flex-col items-end '>
        <div
          className={
            'event-item-head md:translate-x-18 relative w-[calc(100%-200px)] min-w-[350px] translate-x-4 justify-end '
          }
        >
          <p ref={horizontalRef} style={{ opacity: 0}} className='relative flex w-full border-t border-green-900/60' />
          <div
            ref={eventHeadRef} style={{ opacity: 0}}
            className='absolute right-4 inline-flex w-full max-w-[300px] flex-wrap justify-end px-4 font-mono '
          >
            {/* <a onClick={ () => routerMiddleware.push(`/`)}  className='hover:text-red-400'>
              {' '}
              [ view relavent shop ]{' '}
            </a>
            <a onClick={ () => routerMiddleware.push(`/`)}  className='hover:text-red-400'>
              {' '}
              [ view relavent archive ]{' '}
            </a> */}
          </div>
        </div>

        <div className='md:translate-x-18 flex w-[calc(100%-200px)] min-w-[350px] translate-x-4 translate-y-[51px] items-end'>
          <div
            ref={eventBodyRef} style={{ opacity: 0}}
            className='relative mb-4 inline-flex h-auto w-full translate-x-[-53px] 
                  translate-y-[1px] gap-4 border-l border-green-900/60'
          >
            <div className='relative px-4 pb-[300px]'>
              <div className='border-b border-green-900/20 py-4'>
                <p className='zh'> 開始時間 <span className='font-mono'>START AT : {event?.event_date.start.time} </span> </p>
                <p className='zh'> 活動時間 <span className='font-mono'>DURATION : {event?.duration} hr </span> </p>
                <p className='zh'> 活動費用 <span className='font-mono'>FEE : NTD$ {event?.price}</span>  </p>
              </div>
              <div className='border-b border-green-900/20 py-4'>
                <p className='max-w-[800px]'> {event?.description?.zh} </p>
                <p className='max-w-[800px] font-mono'> {event?.description?.en} </p>
                {event?.host?.zh ? <p className='zh pt-4'>藝術家: {event?.host?.zh}</p> : ''}
                {event?.host?.en ? <p className='font-mono'>Artist: {event?.host?.en}</p> : ''}
                <p className='max-w-[1000px]'> {event?.host_bio?.zh} </p>
                <p className='max-w-[1000px] font-mono'> {event?.host_bio?.en} </p>
              </div>

              <Suspense fallback={<h2>IMAGE </h2>}>
                <div className='inline-flex h-auto w-auto max-w-[90vw] flex-wrap gap-8'>
                  {event?.images?.image.map((image, i) => (
                    <div key={i}>
                      <Image
                        alt={`event-image${i}`}
                        sizes='100vw'
                        src={image}
                        width={1200}
                        height={1200}
                        style={{
                          maxHeight: '1200px',
                          maxWidth: '1200px',
                          minHeight: '200px',
                          minWidth: '300px',
                          width: 'auto',
                          height: 'auto',
                          objectfit: 'contain',
                          display: 'inline-block',
                        }}
                        onClick={() => {
                          setLightboxOpened(true)
                          setLightboxIndex(i)
                        }}
                        className='cursor-pointer'
                      />
                      <p className=' '> NO.{i + 1}</p>
                    </div>
                  ))}
                </div>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventDetail
