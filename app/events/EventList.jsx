'use client'
import { convertSpaceToDashLowerCase } from '@/utils/functions'
import Link from 'next/link'
import gsap from 'gsap'
import { useLayoutEffect, useEffect, useRef, useState } from 'react'
import CSSRulePlugin from 'gsap/CSSRulePlugin'
import CSSPlugin from 'gsap/CSSPlugin'
gsap.registerPlugin(CSSPlugin, CSSRulePlugin)

export const setRefs = (element, targetId, refMap) => {
  const cleanId = targetId.replace(' ', '') // remove space
  refMap.current[cleanId] = element
}

const revealXAnimation = ({ element }) => {
  gsap.fromTo(
    element,
    {
      width: '1',
      minWidth: '0',
      color: 'transparent',
    },
    {
      ease: 'power2.inOut',
      duration: 1.2,
      delay: 0.8,
      width: '75%',
      minWidth: '350px',
      color: '#000',
    },
  )
}
const revealYAnimation = ({ diagonal, vertical }) => {
  gsap.fromTo(
    diagonal,
    {
      width: '0px',
      left: '0px',
    },
    {
      ease: 'power2.inOut',
      duration: 1,
      width: '100px',
      left: '-100px',
    },
  )
  gsap.fromTo(
    vertical,
    {
      height: '0px',
    },
    {
      ease: 'power2.inOut',
      duration: 1,
      delay: 0.8,
      height: '120px',
    },
  )
  gsap.fromTo(
    vertical,
    {
      color: 'transparent',
    },
    {
      color: '#000',
      duration: 1.2,
      delay: 1.4,
    },
  )
}
const revealOrCloseAnimation = ({
  setOpenId,
  openedId,
  targetId,
  eventHeadRefs,
  horizontalRefs,
  eventBodyRefs,
  eventBodyMoreTextRefs,
}) => {
  // if some event already opened
  if (openedId !== '') {
    if (openedId === targetId) {
      // close it if same one is clicked
      gsap.to(eventHeadRefs.current[targetId], {
        width: '75%',
        color: '#000',
      })
      gsap.to(horizontalRefs.current[targetId], {
        width: '75%',
        color: '#000',
      })
      gsap.fromTo(
        eventBodyRefs.current[openedId],
        {
          ease: 'power2.inOut',
          duration: 0.6,
          height: '100%',
        },
        {
          height: '120px',
        },
      )
      gsap.fromTo(
        eventBodyMoreTextRefs.current[openedId],
        {
          height: '100%',
        },
        {
          height: 0,
        },
      )
      setOpenId('')
    } else {
      // otherwise close the other one
      gsap.to(eventHeadRefs.current[openedId], {
        width: '75%',
        color: '#000',
      })
      gsap.to(horizontalRefs.current[openedId], {
        width: '75%',
        color: '#000',
      })
      gsap.to(eventHeadRefs.current[targetId], {
        width: '100%',
        color: '#f00',
      })
      gsap.to(horizontalRefs.current[targetId], {
        width: '100%',
      })

      gsap.fromTo(
        eventBodyRefs.current[openedId],
        {
          ease: 'power2.inOut',
          duration: 0.6,
          height: '100%',
        },
        {
          height: '120px',
        },
      )
      gsap.fromTo(
        eventBodyMoreTextRefs.current[openedId],
        {
          height: '100%',
        },
        {
          height: 0,
        },
      )
      gsap.fromTo(
        eventBodyRefs.current[targetId],
        {
          height: '120px',
        },
        {
          ease: 'power2.inOut',
          duration: 0.6,
          delay: 0.2,
          height: 'auto',
        },
      )
      gsap.fromTo(
        eventBodyMoreTextRefs.current[targetId],
        {
          height: 0,
        },
        {
          height: 'auto',
          delay: 0.8,
        },
      )

      setOpenId(targetId)
    }
  } else {
    gsap.to(eventHeadRefs.current[targetId], {
      width: '100%',
      color: '#f00',
    })
    gsap.to(horizontalRefs.current[targetId], {
      width: '100%',
    })

    gsap.fromTo(
      eventBodyRefs.current[targetId],
      {
        height: '120px',
      },
      {
        ease: 'power2.inOut',
        duration: 0.6,
        delay: 0.2,
        height: 'auto',
      },
    )
    gsap.fromTo(
      eventBodyMoreTextRefs.current[targetId],
      {
        height: 0,
      },
      {
        height: 'auto',
        delay: 0.8,
      },
    )

    setOpenId(targetId)
  }
}

