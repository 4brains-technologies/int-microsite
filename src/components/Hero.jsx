'use client';

import React from 'react';

const Hero = () => {
  const scrollToForm = () => {
    const formElement = document.querySelector('#registration-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='z-10'>
      <div className='w-[85%] mx-auto mt-10 xLl:mt-12 z-10  py-4 xl:px-[90px] xl:py-[90px] px-[18px] rounded-lg bg-[#1A1A1A] relative xl:rounded-[50px]'>
        <div className='flex justify-between items-center z-10'>
          <h2 className='text-[12px] xl:text-3xl'>OCTOBER 30, 2025</h2>

          <h2 className='text-[12px] xl:text-3xl'>Fairmont, Mumbai</h2>
        </div>
        <div className="mt-[32px] z-10">
          <h2 className='text-2xl xl:text-8xl font-medium'>IIA ANNUAL <br />
            EVENT 2025</h2>
          <p className='text-[10px] mt-[4px] xl:text-2xl xl:pt-4 xl:w-[50%]'>Life is a celebration, and we at PartyHard believe everyone should celebrate, not just the grand occasions but the little ones that put a smile on our faces.</p>
        </div>
        <button 
          onClick={scrollToForm}
          className='xl:mt-[80px] cursor-pointer text-[12px] px-[20px] py-[7px] bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full mt-[19px] xl:text-3xl xl:py-[33px] xl:px-[94px] hover:opacity-90 transition-opacity'
        >
          Early Bird Tickets
        </button>

        <div className='w-[484px] h-[501px]  bottom-16 right-28 absolute hidden xl:block z-[1px]'>
          <img className='w-full h-full' src="/images/hero-logo.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;