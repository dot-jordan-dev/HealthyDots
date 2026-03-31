import React from 'react'
import coach from '../assets/coach.jpg'
import coach2 from '../assets/coach2.jpg'
import coach3 from '../assets/coach3.jpg'
import { useEffect, useState } from 'react';

const Coach = () => {
    
      const images = [coach,coach2,coach3];
      const [index, setIndex] = useState(0);
    
      useEffect(() => {
        const timer = setInterval(() => {
          setIndex((prev) => (prev + 1) % images.length);
        }, 2000);
        return () => clearInterval(timer);
      }, []);
    
  return (
    <section id='Coach' className="bg-green-100 py-16 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                      <div className="order-2 md:order-1">
          
          <div className="mb-6">
            <span className="bg-green-800 text-white px-2 py-1 rounded-sm text-sm font-medium uppercase tracking-wider">
              Get the best
            </span>
            <h1 className="text-4xl font-serif md:text-5xl font-bold text-green-900 mt-2 tracking-tight">
              Expert Guidance
            </h1>
          </div>

          <p className="text-gray-600  text-sm md:text-lg mb-8 leading-relaxed max-w-xl">
            Achieve your health goals with professional support. Our certified specialists bridge the gap between nutritional data and your daily habits.
          </p>

         
          <ul className="space-y-4 ml-6">
            {[
              "Global Experts: Certified nutrition specialists.",
              "Proven Results: 5+ years of body transformations.",
              "Smart Nutrition: Focus on metabolism and performance.",
              "Tailored Plans: Meals designed for your lifestyle.",
              "Real Change: Tools for lifelong healthy habits.",
              "Science-First: Based on latest clinical research."
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3 group">
                
                <span className="mt-1.5 w-3 h-3 bg-red-500 rounded-full flex-shrink-0 shadow-sm group-hover:scale-125 transition-transform"></span>
                <span className="text-gray-700 text-left font-medium text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 md:order-2 flex justify-center relative">
       
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          
          <div className="relative z-10 overflow-hidden   rounded-t-full shadow-2xl border-4 border-white">
            <img 
              src={ images[index]} 
              alt="Professional Nutritionist" 
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Coach