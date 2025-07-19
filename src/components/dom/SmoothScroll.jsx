'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
}

export default function SmoothScroll({ children }) {
  const smoother = useRef(null);

  useEffect(() => {
    console.log('Initializing smooth scroll...');
    
    // Wait for the next frame to ensure DOM is ready
    requestAnimationFrame(() => {
      try {
        // Create smooth scroll instance
        smoother.current = ScrollSmoother.create({
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          smooth: 1.5,
          effects: true,
          normalizeScroll: true,
          smoothTouch: 0.1,
        });

        console.log('Smooth scroll initialized successfully');
      } catch (error) {
        console.error('Error initializing smooth scroll:', error);
      }
    });

    return () => {
      console.log('Cleaning up smooth scroll...');
      if (smoother.current) {
        smoother.current.kill();
      }
    };
  }, []);

  
  return (
    <div id="smooth-wrapper" className="absolute inset-0 h-full w-full">
      <div id="smooth-content" className="relative w-full">
        {children}
      </div>
    </div>
  );
} 