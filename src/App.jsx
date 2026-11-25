import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Category from './pages/Category';
import Article from './pages/Article';
import SearchResults from './pages/SearchResults';
import PolicyPage from './pages/PolicyPage';
import EPaper from './pages/EPaper';
import WebStory from './pages/WebStory';
import AddNews from './pages/AddNews';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="category/:categorySlug" element={<Category />} />
          <Route path="news/:slug" element={<Article />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="policy/:policySlug" element={<PolicyPage />} />
          <Route path="epaper" element={<EPaper />} />
          <Route path="webstory" element={<WebStory />} />
          <Route path="add-news" element={<AddNews />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
