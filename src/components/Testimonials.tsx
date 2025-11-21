import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    location: 'London, UK',
    rating: 5,
    text: 'Absolutely incredible experience in Mostar! The host was so welcoming and the house had the most stunning river views. Nexora made booking effortless.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&auto=format&q=80'
  },
  {
    name: 'Marco Rossi',
    location: 'Rome, Italy',
    rating: 5,
    text: 'Kotor exceeded all expectations. The medieval charm combined with modern comfort was perfect. Highly recommend Nexora for Balkan travel!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&auto=format&q=80'
  },
  {
    name: 'Elena Novak',
    location: 'Vienna, Austria',
    rating: 5,
    text: "Belgrade's loft was the perfect base for exploring the city. The calendar booking system made planning so easy. Will definitely book again!",
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&auto=format&q=80'
  }
];

export default function Testimonials() {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 border-y border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 tracking-tight">
            Loved by Travelers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied guests who discovered their perfect Balkan retreat
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[#FF385C] text-[#FF385C]" />
                ))}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-none"
                  style={{ borderRadius: '0' }}
                />
                <div>
                  <p className="font-bold text-gray-900 dark:text-gray-100">{testimonial.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
