import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({ 
  title, 
  description, 
  image, 
  url,
  type = 'website'
}: SEOProps) {
  useEffect(() => {
    const defaultTitle = 'Nexora - Discover Unique Places to Stay in the Balkans';
    const defaultDescription = 'Discover unique places to stay in the Balkans. Book authentic accommodations in Bosnia, Serbia, Montenegro, Croatia, and more.';
    const defaultImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80';
    const defaultUrl = window.location.href;

    document.title = title ? `${title} | Nexora` : defaultTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description || defaultDescription);
    
    // Open Graph tags
    updateMetaTag('og:title', title || defaultTitle, 'property');
    updateMetaTag('og:description', description || defaultDescription, 'property');
    updateMetaTag('og:image', image || defaultImage, 'property');
    updateMetaTag('og:url', url || defaultUrl, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:site_name', 'Nexora', 'property');
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title || defaultTitle);
    updateMetaTag('twitter:description', description || defaultDescription);
    updateMetaTag('twitter:image', image || defaultImage);
  }, [title, description, image, url, type]);

  return null;
}
