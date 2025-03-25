'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const images = [
  {
    url: 'https://netra.news/content/images/size/w2000/2024/07/20240718111441_132A5046-02.jpeg',
    alt: 'Student protests in Bangladesh',
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/7.Bangladesh_quota_reform_movement_2024.jpg/2560px-7.Bangladesh_quota_reform_movement_2024.jpg',
    alt: 'Bangladesh quota reform movement 2024',
  },
  {
    url: 'https://gdb.voanews.com/01000000-0aff-0242-8785-08dca80886f5_cx0_cy6_cw0_w1023_r1_s.jpg',
    alt: 'Student demonstrations in Bangladesh',
  },
  {
    url: 'https://www.crisisgroup.org/sites/default/files/2024-07/bangladeshQA_Hero-1.jpg',
    alt: 'Crisis in Bangladesh',
  },
  {
    url: 'https://thehill.com/wp-content/uploads/sites/2/2024/08/bangladesh_student_protests_08122024_GettyImages-2165952517.jpg?strip=1',
    alt: 'Bangladesh student protests 2024',
  },
]

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleNext = () => {
    setIsAnimating(true)
    setDirection('right')
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handlePrevious = () => {
    setIsAnimating(true)
    setDirection('left')
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handleDotClick = (index: number) => {
    setIsAnimating(true)
    setDirection(index > currentIndex ? 'right' : 'left')
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Current Image */}
      <div 
        className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
          isAnimating 
            ? direction === 'right' 
              ? '-translate-x-full' 
              : 'translate-x-full'
            : 'translate-x-0'
        }`}
      >
        <Image
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/90" />
      </div>

      {/* Next Image (for smooth transition) */}
      <div 
        className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
          isAnimating 
            ? 'translate-x-0' 
            : direction === 'right' 
              ? 'translate-x-full' 
              : '-translate-x-full'
        }`}
      >
        <Image
          src={images[(currentIndex + (direction === 'right' ? 1 : -1) + images.length) % images.length].url}
          alt={images[(currentIndex + (direction === 'right' ? 1 : -1) + images.length) % images.length].alt}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/90" />
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-20"
        onClick={handlePrevious}
        disabled={isAnimating}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-20"
        onClick={handleNext}
        disabled={isAnimating}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
            }`}
            onClick={() => !isAnimating && handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  )
} 