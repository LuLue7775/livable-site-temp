'use client'
import Lightbox from '@/components/Lightbox'
import Image from 'next/image'
import { Suspense, useRef, useState } from 'react'
import Link from 'next/link'

const EventDetail = ({ event }) => {
  const horizontalRef = useRef()
  const eventHeadRef = useRef()
  const eventBodyRef = useRef()
  const [isLightboxOpened, setLightboxOpened] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  return (
    <div className='mt-4 flex w-full flex-col items-end overflow-x-hidden'>
      <div
        className={'event-item-head relative h-[52px] w-[calc(100%-200px)] min-w-[350px] translate-x-12 justify-end'}
      >
        <p ref={horizontalRef} className='relative flex w-full border-t border-black/50' />
        <div ref={eventHeadRef} className='inline-flex w-full -translate-x-12 justify-end gap-4 px-4'>
          <Link href='/'> [ view relavent shop ] </Link>
          <Link href='/'> [ view relavent archive ] </Link>
        </div>
      </div>

      <div className='flex w-[calc(100%-200px)] min-w-[350px] translate-x-12 items-end'>
        <div
          ref={eventBodyRef}
          className='relative mb-4 inline-flex h-auto w-full translate-x-[-53px] 
                  translate-y-[1px]  gap-4 border-l border-black/50'
        >
          <div className='relative px-4 pb-[300px]'>
            <div className='border-b border-green-900/20 py-4'>
              <p> 開始時間 start at: {event?.event_date.start.time} </p>
              <p> 活動時間 duration: {event?.duration} hr </p>
              <p> 活動費用 fee: NTD $ {event?.price} </p>
            </div>
            <div className='border-b border-green-900/20 py-4'>
              <p className='max-w-[800px]'> {event?.description?.zh} </p>
              <p className='max-w-[800px]'> {event?.description?.en} </p>
              {event?.host?.zh ? <p>藝術家: {event?.host?.zh}</p> : ''}
              {event?.host?.en ? <p className='pt-4'>Artist: {event?.host?.en}</p> : ''}
              <p className='max-w-[1000px]'> {event?.host_bio?.zh} </p>
              <p className='max-w-[1000px]'> {event?.host_bio?.en} </p>
            </div>

            <Suspense fallback={<h2>IMAGE </h2>}>
              <div className='inline-flex h-auto w-auto max-w-[90vw] flex-wrap gap-8'>
                {event?.images?.image.map((image, i) => (
                  <div key={i}>
                    <Image
                      alt=''
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

      <Lightbox
        isLightboxOpened={isLightboxOpened}
        setLightboxOpened={setLightboxOpened}
        lightboxIndex={lightboxIndex}
        setLightboxIndex={setLightboxIndex}
        images={event?.images?.image}
      />
    </div>
  )
}

export default EventDetail
