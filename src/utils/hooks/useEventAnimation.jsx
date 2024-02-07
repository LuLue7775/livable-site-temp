'use client'
import gsap from 'gsap'
import CSSRulePlugin from 'gsap/CSSRulePlugin'
import { useGSAP } from '@gsap/react'
import useMediaQuery from './useMediaQuery'
gsap.registerPlugin(CSSRulePlugin)

const useEventAnimation = ({ mainScopeRef, introScopeRef, containerRefs }) => {
  const isSmallDevice = useMediaQuery('(max-width : 640px)')

  useGSAP(
    () => {
      if (!introScopeRef?.current) return
      eventIntroAnimation({ scope: introScopeRef })
    },
    { scope: introScopeRef },
  )

  /** this animation exec only after */
  useGSAP(
    () => {
      if (!mainScopeRef?.current) return

      mainAnimation({ scope: mainScopeRef, isSm: isSmallDevice })
    },
    { dependencies: [isSmallDevice], scope: mainScopeRef },
  )

  /** when user click [more] */
  /** wrap this click event into mainScopeRef with contextSafe*/
  const toggleEvent = (e) => {
    e.stopPropagation()

    const targetId = e.target.id.replace(' ', '')
    toggleAnimation({
      scope: containerRefs.current[targetId],
      isSm: isSmallDevice,
    })
    // mark status
    if (!containerRefs.current[targetId].classList.contains('opened')) {
      containerRefs.current[targetId].classList.add('opened')
    } else containerRefs.current[targetId].classList.remove('opened')
  }

  return {
    toggleEvent,
  }
}

export default useEventAnimation

function eventIntroAnimation({ scope }) {
  let q = gsap.utils.selector(scope)
  let elementsToAnimate = [q('.event-filter'), q('.event-desc')]

  gsap.timeline().fromTo(
    elementsToAnimate,
    {
      opacity: 0,
      x: -100,
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

function mainAnimation({ scope, isSm }) {
  let q = gsap.utils.selector(scope)
  let diagonalPseudo = CSSRulePlugin.getRule('.content-head::before') //get pseudo element
  let dashPseudo = CSSRulePlugin.getRule('.long-dash::after') //get pseudo element
  gsap
    .timeline()
    .fromTo(
      q('.horizontal-line'),
      {
        width: '1',
        minWidth: '0',
        opacity: 0,
      },
      {
        ease: 'power2.inOut',
        duration: 1.2,
        width: isSm ? '100%' : '75%',
        minWidth: '300px',
        opacity: 1,
      },
      0,
    )
    .fromTo(
      diagonalPseudo,
      {
        width: '0px',
        left: '0px',
        opacity: 0,
      },
      {
        ease: 'power2.inOut',
        duration: 1,
        width: '100px',
        left: '-100px',
        opacity: 0.6,
      },
      0,
    )
    .fromTo(
      q('.event-item-body'), // vertical line
      {
        height: '0px',
      },
      {
        ease: 'power2.inOut',
        duration: 1,
        height: '120px',
      },
      0,
    )
    .fromTo(
      [q('.event-item-body'), q('.head-line')], // vertical line
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1.2,
        delay: 1.4,
      },
      0.2,
    )
    .fromTo(
      dashPseudo,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 2,
        delay: 1.4,
      },
      0.2,
    )
}

function toggleAnimation({ scope, isSm }) {
  let q = gsap.utils.selector(scope)

  // open
  if (!scope.classList.contains('opened')) {
    gsap
      .timeline()
      .to(
        q('.head-line'),
        {
          width: '100%',
          color: '#f00',
          duration: 0.3,
        },
        0,
      )
      .to(
        q('.horizontal-line'),
        {
          width: '100%',
          duration: 0.3,
        },
        0,
      )
      .fromTo(
        q('.event-item-body'),
        {
          height: '120px',
        },
        {
          ease: 'power2.inOut',
          duration: 0.3,
          delay: 0.2,
          height: 'auto',
        },
        0.2,
      )
      .fromTo(
        q('.body-text'),
        {
          height: 0,
        },
        {
          height: 'auto',
          duration: 0.3,
          delay: 0.8,
        },
        0.2,
      )
      .to(
        q('.toggle-ctrl'),
        {
          y: '-100%',
          duration: 0.3,
        },
        1,
      )
  } else {
    gsap
      .timeline()
      .fromTo(
        q('.event-item-body'),
        {
          height: '100%',
        },
        {
          ease: 'power2.inOut',
          duration: 0.6,
          height: '120px',
        },
        0,
      )
      .fromTo(
        q('.body-text'),
        {
          height: '100%',
        },
        {
          height: 0,
          duration: 0.6,
        },
        0,
      )
      .to(
        q('.toggle-ctrl'),
        {
          y: '0%',
          duration: 0.3,
        },
        0,
      )
      .to(
        q('.head-line'),
        {
          width: isSm ? '100%' : '75%',
          color: '#f00',
          duration: 0.3,
        },
        0.6,
      )
      .to(
        q('.horizontal-line'),
        {
          width: isSm ? '100%' : '75%',
          duration: 0.3,
        },
        0.6,
      )
  }
}
