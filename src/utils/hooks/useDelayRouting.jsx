import { useGlass } from '@/providers/glassElementContext'
import { useMenu } from '@/providers/menuContext'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'

const closeAnimation = (glassRef, router, route, setMenuOpened) => {
  // Reset initial state
  gsap.set(glassRef.current, { 
    x: '-100%',
    clearProps: 'all'
  })

  // Create a promise to handle the animation sequence
  const animate = () => {
    return new Promise((resolve) => {
      // First timeline: Cover the old page
      const coverTl = gsap.timeline({
        onComplete: resolve
      })
      
      coverTl.to(glassRef.current, { 
        x: '0%',
        duration: .5,
        ease: 'power2.inOut'
      })
    })
  }

  // Execute the animation sequence
  animate().then(() => {
    // Only change route after cover animation is complete
    setMenuOpened(false)
    router.push(route)
    
    // Start revealing new page after a short delay
    setTimeout(() => {
      revealNewPage(glassRef)
    }, 100)
  })
}

const revealNewPage = (glassRef) => {
  // Second timeline: Reveal the new page
  const revealTl = gsap.timeline()
  revealTl.to(glassRef.current, { 
    x: '100%',
    opacity: 0,
    duration: .5,
    ease: 'power2.inOut'
  })
}

// const startAnimation = (glassRef, isMenuOpened, setMenuOpened) => {
//     return new Promise((resolve, reject) => {
//         closeAnimation(glassRef);

//         // close menu
//         setMenuOpened(!isMenuOpened);
//         // setTimeout(resolve, 2000)
//     });
// };

export default function useDelayRouting() {
  const router = useRouter()
  const { glassRef } = useGlass()
  const { setMenuOpened } = useMenu()

  // const routerMiddleware = {
  //   push: (route) => {
  //     closeAnimation(glassRef, router, route, setMenuOpened)
  //     // startAnimation(glassRef, isMenuOpened, setMenuOpened).then(() => {
  //     //     // router.push(route);
  //     // })
  //   },
  // }

  return {
    push: (route) => closeAnimation(glassRef, router, route, setMenuOpened),
  }
}
