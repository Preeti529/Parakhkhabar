import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import newsService from '../services/newsService';
import Breadcrumbs from '../components/Breadcrumbs';
import Sidebar from '../components/Sidebar';
import ShareModal from '../components/ShareModal';
import { updatePageMeta, generateNewsArticleSchema } from '../utils/seo';
import { Clock, User, Eye, Share2, Tag, ChevronLeft } from 'lucide-react';

const Article = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    const found = newsService.getArticleBySlug(slug);
    if (found) {
      setArticle(found);
      const related = newsService.getRelatedNews(found.id, found.categorySlug, 4);
      setRelatedNews(related);
      setTrendingNews(newsService.getTrendingNews(5));

      // Schema & SEO
      const schema = generateNewsArticleSchema(found);
      updatePageMeta({
        title: found.title,
        description: found.summary || found.title,
        keywords: found.tags?.join(', ') || 'हिंदी समाचार, परख खबर',
        image: found.image,
        type: 'article',
        schema: schema
      });
    }
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="site-container py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">लेख नहीं मिला</h2>
        <p className="text-gray-600 mb-6">क्षमा करें, जिस समाचार को आप खोज रहे हैं वह उपलब्ध नहीं है या हटा दिया गया है।</p>
        <Link 
          to="/" 
          className="inline-flex items-center space-x-1.5 bg-[#e01b24] text-white px-5 py-2.5 rounded font-semibold hover:bg-[#b7141b] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>मुख्य पृष्ठ पर वापस जाएं</span>
        </Link>
      </div>
    );
  }

  const breadcrumbItems = [
    { name: article.category, path: `/category/${article.categorySlug}` },
    ...(article.subCategory ? [{ name: article.subCategory, path: `/category/${article.categorySlug}?district=${article.subCategory}` }] : []),
    { name: article.title, path: `/news/${article.slug}` }
  ];

  return (
    <div className="site-container my-4">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Article Content (8 cols) */}
        <main className="lg:col-span-8 bg-white p-4 sm:p-6 rounded-sm border border-gray-200 shadow-sm">
          
          {/* Category Badge & Meta */}
          <div className="flex items-center space-x-2 mb-3">
            <Link
              to={`/category/${article.categorySlug}`}
              className="post-cat-badge text-xs px-2.5 py-1"
            >
              {article.category}
            </Link>
            {article.subCategory && (
              <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                📍 {article.subCategory}
              </span>
            )}
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            {article.title}
          </h1>

          {/* Byline & Publish Date */}
          <div className="flex flex-wrap items-center justify-between py-3 border-y border-gray-200 text-xs text-gray-600 mb-5 gap-y-2">
            <div className="flex items-center space-x-3">
              <span className="flex items-center font-semibold text-gray-800">
                <User className="w-3.5 h-3.5 mr-1 text-[#e01b24]" />
                {article.author} ({article.authorRole || 'संवाददाता'})
              </span>
              <span>•</span>
              <span className="flex items-center text-gray-500">
                <Clock className="w-3.5 h-3.5 mr-1 text-gray-400" />
                {article.publishedDateHindi}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {article.views && (
                <span className="flex items-center text-gray-500">
                  <Eye className="w-3.5 h-3.5 mr-1" />
                  {article.views.toLocaleString('hi-IN')} व्यूज
                </span>
              )}
              <button
                onClick={() => setIsShareOpen(true)}
                className="flex items-center space-x-1 text-[#e01b24] font-semibold hover:underline"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>शेयर करें</span>
              </button>
            </div>
          </div>

          {/* Main Article Image */}
          <div className="mb-6 rounded overflow-hidden bg-gray-100">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto max-h-[500px] object-cover"
              loading="eager"
            />
            <p className="text-[11px] text-gray-400 p-1.5 text-right italic bg-gray-50">
              फोटो: परख खबर आर्काइव
            </p>
          </div>

          {/* Article Summary Lead Box */}
          {article.summary && (
            <div className="p-3.5 bg-red-50/60 border-l-4 border-[#e01b24] rounded-r text-sm sm:text-base font-semibold text-gray-800 leading-relaxed mb-6">
              {article.summary}
            </div>
          )}

          {/* Article Body Paragraphs */}
          <div className="space-y-4 text-base sm:text-lg text-gray-800 leading-relaxed font-devanagari">
            {article.content && article.content.map((para, idx) => (
              <p key={idx} className="text-justify">
                {para}
              </p>
            ))}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="w-4 h-4 text-gray-400 mr-1" />
                <span className="text-xs font-bold text-gray-500 mr-2">टैग्स:</span>
                {article.tags.map((tag, tIdx) => (
                  <Link
                    key={tIdx}
                    to={`/search?q=${encodeURIComponent(tag)}`}
                    className="text-xs bg-gray-100 hover:bg-[#e01b24] hover:text-white px-2.5 py-1 rounded text-gray-700 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Editorial Disclaimer */}
          <div className="mt-6 p-3 bg-gray-50 border border-gray-200 rounded text-xs text-gray-500">
            <p>
              <strong>संपादकीय नोट:</strong> परख खबर पर प्रकाशित सभी खबरें स्थानीय सूत्रों, सरकारी ज्ञापनों और पत्रकारों की जमीनी पड़ताल पर आधारित होती हैं। किसी भी विसंगति या सुधार के लिए पाठक हमसे संपर्क कर सकते हैं।
            </p>
          </div>

          {/* Related News Section */}
          {relatedNews.length > 0 && (
            <div className="mt-10 pt-6 border-t-2 border-[#e01b24]">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                संबंधित समाचार
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedNews.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded p-2.5 hover:shadow-md transition-shadow flex space-x-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-16 object-cover rounded flex-shrink-0 bg-gray-100"
                    />
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-gray-900 leading-snug line-clamp-2 hover:text-[#e01b24]">
                        <Link to={`/news/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h4>
                      <span className="text-[10px] text-gray-400 mt-1 block">
                        {item.publishedDateHindi}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <Sidebar 
            trendingNews={trendingNews} 
            onShare={() => setIsShareOpen(true)} 
          />
        </div>

      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        article={article}
      />

    </div>
  );
};

export default Article;
