'use client'
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mx-4 md:mx-20 pt-4">
        <div>
          <Image
            src="/images/logo-main.png"
            alt="logo"
            width={400}
            height={100}
            className=""
          />
        </div>
        {/* Hamburger Menu Button */}
        <button
          className="md:hidden p-2 z-50 relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className={`w-8 h-8 transition-colors duration-200 ${isMenuOpen ? 'text-white' : 'text-white'}`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <nav className="flex items-center">
            <ul className="flex items-center gap-10">
              <li><Link href="/" className="text-white hover:text-gray-300 transition-colors duration-300" onClick={handleLinkClick}>Home</Link></li>
              <li><Link href="/schedule" className="text-white hover:text-gray-300 transition-colors duration-300" onClick={handleLinkClick}>Schedule</Link></li>
              <li><Link href="/speakers" className="text-white hover:text-gray-300 transition-colors duration-300" onClick={handleLinkClick}>Speakers</Link></li>
              <li><Link href="/tickets" className="text-white hover:text-gray-300 transition-colors duration-300" onClick={handleLinkClick}>Tickets</Link></li>
              <li><Link href="/price" className="text-white hover:text-gray-300 transition-colors duration-300" onClick={handleLinkClick}>Price</Link></li>
            </ul>
          </nav>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div 
        className={`md:hidden fixed inset-0 bg-gradient-to-b from-black to-black bg-opacity-98 backdrop-blur-sm z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <nav className="h-full flex items-center justify-center">
          <ul className="flex flex-col space-y-8 p-4 text-center">
            <li><Link href="/" className="text-white text-2xl font-light hover:text-gray-300 transition-colors duration-300 transform hover:scale-110 block" onClick={handleLinkClick}>Home</Link></li>
            <li><Link href="/schedule" className="text-white text-2xl font-light hover:text-gray-300 transition-colors duration-300 transform hover:scale-110 block" onClick={handleLinkClick}>Schedule</Link></li>
            <li><Link href="/speakers" className="text-white text-2xl font-light hover:text-gray-300 transition-colors duration-300 transform hover:scale-110 block" onClick={handleLinkClick}>Speakers</Link></li>
            <li><Link href="/tickets" className="text-white text-2xl font-light hover:text-gray-300 transition-colors duration-300 transform hover:scale-110 block" onClick={handleLinkClick}>Tickets</Link></li>
            <li><Link href="/price" className="text-white text-2xl font-light hover:text-gray-300 transition-colors duration-300 transform hover:scale-110 block" onClick={handleLinkClick}>Price</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Nav