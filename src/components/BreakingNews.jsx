import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ChevronRight, ChevronLeft } from 'lucide-react';

const BreakingNews = ({ items = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [items.length]);

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex];

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm py-1.5">
      <div className="site-container">
        <div className="flex items-center">
          
          {/* Breaking News Label */}
          <div className="flex items-center bg-[#db0028] text-white px-2.5 py-1 text-xs md:text-sm font-bold rounded-sm flex-shrink-0 mr-3 shadow-sm">
            <Zap className="w-3.5 h-3.5 mr-1 fill-yellow-300 text-yellow-300 animate-pulse" />
            <span className="uppercase tracking-wide">ब्रेकिंग न्यूज़</span>
          </div>

          {/* Current Headline */}
          <div className="flex-grow overflow-hidden relative h-6 md:h-7 flex items-center">
            <Link
              to={`/news/${currentItem.slug}`}
              className="text-xs md:text-sm font-medium text-gray-900 hover:text-[#e01b24] transition-colors truncate block"
              title={currentItem.title}
            >
              {currentItem.title}
            </Link>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-1 pl-2 flex-shrink-0 text-gray-500">
            <button 
              onClick={handlePrev}
              className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-black transition-colors"
              aria-label="पिछली खबर"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono text-gray-400">
              {currentIndex + 1}/{items.length}
            </span>
            <button 
              onClick={handleNext}
              className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-black transition-colors"
              aria-label="अगली खबर"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
