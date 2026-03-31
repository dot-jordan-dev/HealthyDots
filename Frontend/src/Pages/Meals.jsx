import React, { useState, useEffect } from 'react';
import { Utensils, Plus, Flame, Target, Clock, Trash2, Activity, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import logo1 from '../assets/logo1.png';
import fresh2 from '../assets/fresh2.jpg';

const Meals = ({ list, setList, goal }) => {

  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const navigate = useNavigate();

  const effectiveGoal = goal || 2000; 


  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await API.get('/meals/all');
      
        const actualData = res.data.success ? res.data.data : res.data;

      
        if (Array.isArray(actualData) && actualData.length > 0) {
          setList(actualData);
        } else {
          setList([]);
        }

      } catch (err) {
        console.error("Error fetching meals:", err);
       
      }
    };
    fetchMeals();
  }, [setList]);

  const consumed = list.reduce((sum, item) => sum + (Number(item.cals) || 0), 0);


 const addNewMeal = async (e) => {
  e.preventDefault();
  if (!name || !calories) return;

  try {
    const mealData = { title: name, cals: Number(calories) };
    const res = await API.post('/meals/add', mealData);
    const newEntry = res.data.success ? res.data.data : res.data;

    setList(prevList => {
      
      const isDefault = prevList.every(item => item._id && item._id.toString().startsWith('default-'));
      
      if (isDefault) {
        return [newEntry]; 
      } else {
        return [newEntry, ...prevList];
      }
    });

    setName('');
    setCalories('');

} catch (err) {
      console.error("Error adding meal:", err.response?.data || err.message);
      if (err.response?.status === 500) {
        alert("Server Error (500)");
      } else {
        alert("Failed to save meal. Please try again.");
      }
    }
  };

  const deleteMeal = async (id) => {
    try {
      await API.delete(`/meals/delete/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting meal:", err);
      alert("Could not delete meal.");
    }
  };

  return (
    <div id="meals" className="relative min-h-screen bg-[#f8faf9] p-4 md:p-10 font-sans text-slate-900 pb-24 overflow-hidden">
     
      <div className="fixed bottom-0 right-0 z-0 ">
        <img 
          className="w-[250px] md:w-[400px] lg:w-[500px] h-auto object-contain opacity-30 md:opacity-40 " 
          src={fresh2} 
          alt="Fresh decoration"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        
        <div className="mb-10 flex items-center justify-between gap-6 bg-white/40 backdrop-blur-sm p-4 rounded-3xl border border-white/50 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-2xl shadow-xl shadow-green-900/5 mt-1 flex items-center justify-center w-16 h-16 overflow-hidden bg-white border border-white">
              <img src={logo1} alt="HealthyDots Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl md:text-5xl font-black italic text-slate-800 ">
                Healthy<span className="text-green-600 font-bold">Dots</span>
              </h1>
              <p className="text-slate-400 font-black text-[10px] md:text-xs uppercase tracking-widest mt-1 ml-1">
                Track your daily energy
              </p>
            </div>
          </div>

          <button 
            onClick={() => navigate('/Progress')} 
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-2xl font-black uppercase text-xs md:text-sm hover:bg-green-600  shadow-lg shadow-slate-200"
          >
            View My Progress <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-[2rem] shadow-xl shadow-green-900/5 border border-white flex justify-between items-center group hover:scale-105 transition-transform duration-300">
            <div>
              <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase  mb-1">Goal</p>
              <p className="text-2xl font-black text-slate-800">{effectiveGoal}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-500">
              <Target size={20} />
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-[2rem] shadow-xl shadow-green-900/5 border border-white flex justify-between items-center border-l-4 border-l-green-500  transition-transform duration-300">
            <div>
              <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Consumed</p>
              <p className="text-2xl font-black text-green-600">{consumed}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-2xl text-orange-500">
              <Flame size={20} fill="currentColor" />
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-[2rem] shadow-xl shadow-green-900/5 border border-white flex justify-between items-center  transition-transform duration-300">
            <div>
              <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Remaining</p>
              <p className="text-2xl font-black text-blue-600">{effectiveGoal - consumed}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-2xl text-purple-500">
              <Clock size={20} />
            </div>
          </div>
        </div>

    
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-20">
          
          <div className="md:col-span-5 bg-white/80 backdrop-blur-2xl p-8 rounded-[3rem] shadow-2xl shadow-green-900/5 border border-white/60 relative z-10">
            <h2 className="font-black text-slate-800 text-sm mb-8 flex items-center gap-2 uppercase tracking-tight">
              <Plus size={18} className="text-green-600" strokeWidth={3}/> New Log Entry
            </h2>
            
            {list.length >= 4 ? (
              <div className="space-y-6 text-center py-4">
                <div className="bg-orange-50/50 backdrop-blur-sm p-6 rounded-[2.5rem] border-2 border-dashed border-orange-200">
                  <p className="text-orange-800 font-black text-xs mb-2 uppercase">Daily Limit Reached!</p>
                  <p className="text-slate-500 text-[10px] font-bold leading-relaxed">
                    Your free plan allows 10 meals per day. Upgrade to Premium for unlimited logging.
                  </p>
                </div>
                <button 
                  onClick={() => alert("Coming Soon: Subscription Plans!")}
                  className="w-full bg-green-600 text-white font-black py-4 rounded-2xl hover:bg-green-700 transition-all shadow-lg shadow-green-200 uppercase text-[10px]"
                >
                  Upgrade to Premium
                </button>
              </div>
            ) : (
              <form onSubmit={addNewMeal} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase px-1 tracking-widest">Meal Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Tuna Salad" 
                    className="w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all border border-transparent focus:bg-white text-sm font-bold shadow-inner" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase px-1 tracking-widest">Calories (kcal)</label>
                  <input 
                    type="number" 
                    placeholder="0" 
                    className="w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all border border-transparent focus:bg-white text-sm font-bold shadow-inner" 
                    value={calories} 
                    onChange={(e) => setCalories(e.target.value)} 
                  />
                </div>
                <button className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-green-600 transition-all shadow-xl shadow-slate-200 mt-2 relative z-20 uppercase text-xs tracking-widest">
                  Save Entry
                </button>
              </form>
            )}
          </div>
        
          <div className="md:col-span-7 space-y-5">
            <div className="flex justify-between items-center px-4">
              <h2 className="font-black text-slate-700 uppercase text-xs tracking-widest flex items-center gap-2">
                <Activity size={16} className="text-green-600" /> Today's List
              </h2>
              <span className="text-[10px] font-black text-slate-400 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-100 uppercase shadow-sm">
                {list.length} items
              </span>
            </div>
            
            <div className="space-y-4">
              {list.map((item) => (
                <div 
                  key={item._id}
                  className="bg-white/70 backdrop-blur-xl p-5 rounded-[2.5rem] flex justify-between items-center border border-white hover:border-green-200 transition-all  shadow-xl shadow-green-900/[0.02] hover:shadow-green-900/[0.05]"
                >
                  <div className="flex items-center gap-5">
                    <div className="bg-white p-4 rounded-[1.5rem] shadow-sm">
                      <Utensils size={22} className="text-slate-400" />
                    </div>
                    <div>
                      <p className="font-black text-slate-800 text-lg hover:text-green-700 transition-colors">{item.title}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{item.cals} kcal consumed</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => deleteMeal(item._id)}
                    className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-[1.5rem] transition-all relative z-20"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}

              {list.length === 0 && (
                <div className="text-center py-20 bg-white/40 backdrop-blur-sm rounded-[3rem] border border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest italic">No meals logged yet today.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meals;