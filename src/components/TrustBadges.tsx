import { Shield, Zap, Clock, Users } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: 'Secure Booking',
    description: 'Your payment is protected with industry-leading security'
  },
  {
    icon: Zap,
    title: 'Instant Confirmation',
    description: 'Get immediate confirmation after booking your stay'
  },
  {
    icon: Clock,
    title: 'Flexible Cancellation',
    description: 'Cancel up to 48 hours before arrival for full refund'
  },
  {
    icon: Users,
    title: 'Verified Hosts',
    description: '100% of our hosts are verified and highly rated'
  }
];

export default function TrustBadges() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="inline-block p-3 bg-[#FF385C]/10 dark:bg-[#FF385C]/20 rounded-lg mb-4">
                  <Icon className="h-8 w-8 text-[#FF385C]" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 text-lg">{badge.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
