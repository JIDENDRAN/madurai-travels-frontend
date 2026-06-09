import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import API_BASE_URL from '../../apiConfig';

export default function MobileContact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
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
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert(t('Your query has been sent successfully. We will get back to you shortly.'));
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        alert(t('Failed to send message. Please try calling us instead.'));
      }
    } catch {
      alert(t('Connection error. Please try calling or WhatsApp.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 pt-8 pb-10 px-4 text-center">
        <h1 className="text-2xl font-poppins font-bold text-white mb-1">
          {t('Get In Touch')}
        </h1>
        <div className="w-10 h-1 bg-yellow-400 mx-auto rounded-full mb-2"></div>
        <p className="text-xs text-slate-400 max-w-xs mx-auto">
          {t('Have questions about our packages or want to customize your trip? Our team is available 24/7 to assist you.')}
        </p>
      </div>

      {/* Quick Contact Cards */}
      <div className="px-4 -mt-5 space-y-3 max-w-md mx-auto">
        <a href="tel:8667520367" className="bg-white p-4 rounded-2xl shadow border border-slate-100 flex items-center gap-4 active:border-yellow-400 transition-colors">
          <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{t('Call Us')}</h3>
            <p className="text-xs text-slate-500">+91 86675 20367</p>
          </div>
        </a>

        <a href="https://wa.me/918667520367" target="_blank" rel="noopener noreferrer" className="bg-white p-4 rounded-2xl shadow border border-slate-100 flex items-center gap-4 active:border-green-500 transition-colors">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{t('WhatsApp')}</h3>
            <p className="text-xs text-slate-500">+91 86675 20367</p>
          </div>
        </a>

        <div className="bg-white p-4 rounded-2xl shadow border border-slate-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{t('Email Us')}</h3>
            <p className="text-xs text-slate-500">maduraitourtaxi1@gmail.com</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow border border-slate-100 flex items-center gap-4">
          <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{t('Office Address')}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">1342 shop, Housing board, Mela anuppanati, Madurai.</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="px-4 py-8 max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5">
          <h3 className="text-lg font-poppins font-bold text-slate-900 mb-4">{t('Send us a Message')}</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">{t('Full Name')}</label>
              <input
                type="text" name="name" value={formData.name} onChange={handleInputChange} required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm text-slate-900"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">{t('Phone Number')}</label>
              <input
                type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm text-slate-900"
                placeholder="+91 00000 00000"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">{t('Email Address (Optional)')}</label>
              <input
                type="email" name="email" value={formData.email} onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm text-slate-900"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">{t('Your Message')}</label>
              <textarea
                name="message" value={formData.message} onChange={handleInputChange} required rows="4"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none text-sm text-slate-900"
                placeholder={t('How can we help you?')}
              />
            </div>
            <button
              type="submit" disabled={isSubmitting}
              className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl active:bg-yellow-400 active:text-slate-900 transition-colors flex justify-center items-center gap-2 text-sm disabled:opacity-75"
            >
              {isSubmitting ? t('Sending...') : t('Send Message')}
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
