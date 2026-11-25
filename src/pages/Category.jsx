import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import newsService from '../services/newsService';
import Breadcrumbs from '../components/Breadcrumbs';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';
import ShareModal from '../components/ShareModal';
import { updatePageMeta } from '../utils/seo';
import { Filter, ChevronRight, PlusCircle, AlertCircle } from 'lucide-react';

const Category = () => {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const districtParam = searchParams.get('district');

  const [articles, setArticles] = useState([]);
  const [fallbackArticles, setFallbackArticles] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [trendingNews, setTrendingNews] = useState([]);
  const [selectedShareArticle, setSelectedShareArticle] = useState(null);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    const cat = newsService.getCategoryBySlug(categorySlug);
    const catName = cat ? cat.name : (categorySlug === 'top-news' ? 'टॉप न्यूज' : 'समाचार');
    setCategoryInfo(cat);

    const filtered = newsService.getNewsByCategory(categorySlug, districtParam);
    setArticles(filtered);

    // If filtered is empty (e.g. for a rarely queried district), get regional fallback
    if (filtered.length === 0) {
      setFallbackArticles(newsService.getAllNews().slice(0, 6));
    }

    setTrendingNews(newsService.getTrendingNews(5));

    // SEO
    updatePageMeta({
      title: `${catName} ${districtParam ? `- ${districtParam}` : ''} | ताजा समाचार`,
      description: `${catName} से जुड़े सभी ताजा और ब्रेकिंग समाचार पढ़ें परख खबर पर।`,
      keywords: `${catName}, परख खबर, हिंदी समाचार, ${districtParam || ''}`
    });

    window.scrollTo(0, 0);
  }, [categorySlug, districtParam]);

  const handleShare = (article) => {
    setSelectedShareArticle(article);
    setIsShareOpen(true);
  };

  const handleDistrictFilter = (district) => {
    if (district === districtParam) {
      searchParams.delete('district');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ district });
    }
  };

  const titleName = categoryInfo ? categoryInfo.name : 'समाचार';

  const breadcrumbs = [
    { name: titleName, path: `/category/${categorySlug}` },
    ...(districtParam ? [{ name: districtParam, path: `/category/${categorySlug}?district=${districtParam}` }] : [])
  ];

  return (
    <div className="site-container my-4">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Category Header */}
      <div className="bg-white p-4 rounded-sm border border-gray-200 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#e01b24] pb-3 mb-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {titleName} {districtParam && <span className="text-[#e01b24]">- {districtParam}</span>}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {articles.length > 0 
                ? `कुल ${articles.length} समाचार उपलब्ध` 
                : 'इस स्थान के लिए नए समाचार संकलित किए जा रहे हैं'}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick Post News Button */}
            <Link
              to="/add-news"
              className="inline-flex items-center space-x-1.5 text-xs bg-[#e01b24] hover:bg-[#b7141b] text-white font-bold px-3 py-1.5 rounded transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>खबर जोड़ें</span>
            </Link>

            {/* Quick Clear Filter */}
            {districtParam && (
              <button
                onClick={() => {
                  searchParams.delete('district');
                  setSearchParams(searchParams);
                }}
                className="text-xs bg-red-50 text-[#e01b24] font-semibold px-3 py-1.5 rounded border border-red-200 hover:bg-red-100"
              >
                सभी {titleName} देखें
              </button>
            )}
          </div>
        </div>

        {/* District Filter Pills if Available */}
        {categoryInfo?.districts && (
          <div className="pt-1">
            <span className="text-xs font-bold text-gray-500 flex items-center mb-2">
              <Filter className="w-3.5 h-3.5 mr-1 text-[#e01b24]" />
              जिलेवार समाचार देखें:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {categoryInfo.districts.map((dist, dIdx) => {
                const isActive = districtParam === dist;
                return (
                  <button
                    key={dIdx}
                    onClick={() => handleDistrictFilter(dist)}
                    className={`text-xs px-2.5 py-1 rounded transition-colors ${
                      isActive 
                        ? 'bg-[#e01b24] text-white font-bold' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {dist}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Grid & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Articles List (8 cols) */}
        <main className="lg:col-span-8 bg-white p-4 rounded-sm border border-gray-200 shadow-sm">
          {articles.length === 0 ? (
            <div className="py-6">
              <div className="text-center p-6 bg-yellow-50/60 border border-yellow-200 rounded mb-6">
                <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="text-base font-bold text-gray-800 mb-1">
                  {districtParam ? `${districtParam} जिले के लिए अभी कोई विशेष बुलेटिन नहीं है` : 'इस श्रेणी में नए समाचार जोड़े जा रहे हैं'}
                </h3>
                <p className="text-xs text-gray-600 mb-4 max-w-md mx-auto">
                  आप इस क्षेत्र के लिए पहली खबर सीधे पोस्ट कर सकते हैं या नीचे राज्य की अन्य प्रमुख खबरें पढ़ सकते हैं।
                </p>
                <Link
                  to="/add-news"
                  className="inline-flex items-center space-x-1.5 bg-[#e01b24] hover:bg-[#b7141b] text-white text-xs font-bold px-4 py-2 rounded transition-colors shadow-xs"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>यहाँ नया समाचार जोड़ें</span>
                </Link>
              </div>

              {/* Show Fallback regional news so page is never empty */}
              <h4 className="font-bold text-base text-gray-900 border-b pb-2 mb-4">
                राज्य की अन्य प्रमुख खबरें:
              </h4>
              <div className="divide-y divide-gray-200">
                {fallbackArticles.map((item) => (
                  <NewsCard
                    key={item.id}
                    article={item}
                    onShare={handleShare}
                    variant="horizontal"
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {articles.map((item) => (
                <NewsCard
                  key={item.id}
                  article={item}
                  onShare={handleShare}
                  variant="horizontal"
                />
              ))}
            </div>
          )}
        </main>

        {/* Sidebar (4 cols) */}
        <div className="lg:col-span-4">
          <Sidebar 
            trendingNews={trendingNews} 
            onShare={handleShare} 
          />
        </div>

      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        article={selectedShareArticle}
      />

    </div>
  );
};

export default Category;
