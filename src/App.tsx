import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PropertyDetail from './pages/PropertyDetail';
import HowItWorks from './pages/HowItWorks';
import HelpCenter from './pages/HelpCenter';
import BecomeHost from './pages/BecomeHost';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { properties } from './data/properties';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home properties={properties} />} />
          <Route path="/property/:id" element={<PropertyDetail properties={properties} />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/become-host" element={<BecomeHost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
