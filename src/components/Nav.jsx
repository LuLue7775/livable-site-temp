import Link from 'next/link'
import React from 'react'

export default function Nav({ setMenuOpened }) {
  return (
    <header className='flex h-16 w-full items-center justify-between p-6 bg-transparent '>
      <Link href={'/'}>The Livable Studio</Link>

      <a
        className='cursor-pointer'
        onClick={() => {
          setMenuOpened(true)
        }}
      >
        menu
      </a>
    </header>
  )
}
