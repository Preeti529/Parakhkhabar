
export function updatePageMeta({
  title,
  description,
  keywords,
  image = '/logo.png',
  url = window.location.href,
  type = 'website',
  schema = null
}) {
  // Update document title
  const baseTitle = 'Parakh Khabar';
  document.title = title ? `${title} - ${baseTitle}` : `Hindi News (हिंदी न्यूज़): Latest News in Hindi - ${baseTitle}`;

  // Update meta tags
  updateMetaTag('description', description || 'Hindi News: हिंदी समाचार के लिए सबसे पहले आएं परख खबर पर।');
  updateMetaTag('keywords', keywords || 'Parakh Khabar, Hindi News, हिंदी समाचार, ब्रेकिंग न्यूज़');

  // Open Graph
  updateMetaProperty('og:title', title || 'Parakh Khabar - Hindi News');
  updateMetaProperty('og:description', description || 'हिंदी समाचार के लिए सबसे पहले आएं परख खबर पर।');
  updateMetaProperty('og:url', url);
  updateMetaProperty('og:image', image.startsWith('http') ? image : window.location.origin + image);
  updateMetaProperty('og:type', type);

  // Twitter
  updateMetaProperty('twitter:title', title || 'Parakh Khabar');
  updateMetaProperty('twitter:description', description || 'हिंदी समाचार के लिए सबसे पहले आएं परख खबर पर।');
  updateMetaProperty('twitter:image', image.startsWith('http') ? image : window.location.origin + image);

  
  if (schema) {
    let scriptTag = document.getElementById('dynamic-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'dynamic-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schema, null, 2);
  }
}

function updateMetaTag(name, content) {
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateMetaProperty(property, content) {
  let element = document.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}


export function generateNewsArticleSchema(article) {
  const origin = window.location.origin;
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${origin}/news/${article.slug}`
    },
    "headline": article.title,
    "description": article.summary,
    "image": [
      article.image.startsWith('http') ? article.image : `${origin}${article.image}`
    ],
    "datePublished": article.publishedAt,
    "dateModified": article.modifiedAt || article.publishedAt,
    "author": {
      "@type": "Person",
      "name": article.author || "Parakh Khabar"
    },
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "Parakh Khabar",
      "logo": {
        "@type": "ImageObject",
        "url": `${origin}/logo.png`
      }
    },
    "articleSection": article.category,
    "inLanguage": "hi-IN"
  };
}


export function generateBreadcrumbSchema(items) {
  const origin = window.location.origin;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${origin}${item.path}`
    }))
  };
}
