import React, { useState, useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Coach from '../Components/Coach'
import Pricing from '../Components/pricing'
import MealSlider from '../Components/MealsPlan';
import Health5 from '../assets/Health5.jpg'
import Health6 from '../assets/Health6.jpg'
import health7 from '../assets/health7.jpg'
import Health2 from '../assets/Health2.jpg'
import Health4 from '../assets/Health4.jpg'
import kewi from '../assets/kewi.png'
import avocado from '../assets/avocado .gif'
import banana from '../assets/banana.gif'
import apple from '../assets/apple.gif'
import salad from '../assets/salad.jpg'
import chart from '../assets/chart.png'
import goals from '../assets/goals.png'
import coach from '../assets/coach.jpg'
import mark from '../assets/mark.png'
import orange from '../assets/orange.png'
import healthydots from '../assets/healthydots.png'



const HomePage = ({ userData ,handleLogout}) => {

  const images = [Health5, Health6, health7, Health2, Health4];
  const [index, setIndex] = useState(0);
 
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true      
    });
  }, []);


  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <Navbar userData={userData} handleLogout={handleLogout} />
      
<div  id="home" className=" w-full bg-[#ddf7e3] pt-20 md:pt-32 py-20 rounded-br-[80px] md:rounded-br-full ">
  <div className="px-6 md:px-16 py-10 flex flex-col md:flex-row items-center">

    <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
      <h1 className="text-3xl font-serif md:text-5xl leading-tight">
        <span className="text-red-600 font-serif text-4xl md:text-7xl">Healthy</span>
        <br />
        living, made simple
      </h1>

      <p className="text-gray-700  mb-8 max-w-md mx-auto md:mx-0">
        Personalized nutrition plans and one-on-one <br />
        guidance to help you reach your goals
      </p>

      <div className="space-y-3">
             <Link to="loginpage"
                className="bg-[#aff7c0] text-black px-6 py-3 rounded-lg shadow hover:bg-green-600 transition">
          Get Started
        </Link>

        <p className="text-sm md:text-base text-gray-700 pt-6">
          Already have an account? Sign in and start today
        </p>
      </div>
    </div>

    <div className="w-full md:w-1/2 flex justify-center mt-12 md:mt-0 relative">
      <div className="absolute w-60 md:w-96 aspect-square bg-green-200 rounded-full blur-3xl -z-10"></div>

      <div className="w-80 md:w-90 aspect-square rounded-full overflow-hidden shadow-2xl border-4 border-white">
        <img
          src={images[index]}
          alt="health"
          className="w-full h-full object-cover transition-all duration-700"
        />
      </div>
    </div>

  </div>
</div>


<div className="flex flex-col md:flex-row bg-white w-full mt-10 md:mt-40">

  <div className="w-full mb-2 md:w-[40%] md:mb-10">
    <img src={kewi} className="w-full h-full object-cover" />
  </div>

  <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-0 md:py-20">

    <h2 className="text-5xl md:text-6xl  font-serif  md:mr-20 md:mb-6">
      Why healthy
    </h2>

    <ul className="space-y-8  text-gray-700 mb-12  mt-7 md:ml-20">
      {[
        "Improved physical health",
        "Better mental health",
        "Increased longevity",
        "Weight management",
        "Improved self-confidence",
        "Reduced stress"
      ].map((item, index) => (
        <li key={index}  className="flex md:ml-10  ml-18 gap-3 " data-aos="fade-down" >
            <FaCheckCircle className="text-green-400 text-xl flex-shrink-0" />
                                          {item}
        </li>
      ))}
    </ul>

    <div className="bg-green-100 mt-12 md:mt-10 p-6 rounded-2xl shadow-lg w-full " data-aos="fade-left">
      <h1 className=" font-serif text-xl md:text-2xl font-bold mb-2" >
        We have plans for
      </h1>

      <h4 className="mb-4">
        Build healthier habits with personalized lessons
      </h4>

      <hr className="w-full md:w-1/2 mx-auto border-green-600 mb-6" />

      <div className="flex flex-col md:flex-row justify-around gap-6">

        <div className="flex flex-col items-center">
          <img src={apple} className="w-16 rounded-full bg-amber-50 p-2 mb-2" />
          <h3>Loosing weight</h3>
        </div>

        <div className="flex flex-col items-center">
          <img src={banana} className="w-16 rounded-full bg-amber-50 p-2 mb-2" />
          <h3>Gaining weight</h3>
        </div>

        <div className="flex flex-col items-center">
          <img src={avocado} className="w-16 rounded-full bg-amber-50 p-2 mb-2" />
          <h3>Maintaining weight</h3>
        </div>

      </div>
    </div>

  </div>
