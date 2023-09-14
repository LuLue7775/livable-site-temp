import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export default function Nav({ setMenuOpened }) {
  return (
    <header className='flex h-16 w-full items-center justify-between bg-transparent p-4'>
      <Link href={'/'} className='-translate-x-2 translate-y-2 '>
        <Image alt='logo' src='/logo.png' sizes='100vw' width={64} height={64} />
      </Link>

      <a
        className='origin-center rotate-45 cursor-pointer font-mono'
        onClick={() => {
          setMenuOpened(true)
        }}
      >
        menu
      </a>
    </header>
  )
}
