import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom' 
import ScrollToTop from './Components/ScrollToTop' 
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/Login'
import RegisterPage from './Pages/RegisterPage'
import WelcomePage from './Pages/WelcomePage'
import FillDetails from './Pages/filldetails'
import Meals from './Pages/Meals'
import Progress from './Pages/Progress'
import ContactPage from "./Components/Contact"

function App() {
 
  const updateGoal = (newGoal) => {
    setUserData(prev => {
      const updatedUser = { ...prev, goal: newGoal };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

 
  const [userData, setUserData] = useState({
    name: '',
    height: 0,
    age: 0,
    gender: '',
    goal: 2000
  });

  const [list, setList] = useState([
    { _id: 'default-1', title: 'Avocado Toast', cals: 350 },
    { _id: 'default-2', title: 'Salmon Salad', cals: 500 }
  
  ]);

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    
    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        parsedUser.goal = parsedUser.dailyCalorieGoal || parsedUser.goal || 2000;
        setUserData(parsedUser); 
      } catch (e) {
        console.error("Error loading user from storage", e);
      }
    }
  }, []); 

  
  const isLoggedIn = userData.name || !!localStorage.getItem('token');

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  setList([
    { _id: 'default-1', title: 'Avocado Toast', cals: 350 },
    { _id: 'default-2', title: 'Salmon Salad', cals: 500 }
  ]);

  setUserData({
    name: '',
    height: 0,
    age: 0,
    gender: '',
    goal: 2000 
  });
};

  return (
    <>
   <BrowserRouter>
      <ScrollToTop /> 
      <Routes>
     
<Route path="/" element={<HomePage userData={userData} handleLogout={handleLogout} />} />      
       
        <Route path="loginpage" element={<LoginPage setUserData={setUserData} />} />
        <Route path='register' element={<RegisterPage setUserData={setUserData} />} />
        
        <Route path='details' element={<FillDetails updateGoal={updateGoal} />} />
        <Route path='welcome' element={<WelcomePage />} />
                        
        <Route 
          path='Meals' 
          element={isLoggedIn ? <Meals list={list} setList={setList} goal={userData.goal} /> : <Navigate to="/loginpage" />} 
        />
        
        <Route 
          path='Progress' 
          element={isLoggedIn ? <Progress list={list} goal={userData.goal} name={userData.name} /> : <Navigate to="/loginpage" />} 
        />
        
        <Route path='ContactPage' element={<ContactPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;