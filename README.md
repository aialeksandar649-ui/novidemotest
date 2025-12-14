# Nexora - Balkans Accommodation Platform

A modern, full-featured booking platform for discovering and booking unique accommodations in the Balkans. Built with React, TypeScript, and Tailwind CSS.

![Nexora](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?logo=vite)

## ✨ Features

### Core Functionality
- 🏠 **Property Listings** - Browse detailed property information with high-quality images
- 🔍 **Advanced Search & Filtering** - Filter by price, location, amenities, bedrooms, and more
- 📅 **Booking System** - Complete booking flow with date selection and guest management
- 💾 **Local Storage** - Persistent favorites, bookings, and user preferences
- 🗺️ **Map View** - Interactive map showing property locations
- 📊 **Property Comparison** - Compare multiple properties side-by-side
- ⭐ **Reviews & Ratings** - User reviews with ratings and comments

### User Experience
- 🌍 **Multi-language Support** - English and Serbian (Srpski)
- 🌙 **Dark Mode** - Full dark mode support with system preference detection
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Performance Optimized** - Code splitting, lazy loading, and optimized images
- 🎨 **Modern UI/UX** - Clean, intuitive interface inspired by modern booking platforms
- 🔔 **Toast Notifications** - User-friendly notifications for actions
- 💾 **Recent Views** - Track recently viewed properties
- ❤️ **Favorites System** - Save and manage favorite properties

### Pages & Features
- 🏡 **Home** - Property listings with categories and filters
- 🏠 **Property Detail** - Detailed property view with booking calendar
- 📋 **Bookings** - Manage reservations (upcoming, completed, cancelled)
- 👤 **Profile** - User profile with statistics and settings
- ⭐ **Favorites** - Saved properties collection
- 🏘️ **Become Host** - Property submission form
- 📖 **Help Center** - FAQ and support information
- 📞 **Contact** - Contact form and information
- ℹ️ **How It Works** - Platform explanation
- 📄 **Legal Pages** - Privacy Policy and Terms of Service

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks
- **TypeScript 5.5.3** - Type-safe development
- **Vite 5.4.2** - Fast build tool and dev server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **React Router 6.22.3** - Client-side routing
- **Lucide React** - Beautiful icon library

