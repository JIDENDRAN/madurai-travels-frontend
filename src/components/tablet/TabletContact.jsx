import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import API_BASE_URL from '../../apiConfig';

export default function TabletContact() {
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

        // Trigger WhatsApp
        const text = `*New Contact Query*\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
        window.open(`https://wa.me/919629373701?text=${encodeURIComponent(text)}`, '_blank');

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
    <section className="py-12 bg-slate-50 text-left">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-poppins font-bold text-slate-900 mb-2">
            {t('Get In Touch')}
          </h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          <p className="mt-3 text-slate-600 text-sm max-w-md mx-auto">
            {t('Have questions about our packages or want to customize your trip? Our team is available 24/7 to assist you.')}
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Contact details */}
          <div className="col-span-5 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
              <Phone className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{t('Call Us')}</h4>
                <a href="tel:9629373701" className="text-sm font-semibold text-slate-700 hover:text-yellow-500 transition-colors">+91 96293 73701</a>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 cursor-pointer" onClick={() => window.open('https://wa.me/919629373701', '_blank')}>
              <MessageCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{t('WhatsApp')}</h4>
                <span className="text-sm font-semibold text-slate-700 hover:text-green-500 transition-colors">+91 96293 73701</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
              <Mail className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{t('Email Us')}</h4>
                <a href="mailto:info@maduraitourtaxi.com" className="text-sm font-semibold text-slate-700 hover:text-blue-555 transition-colors">info@maduraitourtaxi.com</a>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
              <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{t('Office Address')}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  1342 shop number, Housing board, Mela anuppanati, Madurai.
                </p>
              </div>
            </div>
          </div>

          {/* Form details */}
          <div className="col-span-7 bg-white p-6 rounded-3xl border border-slate-100 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-6">{t('Send us a Message')}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">{t('Full Name')}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">{t('Phone Number')}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                    placeholder="+91 00000 00000"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">{t('Email Address (Optional)')}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">{t('Your Message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm resize-none"
                  placeholder="Your query..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-yellow-400 hover:text-slate-900 transition-colors flex justify-center items-center gap-1.5 text-sm"
              >
                <span>{isSubmitting ? t('Sending...') : t('Send Message')}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
