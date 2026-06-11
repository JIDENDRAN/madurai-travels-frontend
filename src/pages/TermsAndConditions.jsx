import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const TermsAndConditions = () => {
  const { t } = useTranslation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'AW-18225094695', {
        page_path: window.location.pathname,
      });
    }
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-4 flex flex-col items-center"
        >
          <FileText className="w-16 h-16 text-yellow-400 mb-6" />
          <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-4">
            {t('Terms &')} <span className="text-yellow-400">{t('Conditions')}</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            {t('Please read these terms and conditions carefully before using our service.')}
          </p>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 prose prose-slate max-w-none prose-headings:font-poppins prose-headings:text-slate-900 prose-a:text-yellow-600"
        >
          <h2 className="text-3xl font-bold mb-6">{t('1. Acceptance of Terms')}</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            {t('By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.')}
          </p>

          <h3 className="text-2xl font-bold mt-10 mb-4">{t('2. Booking and Payments')}</h3>
          <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
            <li>{t('All bookings are subject to availability and confirmation.')}</li>
            <li>{t('A minimum advance payment is required to confirm outstation bookings.')}</li>
            <li>{t('The final fare will be calculated based on the actual distance traveled and time taken.')}</li>
            <li>{t('Toll charges, parking fees, and state permits (if applicable) are to be paid by the customer unless otherwise specified.')}</li>
          </ul>

          <h3 className="text-2xl font-bold mt-10 mb-4">{t('3. Cancellations and Refunds')}</h3>
          <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
            <li>{t('Cancellations made 24 hours prior to the journey time will incur no charges.')}</li>
            <li>{t('Cancellations made within 24 hours of the journey may be subject to a cancellation fee.')}</li>
            <li>{t('Refunds for advance payments will be processed within 5-7 business days.')}</li>
          </ul>

          <h3 className="text-2xl font-bold mt-10 mb-4">{t('4. Passenger Responsibilities')}</h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            {t('Passengers are requested to take care of their personal belongings. Management will not be responsible for any loss or damage to luggage or personal items during the journey. Any damage caused to the vehicle by the passenger will be charged accordingly.')}
          </p>

          <h3 className="text-2xl font-bold mt-10 mb-4">{t('5. Modifications to Service')}</h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            {t('Madurai Tour Taxi reserves the right to modify or discontinue, temporarily or permanently, the service with or without notice at any time.')}
          </p>

          <h3 className="text-2xl font-bold mt-10 mb-4">{t('6. Contact Information')}</h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            {t('If you have any queries regarding any of our terms, please contact us at')} <a href="mailto:maduraitourtaxi1@gmail.com" className="font-semibold hover:text-yellow-500 transition-colors">maduraitourtaxi1@gmail.com</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
