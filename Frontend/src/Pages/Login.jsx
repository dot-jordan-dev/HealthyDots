import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FaGoogle, FaFacebook, FaInstagram, FaEnvelope, FaLock } from 'react-icons/fa';
import API from '../services/api';
import login from "../assets/login.jpg"; 

const LoginPage = ({ setUserData }) => {
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().required("Required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
           
            const { data } = await API.post('/auth/login', {
                email: values.email.toLowerCase().trim(), 
                password: values.password
            });


            const token = data.token;
            const user = data.user || data.data; 

       
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
           
            if (setUserData) {
                setUserData(user); 
            }

         
            try {
                const profileRes = await API.get('/auth/me');
                const updatedUser = profileRes.data.user || profileRes.data;
                
                updatedUser.goal = updatedUser.dailyCalorieGoal || updatedUser.goal || 2000;
                setUserData(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
            } catch (err) {
                console.error("Error fetching updated profile:", err);
            }

         
            const dailyGoal = user.dailyCalorieGoal || user.goal;
            if (!dailyGoal || dailyGoal === 2000) {
                navigate("/welcome");
            } else {
                navigate("/");
            }

        } catch (error) {
            console.error("Login Error:", error);
            alert(error.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden font-sans">
           
            <div className="absolute inset-0 z-0">
                <img 
                    className="w-full h-full object-cover object-center" 
                    src={login} 
                    alt="Background" 
                />
            </div>

            <div className="relative z-10 flex items-center justify-center h-full w-full px-4">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isValid, dirty, errors, touched, isSubmitting }) => (
                        <Form className="w-full max-w-[400px] bg-white/20 p-8 md:p-10 rounded-[40px] shadow-2xl backdrop-blur-md flex flex-col border border-white/30">
                            
                            <div className="text-center mb-8">
                                <h1 className="text-4xl md:text-4xl text-emerald-800 font-black  font-serif drop-shadow-sm">Welcome</h1>
                                <p className="text-emerald-900/70 text-sm md:text-base font-bold mt-2">Login to your account</p>
                            </div>

                            <div className="mb-4">
                                <div className="relative">
                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-800" />
                                    <Field 
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        className={`w-full py-3.5 pl-12 pr-4 rounded-2xl border-none bg-white/40 text-emerald-900 placeholder:text-emerald-900/50 focus:bg-white/60 outline-none transition-all ${errors.email && touched.email ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-emerald-500"}`}
                                    />
                                </div>
                                <ErrorMessage name="email" component="div" className="text-red-700 text-[10px] font-bold mt-1 ml-2" />
                            </div>

                            <div className="mb-2">
                                <div className="relative">
                                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-800" />
                                    <Field 
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className={`w-full py-3.5 pl-12 pr-4 rounded-2xl border-none bg-white/40 text-emerald-900 placeholder:text-emerald-900/50 focus:bg-white/60 outline-none transition-all ${errors.password && touched.password ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-emerald-500"}`}
                                    />
                                </div>
                                <ErrorMessage name="password" component="div" className="text-red-700 text-[10px] font-bold mt-1 ml-2" />
                            </div>

                            <div className="flex justify-end mb-6">
                                <Link to="/forgot" className="text-xs text-emerald-900 font-bold hover:underline">Forgot Password?</Link>
                            </div>

                            <button
                                type="submit"
                                disabled={!(isValid && dirty) || isSubmitting}
                                className={`w-full py-4 rounded-2xl font-black text-white text-sm tracking-widest uppercase shadow-xl transition-all ${isValid && dirty && !isSubmitting ? "bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-emerald-900/20" : "bg-gray-400/50 cursor-not-allowed"}`}
                            >
                                {isSubmitting ? "Logging in..." : "Sign In"}
                            </button>

                            <div className="mt-8 text-center">
                                <span className="text-[10px] font-bold text-emerald-900/60 uppercase tracking-widest">Or connect with</span>
                                <div className="flex justify-center gap-4 mt-4">
                                    <button type="button" className="w-11 h-11 flex items-center justify-center rounded-full bg-white/40 border border-white/30 text-red-600 hover:bg-white/60 transition-colors"><FaGoogle size={18} /></button>
                                    <button type="button" className="w-11 h-11 flex items-center justify-center rounded-full bg-white/40 border border-white/30 text-blue-700 hover:bg-white/60 transition-colors"><FaFacebook size={18} /></button>
                                    <button type="button" className="w-11 h-11 flex items-center justify-center rounded-full bg-white/40 border border-white/30 text-pink-700 hover:bg-white/60 transition-colors"><FaInstagram size={18} /></button>
                                </div>
                            </div>

                            <p className="text-center mt-8 text-xs font-bold text-emerald-900/70">
                                Don't have an account? <Link to="/register" className="text-emerald-900 font-black hover:underline">Create Account</Link>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginPage;