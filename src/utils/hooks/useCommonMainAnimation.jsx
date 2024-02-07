import gsap from 'gsap'
import CSSRulePlugin from 'gsap/CSSRulePlugin'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(CSSRulePlugin)
const useCommonMainAnimation = ({ mainScopeRef }) => {
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

export default useCommonMainAnimation

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
        width: '100px',
        left: '-100px',
        opacity: 1,
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
      [q('.content-body')], // vertical line
      {
        opacity: 1,
        duration: 1.2,
        delay: 1.6,
      },
      startTime + 0.2,
    )
}
