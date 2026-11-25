import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import newsService from '../services/newsService';
import Breadcrumbs from '../components/Breadcrumbs';
import { updatePageMeta } from '../utils/seo';
import { PlusCircle, Image, CheckCircle2, AlertCircle } from 'lucide-react';

const AddNews = () => {
  const navigate = useNavigate();
  const categories = newsService.getCategories().filter(c => c.id !== 'all');

  const [title, setTitle] = useState('');
  const [categorySlug, setCategorySlug] = useState('uttar-pradesh');
  const [subCategory, setSubCategory] = useState('बलिया');
  const [author, setAuthor] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState('/images/news/news-1.jpg');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    updatePageMeta({
      title: 'नया समाचार जोड़ें (Add News) | परख खबर',
      description: 'परख खबर पोर्टल पर नया समाचार प्रकाशित करें।'
    });
    window.scrollTo(0, 0);
  }, []);

  const sampleImages = [
    { label: 'मुख्य समाचार', url: '/images/news/news-1.jpg' },
    { label: 'प्रशासन / बैठक', url: '/images/news/news-6.jpg' },
    { label: 'सड़क / क्षेत्र', url: '/images/news/news-15.jpg' },
    { label: 'धार्मिक / संस्कृति', url: '/images/news/news-18.jpg' },
    { label: 'व्यवसाय / तकनीक', url: '/images/news/news-4.jpg' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const matchedCat = categories.find(c => c.slug === categorySlug) || { name: 'उत्तर प्रदेश' };
    
    // Split content by paragraphs
    const paragraphs = content
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .substring(0, 50) || `news-${Date.now()}`;

    const newArticle = newsService.addArticle({
      slug,
      title: title.trim(),
      category: matchedCat.name,
      categorySlug: categorySlug,
      subCategory: subCategory.trim() || null,
      author: author.trim() || 'Parakh Khabar संवाददाता',
      summary: summary.trim() || title.trim(),
      content: paragraphs,
      image: selectedImage
    });

    setIsSuccess(true);
    setTimeout(() => {
      navigate(`/news/${newArticle.slug}`);
    }, 1200);
  };

  return (
    <div className="site-container my-4">
      <Breadcrumbs items={[{ name: 'नया समाचार प्रकाशित करें', path: '/add-news' }]} />

      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded border border-gray-200 shadow-sm">
        
        {/* Title */}
        <div className="flex items-center space-x-3 border-b-2 border-[#e01b24] pb-4 mb-6">
          <PlusCircle className="w-8 h-8 text-[#e01b24]" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              परख खबर पर नया समाचार जोड़ें
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              यहाँ से आप तुरंत नया समाचार लिखकर पोर्टल पर प्रकाशित कर सकते हैं।
            </p>
          </div>
        </div>

        {isSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded text-green-800 flex items-center space-x-2 text-sm font-semibold animate-pulse">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span>समाचार सफलतापूर्वक प्रकाशित हो गया! लेख पृष्ठ खोला जा रहा है...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Headline */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">
              समाचार शीर्षक (Headline) *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="उदा: बलिया में सड़क चौड़ीकरण कार्य का हुआ शुभारंभ, ग्रामीणों में खुशी"
              className="w-full border-2 border-gray-300 rounded px-3.5 py-2.5 text-sm font-medium focus:border-[#e01b24] focus:outline-hidden"
            />
          </div>

          {/* Category & District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                श्रेणी (Category) *
              </label>
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-semibold bg-gray-50 focus:border-[#e01b24] focus:outline-hidden"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                जिला / उप-स्थान (District / City)
              </label>
              <input
                type="text"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                placeholder="उदा: बलिया, लखनऊ, वाराणसी, गोरखपुर"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#e01b24] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Author */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              संवाददाता का नाम (Reporter / Author)
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="उदा: राज पाण्डेय (वरिष्ठ संवाददाता)"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#e01b24] focus:outline-hidden"
            />
          </div>

          {/* Image Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center space-x-1">
              <Image className="w-3.5 h-3.5 text-[#e01b24]" />
              <span>समाचार फोटो चुनें (Photo):</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {sampleImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(img.url)}
                  className={`border-2 rounded p-1 cursor-pointer transition-all ${
                    selectedImage === img.url 
                      ? 'border-[#e01b24] bg-red-50 ring-2 ring-red-400' 
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-16 object-cover rounded" />
                  <span className="text-[10px] text-center block font-bold text-gray-600 mt-1 truncate">
                    {img.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              संक्षिप्त विवरण (Summary / Lead Excerpt)
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="समाचार का 1-2 लाइन का मुख्य सार..."
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#e01b24] focus:outline-hidden"
            />
          </div>

          {/* Full Content */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">
              विस्तृत समाचार सामग्री (Full News Story) *
            </label>
            <p className="text-[11px] text-gray-500 mb-1.5">
              प्रत्येक पैराग्राफ को अलग लाइन में लिखने के लिए Enter दबाएं।
            </p>
            <textarea
              rows={6}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="पूरा समाचार यहाँ लिखें..."
              className="w-full border-2 border-gray-300 rounded px-3.5 py-2.5 text-sm leading-relaxed focus:border-[#e01b24] focus:outline-hidden"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="bg-[#e01b24] hover:bg-[#b7141b] text-white font-bold px-8 py-3 rounded text-sm transition-colors shadow-md flex items-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>समाचार तुरंत प्रकाशित करें</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default AddNews;
