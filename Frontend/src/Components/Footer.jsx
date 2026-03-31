import React from 'react'
import logo2 from '../assets/logo2.png'
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = ({ userData }) => {

  const isLoggedIn = (userData && userData.name) || !!localStorage.getItem('token');
  


  return (
    <footer className="bg-green-100 text-gray-700 border-t-2 border-green-100">
      <div className="container pt-12 pb-8 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img className="w-32 mb-4 rounded-full" src={logo2} alt="HealthyDots Logo" />
          <p className="text-[14px] md:text-base leading-relaxed max-w-[200px]">
            Your all-in-one platform to track nutrition and health daily. 
          </p>
        </div>

          <div className='mt-6'>
          <h4 className="font-bold text-green-800 mb-4">Platform</h4>
          <ul className="space-y-2">
            <li><a href="#FEATURES" className="hover:text-green-700 transition">Features</a></li>
                 <li>
                        <Link to={isLoggedIn ? "/Meals" : "/loginpage"}  className="hover:text-green-700 transition">Meal Tracking</Link>
                                       
                      </li>
                           <li>
                        <Link to={isLoggedIn ? "/Progress" : "/loginpage"}  className="hover:text-green-700 transition">Progress</Link>
                      </li>
            <li><a href="#Coach" className="hover:text-green-700 transition">Personal Health Coach</a> </li>
          </ul>
        </div>

        
        <div  className='mt-6'>
          <h4 className="font-bold text-green-800 mb-4">Support</h4>
          <ul className="space-y-2">
            <li><Link to="/ContactPage" className="hover:text-green-700 transition">Contact US</Link></li>
            <li><a href="#" className="hover:text-green-700 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-green-700 transition">Terms of Service</a></li>
          </ul>
        </div>

       
        <div  className='mt-6'>
          <h4 className="font-bold text-green-800 mb-4 md:mr-40">Follow Us</h4>
          <ul className="flex space-x-4 justify-center md:justify-start">
            <li>
              <a href="#" className="hover:text-red-700 text-3xl transition" aria-label="YouTube">
                <FaYoutube />
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-700 text-3xl transition" aria-label="Facebook">
                <FaFacebook />
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-700 text-3xl transition" aria-label="Instagram">
                <FaInstagram />
              </a>
            </li>
          </ul>
        </div>
        
      </div>

      
      <div className="text-center border-t border-green-200 mt-10 py-6">
        <p className="text-sm">© 2026 HealthyDots. All rights reserved. </p>
      </div>
    </footer>
  )
}

export default Footer