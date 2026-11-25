import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import MobileMenu from '../components/MobileMenu';
import newsService from '../services/newsService';

const MainLayout = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = newsService.getNavigation();
  const categories = newsService.getCategories();

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f7] text-[#212529]">
      
      {/* 1. Top Bar */}
      <TopBar 
        onOpenSearch={() => setIsSearchOpen(true)} 
        onToggleMobileMenu={() => setIsMobileMenuOpen(true)} 
      />

      {/* 2. Main Navigation Bar */}
      <Navbar navigation={navigation} />

      {/* 3. Main Outlet Content */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* 4. Footer */}
      <Footer navigation={navigation} categories={categories} />

      {/* Search Modal */}
      <SearchBar 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* Mobile Drawer Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        navigation={navigation} 
      />

    </div>
  );
};

export default MainLayout;
