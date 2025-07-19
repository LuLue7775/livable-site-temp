'use client'
import { useState, useEffect } from 'react'

const ScrollArrow = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    
    const container = document.querySelector('[data-scroll-container]')
    
    if (!container) return
    
    const handleScroll = () => {
      setIsScrolled(container.scrollTop > 0)
    }

    container.addEventListener('scroll', handleScroll)
    
    // Initial check
    handleScroll()

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    const container = document.querySelector('[data-scroll-container]')
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div 
      className="fixed bottom-8 right-8 z-50 cursor-pointer animate-breathing"
      onClick={isScrolled ? scrollToTop : undefined}
    >
      <div className="flex items-center">
        {isScrolled && (
          <div className="text-livable text-base font-mono tracking-wider [writing-mode:vertical-rl] opacity-60 hover:opacity-100 transition-opacity duration-300 hidden md:block">
            scroll to top
          </div>
        )}
        <svg
          width="32"
          height="96"
          viewBox="0 -34 32 82"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`opacity-60 hover:opacity-100 transition-all duration-300 ${isScrolled ? 'rotate-180' : ''}  md:h-[96px] h-[32px]`}
        >
          {/* Circle wrapper - visible only on mobile */}
          <circle
            cx="16"
            cy="8"
            r="38"
            stroke="#002c24"
            strokeWidth="1"
            className="block md:hidden"
          />
          {/* Straight line with animation */}
          <path
            d="M16 38V-20"
            stroke="#002c24"
            strokeWidth="1"
            strokeLinecap="round"
            className="arrow-line"
          />
          {/* Curved arrow tip */}
          <path
            d="M16 38C16 38 12 34 8 30C4 26 4 26 4 26"
            stroke="#002c24"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <style jsx>{`
            .arrow-line {
              stroke-dasharray: 72;
              stroke-dashoffset: 72;
              animation: extendArrow 1.5s ease-in-out infinite;
            }
            @keyframes extendArrow {
              from {
                stroke-dashoffset: 72;
              }
              to {
                stroke-dashoffset: 0;
              }
            }
            @media (max-width: 768px) {
              svg {
                width: 50px;
                height: 50px;
                viewBox: "-44 -44 120 120";
              }
            }
          `}</style>
        </svg>
      </div>
    </div>
  )
}

export default ScrollArrow