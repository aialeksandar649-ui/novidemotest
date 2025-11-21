import { Link } from 'react-router-dom';
import { FileCheck, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function TermsOfService() {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">{t('terms.of.service.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('last.updated')}</p>
      </div>

      <div className="space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <FileCheck className="h-6 w-6 text-[#FF385C]" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Agreement to Terms</h2>
          </div>
          <p>
            By accessing and using Nexora, you agree to be bound by these Terms of Service. 
            If you do not agree with any part of these terms, you may not use our platform.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-6 w-6 text-[#FF385C]" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User Responsibilities</h2>
          </div>
          <p className="mb-3">As a user of Nexora, you agree to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Provide accurate and complete information</li>
            <li>Use the platform only for lawful purposes</li>
            <li>Respect the property and rights of hosts</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Maintain the security of your account</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="h-6 w-6 text-[#FF385C]" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Booking Terms</h2>
          </div>
          <p className="mb-3">When making a booking:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>You are entering into a contract directly with the host</li>
            <li>Payment is processed at the time of booking</li>
            <li>Cancellation policies vary by property and are clearly displayed</li>
            <li>You are responsible for any damages to the property</li>
            <li>Refunds are subject to the host's cancellation policy</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Host Responsibilities</h2>
          <p className="mb-3">Hosts agree to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Provide accurate property descriptions and photos</li>
            <li>Maintain properties in safe and habitable condition</li>
            <li>Honor confirmed reservations</li>
            <li>Respond promptly to guest inquiries</li>
            <li>Comply with all local laws and regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Limitation of Liability</h2>
          <p>
            Nexora acts as a platform connecting guests and hosts. We are not responsible for the condition 
            of properties, the conduct of hosts or guests, or any disputes that may arise. 
            Our liability is limited to the service fees we collect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Modifications</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the platform 
            after changes constitutes acceptance of the new terms.
          </p>
        </section>
      </div>

      <div className="mt-12 text-center">
        <Link 
          to="/" 
          className="inline-block bg-[#FF385C] hover:bg-[#E61E4D] text-white px-8 py-3 rounded-xl font-semibold transition-colors"
        >
          {t('back.to.home')}
        </Link>
      </div>
    </div>
  );
}
