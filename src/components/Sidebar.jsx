import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, Newspaper, Sun, Share2, 
  ExternalLink, Sparkles 
} from 'lucide-react';

const Sidebar = ({ trendingNews = [], onShare }) => {
  // Horoscope Zodiac items for authenticity
  const zodiacList = [
    { sign: 'मेष', icon: '♈', desc: 'कार्यक्षेत्र में सकारात्मक बदलाव के योग हैं।' },
    { sign: 'वृषभ', icon: '♉', desc: 'आर्थिक स्थिति में सुधार होगा, नए अवसर मिलेंगे।' },
    { sign: 'मिथुन', icon: '♊', desc: 'पारिवारिक सुख में वृद्धि होगी, यात्रा संभव।' },
    { sign: 'कर्क', icon: '♋', desc: 'स्वास्थ्य का विशेष ध्यान रखें, लाभ होगा।' }
  ];

  return (
    <aside className="space-y-6">
      
      {/* 1. E-Paper Banner Widget */}
      <div className="bg-gradient-to-r from-red-700 to-red-800 text-white rounded-sm p-4 shadow-sm border border-red-900">
        <div className="flex items-center space-x-3 mb-3">
          <Newspaper className="w-8 h-8 text-yellow-300" />
          <div>
            <span className="text-xs uppercase tracking-wider text-yellow-200 font-bold block">
              डिजिटल संस्करण
            </span>
            <h3 className="text-lg font-bold">परख खबर ई-पेपर</h3>
          </div>
        </div>
        <p className="text-xs text-red-100 mb-3 leading-relaxed">
          आज का दैनिक समाचार पत्र अपने मोबाइल या कंप्यूटर पर डिजिटल रूप में पढ़ें।
        </p>
        <Link
          to="/epaper"
          className="inline-flex items-center justify-center w-full bg-white text-[#e01b24] font-bold text-xs py-2 px-4 rounded shadow-sm hover:bg-yellow-50 transition-colors"
        >
          <span>ई-पेपर अभी पढ़ें</span>
          <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
        </Link>
      </div>

      {/* 2. Advertisement Space Placeholder */}
      <div className="bg-white border border-gray-200 rounded-sm p-3 text-center shadow-sm">
        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">
          - विज्ञापन -
        </div>
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded p-6 flex flex-col items-center justify-center min-h-[220px]">
          <span className="text-xs font-semibold text-gray-500 mb-1">
            PARAKH KHABAR AD SPACE
          </span>
          <span className="text-[11px] text-gray-400">
            300 x 250 Banner Advertisement
          </span>
          <span className="mt-2 text-[10px] text-red-600 font-medium">
            विज्ञापन हेतु संपर्क करें: advt@parakhkhabar.com
          </span>
        </div>
      </div>

      {/* 3. Trending / Top News (Format1 Sidebar Layout) */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-4">
        <div className="flex items-center space-x-2 border-b-2 border-[#e01b24] pb-2 mb-3">
          <TrendingUp className="w-5 h-5 text-[#e01b24]" />
          <h3 className="text-lg font-bold text-gray-900">ट्रेंडिंग न्यूज़</h3>
        </div>

        <div className="divide-y divide-gray-100">
          {trendingNews.slice(0, 5).map((item, idx) => (
            <div key={item.id || idx} className="py-2.5 first:pt-0 last:pb-0 flex items-start space-x-3 group">
              <span className="text-lg font-bold text-gray-300 group-hover:text-[#e01b24] transition-colors w-4 flex-shrink-0 text-center font-mono">
                {idx + 1}
              </span>

              {/* Small Thumbnail */}
              <Link 
                to={`/news/${item.slug}`} 
                className="w-16 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-100"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </Link>

              {/* Title & Date */}
              <div className="flex-1">
                <h4 className="text-xs font-bold text-gray-900 leading-snug group-hover:text-[#e01b24] transition-colors line-clamp-2">
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

      {/* 4. आज का राशिफल (Horoscope) Widget */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-4">
        <div className="flex items-center justify-between border-b-2 border-yellow-500 pb-2 mb-3">
          <div className="flex items-center space-x-2">
            <Sun className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-bold text-gray-900">आज का राशिफल</h3>
          </div>
          <Link 
            to="/category/rashifal" 
            className="text-xs text-[#e01b24] font-semibold hover:underline"
          >
            विस्तार से
          </Link>
        </div>

        <div className="space-y-2.5">
          {zodiacList.map((z, i) => (
            <div key={i} className="p-2 bg-yellow-50/50 rounded border border-yellow-100/80 flex items-start space-x-2.5">
              <span className="text-base text-yellow-600 bg-white p-1 rounded shadow-xs">
                {z.icon}
              </span>
              <div>
                <span className="text-xs font-bold text-gray-800 block">
                  {z.sign} राशि
                </span>
                <p className="text-[11px] text-gray-600 leading-tight">
                  {z.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Social Media Follow Widget */}
      <div className="bg-white rounded-sm border border-gray-200 shadow-sm p-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 border-b pb-2">
          सोशल मीडिया पर जुड़ें
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-1.5 p-2 bg-[#1877f2] text-white rounded hover:opacity-90 transition-opacity"
          >
            <span>Facebook</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-1.5 p-2 bg-black text-white rounded hover:opacity-90 transition-opacity"
          >
            <span>X (Twitter)</span>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-1.5 p-2 bg-[#ff0000] text-white rounded hover:opacity-90 transition-opacity"
          >
            <span>YouTube</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-1.5 p-2 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white rounded hover:opacity-90 transition-opacity"
          >
            <span>Instagram</span>
          </a>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
