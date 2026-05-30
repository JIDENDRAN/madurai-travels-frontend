import React from 'react';
import { useTranslation } from 'react-i18next';

const features = [
  { icon: '🚗', titleKey: 'Clean & Safe Cars', descKey: 'Well maintained and regularly sanitized vehicles.' },
  { icon: '👨‍✈️', titleKey: 'Experienced Drivers', descKey: 'Professional, polite, and verified drivers.' },
  { icon: '💰', titleKey: 'Affordable Price', descKey: 'Best price guarantee with no hidden charges.' },
  { icon: '⚡', titleKey: 'Fast Booking', descKey: 'Book your taxi instantly via WhatsApp or online.' },
  { icon: '🛡️', titleKey: 'GPS Tracked', descKey: 'All rides are GPS tracked for your safety.' },
  { icon: '🕐', titleKey: '24/7 Support', descKey: 'Round-the-clock customer support via call and WhatsApp.' },
];

export default function MobileWhyChoose() {
  const { t } = useTranslation();

  return (
    <section className="py-10 bg-white">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-xl font-poppins font-bold text-slate-900 mb-1">{t('Why Choose Us?')}</h2>
          <div className="w-10 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {features.map((f, i) => (
            <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
              <span className="text-2xl block mb-2">{f.icon}</span>
              <h4 className="font-bold text-xs text-slate-900 mb-1">{t(f.titleKey)}</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed">{t(f.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
