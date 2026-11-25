import React, { useEffect, useState } from 'react';
import newsService from '../services/newsService';
import BreakingNews from '../components/BreakingNews';
import FeaturedNews from '../components/FeaturedNews';
import CategorySection from '../components/CategorySection';
import Sidebar from '../components/Sidebar';
import ShareModal from '../components/ShareModal';
import { updatePageMeta } from '../utils/seo';
import { Flag, Building2, Mountain, Globe, Film, TrendingUp } from 'lucide-react';

const Home = () => {
  const [selectedShareArticle, setSelectedShareArticle] = useState(null);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const featured = newsService.getFeaturedNews();
  const allNews = newsService.getAllNews();
  const breakingNews = newsService.getBreakingNews();
  const trendingNews = newsService.getTrendingNews(5);

  // Sub articles for hero section
  const subArticles = allNews.filter(n => n.id !== featured?.id).slice(0, 3);

  // Categorized news
  const indiaNews = newsService.getNewsByCategory('india');
  const upNews = newsService.getNewsByCategory('uttar-pradesh');
  const ukNews = newsService.getNewsByCategory('uttarakhand');
  const worldNews = newsService.getNewsByCategory('international');
  const entertainmentNews = newsService.getNewsByCategory('entertainment');
  const businessNews = newsService.getNewsByCategory('business');

  useEffect(() => {
    updatePageMeta({
      title: 'Hindi News (हिंदी न्यूज़): Latest News in Hindi, Hindi Samachar, Breaking News in Hindi, आज की ताजा ख़बरें',
      description: 'परख खबर पर पढ़िए देश, उत्तर प्रदेश, उत्तराखंड, विदेश, खेल, मनोरंजन, व्यापार और राजनीति से जुड़ी सभी ताजा खबरें सबसे पहले और सटीक।',
      keywords: 'Parakh Khabar, Hindi News, Uttar Pradesh News, Ballia News, Breaking News Hindi, ताजा समाचार',
      schema: {
        "@context": "https://schema.org",
        "@type": "NewsMediaOrganization",
        "name": "Parakh Khabar",
        "url": "https://parakhkhabar.com/",
        "logo": "https://parakhkhabar.com/logo.png"
      }
    });
    window.scrollTo(0, 0);
  }, []);

  const handleShare = (article) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: `${window.location.origin}/news/${article.slug}`
      }).catch(() => {
        setSelectedShareArticle(article);
        setIsShareOpen(true);
      });
    } else {
      setSelectedShareArticle(article);
      setIsShareOpen(true);
    }
  };

  return (
    <div className="min-h-screen">
      
      {/* 1. Breaking News Ticker */}
      <BreakingNews items={breakingNews} />

      <main className="site-container my-4">
        
        {/* 2. Main Featured Section (bhaskar_hero) */}
        <FeaturedNews 
          leadArticle={featured} 
          subArticles={subArticles} 
          onShare={handleShare} 
        />

        {/* 3. Main Body: 2 Columns (Main Area 8 cols, Sidebar 4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Area: Category Sections (bhaskar_nohero) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* उत्तर प्रदेश (UP News) */}
            <CategorySection
              title="उत्तर प्रदेश"
              categorySlug="uttar-pradesh"
              articles={upNews.length > 0 ? upNews : allNews.slice(3, 7)}
              icon={Building2}
              onShare={handleShare}
              limit={4}
            />

            {/* भारत (National News) */}
            <CategorySection
              title="भारत"
              categorySlug="india"
              articles={indiaNews.length > 0 ? indiaNews : allNews.slice(0, 4)}
              icon={Flag}
              onShare={handleShare}
              limit={4}
            />

            {/* विदेश (World / International News) */}
            <CategorySection
              title="विदेश"
              categorySlug="international"
              articles={worldNews.length > 0 ? worldNews : allNews.slice(4, 8)}
              icon={Globe}
              onShare={handleShare}
              limit={4}
            />

            {/* उत्तराखंड (Uttarakhand News) */}
            <CategorySection
              title="उत्तराखंड"
              categorySlug="uttarakhand"
              articles={ukNews.length > 0 ? ukNews : allNews.slice(6, 10)}
              icon={Mountain}
              onShare={handleShare}
              limit={4}
            />

            {/* मनोरंजन (Entertainment) */}
            <CategorySection
              title="मनोरंजन"
              categorySlug="entertainment"
              articles={entertainmentNews.length > 0 ? entertainmentNews : allNews.slice(1, 5)}
              icon={Film}
              onShare={handleShare}
              limit={4}
            />

            {/* बिजनेस (Business) */}
            <CategorySection
              title="बिजनेस"
              categorySlug="business"
              articles={businessNews.length > 0 ? businessNews : allNews.slice(7, 11)}
              icon={TrendingUp}
              onShare={handleShare}
              limit={4}
            />

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <Sidebar 
              trendingNews={trendingNews} 
              onShare={handleShare} 
            />
          </div>

        </div>

      </main>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        article={selectedShareArticle}
      />

    </div>
  );
};

export default Home;
