import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Image, Newspaper, Search, Menu, Calendar, PlusCircle } from 'lucide-react';
import { getFormattedCurrentDateHindi } from '../utils/date';

const TopBar = ({ onOpenSearch, onToggleMobileMenu }) => {
  const currentDate = getFormattedCurrentDateHindi();

  return (
    <div className="bg-[#fafafa] border-b border-gray-200">
      <div className="site-container py-2">
        <div className="flex items-center justify-between">
          
          {/* Logo & Date */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <Link to="/" className="inline-block" aria-label="परख खबर होम">
              <img 
                src="/logo.png" 
                alt="Parakh Khabar" 
                className="h-10 sm:h-12 md:h-14 w-auto object-contain" 
              />
            </Link>

            {/* Date Display */}
            <div className="hidden lg:flex items-center text-xs text-gray-600 pl-3 border-l border-gray-300">
              <Calendar className="w-3.5 h-3.5 mr-1 text-[#e01b24]" />
              <span>{currentDate}</span>
            </div>
          </div>

          {/* Desktop Top Menu */}
          <div className="hidden md:flex items-center space-x-5 text-sm font-semibold text-gray-800">
            <Link 
              to="/" 
              className="flex items-center space-x-1.5 hover:text-[#e01b24] transition-colors py-1"
            >
              <Home className="w-4 h-4 text-gray-600" />
              <span>होम</span>
            </Link>

            <Link 
              to="/webstory" 
              className="flex items-center space-x-1.5 hover:text-[#e01b24] transition-colors py-1"
            >
              <Image className="w-4 h-4 text-purple-600" />
              <span>वेब स्टोरीज़</span>
            </Link>

            <Link 
              to="/epaper" 
              className="flex items-center space-x-1.5 hover:text-[#e01b24] transition-colors py-1"
            >
              <Newspaper className="w-4 h-4 text-blue-600" />
              <span>ईपेपर</span>
            </Link>

            <Link 
              to="/add-news" 
              className="flex items-center space-x-1.5 text-white bg-[#e01b24] hover:bg-[#b7141b] transition-colors py-1 px-3 rounded shadow-xs text-xs font-bold"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>खबर जोड़ें</span>
            </Link>

            <button 
              onClick={onOpenSearch} 
              className="flex items-center space-x-1.5 text-gray-700 hover:text-[#e01b24] transition-colors py-1 px-2.5 rounded bg-white border border-gray-200 shadow-xs"
              aria-label="खोजें"
            >
              <Search className="w-4 h-4 text-[#e01b24]" />
              <span>सर्च</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center space-x-2 md:hidden">
            <Link 
              to="/add-news"
              className="p-1.5 text-white bg-[#e01b24] rounded text-xs font-bold flex items-center"
              aria-label="खबर जोड़ें"
            >
              <PlusCircle className="w-4 h-4" />
            </Link>

            <button 
              onClick={onOpenSearch}
              className="p-2 text-gray-700 hover:text-[#e01b24] bg-white rounded border border-gray-200"
              aria-label="सर्च बॉक्स खोलें"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link 
              to="/epaper"
              className="p-2 text-blue-700 bg-white rounded border border-gray-200"
              aria-label="ईपेपर पढ़ें"
            >
              <Newspaper className="w-4 h-4" />
            </Link>

            <button 
              onClick={onToggleMobileMenu}
              className="p-2 text-white bg-[#e01b24] hover:bg-[#b7141b] rounded"
              aria-label="मेन्यू खोलें"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TopBar;
