import gsap from 'gsap'
import CSSRulePlugin from 'gsap/CSSRulePlugin'
import CSSPlugin from 'gsap/CSSPlugin'
gsap.registerPlugin(CSSPlugin, CSSRulePlugin)

export const introAnimation = (props) => {
    gsap.fromTo(
    [...props],
    {
      opacity: 0,
      x: -100,
    },
    {
      opacity: 1,
      x: 0,
      stagger: 0.3,
      duration: 2,
      delay: 1.2,
      ease: 'expo.out',
    },
  )
}

export const revealXAnimation = ({ element }) => {
  gsap.fromTo(
    element,
    {
      width: '1',
      minWidth: '0',
      opacity: 0,
    },
    {
      ease: 'power2.inOut',
      duration: 1.2,
      width: '75%',
      minWidth: '350px',
      opacity: 1,
    },
  )
}
export const revealYAnimation = ({ diagonal, dash, vertical }) => {
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
      height: '120px',
    },
  )
  gsap.fromTo(
    vertical,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 1.2,
      delay: 1.4,
    },
  )
  gsap.fromTo(
    dash,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 2,
      delay: 1.4,
    },
  )
}
export const revealOrCloseAnimation = ({
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



export const eventpage_introAnimation = ({titleRef, formRef}) => {
  gsap.fromTo(
    [titleRef.current, formRef.current],
    {
      opacity: 0,
      x: -100
    },
    {
      opacity: 1,
      x: 0,
      duration: 2,
      delay: 2,
      stagger: .3,
      ease: 'expo.out',
    },
  )
}



export const eventpage_revealXAnimation = ({ horizontalLine, headtext }) => {
  gsap.fromTo(
    horizontalLine,
    {
      width: '1',
      minWidth: '0',
      opacity: 0,
    },
    {
      ease: 'power2.inOut',
      duration: 1.2,
      width: '100%',
      minWidth: '350px',
      opacity: 1,
    },
  )
  if (headtext) {
    gsap.fromTo(
      headtext,
      {
        opacity: 0,
      },
      {
        ease: 'power2.inOut',
        duration: 1.2,
        opacity: 1,
      },
    )
  }
}
export const eventpage_revealYAnimation = ({ diagonal, vertical }) => {
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
      height: 'auto',
    },
  )
  gsap.fromTo(
    vertical,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 1.2,
      delay: 1.4,
    },
  )
}