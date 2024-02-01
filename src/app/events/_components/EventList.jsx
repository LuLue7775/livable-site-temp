'use client'
import EventSingle from './EventSingle'
import { revealOrCloseAnimation, revealXAnimation, revealYAnimation } from '@/utils/animations'
import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import CSSRulePlugin from 'gsap/CSSRulePlugin'
gsap.registerPlugin(CSSRulePlugin)

const EventList = ({ events, reachBottom }) => {
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
  useEffect(() => {
    if (!Object.keys(eventHeadRefs.current)) return
    Object.entries(eventHeadRefs.current).map(([key, horzontal]) => {
      if (!horzontal) return
      let diagonalPseudo = CSSRulePlugin.getRule('.event-item-head::before') //get pseudo element
      let dashPseudo = CSSRulePlugin.getRule('.long-dash::after') //get pseudo element
      revealXAnimation({ element: horzontal, animationRef: animationRef })
      revealXAnimation({ element: horizontalRefs.current[key], animationRef: animationRef })
      revealYAnimation({ diagonal: diagonalPseudo, dash: dashPseudo, vertical: eventBodyRefs.current[key] })
    })
  }, [events])

  return (
    <>
      <div className='relative min-h-[1000px] '>
        {events?.map((item, index) => (
          <EventSingle
            key={item?.id}
            index={index}
            toggleEvent={toggleEvent}
            item={item}
            openedId={openedId}
            eventHeadRefs={eventHeadRefs}
            eventBodyRefs={eventBodyRefs}
            horizontalRefs={horizontalRefs}
            eventBodyMoreTextRefs={eventBodyMoreTextRefs}
          />
        ))}
        <div ref={reachBottom} className='absolute bottom-0 z-20 h-12' />
      </div>
    </>
  )
}
EventList.displayName = 'EventList'

export default EventList
