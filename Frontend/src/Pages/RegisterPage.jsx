import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { FaGoogle, FaFacebook, FaInstagram, FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import API from "../services/api"
import register2 from "../assets/register2.jpg"; 

const RegisterPage = ({ setUserData }) => {
  const navigate = useNavigate();

  const initialValues = {
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    phoneNumber: "",
  };

  const validationSchema = Yup.object({
    FirstName: Yup.string().min(2, "Short").required("Required"),
    LastName: Yup.string().min(2, "Short").required("Required"),
    Email: Yup.string().email("Invalid email").required("Required"),
    Password: Yup.string().min(8, "Password must be at least 8 chars").required("Required"),
    ConfirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref('Password')], "Passwords must match"),
    phoneNumber: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      
      const registerData = {
        name: `${values.FirstName} ${values.LastName}`.trim(), 
        email: values.Email.toLowerCase().trim(), 
        password: values.Password,
        phoneNumber: values.phoneNumber 
      };

      const { data } = await API.post('/auth/register', registerData); 

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user || data.data));
      
      if (setUserData) {
        setUserData(data.user || data.data);
      }
      
      navigate("/welcome");
      
    } catch (error) {
      console.error("Backend Error:", error.response?.data);
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover object-center" 
          src={register2} 
          alt="Background" 
        />
      </div>

      <div className="relative z-10 flex items-center justify-end h-full md:pr-10 lg:pr-40">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched, isValid, dirty, isSubmitting }) => (
            <Form className="w-full max-w-[500px] bg-white/90 p-6 md:p-8 mt-10 rounded-3xl shadow-2xl backdrop-blur-md mx-4 md:mx-0">
              
              <h1 className="text-3xl md:text-4xl text-emerald-700 font-serif font-bold mb-4">Register</h1>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <label className="text-[11px] md:text-xs font-bold text-gray-600">First Name</label>
                  <div className="relative mt-0.5">
                    <FaUser className="absolute left-3 top-2.5 text-emerald-700 text-sm" />
                    <Field name="FirstName" placeholder="First" className={`w-full p-1.5 pl-9 rounded border text-sm focus:outline-none ${errors.FirstName && touched.FirstName ? "border-red-600" : "border-gray-300 focus:border-emerald-600"}`} />
                  </div>
                  <ErrorMessage name="FirstName" component="div" className="text-red-700 text-[10px]" />
                </div>

                <div className="relative">
                  <label className="text-[11px] md:text-xs font-bold text-gray-600">Last Name</label>
                  <div className="relative mt-0.5">
                    <FaUser className="absolute left-3 top-2.5 text-emerald-700 text-sm" />
                    <Field name="LastName" placeholder="Last" className={`w-full p-1.5 pl-9 rounded border text-sm focus:outline-none ${errors.LastName && touched.LastName ? "border-red-600" : "border-gray-300 focus:border-emerald-600"}`} />
                  </div>
                  <ErrorMessage name="LastName" component="div" className="text-red-700 text-[10px]" />
                </div>
              </div>

              <div className="mt-3">
                <label className="text-[11px] md:text-xs font-bold text-gray-600">Email</label>
                <div className="relative mt-0.5">
                  <FaEnvelope className="absolute left-3 top-2.5 text-emerald-700 text-sm" />
                  <Field name="Email" placeholder="Email Address" className={`w-full p-1.5 pl-9 rounded border text-sm focus:outline-none ${errors.Email && touched.Email ? "border-red-600" : "border-gray-300 focus:border-emerald-600"}`} />
                </div>
                <ErrorMessage name="Email" component="div" className="text-red-700 text-[10px]" />
              </div>

              <div className="mt-3">
                <label className="text-[11px] md:text-xs font-bold text-gray-600">Phone</label>
                <div className="relative mt-0.5">
                  <FaPhone className="absolute left-3 top-2.5 text-emerald-700 text-sm" />
                  <Field name="phoneNumber" placeholder="07XXXXXXXX" className={`w-full p-1.5 pl-9 rounded border text-sm focus:outline-none ${errors.phoneNumber && touched.phoneNumber ? "border-red-600" : "border-gray-300 focus:border-emerald-600"}`} />
                </div>
                <ErrorMessage name="phoneNumber" component="div" className="text-red-700 text-[10px]" />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="relative">
                  <label className="text-[11px] md:text-xs font-bold text-gray-600">Password</label>
                  <div className="relative mt-0.5">
                    <FaLock className="absolute left-3 top-2.5 text-emerald-700 text-sm" />
                    <Field type="password" name="Password" placeholder="Password" className={`w-full p-1.5 pl-9 rounded border text-sm focus:outline-none ${errors.Password && touched.Password ? "border-red-600" : "border-gray-300 focus:border-emerald-600"}`} />
                  </div>
                </div>
                <div className="relative">
                  <label className="text-[11px] md:text-xs font-bold text-gray-600">Confirm</label>
                  <div className="relative mt-0.5">
                    <FaLock className="absolute left-3 top-2.5 text-emerald-700 text-sm" />
                    <Field type="password" name="ConfirmPassword" placeholder="Confirm" className={`w-full p-1.5 pl-9 rounded border text-sm focus:outline-none ${errors.ConfirmPassword && touched.ConfirmPassword ? "border-red-600" : "border-gray-300 focus:border-emerald-600"}`} />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!(isValid && dirty) || isSubmitting}
                className={`w-full mt-6 py-2 rounded-full font-bold text-white text-sm md:text-base transition-all ${isValid && dirty && !isSubmitting ? "bg-emerald-600 hover:bg-emerald-700 shadow-lg" : "bg-gray-300 cursor-not-allowed"}`}
              >
                {isSubmitting ? "Processing..." : "Get started"}
              </button>

              <div className="mt-4 text-center border-t border-gray-100 pt-4">
                <p className="text-gray-400 text-[10px] md:text-xs mb-2">Or register with</p>
                <div className="flex justify-center gap-5">
                  <button type="button" className="text-red-500 hover:scale-110"><FaGoogle size={18} /></button>
                  <button type="button" className="text-blue-600 hover:scale-110"><FaFacebook size={18} /></button>
                  <button type="button" className="text-pink-500 hover:scale-110"><FaInstagram size={18} /></button>
                </div>
              </div>

              <p className="text-center mt-4 text-xs text-gray-600">
                Already have an account? <Link to="/loginpage" className="text-emerald-700 font-bold hover:underline">Login</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;