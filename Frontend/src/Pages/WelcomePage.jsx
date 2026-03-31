import React from 'react'
import { useNavigate } from 'react-router-dom'
import  { useEffect } from 'react'
import logo1 from '../assets/logo1.png'
import sald from '../assets/sald.png'

const WelcomePage = () => {

 const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/details'); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);
    
  return (
    <div className='min-h-screen grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-0 px-4 md:px-10'>
     
      <div className='flex flex-col items-center justify-center py-8 text-center'>
        <img 
          className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-lg mb-8 object-cover" 
          src={logo1} 
          alt='HealthyDots Logo' 
        />
        <h1 className="text-2xl md:text-5xl font-bold font-serif text-slate-800">
          Welcome to <span className="text-green-600">HealthyDots</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-sm text-sm md:text-base">
          Your journey to a healthier lifestyle starts here. Join our community today.
        </p>
      </div>

      <div className='flex items-center justify-center mt-6 md:mt-0'>
        <img 
          className='w-full max-w-full h-auto rounded-full md:rounded-3xl  object-cover' 
          src={sald} 
          alt='Registration Hero' 
        />
      </div>
    </div>
  )
}

export default WelcomePage