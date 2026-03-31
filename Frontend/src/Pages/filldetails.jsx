import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import API from '../services/api'
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import details from '../assets/details.jpg';


const FillDetails = ({ updateGoal }) => {
  const navigate = useNavigate();

  const initialValues = {
    fullName: "",
    dateOfBirth: "",
    gender: "",
    currentWeight: "",
    height: "",
    activityLevel: "moderate",
    yourGoal: "maintain", 
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().min(2, "Name is too short").required("Required"),
    dateOfBirth: Yup.date().required("Required"),
    gender: Yup.string().required("Required"),
    currentWeight: Yup.number().positive().required("Required"),
    height: Yup.number().positive().required("Required"),
    yourGoal: Yup.string().required("Required"),
  });

 /**
 * TDEE Calculation Logic
 * 1. Calculate age from DOB (Year-based for simplicity)
 * 2. Calculate BMR using the Mifflin-St Jeor formula
 * 3. Apply a 1.55 activity multiplier
 * 4. Adjust calories (+/- 500) based on weight goals (Lose/Gain)
 */

  const calculateCalories = (values) => {
  
    const { currentWeight, height, dateOfBirth, gender, yourGoal } = values;


    if (!currentWeight || currentWeight <= 0 || !height || height <= 0 || !dateOfBirth) {
      return 2000; 
    }

    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    if (age <= 0) return 2000; 

      
    let bmr = (10 * currentWeight) + (6.25 * height) - (5 * age);
   
    bmr = (gender === 'female') ? bmr - 161 : bmr + 5;

    if (isNaN(bmr) || bmr <= 0) return 2000;

    let tdee = bmr * 1.55;

    
    if (yourGoal === 'lose') tdee -= 500;
    if (yourGoal === 'gain') tdee += 500;  

    if (isNaN(tdee) || tdee <= 0) return 2000;

   
    return Math.round(tdee);
  };


const handleSubmit = async (values, { setSubmitting }) => {
  try {
    const finalGoal = calculateCalories(values);
    updateGoal(finalGoal); 

    const updateData = {
      weight: values.currentWeight,
      height: values.height,
      dailyCalorieGoal: finalGoal,
      gender: values.gender.toLowerCase(),
      dateOfBirth: values.dateOfBirth,
      yourGoal: values.yourGoal.toLowerCase() 
    };

   
    await API.put('/auth/update-profile', updateData);
    
    navigate("/Meals");
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    alert("Make sure you are logged in and try again.");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans flex items-center justify-end">
         <div className="absolute inset-0 z-0">
        <img className="w-full h-full object-cover" src={details} alt="Background" />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
            <div className="relative z-10 w-full max-w-3xl px-6 lg:px-20">
        <div className="bg-white/40 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/30 text-slate-900">
          <div className="mb-6">
            <h2 className="text-2xl md:text-4xl font-extrabold font-serif text-red-900 tracking-tight">Complete Your Profile</h2>
            <p className="mt-2 text-sm md:text-base text-gray-700 font-medium">We'll calculate the perfect calorie goal for you.</p>
          </div>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {() => (
              <Form className="space-y-4">
                
                <div className="flex flex-col">
                  <label className="text-xs md:text-sm font-bold uppercase mb-1">Full Name</label>
                  <Field name="fullName" type="text" className="w-full px-4 py-2 border rounded-xl bg-white/80 outline-none focus:ring-2 focus:ring-green-500 transition-all" />
                  <ErrorMessage name="fullName" component="p" className="text-[10px] text-red-600 font-bold" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                     <div className="flex flex-col">
                    <label className="text-xs md:text-sm font-bold uppercase mb-1">Date of Birth</label>
                    <Field name="dateOfBirth" type="date" className="w-full px-4 py-2 border rounded-xl bg-white/80 outline-none" />
                  </div>
                
                  <div className="flex flex-col">
                    <label className="text-xs md:text-sm font-bold uppercase mb-1">Gender</label>
                    <Field as="select" name="gender" className="w-full px-4 py-2 border rounded-xl bg-white outline-none">
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Field>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-xs md:text-sm font-bold uppercase mb-1">Weight (kg)</label>
                    <Field name="currentWeight" type="number" className="w-full px-4 py-2 border rounded-xl bg-white/80 outline-none" />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs md:text-sm font-bold uppercase mb-1">Height (cm)</label>
                    <Field name="height" type="number" className="w-full px-4 py-2 border rounded-xl bg-white/80 outline-none" />
                  </div>
                </div>

               
                <div className="flex flex-col">
                  <label className="text-xs md:text-sm font-bold uppercase mb-1">What is your goal?</label>
                  <Field as="select" name="yourGoal" className="w-full px-4 py-2 border rounded-xl bg-white outline-none">
                    <option value="maintain">Maintain Weight</option>
                    <option value="lose">Lose Weight</option>
                    <option value="gain">Gain Weight</option>
                  </Field>
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full py-3  bg-red-900 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg  uppercase tracking-wider text-sm md:text-base">
                    Generate My Plan
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default FillDetails;