import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, AlertTriangle, ArrowLeft } from 'lucide-react';
import { updatePageMeta } from '../utils/seo';

const NotFound = () => {
  useEffect(() => {
    updatePageMeta({
      title: '404 - पृष्ठ नहीं मिला | परख खबर',
      description: 'क्षमा करें, जिस पृष्ठ को आप खोज रहे हैं वह उपलब्ध नहीं है।'
    });
  }, []);

  return (
    <div className="site-container my-16 text-center">
      <div className="max-w-lg mx-auto bg-white p-8 sm:p-12 rounded border border-gray-200 shadow-sm">
        <div className="w-16 h-16 bg-red-100 text-[#e01b24] rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2 font-mono">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
          पृष्ठ उपलब्ध नहीं है
        </h2>

        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
          आप जिस समाचार या पृष्ठ को खोज रहे हैं, वह शायद स्थानांतरित कर दिया गया है, हटा दिया गया है या उसका लिंक अमान्य है।
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#e01b24] text-white px-5 py-2.5 rounded font-semibold text-sm hover:bg-[#b7141b] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>होम पेज पर जाएं</span>
          </Link>

          <Link
            to="/search"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gray-100 text-gray-800 px-5 py-2.5 rounded font-semibold text-sm hover:bg-gray-200 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>समाचार खोजें</span>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <span className="text-xs text-gray-400 block mb-3 font-semibold uppercase tracking-wider">
            प्रमुख श्रेणियां:
          </span>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <Link to="/category/uttar-pradesh" className="text-[#e01b24] hover:underline">उत्तर प्रदेश</Link>
            <span className="text-gray-300">•</span>
            <Link to="/category/india" className="text-[#e01b24] hover:underline">भारत</Link>
            <span className="text-gray-300">•</span>
            <Link to="/category/international" className="text-[#e01b24] hover:underline">विदेश</Link>
            <span className="text-gray-300">•</span>
            <Link to="/category/entertainment" className="text-[#e01b24] hover:underline">मनोरंजन</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
