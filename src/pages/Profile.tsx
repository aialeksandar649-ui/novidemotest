import { useState, useEffect } from 'react';
import { User, Mail, Calendar, MapPin, Heart, BookOpen, Globe, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../hooks/useFavorites';
import { useProperties } from '../contexts/PropertiesContext';
import { useToast } from '../contexts/ToastContext';
import SEO from '../components/SEO';
import { Property } from '../types';

interface BookingData {
  id: string;
  propertyId: number;
  property: Property;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  bookingDate: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const { properties } = useProperties();
  const { showToast } = useToast();
  
  const [bookingsCount, setBookingsCount] = useState(0);
  const [activeBookings, setActiveBookings] = useState(0);
  const [userStats, setUserStats] = useState({
    totalBookings: 0,
    totalSpent: 0,
    favoriteDestinations: [] as string[]
  });

  useEffect(() => {
    // Load bookings count and stats
    const savedBookings = localStorage.getItem('nexora-bookings');
    if (savedBookings) {
      try {
        const bookings: BookingData[] = JSON.parse(savedBookings);
        setBookingsCount(bookings.length);
        
        // Count active (upcoming) bookings
        const active = bookings.filter((b) => b.status === 'upcoming').length;
        setActiveBookings(active);
        
        const completed = bookings.filter((b) => b.status === 'completed');
        const totalSpent = completed.reduce((sum: number, b) => sum + (b.totalPrice || 0), 0);
        
        const destinations = new Set<string>();
        bookings.forEach((b) => {
          const prop = properties.find(p => p.title === b.property?.title);
          if (prop) destinations.add(prop.location);
        });
        
        setUserStats({
          totalBookings: bookings.length,
          totalSpent,
          favoriteDestinations: Array.from(destinations)
        });
      } catch (e) {
        console.error('Error loading stats:', e);
      }
    }
  }, [properties]);

  const handleLanguageChange = (newLanguage: 'en' | 'sr') => {
    setLanguage(newLanguage);
    showToast(
      newLanguage === 'en' ? 'Language changed to English' : 'Jezik promenjen na Srpski',
      'success'
    );
  };

  const handleThemeToggle = () => {
    toggleTheme();
    showToast(
      theme === 'dark' ? 'Switched to light mode' : 'Switched to dark mode',
      'success'
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEO 
        title={t('profile') || 'Profile'}
        description="Manage your account settings, view bookings, and preferences"
      />
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          {t('profile') || 'Profile'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Profile Card and Quick Actions */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* User Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF385C] to-[#E61E4D] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {t('welcome') || 'Welcome'}!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('member.since') || 'Member since'} 2024
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700" role="list" aria-label="User statistics">
                <div className="text-center" role="listitem">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {bookingsCount}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {t('bookings') || 'Bookings'}
                  </div>
                </div>
                <div className="text-center" role="listitem">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {favorites.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {t('favorites') || 'Favorites'}
                  </div>
                </div>
                <div className="text-center" role="listitem">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    ${userStats.totalSpent.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {t('total.spent') || 'Total Spent'}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {t('quick.actions') || 'Quick Actions'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <button
                  onClick={() => navigate('/bookings')}
                  className="flex items-center gap-3 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-[#FF385C] dark:hover:border-[#FF385C] transition-all text-left min-h-[44px] group"
                  aria-label={t('my.bookings') || 'My Bookings'}
                >
                  <BookOpen className="h-6 w-6 text-[#FF385C] group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {t('my.bookings') || 'My Bookings'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {activeBookings} {t('active') || 'active'}
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => navigate('/favorites')}
                  className="flex items-center gap-3 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-[#FF385C] dark:hover:border-[#FF385C] transition-all text-left min-h-[44px] group"
                  aria-label={t('favorites') || 'Favorites'}
                >
                  <Heart className="h-6 w-6 text-[#FF385C] group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {t('favorites') || 'Favorites'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {favorites.length} {t('saved') || 'saved'}
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => navigate('/become-host')}
                  className="flex items-center gap-3 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-[#FF385C] dark:hover:border-[#FF385C] transition-all text-left min-h-[44px] group"
                  aria-label={t('become.host') || 'Become a Host'}
                >
                  <MapPin className="h-6 w-6 text-[#FF385C] group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {t('become.host') || 'Become a Host'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {t('list.your.place') || 'List your place'}
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-3 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-[#FF385C] dark:hover:border-[#FF385C] transition-all text-left min-h-[44px] group"
                  aria-label={t('explore') || 'Explore'}
                >
                  <Calendar className="h-6 w-6 text-[#FF385C] group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {t('explore') || 'Explore'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {t('find.stays') || 'Find stays'}
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Favorite Destinations */}
            {userStats.favoriteDestinations.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {t('favorite.destinations') || 'Favorite Destinations'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {userStats.favoriteDestinations.map((dest) => (
                    <span
                      key={dest}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
                    >
                      {dest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Settings and Account */}
          <div className="space-y-6">
            {/* Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {t('settings') || 'Settings'}
              </h3>
              
              <div className="space-y-4">
                {/* Language */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                    <label htmlFor="language-select" className="text-gray-900 dark:text-gray-100 font-medium">
                      {t('language') || 'Language'}
                    </label>
                  </div>
                  <select
                    id="language-select"
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'sr')}
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-[#FF385C] focus:ring-2 focus:ring-[#FF385C]/20 outline-none min-h-[44px] text-sm cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
                    aria-label={t('select.language') || 'Select language'}
                  >
                    <option value="en">English</option>
                    <option value="sr">Srpski</option>
                  </select>
                </div>

                {/* Theme */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {theme === 'dark' ? (
                      <Moon className="h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                    ) : (
                      <Sun className="h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                    )}
                    <span className="text-gray-900 dark:text-gray-100 font-medium">
                      {t('theme') || 'Theme'}
                    </span>
                  </div>
                  <button
                    onClick={handleThemeToggle}
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-[#FF385C] transition-all min-h-[44px] text-sm font-medium"
                    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {theme === 'dark' ? (t('light') || 'Light') : (t('dark') || 'Dark')}
                  </button>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {t('account') || 'Account'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Mail className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">user@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Calendar className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">
                    {t('member.since') || 'Member since'} January 2024
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
