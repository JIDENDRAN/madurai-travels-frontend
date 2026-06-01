import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function MobileFooter() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-white py-8 px-6 border-t border-slate-800 text-center">
      <div className="space-y-6">
        <h3 className="text-white font-poppins font-black text-lg">{t('Madurai Tour Taxi')}</h3>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold">
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
        <div className="flex justify-center pt-4">
          <div className="space-y-3 text-xs text-left max-w-[260px]">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-yellow-500 shrink-0" />
              <span>+91 96293 73701</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-yellow-500 shrink-0" />
              <span>info@maduraitourtaxi.com</span>
            </div>
            <div className="flex items-start gap-3 text-slate-200">
              <MapPin className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
              <span className="leading-relaxed">1342 shop number, Housing board, Mela anuppanati, Madurai.9</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800 pt-6 text-[11px] text-slate-300 space-y-4">
          <p>© 2026 Madurai Tour Taxi. All Rights Reserved.</p>
          <div className="flex justify-center items-center gap-3">
            <a href="#" className="hover:text-white transition-colors">{t('Privacy Policy')}</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">{t('Terms & Conditions')}</a>
            <span>|</span>
            <a href="/admin" className="hover:text-white transition-colors">Admin</a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-4 border-t border-slate-800/50">
            <span className="text-slate-400">Designed & Developed by</span>
            <a href="https://codethriveinfotech.in/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity group">
              <img src={logo} alt="Code Thrive InfoTech" className="h-3.5 w-auto" />
              <span className="font-bold tracking-wider text-white group-hover:text-yellow-500 group-hover:underline underline-offset-4 transition-colors">CODE THRIVE INFOTECH</span>
            </a>
            <a href="https://codethriveinfotech.in/" target="_blank" rel="noreferrer" className="mt-2 w-full max-w-[200px] px-2 py-1.5 bg-yellow-500/10 border border-yellow-500 hover:bg-yellow-500 text-yellow-500 hover:text-slate-900 rounded animate-pulse hover:animate-none transition-all shadow-[0_0_10px_rgba(234,179,8,0.2)] text-[9px] font-bold uppercase tracking-wider text-center">
              Click to create your website
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
