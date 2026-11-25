import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, Clock, User } from 'lucide-react';
import { formatTimeAgo } from '../utils/date';

const FeaturedNews = ({ leadArticle, subArticles = [], onShare }) => {
  if (!leadArticle) return null;

  return (
    <div className="bg-white p-3 md:p-4 rounded-sm border border-gray-200 shadow-sm mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Lead Featured Story (bhaskar_hero) */}
        <div className="lg:col-span-8">
          <article className="bhaskar bhaskar_hero flex flex-col justify-between h-full">
            
            {/* Title */}
            <h2 className="text-xl sm:text-2xl md:text-[25px] font-bold text-gray-900 leading-tight mb-2 hover:text-[#e01b24] transition-colors">
              <Link to={`/news/${leadArticle.slug}`}>
                {leadArticle.title}
              </Link>
            </h2>

            {/* Author Byline */}
            <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
              <span className="font-semibold text-gray-700">By {leadArticle.author || 'Parakh Khabar'}</span>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1 text-gray-400" />
                {leadArticle.publishedDateHindi || formatTimeAgo(leadArticle.publishedAt)}
              </span>
            </div>

            {/* Large Featured Image */}
            <Link 
              to={`/news/${leadArticle.slug}`} 
              className="block overflow-hidden rounded-sm relative group mb-3 bg-gray-100 aspect-[16/9]"
            >
              <img
                src={leadArticle.image}
                alt={leadArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="eager"
              />
            </Link>

            {/* Meta bar & Category Badge & Share */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <Link
                  to={`/category/${leadArticle.categorySlug}`}
                  className="post-cat-badge"
                >
                  {leadArticle.category}
                </Link>
                {leadArticle.subCategory && (
                  <span className="text-xs text-gray-500 font-medium">
                    | {leadArticle.subCategory}
                  </span>
                )}
              </div>

              <button
                onClick={() => onShare && onShare(leadArticle)}
                className="inline-flex items-center space-x-1 text-xs text-gray-600 hover:text-[#e01b24] bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded transition-colors"
                aria-label="शेयर करें"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">शेयर</span>
              </button>
            </div>

          </article>
        </div>

        {/* Sub-featured Side Cards (2-3 articles) */}
        <div className="lg:col-span-4 flex flex-col justify-between divide-y divide-gray-200 border-t lg:border-t-0 lg:border-l lg:pl-6 border-gray-200">
          {subArticles.slice(0, 3).map((item, index) => (
            <article key={item.id || index} className="pt-3 pb-3 first:pt-0 last:pb-0">
              <div className="flex space-x-3">
                
                {/* Text */}
                <div className="flex-1 flex flex-col justify-between">
                  <Link
                    to={`/category/${item.categorySlug}`}
                    className="text-[11px] font-semibold text-[#e01b24] hover:underline uppercase mb-1 block"
                  >
                    {item.category}
                  </Link>

                  <h3 className="text-sm font-bold text-gray-900 leading-snug hover:text-[#e01b24] transition-colors line-clamp-3">
                    <Link to={`/news/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>

                  <div className="flex items-center space-x-2 text-[11px] text-gray-500 mt-2">
                    <span>{item.publishedDateHindi || formatTimeAgo(item.publishedAt)}</span>
                  </div>
                </div>

                {/* Thumbnail */}
                <Link 
                  to={`/news/${item.slug}`}
                  className="w-24 h-20 flex-shrink-0 overflow-hidden rounded-sm bg-gray-100"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                </Link>

              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FeaturedNews;
