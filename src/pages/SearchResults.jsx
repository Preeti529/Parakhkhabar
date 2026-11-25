import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import newsService from '../services/newsService';
import Breadcrumbs from '../components/Breadcrumbs';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';
import ShareModal from '../components/ShareModal';
import { updatePageMeta } from '../utils/seo';
import { Search, AlertCircle } from 'lucide-react';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const [results, setResults] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [selectedShareArticle, setSelectedShareArticle] = useState(null);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    setSearchInput(query);
    if (query.trim()) {
      const res = newsService.searchNews(query);
      setResults(res);
    } else {
      setResults([]);
    }
    setTrendingNews(newsService.getTrendingNews(5));

    updatePageMeta({
      title: `खोज परिणाम: "${query}" | परख खबर`,
      description: `परख खबर पर "${query}" से संबंधित सभी समाचार एवं लेख।`
    });

    window.scrollTo(0, 0);
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  const handleShare = (article) => {
    setSelectedShareArticle(article);
    setIsShareOpen(true);
  };

  return (
    <div className="site-container my-4">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ name: `खोज परिणाम: ${query || 'सर्च'}`, path: `/search?q=${encodeURIComponent(query)}` }]} />

      {/* Search Header & Input Box */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-200 shadow-sm mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 flex items-center space-x-2">
          <Search className="w-5 h-5 text-[#e01b24]" />
          <span>समाचार खोजें: <span className="text-[#e01b24]">"{query}"</span></span>
        </h1>

        <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-xl">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="अन्य समाचार खोजें..."
            className="flex-1 border-2 border-gray-300 rounded px-3 py-2 text-sm focus:border-[#e01b24] focus:outline-hidden"
          />
          <button
            type="submit"
            className="bg-[#e01b24] hover:bg-[#b7141b] text-white px-5 py-2 rounded text-sm font-semibold transition-colors"
          >
            खोजें
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-2">
          {results.length} परिणाम मिले
        </p>
      </div>

      {/* Results & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Results List */}
        <main className="lg:col-span-8 bg-white p-4 rounded-sm border border-gray-200 shadow-sm">
          {results.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-700 mb-1">
                कोई परिणाम नहीं मिला
              </h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto mb-5">
                क्षमा करें, आपके द्वारा खोजे गए शब्द "{query}" से मेल खाता कोई समाचार नहीं मिला। कृपया अन्य कीवर्ड या श्रेणी से खोजें।
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['उत्तर प्रदेश', 'बलिया', 'भारत', 'मनोरंजन', 'बिजनेस'].map((k, i) => (
                  <button
                    key={i}
                    onClick={() => setSearchParams({ q: k })}
                    className="text-xs bg-gray-100 hover:bg-red-50 hover:text-[#e01b24] px-3 py-1.5 rounded transition-colors"
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {results.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onShare={handleShare}
                  variant="horizontal"
                />
              ))}
            </div>
          )}
        </main>

        {/* Sidebar */}
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

export default SearchResults;
