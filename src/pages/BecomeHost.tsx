import { useState } from 'react';
import { Home, DollarSign, Users, Shield, TrendingUp, Plus, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useProperties } from '../contexts/PropertiesContext';
import { Property } from '../types';

export default function BecomeHost() {
  const { t } = useLanguage();
  const { addProperty } = useProperties();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    price: '',
    guests: '',
    bedrooms: '',
    beds: '',
    bathrooms: '',
    imageUrl: '',
    images: '',
    amenities: '',
    category: '',
    hostName: '',
    hostAvatar: '',
    checkIn: '3:00 PM',
    checkOut: '11:00 AM',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Parse images
    const imagesArray = formData.images
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);
    
    // If no additional images, use main image
    if (imagesArray.length === 0 && formData.imageUrl) {
      imagesArray.push(formData.imageUrl);
    }

    // Parse amenities
    const amenitiesArray = formData.amenities
      .split(',')
      .map(a => a.trim())
      .filter(a => a.length > 0);

    // Parse categories
    const categoryArray = formData.category
      .split(',')
      .map(c => c.trim())
      .filter(c => c.length > 0);

    const newProperty: Property = {
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80',
      images: imagesArray.length > 0 ? imagesArray : [formData.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80'],
      location: formData.location,
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5 and 5.0
      dates: 'Available',
      guests: parseInt(formData.guests) || 1,
      bedrooms: parseInt(formData.bedrooms) || 1,
      beds: parseInt(formData.beds) || 1,
      bathrooms: parseFloat(formData.bathrooms) || 1,
      amenities: amenitiesArray,
      category: categoryArray.length > 0 ? categoryArray : ['City'],
      host: {
        name: formData.hostName || 'Host',
        isSuperhost: false,
        hostingSince: 'New host',
        avatar: formData.hostAvatar || undefined,
        responseTime: 'Within 24 hours',
        responseRate: 90,
      },
      reviews: 0,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
    };

    // Simulate API call
    setTimeout(() => {
      addProperty(newProperty);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        location: '',
        description: '',
        price: '',
        guests: '',
        bedrooms: '',
        beds: '',
        bathrooms: '',
        imageUrl: '',
        images: '',
        amenities: '',
        category: '',
        hostName: '',
        hostAvatar: '',
        checkIn: '3:00 PM',
        checkOut: '11:00 AM',
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowForm(false);
      }, 5000);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-16 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">{t('become.host.title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('share.space')}
        </p>
      </div>

      {submitSuccess && (
        <div className="mb-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 flex items-center gap-4">
          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">{t('property.success')}</h3>
            <p className="text-sm text-green-700 dark:text-green-300">{t('property.success.desc')}</p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {t('property.view')}
            </Link>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="bg-green-100 dark:bg-green-800 hover:bg-green-200 dark:hover:bg-green-700 text-green-900 dark:text-green-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {t('property.add.another')}
            </button>
          </div>
        </div>
      )}

      {!showForm ? (
        <div className="mb-12 text-center">
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#FF385C] hover:bg-[#E61E4D] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors flex items-center gap-2 mx-auto"
          >
            <Plus className="h-5 w-5" />
            {t('add.property')}
          </button>
        </div>
      ) : (
        <div className="mb-12 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t('add.property')}</h2>
            <p className="text-gray-600 dark:text-gray-400">{t('add.property.desc')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('property.title')} *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder={t('property.title.placeholder')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('property.location')} *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder={t('property.location.placeholder')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('property.description')} *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder={t('property.description.placeholder')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('property.price')} *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('property.guests')} *
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('property.bedrooms')} *
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('property.beds')} *
                </label>
                <input
                  type="number"
                  name="beds"
                  value={formData.beds}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('property.bathrooms')} *
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  required
                  min="0.5"
                  step="0.5"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('property.host.name')} *
                </label>
                <input
                  type="text"
                  name="hostName"
                  value={formData.hostName}
                  onChange={handleInputChange}
                  required
                  placeholder={t('property.host.name.placeholder')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('property.image.url')} *
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                required
                placeholder={t('property.image.url.placeholder')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('property.images')}
              </label>
              <textarea
                name="images"
                value={formData.images}
                onChange={handleInputChange}
                rows={3}
                placeholder={t('property.images.placeholder')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('property.amenities')}
                </label>
                <input
                  type="text"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleInputChange}
                  placeholder={t('property.amenities.placeholder')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('property.category')}
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder={t('property.category.placeholder')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('property.host.avatar')}
                </label>
                <input
                  type="url"
                  name="hostAvatar"
                  value={formData.hostAvatar}
                  onChange={handleInputChange}
                  placeholder={t('property.image.url.placeholder')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('property.check.in')}
                </label>
                <input
                  type="text"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  placeholder="3:00 PM"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('property.check.out')}
                </label>
                <input
                  type="text"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  placeholder="11:00 AM"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#FF385C] hover:bg-[#E61E4D] disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                {isSubmitting ? t('property.submitting') : t('property.submit')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setSubmitSuccess(false);
                }}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                {t('back')}
              </button>
            </div>
          </form>
        </div>
      )}

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
