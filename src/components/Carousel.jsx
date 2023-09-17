'use client'
import React from 'react'

export default function Carousel(props) {
  const { amount, currSlide, setSlide } = props

  const handleClicked = (dir) => {
    if (dir === 'prev' && currSlide > 0) setSlide((currSlide) => currSlide - 1)
    if (dir === 'next' && currSlide < amount - 1) {
      setSlide((currSlide) => currSlide + 1)
    }
  }

  return (
    <div className='relative h-full w-full gap-4'>
      {React.Children.map(props.children, (child) => (
        <>{child}</>
      ))}
      <div className='absolute bottom-0 left-0 w-full p-6 '>
        <button className='mr-4 w-auto border-b hover:text-red-400 font-bold' onClick={() => handleClicked('prev')}>
          {' '}
          &lt;- PREV{' '}
        </button>
        <button className='mr-4 w-auto border-b hover:text-red-400 font-bold' onClick={() => handleClicked('next')}>
          {' '}
          NEXT -&gt;
        </button>
      </div>
    </div>
  )
}
