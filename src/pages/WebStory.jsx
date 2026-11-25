import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { updatePageMeta } from '../utils/seo';
import { Image, Eye, ChevronRight, X, Play } from 'lucide-react';

const WebStory = () => {
  const [activeStory, setActiveStory] = useState(null);

  useEffect(() => {
    updatePageMeta({
      title: 'वेब स्टोरीज़ (Web Stories) | परख खबर',
      description: 'परख खबर की रोचक और विजुअल वेब स्टोरीज़: मनोरंजन, धर्म, पर्यटन और ताजा घटनाएं।'
    });
    window.scrollTo(0, 0);
  }, []);

  const stories = [
    {
      id: 1,
      title: 'काशी के 84 घाटों पर देव दीपावली का अलौकिक नजारा',
      category: 'धर्म संस्कृति',
      image: '/images/news/news-6.jpg',
      views: '12.4K',
      slides: [
        'वाराणसी के अस्सी घाट से लेकर राजघाट तक 15 लाख दीयों की अद्भुत रोशनी।',
        'चेत सिंह किले पर आयोजित लेजर लाइट एंड साउंड शो ने दर्शकों को मंत्रमुग्ध किया।',
        'दशाश्वमेध घाट पर विश्वप्रसिद्ध गंगा महाआरती का लाइव दर्शन।'
      ]
    },
    {
      id: 2,
      title: 'सोनी सब के कलाकारों ने साझा किए टीवी के अनसुने किस्से',
      category: 'मनोरंजन',
      image: '/images/news/news-1.jpg',
      views: '9.8K',
      slides: [
        'विश्व टेलीविजन दिवस पर टीवी इंडस्ट्री के दिग्गजों ने किया पुराने दिनों को याद।',
        'गौरव खन्ना और अनिल कपूर के यादगार संघर्ष की अनकही दास्तान।',
        'छोटे पर्दे का जादू: कैसे परिवारों को एक साथ जोड़ता है टेलीविजन।'
      ]
    },
    {
      id: 3,
      title: 'बलिया के ऐतिहासिक ददरी मेले के 5 मुख्य आकर्षण',
      category: 'उत्तर प्रदेश',
      image: '/images/news/news-18.jpg',
      views: '15.2K',
      slides: [
        'महर्षि भृगु की तपोस्थली पर सदियों से चली आ रही ददरी मेले की पावन परंपरा।',
        'भारत का दूसरा सबसे बड़ा पारंपरिक पशु एवं मीना बाजार।',
        'बलिया की मशहूर जलेबी, खाजा और लोक कलाकारों की शानदार प्रस्तुतियां।'
      ]
    },
    {
      id: 4,
      title: '2026 में बिना एटीएम कार्ड के पैसे निकालने की आसान विधि',
      category: 'टेक्नोलॉजी',
      image: '/images/news/news-4.jpg',
      views: '8.3K',
      slides: [
        'आरबीआई की नई सुविधा: अब किसी भी एटीएम पर मोबाइल से स्कैन करें क्यूआर कोड।',
        'कार्ड क्लोनिंग और धोखाधड़ी से मिलेगा 100% छुटकारा।',
        '30 सेकंड में बिना पिन डाले सुरक्षित कैश विड्रॉल की प्रक्रिया।'
      ]
    },
    {
      id: 5,
      title: 'आज का विशेष राशिफल: इन 4 राशियों को मिलेगा अचानक धन लाभ',
      category: 'राशिफल',
      image: '/images/news/news-24.jpg',
      views: '22.1K',
      slides: [
        'मेष व सिंह राशि के जातकों को कार्यक्षेत्र में पदोन्नति के मजबूत योग।',
        'वृश्चिक राशि के व्यापारियों को पुराने निवेश से मिलेगा अप्रत्याशित मुनाफा।',
        'शुभ रंग और विशेष उपाय: सूर्य देव को तांबे के लोटे से दें जल।'
      ]
    },
    {
      id: 6,
      title: 'उत्तराखंड के पर्वतीय अंचलों में बर्फबारी का आगाज',
      category: 'उत्तराखंड',
      image: '/images/news/news-19.jpg',
      views: '11.5K',
      slides: [
        'बद्रीनाथ, केदारनाथ और औली में बर्फ की सफेद चादर बिछी।',
        'सैलानियों की भारी भीड़: होटल और होमस्टे में प्री-बुकिंग तेज।',
        'मौसम विभाग की चेतावनी: ऊंचाई वाले इलाकों में सावधानी बरतने के निर्देश।'
      ]
    }
  ];

  return (
    <div className="site-container my-4">
      <Breadcrumbs items={[{ name: 'वेब स्टोरीज़', path: '/webstory' }]} />

      <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center space-x-2 border-b-2 border-[#e01b24] pb-3 mb-4">
          <Image className="w-6 h-6 text-purple-600" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            परख खबर वेब स्टोरीज़
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-gray-600">
          ताजा खबरें, मनोरंजन, धर्म और लाइफस्टाइल को विजुअल और आकर्षक स्टोरी फॉर्मेट में देखें।
        </p>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => setActiveStory(story)}
            className="group relative aspect-[9/16] rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-black"
          >
            {/* Background Image */}
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

            {/* Top Badges */}
            <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-center text-white text-[10px]">
              <span className="bg-[#e01b24] px-2 py-0.5 rounded font-bold">
                {story.category}
              </span>
              <span className="flex items-center space-x-0.5 bg-black/50 px-1.5 py-0.5 rounded">
                <Eye className="w-3 h-3 mr-0.5" />
                {story.views}
              </span>
            </div>

            {/* Bottom Title */}
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h3 className="font-bold text-xs sm:text-sm leading-snug line-clamp-3 group-hover:text-yellow-200 transition-colors">
                {story.title}
              </h3>
              <div className="flex items-center space-x-1 text-[11px] text-gray-300 mt-2 font-semibold">
                <Play className="w-3 h-3 fill-white text-white" />
                <span>स्टोरी देखें</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Story Viewer Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-lg overflow-hidden shadow-2xl flex flex-col justify-between text-white p-6">
            <img
              src={activeStory.image}
              alt={activeStory.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>

            {/* Top Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="bg-[#e01b24] px-2.5 py-1 rounded text-xs font-bold">
                {activeStory.category}
              </span>
              <button
                onClick={() => setActiveStory(null)}
                className="p-1 rounded-full bg-white/20 hover:bg-white/40 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Middle Content */}
            <div className="relative z-10 space-y-4">
              <h2 className="text-xl font-bold leading-tight text-yellow-200">
                {activeStory.title}
              </h2>
              <div className="bg-black/60 p-4 rounded border border-white/20 space-y-2">
                {activeStory.slides.map((slide, i) => (
                  <p key={i} className="text-xs sm:text-sm leading-relaxed">
                    👉 {slide}
                  </p>
                ))}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="relative z-10 text-center">
              <button
                onClick={() => setActiveStory(null)}
                className="w-full bg-[#e01b24] hover:bg-[#b7141b] text-white font-bold py-2 rounded text-xs transition-colors"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebStory;
