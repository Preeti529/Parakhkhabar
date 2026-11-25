import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, Clock } from 'lucide-react';
import { formatTimeAgo } from '../utils/date';

const NewsCard = ({ article, onShare, variant = 'horizontal' }) => {
  if (!article) return null;

  if (variant === 'vertical') {
    return (
      <article className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
        <Link 
          to={`/news/${article.slug}`} 
          className="block aspect-[16/10] overflow-hidden bg-gray-100 relative group"
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <span className="absolute bottom-2 left-2 post-cat-badge">
            {article.category}
          </span>
        </Link>

        <div className="p-3.5 flex-1 flex flex-col justify-between">
          <h3 className="font-bold text-base text-gray-900 leading-snug hover:text-[#e01b24] transition-colors mb-2 line-clamp-3">
            <Link to={`/news/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100 mt-2">
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-gray-400" />
              {article.publishedDateHindi || formatTimeAgo(article.publishedAt)}
            </span>

            <button
              onClick={() => onShare && onShare(article)}
              className="text-gray-500 hover:text-[#e01b24] p-1 rounded hover:bg-gray-100"
              aria-label="शेयर करें"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </article>
    );
  }

  // Authentic Parakh Khabar Horizontal Row Card (bhaskar_nohero)
  return (
    <article className="border-b border-gray-200 py-3.5 first:pt-0 last:border-b-0 hover:bg-gray-50/70 transition-colors p-2 rounded-sm">
      <div className="flex items-start justify-between space-x-4">
        
        {/* Left Column (8 or 9 cols): Title, Category, Author, Date, Share */}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1.5">
            <Link
              to={`/category/${article.categorySlug}`}
              className="post-cat-badge"
            >
              {article.category}
            </Link>
            {article.subCategory && (
              <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                {article.subCategory}
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug hover:text-[#e01b24] transition-colors mb-2">
            <Link to={`/news/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <span className="font-medium text-gray-700">By {article.author || 'Parakh Khabar'}</span>
            <span>•</span>
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1 text-gray-400" />
              {article.publishedDateHindi || formatTimeAgo(article.publishedAt)}
            </span>

            <button
              onClick={() => onShare && onShare(article)}
              className="ml-auto inline-flex items-center text-gray-500 hover:text-[#e01b24] p-1"
              aria-label="शेयर करें"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column (3 or 4 cols): Thumbnail */}
        <Link 
          to={`/news/${article.slug}`}
          className="w-28 sm:w-36 md:w-44 h-20 sm:h-24 md:h-28 flex-shrink-0 overflow-hidden rounded-sm bg-gray-100 group relative"
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>

      </div>
    </article>
  );
};

export default NewsCard;