</div>


<div id="FEATURES" className="w-full px-6 md:px-16 mt-24 md:mt-32">

  <h1 className="text-2xl  md:text-5xl text-center mb-10 md:mb-16 leading-tight">
    Live Smart with 
    <span className="text-red-700 font-serif text-2xl md:text-7xl ml-2  ">
      HealthyDots
    </span>
  </h1>


  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12  md:mt-9">

    {[{
      img: salad,
      title: "Your Health, Calculated for You",
      text: "Enter your details and HealthyDots calculates your daily calorie needs."
    },
    {
      img: chart,
      title: "Track Your Progress",
      text: "Log meals and track your weight through interactive charts."
    },
    {
      img: goals,
      title: "Set Clear Goals",
      text: "Choose your goal and stay consistent with reminders."
    },
    {
      img: coach,
      title: "Personal Health Coach",
      text: "Subscribe and unlock personalized guidance."
    }].map((item, i) => (
      <div key={i} data-aos='fade-up' className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 md:gap-6">
      
        <img className="w-20 md:w-28 h-20 md:h-28 rounded-full object-cover shadow-sm" src={item.img} alt={item.title} />
        
        <div className="flex-1">
        
          <h4 className="text-base md:text-lg font-bold mb-1 md:mb-2 md:mt-5 text-slate-800">{item.title}</h4>
          
        
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed px-4 md:px-0">
            {item.text}
          </p>
          
        
          <hr className="w-20 md:w-full mt-4 border-green-600 mx-auto md:mx-0 opacity-50" />
        </div>
      </div>
    ))}

  </div>
</div>



<div data-aos="zoom-in" className="w-fit md:w-fit bg-[#DDF7E3] mt-20 md:mt-28 mx-auto p-6 rounded-3xl flex flex-col items-center">

  <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
    <h1 className="text-base md:text-xl max-w-xs">
      Don’t know what’s the right meal plan or the diet for you?
    </h1>
    <img className="w-32 md:w-40 rounded" src={mark} />
  </div>

    <Link to="loginpage" className="mt-4 bg-[#aff7c0] px-6 py-3 rounded-lg shadow hover:bg-green-600 transition font-semibold">
    Sign in today
  </Link>

</div>



<div className="w-full mt-0 mb-15 px-6 md:mt-30">

  <h1 className="text-xl md:text-4xl  md:text-left pt-28  md:pl-20  pb-0 ">
    What is a 
    <span className="text-red-700 text-2xl md:text-6xl font-serif ">
      HealthyDots
    </span>
    for you ?
  </h1>

  <div className="flex flex-col md:flex-row items-center justify-between gap-7 mt-0">

    <img className="w-48  md:w-[40%]" src={healthydots} />
<ul className="space-y-6 text-gray-700 text-center md:text-left w-full md:w-[30%]">
  {[
    "Smart Diet Tracker",
    "Personal Health Coach",
    "Progress Dashboard",
    "Smart Meal Planner",
    "Customized Workouts",
    "Advanced Health Reports"
  ].map((item, index) => (
    <li key={index}  data-aos="fade-down" className="flex items-center justify-center md:justify-start gap-3 text-[16px]">
      
      <span className="w-4 h-4 bg-green-700 rounded-full inline-block"></span>
      {item}
    </li>
  ))}
</ul>
    <img className="hidden md:block md:w-[33%]" src={orange} />

  </div>
      </div>
 < MealSlider/>
  <Coach />
   <Pricing/>
 <Footer/>
    </div>
  )
}

export default HomePage