import gsap from 'gsap'
import CSSRulePlugin from 'gsap/CSSRulePlugin'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(CSSRulePlugin)
const useEventSingleAnimation = ({ introScopeRef, mainScopeRef }) => {
  useGSAP(
    () => {
      if (!introScopeRef?.current) return
      introAnimation({ scope: introScopeRef })
    },
    { scope: introScopeRef },
  )

  //   /** this animation exec only after */
  useGSAP(
    () => {
      if (!mainScopeRef?.current) return

      mainAnimation({ scope: mainScopeRef })
    },
    { scope: mainScopeRef },
  )

  return {}
}

export default useEventSingleAnimation

function introAnimation({ scope }) {
  let q = gsap.utils.selector(scope)
  let elementsToAnimate = [q('.event-single-titles'), q('.event-calender')]

  gsap.timeline().fromTo(
    elementsToAnimate,
    {
      opacity: 0,
      x: -200,
    },
    {
      opacity: 1,
      x: 0,
      stagger: 0.3,
      duration: 1,
      ease: 'expo.out',
    },
  )
}

function mainAnimation({ scope }) {
  let q = gsap.utils.selector(scope)
  let diagonalPseudo = CSSRulePlugin.getRule('.content-head::before') //get pseudo element
  let startTime = 0.5
  gsap
    .timeline()
    .fromTo(
      q('.horizontal-line'),
      {
        width: '1',
        minWidth: '0',
        ease: 'power2.inOut',
        duration: 1.2,
      },
      {
        opacity: 1,
        width: '100%',
        minWidth: '300px',
      },
      startTime,
    )
    .fromTo(
      diagonalPseudo,
      {
        width: '0px',
        left: '0px',
        ease: 'power2.inOut',
        duration: 1,
      },
      {
        opacity: 0.8,
        width: '100px',
        left: '-100px',
      },
      startTime,
    )
    .to(
      q('.content-head'),

      {
        opacity: 1,
        ease: 'power2.inOut',
        duration: 1.2,
      },
      startTime,
    )
    .fromTo(
      q('.content-body'), // vertical line
      {
        height: '0px',
      },
      {
        ease: 'power2.inOut',
        height: 'auto',
        duration: 1,
        delay: 1.6,
      },
      startTime,
    )
    .to(
      [q('.content-body'), q('.head-line')], // vertical line
      {
        opacity: 1,
        duration: 1.2,
        delay: 1.6,
      },
      startTime + 0.2,
    )
}
