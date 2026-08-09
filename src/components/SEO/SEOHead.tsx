import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  jsonLdSchemas?: object[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage = 'https://glitread.com/glitread-og-banner.png',
  ogType = 'website',
  publishedTime,
  modifiedTime,
  jsonLdSchemas = []
}) => {
  useEffect(() => {
    // 1. Set Title
    document.title = title;

    // Helper to update or create meta tags
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to update or create link canonical
    const setCanonical = (href: string) => {
      let element = document.querySelector(`link[rel="canonical"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Basic Meta Tags & GEO Location Tags
    setMetaTag('name', 'description', description);
    if (keywords && keywords.length > 0) {
      setMetaTag('name', 'keywords', keywords.join(', '));
    }
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'author', 'Glitread Editorial Team');
    setMetaTag('name', 'geo.region', 'IN');
    setMetaTag('name', 'geo.placename', 'India');
    setMetaTag('name', 'geo.position', '20.593684;78.96288');
    setMetaTag('name', 'ICBM', '20.593684, 78.96288');
    setMetaTag('name', 'generator', 'Glitread AI-Optimized Publishing Engine');

    const currentUrl = canonicalUrl || window.location.href;
    setCanonical(currentUrl);

    // 3. Open Graph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:site_name', 'Glitread Government Jobs Portal');
    setMetaTag('property', 'og:locale', 'en_IN');

    if (publishedTime) {
      setMetaTag('property', 'article:published_time', publishedTime);
    }
    if (modifiedTime) {
      setMetaTag('property', 'article:modified_time', modifiedTime);
    }

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 5. Inject JSON-LD Schema Scripts
    const scriptElements: HTMLScriptElement[] = [];

    // Remove old dynamic JSON-LD scripts
    document.querySelectorAll('script[data-seo-jsonld="true"]').forEach(el => el.remove());

    if (jsonLdSchemas && jsonLdSchemas.length > 0) {
      jsonLdSchemas.forEach((schema, idx) => {
        if (!schema) return;
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-jsonld', 'true');
        script.id = `jsonld-schema-${idx}`;
        script.textContent = JSON.stringify(schema, null, 2);
        document.head.appendChild(script);
        scriptElements.push(script);
      });
    }

    return () => {
      // Clean up script elements on unmount
      scriptElements.forEach(s => s.remove());
    };
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, publishedTime, modifiedTime, jsonLdSchemas]);

  return null;
};
