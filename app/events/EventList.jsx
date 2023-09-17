'use client'
import { convertSpaceToDashLowerCase } from '@/utils/functions'
import { revealXAnimation, revealYAnimation, revealOrCloseAnimation } from '@/utils/animations'
import { setRefs } from '@/utils/functions'
import Button from '@/components/Button'
import { useEffect, useRef, useState } from 'react'
import useDelayRouting from '@/utils/hooks/useDelayRouting'
import gsap from 'gsap'
import CSSRulePlugin from 'gsap/CSSRulePlugin'
gsap.registerPlugin(CSSRulePlugin)

/**
 * @TODO on readmore issue: 將新的filtered資料加到後方 不要打亂前方順序
 */
export default function EventList({ displayFilteredData }) {
    const routerMiddleware = useDelayRouting()

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
      let diagonalPseudo = CSSRulePlugin.getRule('.event-item-head::before') //get pseudo element
      let dashPseudo = CSSRulePlugin.getRule('.long-dash::after') //get pseudo element
      revealXAnimation({ element: horzontal, animationRef: animationRef })
      revealXAnimation({ element: horizontalRefs.current[key], animationRef: animationRef })
      revealYAnimation({ diagonal: diagonalPseudo, dash: dashPseudo, vertical: eventBodyRefs.current[key] })
    })
  }, [displayFilteredData])

  return (
    <main>
      {displayFilteredData
        ? displayFilteredData?.map((item, i) => (
            <div key={item?.id} className='flex w-full flex-col items-end'>
              <div className={'event-item-head relative h-[52px] w-3/5 min-w-[330px] max-w-[1000px]'}>
                <p
                  ref={(element) => setRefs(element, item?.id, horizontalRefs)}
                  style={{ opacity: 0 }}
                  className='relative w-3/4  max-w-[1000px] border-t border-green-900/60'
                />
                <div
                  ref={(element) => setRefs(element, item?.id, eventHeadRefs)}
                  style={{ opacity: 0 }}
                  className='flex w-3/4 justify-end'
                >
                  <a
                    id={`${item?.id}`}
                    className='cursor-pointer font-mono text-green-900 hover:text-red-400'
                    onClick={(e) => toggleEvent(e)}
                  >
                    {openedId !== item?.id.replace(' ', '') ? '[more]' : '[x]'}
                  </a>
                </div>
              </div>
              <div className='flex w-3/5 min-w-[330px] max-w-[1000px] items-end'>
                <div
                  ref={(element) => setRefs(element, item?.id, eventBodyRefs)}
                  style={{ opacity: 0 }}
                  className={`${
                    i === 0 && `event-item-body-1st-elem`
                  } event-item-body border-green-900/60 relative mb-4 inline-flex h-[120px] w-full 
                  translate-x-[-53px]  translate-y-[1px] gap-4 border-l`}
                >
                  <div className='relative grid h-[60px] w-1/3 max-w-[200px] grid-cols-3 px-2 text-green-900'>
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
                  <div className='border-l border-green-900/60 pl-2 text-green-900'>
                    <p className='text-[10px] leading-[2px] font-mono'> {item?.category} </p>
                    <div className='pb-2'>
                      <h3 className='font-bold'> {item?.title?.en} </h3>
                      <h3 className='font-bold'> {item?.title?.zh} </h3>
                    </div>

                    <div
                      ref={(element) => setRefs(element, item?.id, eventBodyMoreTextRefs)}
                      className='h-0 w-full min-w-[200px] max-w-[250px] overflow-hidden md:max-w-[1000px] font-mono'
                    >
                      <p className='zh'> {item?.description?.zh} </p>
                      <p> {item?.description?.en} </p>
                      {item?.host?.zh ? <p className='zh pt-4'>藝術家: {item?.host?.zh}</p> : ''}
                      {item?.host?.en ? <p >Artist: {item?.host?.en}</p> : ''}
                      <p className='zh'> {item?.host_bio?.zh} </p>
                      <p> {item?.host_bio?.en} </p>
                      <a
                        className='flex justify-end hover:text-red-400'
                        onClick={() => routerMiddleware.push(`/events/${convertSpaceToDashLowerCase(item?.id)}`)}
                      >
                        <Button>SIGN UP -&gt;</Button>
                      </a>
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
