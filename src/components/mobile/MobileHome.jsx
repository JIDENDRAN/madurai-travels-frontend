import React from 'react';
import { useTranslation } from 'react-i18next';
import MobileHero from './MobileHero';
import MobileVehicles from './MobileVehicles';
import MobilePackages from './MobilePackages';
import MobileWhyChoose from './MobileWhyChoose';
import MobileReviews from './MobileReviews';

export default function MobileHome() {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-50 text-slate-800">
      <MobileHero />

      {/* Stats Row */}
      <section className="bg-slate-900 text-white py-5 border-y border-slate-800">
        <div className="max-w-md mx-auto px-4 grid grid-cols-4 gap-2 text-center">
          {[
            { val: '10K+', label: t('Happy Customers') },
            { val: '5K+', label: t('Trips Completed') },
            { val: '100%', label: t('Satisfaction') },
            { val: '24/7', label: t('Hours Support') },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-lg font-bold text-yellow-400">{s.val}</p>
              <p className="text-[8px] text-slate-400 uppercase font-medium leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <MobileVehicles hideForm={true} />
      <MobileWhyChoose />

      {/* 3-Step Process */}
      <section className="py-8 bg-slate-50 border-t border-slate-100">
        <div className="max-w-md mx-auto px-4 text-center">
          <h3 className="text-lg font-bold text-slate-900 mb-4">{t('Our Simple 3-Step Process')}</h3>
          <div className="space-y-3">
            {[
              { step: '01', title: t('Choose Your Car'), desc: t('Select from our wide fleet of premium vehicles.') },
              { step: '02', title: t('Enter Ride Details'), desc: t('Input your locations, date, and contact via form or WhatsApp.') },
              { step: '03', title: t('Start Your Ride'), desc: t('Enjoy a safe, comfortable tour with a professional driver.') },
            ].map((p, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-xl p-3 flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-full bg-yellow-400 text-slate-900 font-extrabold flex items-center justify-center text-xs shrink-0">
                  {p.step}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{p.title}</h4>
                  <p className="text-slate-500 text-[10px]">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MobilePackages hideForm={true} />
      <MobileReviews />
    </div>
  );
}