/**
 * @TODO on readmore issue: 將新的filtered資料加到後方 不要打亂前方順序
 */
export default function EventList({ displayFilteredData }) {
  const [openedId, setOpenId] = useState('')
  const horizontalRefs = useRef({})
  const eventHeadRefs = useRef({})
  const eventBodyRefs = useRef({})
  const eventBodyMoreTextRefs = useRef({})

  const toggleEvent = (e) => {
    e.preventDefault()
    const targetId = e.target.id.replace(' ', '')

    revealOrCloseAnimation({
      setOpenId,
      openedId,
      targetId,
      eventHeadRefs,
      horizontalRefs,
      eventBodyRefs,
      eventBodyMoreTextRefs,
    })
  }

  const animationRef = useRef()
  /** @TODO Initial animation. happen after 2sec */
  useLayoutEffect(() => {
    if (!Object.keys(eventHeadRefs.current)) return
    Object.entries(eventHeadRefs.current).map(([key, horzontal]) => {
      let diagonalPseudo = CSSRulePlugin.getRule('.event-item-head::before') //get pseudo element
      revealXAnimation({ element: horzontal, animationRef: animationRef })
      revealXAnimation({ element: horizontalRefs.current[key], animationRef: animationRef })
      revealYAnimation({ diagonal: diagonalPseudo, vertical: eventBodyRefs.current[key] })
    })
  }, [])

  return (
    <main>
      {displayFilteredData
        ? displayFilteredData?.map((item, i) => (
            <div key={item?.id} className='flex w-full flex-col items-end '>
              <div className={'event-item-head relative h-[52px] w-3/5 min-w-[330px] max-w-[1000px]'}>
                <p
                  ref={(element) => setRefs(element, item?.id, horizontalRefs)}
                  className='relative w-3/4  max-w-[1000px] border-t border-black/50'
                />
                <div ref={(element) => setRefs(element, item?.id, eventHeadRefs)} className='flex w-3/4 justify-end'>
                  <a id={`${item?.id}`} className='cursor-pointer hover:text-red-400' onClick={(e) => toggleEvent(e)}>
                    {openedId !== item?.id.replace(' ', '') ? '[more]' : '[x]'}
                  </a>
                  {/* <a className=''> [ view relavent shop ] </a>
                  <a className=''> [ view relavent archive ] </a> */}
                </div>
              </div>
              <div className='flex w-3/5 min-w-[330px] max-w-[1000px] items-end'>
                <div
                  ref={(element) => setRefs(element, item?.id, eventBodyRefs)}
                  className={`${
                    i === 0 && `event-item-body-1st-elem`
                  } event-item-body border-black/50 relative mb-4 inline-flex h-[120px] w-full 
                  translate-x-[-53px]  translate-y-[1px] gap-4 border-l`}
                >
                  <div className='relative grid h-[60px] w-1/3 max-w-[200px] grid-cols-3 px-2'>
                    <div className=' text-center'>
                      <h2>{item?.event_date?.start?.date}</h2>
                      <h2>{item?.event_date?.start?.month}</h2>
                    </div>
                    {item?.event_date?.end && <p className='long-dash relative w-full ' />}
                    <div className=' text-center'>
                      <h2>{item?.event_date?.end?.date}</h2>
                      <h2>{item?.event_date?.end?.month}</h2>
                    </div>
                  </div>
                  <div className='border-l border-black/20 pl-2'>
                    <p className='text-[9px] leading-[0px]'> {item?.category} </p>
                    <div className='pb-2'>
                      <h3 className='font-bold'> {item?.title?.en} </h3>
                      <h3 className='font-bold'> {item?.title?.zh} </h3>
                    </div>

                    <div
                      ref={(element) => setRefs(element, item?.id, eventBodyMoreTextRefs)}
                      className='h-0 w-full min-w-[200px] max-w-[250px] overflow-hidden md:max-w-[1000px]'
                    >
                      <p> {item?.description?.en} </p>
                      <p> {item?.description?.zh} </p>
                      {item?.host?.en ? <p className='pt-4'>Artist: {item?.host?.en}</p> : ''}
                      {item?.host?.zh ? <p>藝術家: {item?.host?.zh}</p> : ''}
                      <p> {item?.host_bio?.en} </p>
                      <p> {item?.host_bio?.zh} </p>
                      <Link className='flex justify-end' href={`/events/${convertSpaceToDashLowerCase(item?.id)}`}>
                        [SIGN UP -&gt;]{' '}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        : ''}
    </main>
  )
}
