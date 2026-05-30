import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, ThumbsUp, Heart, Award, Users, Clock } from 'lucide-react';
import maduraivideo from '../../assets/maduraivideo.mp4';

export default function MobileAbout() {
  const { t } = useTranslation();

  const values = [
    { icon: <ShieldCheck className="w-5 h-5" />, title: t('Safety First'), desc: t('GPS enabled cars and background-verified drivers.') },
    { icon: <ThumbsUp className="w-5 h-5" />, title: t('Customer Satisfaction'), desc: t('We go above and beyond to make your trip memorable.') },
    { icon: <Heart className="w-5 h-5" />, title: t('Passion for Travel'), desc: t('We love showing you the beauty of South India.') },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800"
            alt="About Madurai Tour Taxi"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl font-poppins font-bold text-white mb-2">
            {t('About')} <span className="text-yellow-400">{t('Us')}</span>
          </h1>
          <p className="text-sm text-slate-300 max-w-xs mx-auto">
            {t('Your trusted travel partner in South India since 2015.')}
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="px-4 py-8">
        <h2 className="text-xl font-poppins font-bold text-slate-900 mb-2">
          {t('Our Story & Mission')}
        </h2>
        <div className="w-12 h-1 bg-yellow-400 rounded-full mb-4"></div>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {t('Started with a single cab in Madurai, we have grown into one of the most trusted and premium taxi service providers in Tamil Nadu. Our journey has been fueled by our passion for hospitality and customer safety.')}
        </p>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {t('Our mission is to provide world-class, comfortable, and affordable tourism experiences. We believe that the journey is just as important as the destination, which is why we maintain a fleet of modern, sanitized vehicles driven by highly professional local experts.')}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white p-3 rounded-xl shadow border border-slate-100 text-center">
            <p className="text-2xl font-bold text-slate-900">10+</p>
            <p className="text-[10px] text-slate-500 font-medium">{t('Years Experience')}</p>
          </div>
          <div className="bg-white p-3 rounded-xl shadow border border-slate-100 text-center">
            <p className="text-2xl font-bold text-slate-900">100%</p>
            <p className="text-[10px] text-slate-500 font-medium">{t('Safe Travel')}</p>
          </div>
          <div className="bg-white p-3 rounded-xl shadow border border-slate-100 text-center">
            <p className="text-2xl font-bold text-slate-900">10K+</p>
            <p className="text-[10px] text-slate-500 font-medium">{t('Happy Customers')}</p>
          </div>
        </div>

        {/* Video */}
        <div className="bg-slate-950 p-2 rounded-2xl shadow-xl mb-6">
          <video
            src={maduraivideo}
            controls
            playsInline
            className="w-full rounded-xl object-cover aspect-video"
          />
        </div>

        {/* Award */}
        <div className="bg-white p-4 rounded-2xl shadow border border-slate-100 flex items-center gap-3 mb-2">
          <Award className="w-8 h-8 text-yellow-500 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-slate-900">{t('Award Winning Service')}</h4>
            <p className="text-xs text-slate-500">{t('Recognized for excellence in local tourism and custom outstation trips.')}</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-900 py-10 px-4">
        <div className="text-center mb-6">
          <h2 className="text-xl font-poppins font-bold text-white mb-2">{t('Core Values')}</h2>
          <div className="w-12 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </div>
        <div className="space-y-4 max-w-md mx-auto">
          {values.map((v, i) => (
            <div key={i} className="bg-slate-800 p-5 rounded-2xl border border-slate-700 flex items-start gap-4">
              <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center text-yellow-400 shrink-0">
                {v.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">{v.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
