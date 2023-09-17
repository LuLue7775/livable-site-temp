import { useGlass } from '@/context/glassElementContext'
import gsap from 'gsap'
import { useRouter } from 'next/navigation'
import { useMenu } from '@/context/menuContext'

const closeAnimation = (glassRef, router, route, setMenuOpened) => {
    
    gsap.set( glassRef.current, { xPercent: -100, opacity:0 })
    gsap
    .timeline({
        onComplete: () => {
            setMenuOpened(false);
            router.push(route);
        }
    })
    .to( glassRef.current, { xPercent: 200, opacity:1, duration: .5 })
    .to( glassRef.current, { xPercent: 200, opacity:1, duration: 0.8 })
    .to( glassRef.current, { xPercent: 300, opacity:0, duration: .8 })
    .play()
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
  const { isMenuOpened, setMenuOpened } = useMenu()


    const routerMiddleware = {
        push: (route) => {
            closeAnimation(glassRef, router, route, setMenuOpened)
            // startAnimation(glassRef, isMenuOpened, setMenuOpened).then(() => {
            //     // router.push(route);
            // })
        }
    };

    return routerMiddleware
}
