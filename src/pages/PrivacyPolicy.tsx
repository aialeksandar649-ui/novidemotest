import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function PrivacyPolicy() {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">{t('privacy.policy.title')}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t('last.updated')}</p>
      </div>

      <div className="space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-[#FF385C]" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Your Privacy Matters</h2>
          </div>
          <p>
            At Nexora, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-6 w-6 text-[#FF385C]" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Information We Collect</h2>
          </div>
          <p className="mb-3">We collect information that you provide directly to us, including:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Account information (name, email, phone number)</li>
            <li>Payment information (processed securely through third-party providers)</li>
            <li>Booking details and travel preferences</li>
            <li>Communications with hosts and our support team</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <Eye className="h-6 w-6 text-[#FF385C]" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">How We Use Your Information</h2>
          </div>
          <p className="mb-3">We use your information to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Process and manage your bookings</li>
            <li>Communicate with you about your reservations</li>
            <li>Improve our services and user experience</li>
            <li>Send you relevant travel offers (with your consent)</li>
            <li>Ensure platform security and prevent fraud</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <Lock className="h-6 w-6 text-[#FF385C]" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Data Security</h2>
          </div>
          <p>
            We implement industry-standard security measures to protect your personal information. 
            All data is encrypted in transit and at rest. We never share your information with third parties 
            except as necessary to provide our services or as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Your Rights</h2>
          <p className="mb-3">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Access your personal data</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or wish to exercise your rights, 
            please contact us at <a href="mailto:privacy@nexora.com" className="text-[#FF385C] hover:underline">privacy@nexora.com</a>
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
