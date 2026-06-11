import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
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
          <Shield className="w-16 h-16 text-yellow-400 mb-6" />
          <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-4">
            {t('Privacy')} <span className="text-yellow-400">{t('Policy')}</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            {t('Your privacy is important to us. Learn how we protect your data.')}
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
          <h2 className="text-3xl font-bold mb-6">{t('Introduction')}</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            {t('Welcome to Madurai Tour Taxi. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.')}
          </p>

          <h3 className="text-2xl font-bold mt-10 mb-4">{t('1. Data We Collect')}</h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            {t('We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:')}
          </p>
          <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
            <li><strong>{t('Identity Data')}</strong>: {t('includes first name, last name, username or similar identifier.')}</li>
            <li><strong>{t('Contact Data')}</strong>: {t('includes billing address, delivery address, email address and telephone numbers.')}</li>
            <li><strong>{t('Transaction Data')}</strong>: {t('includes details about payments to and from you and other details of products and services you have purchased from us.')}</li>
          </ul>

          <h3 className="text-2xl font-bold mt-10 mb-4">{t('2. How We Use Your Data')}</h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            {t('We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:')}
          </p>
          <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
            <li>{t('Where we need to perform the contract we are about to enter into or have entered into with you.')}</li>
            <li>{t('Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.')}</li>
            <li>{t('Where we need to comply with a legal obligation.')}</li>
          </ul>

          <h3 className="text-2xl font-bold mt-10 mb-4">{t('3. Data Security')}</h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            {t('We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.')}
          </p>

          <h3 className="text-2xl font-bold mt-10 mb-4">{t('4. Contact Us')}</h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            {t('If you have any questions about this privacy policy or our privacy practices, please contact us at')} <a href="mailto:maduraitourtaxi1@gmail.com" className="font-semibold hover:text-yellow-500 transition-colors">maduraitourtaxi1@gmail.com</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
