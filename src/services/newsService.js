import defaultNews from '../data/news.json';
import categoriesData from '../data/categories.json';
import navigationData from '../data/navigation.json';

class NewsService {
  constructor() {
    // Load existing news and merge with any user-added news from localStorage
    const savedUserNews = this.loadLocalUserNews();
    this.news = [...savedUserNews, ...defaultNews];
    this.categories = categoriesData;
    this.navigation = navigationData;
  }

  loadLocalUserNews() {
    try {
      const data = localStorage.getItem('parakh_user_news');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveLocalUserNews(newArticle) {
    try {
      const current = this.loadLocalUserNews();
      const updated = [newArticle, ...current];
      localStorage.setItem('parakh_user_news', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  // Add a new user article
  addArticle(articleData) {
    const newId = Date.now();
    const slug = articleData.slug || `user-news-${newId}`;
    const article = {
      id: newId,
      slug: slug,
      title: articleData.title,
      summary: articleData.summary || articleData.title,
      content: Array.isArray(articleData.content) ? articleData.content : [articleData.content],
      image: articleData.image || '/images/news/news-1.jpg',
      category: articleData.category || 'उत्तर प्रदेश',
      categorySlug: articleData.categorySlug || 'uttar-pradesh',
      subCategory: articleData.subCategory || null,
      author: articleData.author || 'Parakh Khabar संवाददाता',
      authorRole: 'संवाददाता',
      publishedAt: new Date().toISOString(),
      publishedDateHindi: 'आज की खबर',
      modifiedAt: new Date().toISOString(),
      featured: false,
      topNews: true,
      trending: false,
      tags: [articleData.category, 'परख खबर', 'ताजा समाचार'],
      views: 1
    };

    this.news = [article, ...this.news];
    this.saveLocalUserNews(article);
    return article;
  }

  // Get all news articles
  getAllNews() {
    return this.news;
  }

  // Get single main featured news for the hero section
  getFeaturedNews() {
    return this.news.find(item => item.featured) || this.news[0];
  }

  // Get top breaking news for the ticker and alert bar
  getBreakingNews() {
    return this.news.slice(0, 6);
  }

  // Get top trending / popular news
  getTrendingNews(limit = 5) {
    return this.news.filter(item => item.trending).slice(0, limit);
  }

  // Get latest updates
  getLatestNews(limit = 6) {
    return [...this.news].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).slice(0, limit);
  }

  // Get news by category slug and optional district filter
  getNewsByCategory(categorySlug, district = null) {
    if (!categorySlug || categorySlug === 'all') {
      return this.news;
    }
    return this.news.filter(item => {
      const matchCat = item.categorySlug === categorySlug || 
        (categorySlug === 'top-news' && item.topNews);
      if (district) {
        return matchCat && (item.subCategory === district || item.title.includes(district));
      }
      return matchCat;
    });
  }

  // Get article by its slug
  getArticleBySlug(slug) {
    return this.news.find(item => item.slug === slug || String(item.id) === slug);
  }

  // Get related news for an article
  getRelatedNews(currentArticleId, categorySlug, limit = 4) {
    return this.news
      .filter(item => item.id !== currentArticleId && (item.categorySlug === categorySlug || item.topNews))
      .slice(0, limit);
  }

  // Search news by keyword
  searchNews(query) {
    if (!query || query.trim() === '') return [];
    const q = query.toLowerCase().trim();
    return this.news.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.subCategory && item.subCategory.toLowerCase().includes(q)) ||
      item.summary.toLowerCase().includes(q) ||
      item.content.some(para => para.toLowerCase().includes(q))
    );
  }

  // Get category metadata
  getCategories() {
    return this.categories;
  }

  // Get single category by slug
  getCategoryBySlug(slug) {
    return this.categories.find(c => c.slug === slug);
  }

  // Get navigation structure
  getNavigation() {
    return this.navigation;
  }
}

export const newsService = new NewsService();
export default newsService;
