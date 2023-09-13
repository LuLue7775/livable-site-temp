import React from 'react'

const Footer = () => {
  return (
    <footer className='absolute bottom-0 flex h-16 w-full justify-between px-6 pb-6'>
      <ul className='inline-flex gap-4 self-end'>
        <li> CONTACT</li>
        <li> POLICY</li>
      </ul>
      <div className='text-right'>
        <p> © 2023 The Livable Studio </p>
        <p> made with love </p>
      </div>
    </footer>
  )
}

export default Footer
