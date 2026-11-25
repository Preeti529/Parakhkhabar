import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import NewsCard from './NewsCard';

const CategorySection = ({ 
  title, 
  categorySlug, 
  articles = [], 
  icon: IconComponent, 
  onShare,
  limit = 4 
}) => {
  if (!articles || articles.length === 0) return null;

  const displayArticles = articles.slice(0, limit);

  return (
    <section className="bg-white rounded-sm border border-gray-200 shadow-sm p-3 sm:p-4 mb-6">
      
      {/* Newspaper Section Title Bar (Parakh Khabar / Dainik Bhaskar style) */}
      <div className="flex items-center justify-between border-b-2 border-[#e01b24] pb-2.5 mb-3.5">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-[#6322cf] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            {IconComponent ? (
              <IconComponent className="w-4 h-4" />
            ) : (
              <span className="font-bold text-sm">प</span>
            )}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            {title}
          </h2>
        </div>

        {categorySlug && (
          <Link
            to={`/category/${categorySlug}`}
            className="flex items-center text-xs sm:text-sm font-semibold text-[#e01b24] hover:text-[#b7141b] transition-colors"
          >
            <span>सभी देखें</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>
        )}
      </div>

      {/* Articles List (bhaskar_nohero) */}
      <div className="divide-y divide-gray-200">
        {displayArticles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            onShare={onShare}
            variant="horizontal"
          />
        ))}
      </div>

    </section>
  );
};

export default CategorySection;
