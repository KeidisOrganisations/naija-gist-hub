
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
}

const SEOHead = ({
  title,
  description,
  keywords = [],
  author = 'Naija Times',
  ogImage = 'https://placehold.co/1200x630/9AE19D/FFFFFF?text=Naija+Times',
  ogUrl,
  ogType = 'website',
  twitterCard = 'summary_large_image'
}: SEOHeadProps) => {
  const currentUrl = ogUrl || (typeof window !== 'undefined' ? window.location.href : '');
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <meta name="author" content={author} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional Meta Tags for better SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
};

export default SEOHead;
