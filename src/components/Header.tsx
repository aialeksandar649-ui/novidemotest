import { useState, useEffect } from 'react';
import { Search, Globe, Menu, User, LogOut, Settings, Heart, BookOpen, Moon, Sun, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  // Update search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery('');
    }
  }, [location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/?search=${encodeURIComponent(query)}`);
    } else {
      navigate('/');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 safe-area-top">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center min-h-[44px] min-w-[44px]" onClick={clearSearch}>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0C7.163 0 0 7.163 0 16C0 24.837 7.163 32 16 32C24.837 32 32 24.837 32 16C32 7.163 24.837 0 16 0Z" fill="#FF385C"/>
                <path d="M16 8C11.582 8 8 11.582 8 16C8 20.418 11.582 24 16 24C20.418 24 24 20.418 24 16C24 11.582 20.418 8 16 8Z" fill="white"/>
              </svg>
              <span className="text-lg sm:text-xl font-semibold text-[#FF385C] hidden xs:block">Nexora</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="flex items-center w-full">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={t('search.destinations')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-10 rounded-full border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 focus:border-[#FF385C] focus:ring-2 focus:ring-[#FF385C]/20 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="ml-2 bg-[#FF385C] hover:bg-[#E61E4D] p-3 rounded-full text-white transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Mobile Search Button */}
          <div className="md:hidden flex-1 mx-2 sm:mx-4">
            <form onSubmit={handleSearch} className="flex items-center gap-1.5 sm:gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={t('search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm sm:text-base focus:border-[#FF385C] focus:ring-2 focus:ring-[#FF385C]/20 outline-none min-h-[44px]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <X className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="bg-[#FF385C] hover:bg-[#E61E4D] p-2.5 sm:p-2 rounded-full text-white min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </form>
          </div>

          {/* Right Side Menu */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link 
              to="/become-host" 
              className="hidden md:block px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors min-h-[44px]"
            >
              {t('become.host')}
            </Link>
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="p-2 sm:p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Globe className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>
              {showLanguageMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowLanguageMenu(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        language === 'en' ? 'font-semibold text-[#FF385C]' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {t('language.english')}
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('sr');
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        language === 'sr' ? 'font-semibold text-[#FF385C]' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {t('language.serbian')}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:shadow-md transition-all bg-white dark:bg-gray-800 min-h-[44px]"
              >
                <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700 dark:text-gray-300" />
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700 dark:text-gray-300 hidden xs:block" />
              </button>
              
              {showUserMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowUserMenu(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{t('account')}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">user@nexora.com</p>
                    </div>
                    <Link
                      to="/"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      <BookOpen className="h-5 w-5" />
                      <span>{t('my.bookings')}</span>
                    </Link>
                    <Link
                      to="/"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      <Heart className="h-5 w-5" />
                      <span>{t('saved.properties')}</span>
                    </Link>
                    <Link
                      to="/become-host"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      <User className="h-5 w-5" />
                      <span>{t('host.dashboard')}</span>
                    </Link>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                    <Link
                      to="/"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      <Settings className="h-5 w-5" />
                      <span>{t('settings')}</span>
                    </Link>
                    <button
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 w-full text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>{t('log.out')}</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
