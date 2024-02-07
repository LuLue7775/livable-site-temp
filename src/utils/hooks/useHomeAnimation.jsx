import gsap from 'gsap'
import CSSRulePlugin from 'gsap/CSSRulePlugin'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(CSSRulePlugin)

const useHomeAnimation = ({ introScopeRef }) => {
  useGSAP(
    () => {
      if (!introScopeRef?.current) return
      checkoutIntroAnimation({ scope: introScopeRef })
    },
    { scope: introScopeRef },
  )
}

export default useHomeAnimation

function checkoutIntroAnimation({ scope }) {
  let q = gsap.utils.selector(scope)
  let elementsToAnimate = [ q('.home-title'), q('.home-sidelines')]

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
