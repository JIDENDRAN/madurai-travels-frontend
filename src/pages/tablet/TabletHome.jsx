import React from 'react';
import { useTranslation } from 'react-i18next';
import TabletHero from '../../components/tablet/TabletHero';
import TabletVehicles from '../../components/tablet/TabletVehicles';
import TabletPackages from '../../components/tablet/TabletPackages';
import InlineBookingForm from '../../components/InlineBookingForm';
import { Star, Heart, ShieldCheck, ThumbsUp } from 'lucide-react';

export default function TabletHome() {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Tablet Hero */}
      <TabletHero />

      {/* Inline Booking Form */}
      <InlineBookingForm />

      {/* Stats row */}
      <section className="bg-slate-900 text-white py-6 border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xl font-bold text-yellow-405 text-yellow-400">10,000+</p>
            <p className="text-[10px] text-slate-400 uppercase font-medium">{t('Happy Customers')}</p>
          </div>
          <div>
            <p className="text-xl font-bold text-yellow-450 text-yellow-400">5,000+</p>
            <p className="text-[10px] text-slate-400 uppercase font-medium">{t('Trips Completed')}</p>
          </div>
          <div>
            <p className="text-xl font-bold text-yellow-450 text-yellow-400">100%</p>
            <p className="text-[10px] text-slate-400 uppercase font-medium">{t('Satisfaction')}</p>
          </div>
          <div>
            <p className="text-xl font-bold text-yellow-450 text-yellow-400">24/7</p>
            <p className="text-[10px] text-slate-400 uppercase font-medium">{t('Hours Support')}</p>
          </div>
        </div>
      </section>

      {/* Tablet Vehicles */}
      <TabletVehicles />

      {/* Tablet Packages */}
      <TabletPackages />

      {/* Why Choose Us - Tablet Grid: 2 Columns */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">{t('Why Choose Us?')}</h2>
            <div className="w-12 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: '🚗', title: 'Clean & Safe Cars', desc: 'Well maintained and regularly sanitized vehicles.' },
              { icon: '👨‍✈️', title: 'Experienced Drivers', desc: 'Professional, polite, and verified drivers.' },
              { icon: '💰', title: 'Affordable Price', desc: 'Best price guarantee with no hidden charges.' },
              { icon: '⚡', title: 'Fast Booking', desc: 'Book your taxi instantly via WhatsApp or online.' }
            ].map((f, i) => (
              <div key={i} className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex gap-4 text-left">
                <span className="text-2xl shrink-0">{f.icon}</span>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">{t(f.title)}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{t(f.desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Row booking process */}
      <section className="py-12 bg-slate-50 border-t border-slate-150">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-6">{t('Our Simple 3-Step Process')}</h3>
          <div className="flex flex-col gap-4">
            {[
              { step: '01', title: 'Choose Your Car', desc: 'Select from our wide fleet of premium vehicles.' },
              { step: '02', title: 'Enter Ride Details', desc: 'Input your locations, date, and contact via form or WhatsApp.' },
              { step: '03', title: 'Start Your Ride', desc: 'Enjoy a safe, comfortable tour with a professional driver.' }
            ].map((proc, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-xl p-4 flex items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-full bg-yellow-400 text-slate-900 font-extrabold flex items-center justify-center text-sm shrink-0">
                  {proc.step}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{t(proc.title)}</h4>
                  <p className="text-slate-500 text-xs">{t(proc.desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
