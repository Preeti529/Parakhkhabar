import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, Home, Star, Flag, Building2, Mountain, 
  Globe, Film, TrendingUp, Trophy, Cpu, Sun, 
  BookOpen, Sparkles, Newspaper, Image, ChevronDown, ChevronRight 
} from 'lucide-react';

const iconMap = {
  Home, Star, Flag, Building2, Mountain, 
  Globe, Film, TrendingUp, Trophy, Cpu, Sun, 
  BookOpen, Sparkles, Newspaper, Image
};

const MobileMenu = ({ isOpen, onClose, navigation }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  if (!isOpen) return null;

  const menuItems = navigation?.mainMenu || [];

  const toggleSection = (label) => {
    setExpandedSection(prev => prev === label ? null : label);
  };

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Drawer */}
      <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <Link to="/" onClick={onClose}>
            <img src="/logo.png" alt="Parakh Khabar" className="h-10 w-auto" />
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-500 hover:text-black hover:bg-gray-200"
            aria-label="मेन्यू बंद करें"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Navigation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item, idx) => {
            const Icon = iconMap[item.icon] || Home;
            const hasSub = item.hasDropdown && item.dropdownItems?.length > 0;
            const isExpanded = expandedSection === item.label;

            return (
              <div key={idx} className="border-b border-gray-100 last:border-b-0">
                <div className="flex items-center justify-between py-2.5">
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className="flex items-center space-x-3 text-sm font-semibold text-gray-800 hover:text-[#e01b24] flex-1"
                  >
                    <Icon className="w-4 h-4 text-gray-500" />
                    <span>{item.label}</span>
                  </Link>

                  {hasSub && (
                    <button
                      onClick={() => toggleSection(item.label)}
                      className="p-1 text-gray-400 hover:text-gray-700"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>

                {/* Submenu for Districts */}
                {hasSub && isExpanded && (
                  <div className="pl-7 pb-2 grid grid-cols-2 gap-1.5 text-xs text-gray-600 bg-gray-50 p-2 rounded">
                    {item.dropdownItems.map((sub, sIdx) => (
                      <Link
                        key={sIdx}
                        to={sub.path}
                        onClick={onClose}
                        className="py-1 px-1.5 hover:text-[#e01b24] rounded hover:bg-white"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-4 border-t border-gray-200 space-y-2">
            <Link
              to="/epaper"
              onClick={onClose}
              className="flex items-center space-x-3 text-sm font-semibold text-blue-600 p-2 bg-blue-50 rounded"
            >
              <Newspaper className="w-4 h-4" />
              <span>डिजिटल ई-पेपर</span>
            </Link>

            <Link
              to="/category/top-news"
              onClick={onClose}
              className="flex items-center space-x-3 text-sm font-semibold text-purple-600 p-2 bg-purple-50 rounded"
            >
              <Image className="w-4 h-4" />
              <span>वेब स्टोरीज़</span>
            </Link>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>© 2026 परख खबर. सर्वाधिकार सुरक्षित.</p>
        </div>

      </div>
    </div>
  );
};

export default MobileMenu;
