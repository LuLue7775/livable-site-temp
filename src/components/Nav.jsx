import { useMenu } from '@/context/menuContext'
import Image from 'next/image'
import useDelayRouting from '@/utils/hooks/useDelayRouting'

export default function Nav() {
  const routerMiddleware = useDelayRouting()
  const { isMenuOpened, setMenuOpened } = useMenu()

  return (
    <header className='absolute z-10 flex h-16 w-full items-center justify-between bg-transparent p-4'>
      <a onClick={() => routerMiddleware.push('/')} className='-translate-x-2 translate-y-2 '>
        <Image alt='logo' src='/logo.png' sizes='100vw' width={64} height={64} />
      </a>

      <a
        className={`${isMenuOpened ? '-rotate-45' : 'rotate-45'} origin-center cursor-pointer font-mono duration-300`}
        onClick={() => {
          setMenuOpened(!isMenuOpened)
        }}
      >
        menu
      </a>
    </header>
  )
}
