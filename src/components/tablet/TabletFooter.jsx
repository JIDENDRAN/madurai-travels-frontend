import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function TabletFooter() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-white pt-10 pb-6 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-8 mb-8 text-left">
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-poppins font-bold text-base mb-3">{t('Quick Links')}</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Vehicles', path: '/vehicles' },
                { name: 'Packages', path: '/packages' },
                { name: 'Contact Us', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-yellow-500 transition-colors">{t(link.name)}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-poppins font-bold text-base mb-3">{t('Contact Us')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-500" />
                <span>+91 86675 20367</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-500" />
                <span>maduraitourtaxi1@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                <span>1342 shop number, Housing board, Mela anuppanati, Madurai.9</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800 pt-6 flex flex-col gap-4 text-xs text-slate-300">
          <div className="flex justify-between items-center">
            <p>© 2026 Madurai Tour Taxi. All Rights Reserved.</p>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-white transition-colors">{t('Privacy Policy')}</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">{t('Terms & Conditions')}</a>
              <span>|</span>
              <a href="/admin" className="hover:text-white transition-colors">Admin</a>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-slate-800/50">
            <span>Designed & Developed by</span>
            <a href="https://codethriveinfotech.in/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
              <img src={logo} alt="Code Thrive InfoTech" className="h-5 w-auto" />
              <span className="font-bold tracking-wider text-white group-hover:text-yellow-500 group-hover:underline underline-offset-4 transition-colors">CODE THRIVE INFOTECH</span>
            </a>
            <a href="https://codethriveinfotech.in/" target="_blank" rel="noreferrer" className="ml-2 px-2 py-1 bg-yellow-500/10 border border-yellow-500 hover:bg-yellow-500 text-yellow-500 hover:text-slate-900 rounded animate-pulse hover:animate-none transition-all shadow-[0_0_10px_rgba(234,179,8,0.2)] text-[10px] font-bold uppercase tracking-wider">
              Click to create your website
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
