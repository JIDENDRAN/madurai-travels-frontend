import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Award, ThumbsUp, Heart } from 'lucide-react';
import maduraivideo from '../../assets/maduraivideo.mp4';

export default function TabletAbout() {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-50 min-h-screen text-left">
      {/* Hero Section */}
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80" alt="About Us" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl font-poppins font-bold text-white mb-2">
            {t('About')} <span className="text-yellow-450 text-yellow-400">{t('Us')}</span>
          </h1>
          <p className="text-base text-slate-200 max-w-xl mx-auto">
            {t('Your trusted travel partner in South India since 2015.')}
          </p>
        </div>
      </div>

      {/* Story & Video Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <div className="space-y-4">
          <h2 className="text-3xl font-poppins font-bold text-slate-900">
            {t('Our Story & Mission')}
          </h2>
          <div className="w-16 h-1 bg-yellow-400 rounded-full" />
          <p className="text-base text-slate-600 leading-relaxed">
            {t('Started with a single cab in Madurai, we have grown into one of the most trusted and premium taxi service providers in Tamil Nadu. Our journey has been fueled by our passion for hospitality and customer safety.')}
          </p>
          <p className="text-base text-slate-600 leading-relaxed">
            {t('Our mission is to provide world-class, comfortable, and affordable tourism experiences. We believe that the journey is just as important as the destination.')}
          </p>
        </div>

        {/* Video Player */}
        <div className="space-y-4">
          <div className="bg-slate-950 p-2.5 rounded-2xl shadow-xl">
            <video
              src={maduraivideo}
              controls
              autoPlay
              loop
              playsInline
              className="w-full rounded-xl object-cover aspect-video h-auto"
            />
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 flex items-center gap-4">
            <Award className="w-10 h-10 text-yellow-500 shrink-0" />
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">{t('Award Winning Service')}</h4>
              <p className="text-slate-500 text-xs">{t('Recognized for excellence in local tourism.')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-slate-900 py-12 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-poppins font-bold text-center mb-8">{t('Core Values')}</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: <ShieldCheck className="w-6 h-6" />, title: t('Safety First'), desc: t('GPS enabled cars.') },
              { icon: <ThumbsUp className="w-6 h-6" />, title: t('Customer Satisfaction'), desc: t('We go above and beyond.') },
              { icon: <Heart className="w-6 h-6" />, title: t('Passion for Travel'), desc: t('We love South India.') }
            ].map((v, i) => (
              <div key={i} className="bg-slate-800 p-5 rounded-xl border border-slate-700 text-center flex flex-col items-center">
                <div className="text-yellow-405 text-yellow-400 mb-3">{v.icon}</div>
                <h4 className="text-sm font-bold mb-1">{v.title}</h4>
                <p className="text-[11px] text-slate-400 leading-normal">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