### Features & Patterns
- **Context API** - State management (Theme, Language, Properties, Toast)
- **Custom Hooks** - Reusable logic (useFavorites, useRecentViews, useDebounce, useIntersectionObserver)
- **Error Boundaries** - Graceful error handling
- **Lazy Loading** - Code splitting for better performance
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG compliant components
- **PWA Ready** - Service worker and manifest support
- **SEO Optimized** - Dynamic meta tags and Open Graph support

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd testbnb
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AccessibilitySkipLink.tsx
│   ├── BookingCalendar.tsx
│   ├── Categories.tsx
│   ├── ErrorBoundary.tsx
│   ├── Filters.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── ImageLightbox.tsx
│   ├── LoadingSpinner.tsx
│   ├── MapView.tsx
│   ├── PropertyCard.tsx
│   ├── PropertyComparison.tsx
│   ├── SEO.tsx
│   ├── SkeletonCard.tsx
│   ├── Toast.tsx
│   └── ui/              # UI component library
├── contexts/            # React Context providers
│   ├── LanguageContext.tsx
│   ├── PropertiesContext.tsx
│   ├── ThemeContext.tsx
│   └── ToastContext.tsx
├── data/                # Static data
│   └── properties.ts
├── hooks/               # Custom React hooks
│   ├── useDebounce.ts
│   ├── useFavorites.ts
│   ├── useIntersectionObserver.ts
│   └── useRecentViews.ts
├── pages/               # Page components
│   ├── BecomeHost.tsx
│   ├── Bookings.tsx
│   ├── Contact.tsx
│   ├── Favorites.tsx
│   ├── HelpCenter.tsx
│   ├── Home.tsx
│   ├── HowItWorks.tsx
│   ├── PrivacyPolicy.tsx
│   ├── Profile.tsx
│   ├── PropertyDetail.tsx
│   └── TermsOfService.tsx
├── App.tsx              # Main app component
├── main.tsx             # App entry point
├── types.ts             # TypeScript type definitions
└── index.css            # Global styles
```

## 🚀 Performance Optimizations

- **Code Splitting** - Lazy loading of route components
- **Image Optimization** - Lazy loading and responsive images
- **Bundle Optimization** - Manual chunk splitting for vendors
- **Debouncing** - Search and filter debouncing (300ms)
- **Memoization** - useMemo for expensive computations
- **Intersection Observer** - Ready for image lazy loading

## 🎯 Key Highlights for Portfolio

### Technical Skills Demonstrated
✅ **Modern React Patterns** - Hooks, Context API, Custom Hooks  
✅ **TypeScript** - Full type safety throughout  
✅ **Responsive Design** - Mobile-first, touch-optimized  
✅ **Performance** - Code splitting, lazy loading, optimization  
✅ **State Management** - Context API with proper patterns  
✅ **Error Handling** - Error boundaries and graceful degradation  
✅ **Accessibility** - WCAG 2.1 AA compliant, keyboard navigation  
✅ **Internationalization** - Multi-language support  
✅ **Dark Mode** - System preference detection  
✅ **PWA Ready** - Manifest and service worker support  
✅ **SEO Optimized** - Dynamic meta tags and Open Graph  

### Features Showcased
✅ Complete booking flow  
✅ Advanced search and filtering  
✅ Map integration  
✅ Property comparison  
✅ User favorites and bookings  
✅ Toast notifications  
✅ Image galleries with lightbox  
✅ Calendar date picker  
✅ Responsive design  
✅ Dark mode  
✅ Multi-language support  

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Type check without emitting files

## 🧪 Testing

Currently, the project uses manual testing. Future enhancements will include:
- Unit tests with Jest and React Testing Library
- Integration tests
- E2E tests with Playwright or Cypress

## 🔒 Security

- Input validation on all forms
- XSS protection through React's built-in escaping
- Secure headers configured in `netlify.toml`
- No sensitive data in client-side code

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- ARIA labels where needed
- Skip to main content link
- Focus management
- Semantic HTML
- Minimum 44px touch targets

## 📊 Performance

- Lighthouse Score: 90+ (target)
- Code splitting implemented
- Lazy loading for routes
- Image optimization
- Debounced search (300ms)
- Memoized computations
- Optimized bundle size

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 PWA Features

- Service Worker for offline support
- Web App Manifest
- Installable on mobile devices
- App shortcuts
- Theme color customization

## 🔍 SEO Features

- Dynamic meta tags per page
- Open Graph tags for social sharing
- Twitter Card support
- Semantic HTML structure
- Proper heading hierarchy

## 🚀 Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18
3. Deploy!

The `netlify.toml` file is already configured with:
- Build command and publish directory
- SPA redirects (all routes → index.html)
- Security headers
- Cache headers for static assets

### GitHub Pages

1. Build the project:
```bash
npm run build
```

2. Configure GitHub Pages to serve from the `dist` directory

Note: You may need to set the `base` path in `vite.config.ts` if deploying to a subdirectory.

## 📝 TODO / Future Enhancements

- [ ] Add unit tests (Jest + React Testing Library)
- [ ] Add E2E tests (Playwright/Cypress)
- [ ] Backend API integration
- [ ] User authentication system
- [ ] Real-time chat with hosts
- [ ] Payment integration
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Service worker improvements for offline support
- [ ] Push notifications
- [ ] Social media integration
- [ ] Video tours
- [ ] Virtual reality previews

## 📄 License

Private project - Portfolio showcase

## 👨‍💻 Author

Built as a portfolio project demonstrating modern React and TypeScript development skills.

## 🙏 Acknowledgments

- Design inspired by Airbnb
- Icons by Lucide React
- Images from Unsplash
