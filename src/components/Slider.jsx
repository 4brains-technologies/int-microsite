'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Slider = () => {
  const images = [
    '/images/image 16.png',
    '/images/image 17.png',
    '/images/image 18.png',
    '/images/image 19.png',
    '/images/image 16.png',
    '/images/image 17.png',
    '/images/image 18.png',
    '/images/image 19.png',
    '/images/image 16.png',
    '/images/image 17.png',
    '/images/image 18.png',
    '/images/image 19.png'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative my-10 xl:my-32 w-full overflow-hidden h-[100px] md:h-[150px]">
      <div
        className="flex transition-transform duration-1000 ease-linear"
        style={{ transform: `translateX(-${currentIndex * 25}%)` }}
      >
        {images.map((image, index) => (
          <div 
            key={index} 
            className="min-w-[40%] h-[100px] md:h-[150px] relative group xl:w-[50px]"
          >
            <Image
              src={image}
              alt={`Partner ${index + 1}`}
              fill
              className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300 xl:px-10 px-4 md:px-8"
              priority={index === 0}
            />
          </div>
        ))}      
      </div>
    </div>
  );
};

export default Slider;