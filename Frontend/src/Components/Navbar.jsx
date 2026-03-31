import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import logo2 from '../assets/logo2.png';


const Navbar = ({ userData, handleLogout }) => { 
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


  const isLoggedIn = (userData && userData.name) || !!localStorage.getItem('token');

   const closeMenu = () => setIsOpen(false);

  const onLogoutClick = () => {
    if (handleLogout) {
      handleLogout(); 
      closeMenu(); 
      navigate("/loginpage");
    }
  };

  return (
    <nav className="bg-[#ddf7e3] text-black p-4 w-full fixed top-0 left-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
          
        <div className="flex items-center">
          <img className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full object-cover mr-2" src={logo2} alt="logo" />
          <h4 className="text-sm md:text-xl font-black italic text-slate-800 transition-all">
            Healthy<span className="text-green-600 font-bold">Dots</span>
          </h4>
        </div>

    
        <button
          className="md:hidden text-black text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>

       
        <ul
          className={`flex-col md:flex-row md:flex items-center md:space-x-6 absolute md:static left-0 w-full md:w-auto bg-[#ddf7e3] md:bg-transparent p-6 md:p-0 transition-all duration-300 ease-in-out ${
            isOpen ? "top-[60px] shadow-lg md:shadow-none opacity-100" : "top-[-600px] opacity-0 md:opacity-100"
          }`}
        >
          <li>
            <a href="/#home" onClick={closeMenu} className="hover:text-green-700 transition font-medium block py-3 md:py-0">Home</a>
          </li>
          
          <li>
            <a href="/#FEATURES" onClick={closeMenu} className="hover:text-green-700 transition font-medium block py-3 md:py-0">Features</a>
          </li>
          
          <li>
            <Link to={isLoggedIn ? "/Meals" : "/loginpage"} onClick={closeMenu} className="hover:text-green-700 transition font-medium block py-3 md:py-0">
              Meals
            </Link>
          </li>
          
          <li>
            <Link to={isLoggedIn ? "/Progress" : "/loginpage"} onClick={closeMenu} className="hover:text-green-700 transition font-medium block py-3 md:py-0">
              Progress
            </Link>
          </li>

          <li>
            <Link to="/ContactPage" onClick={closeMenu} className="hover:text-green-700 transition font-medium block py-3 md:py-0">Contact US</Link>
          </li>

          {!isLoggedIn ? (
            <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0 w-full md:w-auto">
              <li>
                <Link to="/loginpage" onClick={closeMenu} className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition inline-block w-full md:w-auto text-center font-bold">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={closeMenu} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition inline-block w-full md:w-auto text-center font-bold">
                  Signup
                </Link>
              </li>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
              {userData?.name && (
                <li className="bg-white/50 px-4 py-1.5 rounded-full border border-green-200">
                  <span className="text-sm font-bold text-slate-700">Hi, {userData.name.split(' ')[0]}</span>
                </li>
              )}
              <li>
                <button 
                  onClick={onLogoutClick}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-sm font-bold text-sm w-full md:w-auto"
                >
                  Logout
                </button>
              </li>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;