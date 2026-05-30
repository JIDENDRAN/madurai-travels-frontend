import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MobileFooter() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-white py-8 px-6 border-t border-slate-800 text-center">
      <div className="space-y-6">
        <h3 className="text-white font-poppins font-black text-lg">{t('Madurai Tour Taxi')}</h3>

        {/* Quick Links stacked */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold">
          {[
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about' },
            { name: 'Vehicles', path: '/vehicles' },
            { name: 'Packages', path: '/packages' },
            { name: 'Contact Us', path: '/contact' }
          ].map((link) => (
            <Link key={link.name} to={link.path} className="hover:text-yellow-500 transition-colors">
              {t(link.name)}
            </Link>
          ))}
        </div>

        {/* Contact info */}
        <div className="space-y-2.5 text-sm pt-2">
          <div className="flex items-center justify-center gap-2">
            <Phone className="w-4 h-4 text-yellow-500" />
            <span>+91 99432 23938</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 text-yellow-500" />
            <span>info@maduraitourtaxi.com</span>
          </div>
          <div className="flex items-start justify-center gap-2 max-w-xs mx-auto text-xs text-slate-200">
            <MapPin className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
            <span className="text-left">1342 shop number, Housing board, Mela anuppanati, Madurai.9</span>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800 pt-6 text-[11px] text-slate-300 space-y-2">
          <p>© 2026 Madurai Tour Taxi. All Rights Reserved.</p>
          <div className="flex justify-center space-x-3">
            <a href="#" className="hover:text-white transition-colors">{t('Privacy Policy')}</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">{t('Terms & Conditions')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
