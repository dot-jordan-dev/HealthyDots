import React from 'react'
import { useNavigate } from 'react-router-dom'; 
import { 
  FaCheckCircle, 
  FaUserCheck, 
  FaRunning, 
  FaFileAlt, 
  FaBell, 
  FaChartLine,
  FaShieldAlt
} from "react-icons/fa";

const Pricing = () => {
    const navigate = useNavigate(); 

    const handlePremiumClick = () => {
        alert("Our Premium payment system is currently under maintenance. Please enjoy our Free plan features for now!");
    };

    return (
        <section id='Pricing' className="bg-green-50 py-12 md:py-20 px-4 md:px-6 transition-all duration-500">
          
           
            <div className="mx-auto max-w-4xl text-center mb-12 md:mb-16 px-2">
                <span className="bg-green-100 text-green-800 px-3 md:px-4 py-1 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest shadow-sm inline-block">
                    Pricing Plans
                </span>
                <h2 className="mt-4 text-2xl md:text-4xl lg:text-5xl font-serif font-extrabold tracking-tight text-green-900 leading-tight">
                    Ready to Start Your Journey?
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed px-2">
                    Choose the plan that fits your goals. From basic tracking to personal coaching with expert guidance.
                </p>
            </div>

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-8 px-2">
                
              
                <div className="flex flex-col text-center bg-white border border-green-200 rounded-3xl p-6 md:p-8 w-full md:w-80 shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="mb-6">
                        <h3 className="text-gray-400 font-bold text-xs md:text-sm uppercase tracking-widest mb-2">Free</h3>
                        <div className="flex items-baseline gap-1 justify-center">
                            <span className="text-4xl md:text-5xl font-black text-gray-900">$0</span>
                            <span className="text-gray-500 font-medium text-sm md:text-base">/ Month</span>
                        </div>
                        <p className="text-xs md:text-sm text-green-600 mt-2 font-medium italic">No Credit Card Required</p>
                    </div>

                    <ul className="flex-grow space-y-4 md:space-y-5 mb-8 text-center md:text-left">
                        {[
                            "Goal Setting (Losing/Gaining)",
                            "Smart Calorie Calculator",
                              "Weight Progress Tracking",
                            "Daily Meal Tracking",
                              "Basic Dashboard"
                        ].map((feature, index) => (
                            <li key={index} className="flex items-start gap-3 text-gray-600 text-xs md:text-sm justify-center md:justify-start">
                                <FaCheckCircle className="text-green-400  w-5 h-5 md:w-5 md:h-5 flex items-center justify-center" />
                                {feature}
                            </li>
                        ))}
                    </ul>

                   
                    <button 
                        onClick={() => navigate('/register')}
                        className="w-full py-3 md:py-4 rounded-xl border-2 border-green-600 text-green-700 font-bold text-sm md:text-lg hover:bg-green-600 hover:text-white transition-all duration-300"
                    >
                        Get Started
                    </button>
                </div>

               
                <div className="relative flex flex-col bg-white border-4 border-green-600 rounded-3xl p-6 md:p-8 w-full md:w-96 shadow-2xl transform md:scale-105 z-10 transition-all duration-300">
                    
                    <div className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-black px-3 md:px-4 py-1 md:py-2 rounded-full shadow-md uppercase">
                        Most Popular
                    </div>
                    
                    <div className="mb-6 text-center md:text-left">
                        <h3 className="text-green-700 font-bold text-xs md:text-sm uppercase tracking-widest mb-2">Premium</h3>
                        <div className="flex items-baseline gap-1 justify-center md:justify-start">
                            <span className="text-4xl md:text-5xl font-black text-gray-900">$9.99</span>
                            <span className="text-gray-500 font-medium text-sm md:text-base">/ Month</span>
                        </div>
                        <p className="text-xs md:text-sm text-red-500 mt-2 font-medium italic">Cancel Anytime</p>
                    </div>

                    <ul className="flex-grow space-y-4 md:space-y-5 mb-8 text-center md:text-left">
                        {[
                            { icon: <FaUserCheck />, text: "Personal Health Coach" },
                            { icon: <FaRunning />, text: "Customized Workouts" },
                            { icon: <FaFileAlt />, text: "Detailed Weekly Reports" },
                            { icon: <FaBell />, text: "Smart Notifications" },
                            { icon: <FaChartLine />, text: "Advanced Analytics" }
                        ].map((item, index) => (
                            <li key={index} className="flex items-center gap-3 text-gray-800 font-semibold group justify-center md:justify-start">
                                <span className="text-green-600 w-5 h-5 md:w-5 md:h-5 flex items-center justify-center group-hover:scale-110 transition">
                                    {item.icon}
                                </span>
                                <span className="text-sm md:text-base">{item.text}</span>
                            </li>
                        ))}
                    </ul>

                  
                    <button 
                        onClick={handlePremiumClick}
                        className="w-full py-3 md:py-4 rounded-xl bg-green-600 text-white font-bold text-sm md:text-lg hover:bg-green-700 shadow-[0_10px_20px_-5px_rgba(22,163,74,0.4)] transition-all duration-300"
                    >
                        Unlock Premium Now
                    </button>
                </div>

            </div>
            
          
            <div className="flex items-center justify-center gap-2 md:gap-4 mt-12 md:mt-16 text-gray-400 font-medium px-2">
                <FaShieldAlt className="text-base md:text-lg" />
                <span className="uppercase tracking-widest text-xs md:text-sm">Secure Payment via Visa / Mastercard</span>
            </div>
        </section>
    )
}

export default Pricing