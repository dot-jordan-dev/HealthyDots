import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import API from '../services/api';
import backcontact from '../assets/backcontact.jpg';

const ContactPage = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
   
      const response = await API .post('/Contact/send', formData);
      
      if (response.data.success) {
        setSent(true);
        setFormData({ name: '', email: '', message: '' }); 
        setTimeout(() => setSent(false), 5000);       }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Oops! Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact" className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900 relative overflow-hidden">
 <div className='fixed inset-0 z-0'>
  <img 
    className="w-full h-full object-cover opacity-90 md:opacity-90 transition-opacity duration-500" 
    src={backcontact} 
    alt="background contactus"
        />
        </div>

          <div className="relative z-10 max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
          <h2 className="text-green-600 font-black text-xs uppercase mb-3">Get In Touch</h2>
          <h1 className="text-2xl md:text-6xl  font-serif font-black text-slate-900 leading-tight">
          Let's Start Your <span className="text-green-500">Health Journey</span>
          </h1>
          <p className="text-slate-800 mt-3 md:mt-4 text-sm md:text-lg max-w-2xl mx-auto font-medium leading-relaxed px-2">
          Have questions? We're here to help. Reach out to our team and we'll respond as soon as possible.
          </p>
          </div>   

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
      
          <div className=" mt-0 lg:col-span-7 bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-white">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-700 uppercase ml-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name" 
                    className="w-full bg-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all border border-transparent focus:bg-white" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-700 uppercase ml-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com" 
                    className="w-full bg-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all border border-transparent focus:bg-white" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-700 uppercase ml-1">Message</label>
                <textarea 
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows="4" 
                  placeholder="How can we help you today?" 
                  className="w-full bg-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all border border-transparent focus:bg-white resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className={`w-full font-black py-5 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 group active:scale-[0.98] ${sent ? 'bg-green-500 text-white' : 'bg-slate-900 text-white hover:bg-green-600'}`}
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : sent ? (
                  <>Sent Successfully <CheckCircle2 size={18} /></>
                ) : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white p-6 rounded-[2rem] flex items-center gap-5 shadow-sm border border-slate-100 group hover:border-green-200 transition-all">
                <div className="p-4 bg-green-50 rounded-2xl text-green-600 group-hover:bg-green-500 group-hover:text-white duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Email Us</h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">support@HealthyDots.com</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[2rem] flex items-center gap-5 shadow-sm border border-slate-100 group hover:border-blue-200 transition-all">
                <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Call Us</h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">+ (962) 787-394-832</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[2rem] flex items-center gap-5 shadow-sm border border-slate-100 group hover:border-purple-200 transition-all">
                <div className="p-4 bg-purple-50 rounded-2xl text-purple-600 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Visit Us</h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">Amman, Jordan</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
              <h3 className="text-xl font-black mb-6 relative z-10 tracking-tight">
                Why Choose <span className="text-green-400 font-black">Healthy</span>Dots?
              </h3>
              <ul className="space-y-4 relative z-10">
                {[
                  "Real-time calorie tracking",
                  "Personalized nutritional goals",
                  "Smart daily progress insights",
                  "Easy-to-use meal logging"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-slate-300 font-medium hover:text-white transition-colors">
                    <CheckCircle2 size={18} className="text-green-400 " />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;