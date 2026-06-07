import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import API_BASE_URL from '../apiConfig';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert(t('Your query has been sent successfully. We will get back to you shortly.'));
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        alert(t('Failed to send message. Please try calling us instead.'));
      }
    } catch (err) {
      console.error(err);
      alert(t('Connection error. Please try calling or WhatsApp.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-24 relative overflow-hidden">
      {/* Background Decorative Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-poppins font-bold text-slate-900 mb-6"
          >
            {t('Get In Touch')}
          </motion.h1>
          <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('Have questions about our packages or want to customize your trip? Our team is available 24/7 to assist you.')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex items-start gap-6 hover:border-yellow-400 transition-colors group">
              <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-yellow-400 transition-colors">
                <Phone className="w-6 h-6 text-yellow-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('Call Us')}</h3>
                <p className="text-slate-500 mb-1">{t('For immediate bookings')}</p>
                <a href="tel:8667520367" className="text-lg font-bold text-slate-900 hover:text-yellow-500">+91 86675 20367</a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex items-start gap-6 hover:border-green-500 transition-colors group cursor-pointer" onClick={() => window.open('https://wa.me/918667520367', '_blank')}>
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-green-500 transition-colors">
                <MessageCircle className="w-6 h-6 text-green-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('WhatsApp')}</h3>
                <p className="text-slate-500 mb-1">{t('Fastest way to reach us')}</p>
                <span className="text-lg font-bold text-slate-900 group-hover:text-green-500">+91 86675 20367</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex items-start gap-6 hover:border-blue-500 transition-colors group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-500 transition-colors">
                <Mail className="w-6 h-6 text-blue-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('Email Us')}</h3>
                <p className="text-slate-500 mb-1">{t('For corporate queries')}</p>
                <a href="mailto:info@maduraitourtaxi.com" className="text-lg font-bold text-slate-900 hover:text-blue-500">info@maduraitourtaxi.com</a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex items-start gap-6 hover:border-yellow-400 transition-colors group">
              <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-yellow-400 transition-colors">
                <MapPin className="w-6 h-6 text-yellow-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('Office Address')}</h3>
                <p className="text-slate-655 leading-relaxed font-medium">
                  1342 shop number,<br />
                  Housing board,<br />
                  Mela anuppanati, Madurai.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-10 h-full flex flex-col justify-center">
              <h3 className="text-3xl font-poppins font-bold text-slate-900 mb-8">{t('Send us a Message')}</h3>
              <form className="space-y-6 flex-grow" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('Full Name')}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all text-slate-900 font-medium"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('Phone Number')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all text-slate-900 font-medium"
                      placeholder="+91 00000 00000"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('Email Address (Optional)')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all text-slate-900 font-medium"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('Your Message')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all resize-none text-slate-900 font-medium"
                    placeholder={t('How can we help you?')}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-yellow-400 hover:text-slate-900 transition-colors flex justify-center items-center gap-2 group mt-auto disabled:opacity-75"
                >
                  {isSubmitting ? t('Sending...') : t('Send Message')}
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
