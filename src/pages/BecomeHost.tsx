import { Home, DollarSign, Users, Shield, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function BecomeHost() {
  const { t } = useLanguage();
  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-16 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">{t('become.host.title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('share.space')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-[#FF385C]/10 dark:bg-[#FF385C]/20 rounded-full flex items-center justify-center mb-6">
            <Home className="h-8 w-8 text-[#FF385C]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">{t('list.space')}</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {t('list.space.desc')}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-[#FF385C]/10 dark:bg-[#FF385C]/20 rounded-full flex items-center justify-center mb-6">
            <DollarSign className="h-8 w-8 text-[#FF385C]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">{t('set.price')}</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {t('set.price.desc')}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-[#FF385C]/10 dark:bg-[#FF385C]/20 rounded-full flex items-center justify-center mb-6">
            <Users className="h-8 w-8 text-[#FF385C]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">{t('welcome.guests')}</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {t('welcome.guests.desc')}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-[#FF385C]/10 dark:bg-[#FF385C]/20 rounded-full flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-[#FF385C]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">{t('protected.supported')}</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {t('protected.supported.desc')}
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#FF385C]/10 to-[#FF385C]/5 dark:from-[#FF385C]/20 dark:to-[#FF385C]/10 rounded-2xl p-12 text-center border border-[#FF385C]/20 dark:border-[#FF385C]/30">
        <TrendingUp className="h-16 w-16 text-[#FF385C] mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('ready.start')}</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          {t('ready.start.desc')}
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/contact"
            className="bg-[#FF385C] hover:bg-[#E61E4D] text-white px-8 py-3 rounded-xl font-semibold transition-colors"
          >
            {t('contact.us')}
          </Link>
          <Link
            to="/"
            className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 px-8 py-3 rounded-xl font-semibold border border-gray-200 dark:border-gray-700 transition-colors"
          >
            {t('browse.properties')}
          </Link>
        </div>
      </div>
    </div>
  );
}
