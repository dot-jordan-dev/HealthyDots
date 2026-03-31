import React from 'react';
import { TrendingUp, Zap, Lock, ChevronRight } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import backprogress3 from '../assets/backprogress3.jpg';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Progress = ({ list, goal, userData, name }) => {
  const displayName = name || userData?.name ;
  const effectiveGoal = goal || 2000; 

 
  const consumedToday = list ? list.reduce((sum, item) => {
    const calories = Number(item.cals) || 0;
    return sum + calories;
  }, 0) : 0;


  const percentage = effectiveGoal > 0 ? Math.min((consumedToday / effectiveGoal) * 100, 100) : 0;
  

  const remaining = Math.max(effectiveGoal - consumedToday, 0);
const getCalsByDay = (dayIndex) => {
    return list.reduce((sum, item) => {
      const rawDate = item.date || item.createdAt || new Date();
      const mealDate = new Date(rawDate);

      if (mealDate.getDay() === dayIndex) {
        return sum + (Number(item.cals) || 0);
      }
      return sum;
    }, 0);
  };

  const weeklyData = [
    { day: 'Sun', cals: getCalsByDay(0), active: new Date().getDay() === 0 },
    { day: 'Mon', cals: getCalsByDay(1), active: new Date().getDay() === 1 },
    { day: 'Tue', cals: getCalsByDay(2), active: new Date().getDay() === 2 },
    { day: 'Wed', cals: getCalsByDay(3), active: new Date().getDay() === 3 },
    { day: 'Thu', cals: getCalsByDay(4), active: new Date().getDay() === 4 },
    { day: 'Fri', cals: getCalsByDay(5), active: new Date().getDay() === 5 },
    { day: 'Sat', cals: getCalsByDay(6), active: new Date().getDay() === 6 },
  ];

  const chartData = {
    labels: weeklyData.map(d => d.day),
    datasets: [
      {
        label: 'Calories',
        data: weeklyData.map(d => d.cals),
        backgroundColor: weeklyData.map(d => d.active ? '#22c55e' : '#dcfce7'),
        borderColor: '#16a34a',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Calories Overview',
      },
    },
  };
  return (
    <div id='progress' className="relative min-h-screen bg-[#f8faf9] p-4 md:p-10 font-sans text-slate-900 pb-24 overflow-hidden">

      <div className='fixed inset-0 z-0'>
        <img 
          className="w-full h-full object-cover opacity-20 md:opacity-60" 
          src={backprogress3} 
          alt="Background Decoration"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        
   
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight">
              Activity <span className="text-green-600">Analysis</span>
            </h1>
                    <p className="text-slate-500 text-sm md:text-base font-bold mt-1">
                    {percentage >= 100 
            ? `Amazing! Goal reached, ${displayName}!` 
            : `Keep going, ${displayName}! You're doing great.`}
        </p>
          </div>
          <div className= "bg-white/80  w-35  h-20 backdrop-blur-md p-3 rounded-2xl shadow-sm border border-white/50 flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
              <Zap size={20} fill="currentColor" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase">Streak</p>
              <p className="  text-sm  md:text-lg font-black text-slate-800">5 Days</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      
          <div className="md:col-span-4 bg-white/70 backdrop-blur-xl rounded-[3rem] p-8 shadow-xl shadow-green-900/5 border border-white/60 flex flex-col items-center justify-center">
            <div 
              className="relative w-48 h-48 rounded-full flex items-center justify-center transition-all duration-1000 ease-out"
              style={{
                background: `conic-gradient(#22c55e ${percentage}%, #f1f5f9 0)`
              }}
            >
              <div className="w-[85%] h-[85%] bg-white rounded-full flex flex-col items-center justify-center shadow-sm">
                <p className="text-4xl font-black text-slate-800">{percentage.toFixed(0)}%</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Daily Goal</p>
              </div>
            </div>

            <div className="mt-8 text-center">
               <p className="text-slate-800 font-black text-lg">
                 {consumedToday} <span className="text-slate-400 text-sm font-normal">/ {effectiveGoal} kcal</span>
               </p>
               <p className={`text-xs font-bold mt-1 ${remaining > 0 ? 'text-green-600' : 'text-orange-600'}`}>
                 {remaining > 0 ? `${remaining} kcal left to reach goal` : "Daily Goal Achieved!"}
               </p>
            </div>
          </div>

       
          <div className="md:col-span-8 bg-white/70 backdrop-blur-xl rounded-[3rem] p-8 shadow-xl shadow-green-900/5 border border-white/60">
            <div className="flex justify-between items-center mb-10">
              <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase text-xs">
                <TrendingUp className="text-green-500" size={18} /> Weekly Overview
              </h3>
              <span className="text-[10px] font-black text-slate-400 bg-slate-50/50 px-3 py-1 rounded-full uppercase">
                {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            
            <Bar data={chartData} options={options} />
          </div>

          <div className="md:col-span-7 bg-white/60 backdrop-blur-md rounded-[3rem] p-8 shadow-xl shadow-green-900/5 border border-white/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[4px] z-10 flex flex-col items-center justify-center p-6 text-center">
              <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-xl mb-3">
                <Lock size={20} />
              </div>
              <h4 className="font-black text-slate-800 uppercase text-sm mb-1">Macronutrient Analysis</h4>
              <p className="text-[10px] text-slate-500 font-medium max-w-[220px]">Upgrade to Premium to track Protein, Carbs, and Fats</p>
              <button className="mt-4 text-green-600 text-[10px] font-black uppercase tracking-widest border-b-2 border-green-600 pb-1 hover:text-green-700 transition-colors">
                Unlock Features
              </button>
            </div>
       
            <div className="opacity-10 pointer-events-none space-y-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex items-center gap-4 h-12 bg-slate-100 rounded-2xl w-full px-4">
                    <div className="w-8 h-8 rounded-lg bg-slate-200"></div>
                    <div className="h-3 w-1/2 bg-slate-200 rounded"></div>
                 </div>
               ))}
            </div>
          </div>

          <div className="md:col-span-5 bg-gradient-to-br from-green-600 to-green-700 rounded-[2.5rem] p-8 text-white shadow-lg shadow-green-100 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col gap-5">
              <div>
                <p className="text-[10px] font-bold text-green-100 uppercase tracking-wider mb-1">Badge Earned</p>
                <h4 className="text-2xl font-black">Consistency King!</h4>
              </div>
              <p className="text-sm font-normal text-green-50/90 leading-relaxed">
                You've hit your goals for 5 days straight. You're outperforming 90% of our members!
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase bg-white/15 w-fit px-5 py-2 rounded-xl cursor-pointer hover:bg-white/25 transition-colors">
                View All Badges 
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Progress;