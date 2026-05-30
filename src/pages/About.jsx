import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, ThumbsUp, Heart } from 'lucide-react';
import maduraivideo from '../assets/maduraivideo.mp4';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80" alt="About Us" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-poppins font-bold text-white mb-4">
            {t('About')} <span className="text-yellow-400">{t('Us')}</span>
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">
            {t('Your trusted travel partner in South India since 2015.')}
          </p>
        </motion.div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <h2 className="text-4xl font-poppins font-bold text-slate-900">
              {t('Our Story & Mission')}
            </h2>
            <div className="w-20 h-1.5 bg-yellow-400 rounded-full" />
            <p className="text-lg text-slate-600 leading-relaxed">
              {t('Started with a single cab in Madurai, we have grown into one of the most trusted and premium taxi service providers in Tamil Nadu. Our journey has been fueled by our passion for hospitality and customer safety.')}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t('Our mission is to provide world-class, comfortable, and affordable tourism experiences. We believe that the journey is just as important as the destination, which is why we maintain a fleet of modern, sanitized vehicles driven by highly professional local experts.')}
            </p>
            <div className="pt-4 flex gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex-1 text-center border-b-4 border-b-yellow-400">
                <h4 className="text-4xl font-bold text-slate-900 mb-2">10+</h4>
                <p className="text-slate-500 font-medium">{t('Years Experience')}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex-1 text-center border-b-4 border-b-green-500">
                <h4 className="text-4xl font-bold text-slate-900 mb-2">100%</h4>
                <p className="text-slate-500 font-medium">{t('Safe Travel')}</p>
              </div>
            </div>
          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col items-center w-full"
          >
            <div className="w-full bg-slate-950 p-3 rounded-3xl shadow-2xl border border-slate-205">
              <video
                src={maduraivideo}
                controls
                autoPlay
                loop
                playsInline
                className="w-full rounded-2xl object-cover aspect-video h-auto shadow-inner"
              />
            </div>
            {/* Award box placed directly beneath video container */}
            <div className="w-full mt-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex items-center gap-4">
              <Award className="w-12 h-12 text-yellow-500 shrink-0" />
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-1">{t('Award Winning Service')}</h4>
                <p className="text-slate-500 text-sm">{t('Recognized for excellence in local tourism and custom outstation trips.')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-poppins font-bold mb-4">{t('Core Values')}</h2>
            <div className="w-20 h-1.5 bg-yellow-400 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck />, title: t('Safety First'), desc: t('GPS enabled cars and background-verified drivers.') },
              { icon: <ThumbsUp />, title: t('Customer Satisfaction'), desc: t('We go above and beyond to make your trip memorable.') },
              { icon: <Heart />, title: t('Passion for Travel'), desc: t('We love showing you the beauty of South India.') }
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-yellow-400 transition-colors"
              >
                <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center text-yellow-400 mb-6 [&>svg]:w-8 [&>svg]:h-8">
                  {v.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{v.title}</h3>
                <p className="text-slate-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
