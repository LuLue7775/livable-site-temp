import { useGlass } from '@/context/glassElementContext'
import gsap from 'gsap'
import { useRouter } from 'next/navigation'
/** 
 * @TODO MAKE A GREEN GLASS COVER. 
 * 
 * @TODO NEED A ROUTE context
 * 或是做一個timelinecontext 
 *     const [timeline, setTimeline] = useState(null)

 */
const closeAnimation = (glassRef, router, route, isMenuOpened, setMenuOpened) => {
    
    gsap.set( glassRef.current, { xPercent: 0 })
    gsap
    .timeline({
        onComplete: () => {
            setMenuOpened(!isMenuOpened);
            router.push(route);
        }
    })
    .to( glassRef.current, { xPercent: 100, duration: .25 })
    .to( glassRef.current, { xPercent: 100, duration: 0.5 })
    .to( glassRef.current, { xPercent: 200, duration: .25 })
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


export default function useDelayRouting({isMenuOpened, setMenuOpened }) {
    const router = useRouter()
    const { glassRef } = useGlass()


    const routerMiddleware = {
        push: (route) => {
            closeAnimation(glassRef, router, route, isMenuOpened, setMenuOpened)
            // startAnimation(glassRef, isMenuOpened, setMenuOpened).then(() => {
            //     // router.push(route);
            // })
        }
    };

    return routerMiddleware
}
