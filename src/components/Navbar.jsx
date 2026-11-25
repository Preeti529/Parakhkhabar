import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Home, Star, Flag, Building2, Mountain, Globe, 
  Film, TrendingUp, Trophy, Cpu, Sun, BookOpen, 
  Sparkles, ChevronDown 
} from 'lucide-react';

const iconMap = {
  Home,
  Star,
  Flag,
  Building2,
  Mountain,
  Globe,
  Film,
  TrendingUp,
  Trophy,
  Cpu,
  Sun,
  BookOpen,
  Sparkles
};

const Navbar = ({ navigation }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const menuItems = navigation?.mainMenu || [];

  return (
    <nav className="bg-[#e01b24] text-white shadow-md sticky top-0 z-40">
      <div className="site-container">
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-1 font-semibold text-[15px] select-none">
          {menuItems.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Home;
            const hasDropdown = item.hasDropdown && item.dropdownItems && item.dropdownItems.length > 0;

            if (hasDropdown) {
              return (
                <div 
                  key={index} 
                  className="relative group py-2.5 px-2.5"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to={item.path}
                    className="flex items-center space-x-1.5 py-1 text-white hover:text-yellow-200 transition-colors"
                  >
                    <IconComponent className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-80 group-hover:rotate-180 transition-transform duration-200" />
                  </Link>

                  {/* Dropdown Menu */}
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 w-64 bg-white text-gray-800 shadow-xl rounded-b-md border-t-2 border-yellow-400 py-2 z-50 max-h-96 overflow-y-auto">
                      <div className="px-3 py-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                        {item.label} के जिले व शहर
                      </div>
                      <div className="grid grid-cols-2 gap-1 p-2">
                        {item.dropdownItems.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            to={sub.path}
                            className="text-xs px-2.5 py-1.5 rounded hover:bg-red-50 hover:text-[#e01b24] transition-colors truncate"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-1.5 py-3 px-2.5 transition-colors whitespace-nowrap ${
                    isActive 
                      ? 'bg-[#b7141b] text-yellow-200 shadow-inner' 
                      : 'hover:bg-[#b7141b] hover:text-white'
                  }`
                }
              >
                <IconComponent className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Mobile Horizontal Scrollable Category Bar */}
        <div className="flex lg:hidden overflow-x-auto no-scrollbar py-2 text-sm font-semibold space-x-2">
          {menuItems.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Home;
            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-1 px-3 py-1.5 rounded-full whitespace-nowrap text-xs transition-colors ${
                    isActive 
                      ? 'bg-white text-[#e01b24] font-bold shadow-sm' 
                      : 'bg-red-700/60 text-white hover:bg-red-700'
                  }`
                }
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
