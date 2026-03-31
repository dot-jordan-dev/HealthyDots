import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaFire, FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import breakfast from '../assets/breakfast.jpg'
import lunch from '../assets/lunsh.avif'
import dinner from '../assets/dinner.avif'
import food2 from '../assets/food2.avif'

const MealSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(1); 

  const mealPlans = [
    { 
      title: "Healthy Start", 
      goal: "Weight Loss", 
      kcal: "320", 
      protein: "12g",
      img: breakfast
    },
    { 
      title: "Power Lunch", 
      goal: "Muscle Gain", 
      kcal: "580", 
      protein: "35g", 
      img: lunch
    },
    { 
      title: "Night Fuel", 
      goal: "Maintenance", 
      kcal: "450", 
      protein: "25g", 
      img: dinner
    },
    { 
      title: "Weekly Prep", 
      goal: "Organization", 
      kcal: "Plan", 
      protein: "Varies", 
      img: food2
    }
  ];

  const nextSlide = () => setCurrentIndex((prev) => (prev === mealPlans.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? mealPlans.length - 1 : prev - 1));

  return (
    <section className="py-10 bg-green-50 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className=" text-2xl md:text-5xl font-black text-green-900 mb-4  font-serif tracking-tight md:mt-7">
          Discover Your Next <span className="text-green-600">Smart Meal</span>
        </h2>
        <p className="text-gray-500 text-xsm font-bold md:font-medium mb-10 ">Swipe to explore meals curated by our Health Coaches.</p>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:py-4 py-8">
       
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white p-4 rounded-full shadow-2xl text-green-600 hover:bg-green-600 hover:text-white transition-all active:scale-90">
          <FaChevronLeft size={20} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white p-4 rounded-full shadow-2xl text-green-600 hover:bg-green-600 hover:text-white transition-all active:scale-90">
          <FaChevronRight size={20} />
        </button>

        
        <div className="flex items-center justify-center  gap-4 md:gap-12 min-h-[800px]">
          {mealPlans.map((meal, index) => {
            const isActive = index === currentIndex;
            
            return (
              <div 
                key={index} 
                className={`transition-all duration-700 transform rounded-[3rem] overflow-hidden bg-white shadow-2xl 
                ${isActive 
                  ? 'scale-110 z-20 w-[350px] opacity-100 border-[6px] border-white' 
                  : 'scale-90 opacity-40 w-[280px] blur-[2px] hidden lg:block'}`}
              >
                <div className="relative h-72">
                  <img src={meal.img} alt={meal.title} className="w-full h-full object-cover" />
                  {isActive && (
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
                      <FaFire className="text-orange-500" />
                      <span className="font-black text-gray-900 text-sm">{meal.kcal} Kcal</span>
                    </div>
                  )}
                </div>

                <div className="p-10 text-center">
                  <span className="text-green-500 text-[10px] font-black uppercase tracking-[0.3em]">{meal.goal}</span>
                  <h3 className="text-2xl font-black text-gray-900 mt-3 mb-6 leading-tight">{meal.title}</h3>
                  
                  {isActive && (
                    <div className="flex justify-around mb-8 py-4 border-y border-gray-50">
                      <div className="text-center">
                        <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Protein</p>
                        <p className="font-bold text-green-700 text-lg">{meal.protein}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Type</p>
                        <p className="font-bold text-green-700 text-lg">Healthy</p>
                      </div>
                    </div>
                  )}

                  <Link 
                    to="/Meals" 
                    className="bg-green-600 text-white w-full py-5 rounded-[1.5rem] font-black hover:bg-slate-900 shadow-xl shadow-green-100 transition-all flex items-center justify-center gap-3 group"
                  >  <FaUtensils className="group-hover:rotate-12 transition-transform" /> 
                    Log Daily Meal 
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MealSlider;