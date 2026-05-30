import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';

const reviews = [
  { name: 'Amit Kumar', city: 'Chennai', text: 'Excellent service! The driver was very professional and the car was clean. Will definitely use again.', rating: 5 },
  { name: 'Priya Sharma', city: 'Bangalore', text: 'Very comfortable ride from Madurai to Rameswaram. The driver knew all the best spots!', rating: 5 },
  { name: 'Rahul Patel', city: 'Mumbai', text: 'Used their service for a 3-day tour. Great experience, punctual and friendly drivers.', rating: 5 },
  { name: 'Lakshmi S', city: 'Madurai', text: 'Best taxi service in Madurai. Affordable prices and well-maintained cars.', rating: 4 },
];

export default function MobileReviews() {
  const { t } = useTranslation();

  return (
    <section className="py-10 bg-slate-50">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-xl font-poppins font-bold text-slate-900 mb-1">{t('Customer Reviews')}</h2>
          <div className="w-10 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </div>
        <div className="space-y-4">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl shadow border border-slate-100">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
                {Array.from({ length: 5 - r.rating }).map((_, j) => (
                  <Star key={j + r.rating} className="w-3.5 h-3.5 text-slate-200" />
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">"{t(r.text)}"</p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-white text-xs font-bold">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{r.name}</p>
                  <p className="text-[10px] text-slate-400">{r.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
