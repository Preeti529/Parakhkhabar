import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { updatePageMeta } from '../utils/seo';
import { getFormattedCurrentDateHindi } from '../utils/date';
import { 
  Newspaper, Download, ZoomIn, ZoomOut, ChevronLeft, 
  ChevronRight, Calendar, MapPin, Printer 
} from 'lucide-react';

const EPaper = () => {
  const currentDate = getFormattedCurrentDateHindi();
  const [selectedEdition, setSelectedEdition] = useState('बलिया');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8;
  const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    updatePageMeta({
      title: `ई-पेपर डिजिटल संस्करण (${selectedEdition}) | परख खबर`,
      description: `परख खबर का आज का संपूर्ण डिजिटल ई-पेपर पढ़ें। ${selectedEdition} संस्करण।`
    });
    window.scrollTo(0, 0);
  }, [selectedEdition]);

  const editions = [
    { name: 'बलिया (मुख्य संस्करण)', code: 'बलिया' },
    { name: 'लखनऊ संस्करण', code: 'लखनऊ' },
    { name: 'वाराणसी संस्करण', code: 'वाराणसी' },
    { name: 'गोरखपुर संस्करण', code: 'गोरखपुर' },
    { name: 'प्रयागराज संस्करण', code: 'प्रयागराज' },
    { name: 'उत्तराखंड (देहरादून)', code: 'देहरादून' }
  ];

  return (
    <div className="site-container my-4">
      <Breadcrumbs items={[{ name: 'ई-पेपर डिजिटल संस्करण', path: '/epaper' }]} />

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-sm border border-gray-200 shadow-sm mb-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Title & Date */}
          <div>
            <div className="flex items-center space-x-2">
              <Newspaper className="w-6 h-6 text-[#e01b24]" />
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                परख खबर डिजिटल ई-पेपर
              </h1>
            </div>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-[#e01b24]" />
              <span>दिनांक: {currentDate} | कुल पृष्ठ: {totalPages}</span>
            </p>
          </div>

          {/* Edition Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gray-700 flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1 text-[#e01b24]" />
              संस्करण चुनें:
            </span>
            <select
              value={selectedEdition}
              onChange={(e) => setSelectedEdition(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-300 rounded px-3 py-1.5 font-semibold text-gray-800 focus:outline-hidden focus:border-[#e01b24]"
            >
              {editions.map((ed, idx) => (
                <option key={idx} value={ed.code}>{ed.name}</option>
              ))}
            </select>
          </div>

          {/* Zoom & Page Actions */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-gray-100 rounded p-1 text-xs">
              <button
                onClick={() => setZoomLevel(prev => Math.max(75, prev - 15))}
                className="p-1 hover:bg-white rounded text-gray-700"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 font-mono font-semibold">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(150, prev + 15))}
                className="p-1 hover:bg-white rounded text-gray-700"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center space-x-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">प्रिंट</span>
            </button>

            <button
              onClick={() => alert(`परख खबर ${selectedEdition} संस्करण (पेज ${currentPage}) का पीडीएफ डाउनलोड शुरू हो रहा है...`)}
              className="inline-flex items-center space-x-1 text-xs bg-[#e01b24] hover:bg-[#b7141b] text-white font-bold px-3 py-1.5 rounded transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>डाउनलोड PDF</span>
            </button>
          </div>

        </div>

        {/* Page Carousel Thumbnails */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pNum = i + 1;
              const isActive = currentPage === pNum;
              return (
                <button
                  key={pNum}
                  onClick={() => setCurrentPage(pNum)}
                  className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
                    isActive 
                      ? 'bg-[#e01b24] text-white shadow-xs' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  पृष्ठ {pNum}
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-1 text-gray-500 text-xs">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>{currentPage} / {totalPages}</span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Newspaper Sheet Canvas Simulation */}
      <div className="bg-gray-200 p-4 sm:p-8 rounded-sm shadow-inner flex justify-center overflow-auto">
        <div 
          className="bg-white shadow-2xl border-4 border-gray-300 transition-all duration-200 max-w-4xl w-full"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          {/* Newspaper Masthead Banner */}
          <div className="p-6 border-b-4 border-double border-black">
            <div className="flex justify-between items-center text-[11px] font-bold border-b border-gray-300 pb-1 mb-2">
              <span>वर्ष 12 | अंक 314</span>
              <span>{selectedEdition} संस्करण</span>
              <span>{currentDate}</span>
              <span>मूल्य: ₹4.50 | पृष्ठ: 8</span>
            </div>

            <div className="text-center py-2">
              <h2 className="text-4xl sm:text-6xl font-black tracking-wider text-[#e01b24] font-devanagari">
                परख खबर
              </h2>
              <p className="text-xs sm:text-sm font-bold tracking-widest text-gray-700 mt-1 uppercase">
                निष्पक्ष, प्रामाणिक और तेज समाचार का विश्वसनीय स्रोत
              </p>
            </div>
          </div>

          {/* Newspaper Grid Simulation */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-300">
            
            {/* Lead Story (Left 8 Cols) */}
            <div className="md:col-span-8 space-y-4">
              <div className="border-b border-gray-300 pb-4">
                <span className="bg-[#e01b24] text-white text-[10px] font-bold px-2 py-0.5 uppercase">
                  मुख्य पृष्ठ विशेष
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2 leading-tight">
                  पूर्वांचल और अवध में विकास कार्यों को मिली नई गति: 1200 करोड़ की नई योजनाओं को मंजूरी
                </h3>
                <p className="text-xs text-gray-500 mt-1 font-semibold">
                  विशेष संवाददाता | बलिया / लखनऊ
                </p>
                <div className="my-3 aspect-[16/9] bg-gray-100 rounded overflow-hidden">
                  <img
                    src="/images/news/news-1.jpg"
                    alt="Newspaper Lead"
                    className="w-full h-full object-cover"
                  />
                  <p className="text-[10px] text-gray-500 italic p-1 bg-gray-50 text-right">
                    फोटो: परख खबर डिजिटल
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-gray-800 leading-relaxed text-justify">
                  राज्य सरकार ने पूर्वी उत्तर प्रदेश के चहुंमुखी विकास के लिए 1200 करोड़ रुपये की महत्वाकांक्षी परियोजनाओं को वित्तीय स्वीकृति प्रदान की है। इसमें ग्रामीण सड़कों के सुदृढ़ीकरण, आधुनिक स्वास्थ्य उपकेंद्रों के निर्माण और जल जीवन मिशन के तहत हर घर नल से जल पहुंचाने के कार्यों को प्राथमिकता दी गई है।
                </p>
              </div>

              {/* Sub-column stories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <h4 className="font-bold text-sm text-gray-900 leading-snug">
                    बलिया के ददरी मेले में उमड़ा जनसैलाब, महर्षि भृगु की तपोभूमि पर सजी दुकानें
                  </h4>
                  <p className="text-[11px] text-gray-600 mt-1 text-justify">
                    कार्तिक पूर्णिमा के उपलक्ष्य में आयोजित ऐतिहासिक ददरी मेले में लाखों श्रद्धालुओं ने पवित्र गंगा स्नान कर मेले का आनंद लिया।
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 leading-snug">
                    डिजिटल यूपी: हर ग्राम पंचायत में स्थापित होंगे हाई-स्पीड इंटरनेट केंद्र
                  </h4>
                  <p className="text-[11px] text-gray-600 mt-1 text-justify">
                    ग्रामीण अंचलों के युवाओं को ऑनलाइन शिक्षा एवं सरकारी सेवाओं से जोड़ने के लिए पंचायत स्तर पर डिजिटल हब बनाए जा रहे हैं।
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column (4 Cols) */}
            <div className="md:col-span-4 md:pl-6 space-y-4">
              <div className="p-3 bg-red-50 border-l-2 border-[#e01b24]">
                <h4 className="text-xs font-bold text-[#e01b24] uppercase">
                  आज का विचार
                </h4>
                <p className="text-xs text-gray-800 italic mt-1">
                  "सत्य और निष्पक्षता ही पत्रकारिता का सच्चा आभूषण है।"
                </p>
              </div>

              <div className="border-b border-gray-200 pb-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase">संक्षिप्त समाचार</span>
                <h5 className="font-bold text-xs text-gray-900 mt-1">
                  • काशी विश्वनाथ में देव दीपावली की तैयारियां पूर्ण, जगमग होंगे घाट
                </h5>
                <h5 className="font-bold text-xs text-gray-900 mt-2">
                  • मौसम विभाग की चेतावनी: पूर्वी जिलों में हल्की ठंड के साथ कोहरे का अलर्ट
                </h5>
                <h5 className="font-bold text-xs text-gray-900 mt-2">
                  • खेल: राज्य स्तरीय कुश्ती प्रतियोगिता में बलिया के पहलवानों ने मारी बाजी
                </h5>
              </div>

              {/* Ad box simulation */}
              <div className="border border-dashed border-gray-400 p-4 text-center bg-gray-50 rounded text-xs">
                <span className="text-[10px] text-gray-400 block font-bold">- विज्ञापन -</span>
                <p className="text-gray-700 font-bold mt-1">परख खबर ई-पेपर विज्ञापन</p>
                <p className="text-[10px] text-gray-500 mt-1">संपर्क: advt@parakhkhabar.com</p>
              </div>
            </div>

          </div>

          {/* Newspaper Footer strip */}
          <div className="p-3 bg-gray-100 border-t border-gray-300 text-center text-[10px] text-gray-500 font-bold">
            मुद्रक एवं प्रकाशक: परख खबर मीडिया नेटवर्क, बलिया (उ.प्र.) | सर्वाधिकार सुरक्षित © 2026
          </div>
        </div>
      </div>
    </div>
  );
};

export default EPaper;
