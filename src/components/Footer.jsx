import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, FileText, Info, Phone, 
  ChevronRight, Heart 
} from 'lucide-react';

const Footer = ({ navigation, categories = [] }) => {
  const policyLinks = navigation?.footerPolicyLinks || [];

  return (
    <footer className="bg-[#1a1d20] text-gray-300 mt-12 border-t-4 border-[#e01b24]">
      
      {/* Top Footer Section */}
      <div className="site-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Info (Cols 4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block bg-white p-2.5 rounded-sm shadow-sm">
              <img 
                src="/logo.png" 
                alt="Parakh Khabar" 
                className="h-12 w-auto object-contain" 
              />
            </Link>
            
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              <strong>परख खबर (Parakh Khabar)</strong> - एक स्वतंत्र एवं निष्पक्ष हिंदी डिजिटल समाचार पोर्टल। हमारा उद्देश्य उत्तर प्रदेश, उत्तराखंड, देश और दुनिया की प्रामाणिक, विश्वसनीय और तथ्यपरक खबरें सबसे पहले आप तक पहुँचाना है।
            </p>

            <div className="text-xs text-gray-400 space-y-1 pt-2 border-t border-gray-800">
              <p>📍 <strong>मुख्यालय:</strong> बलिया, उत्तर प्रदेश, भारत</p>
              <p>📧 <strong>ईमेल:</strong> contact@parakhkhabar.com</p>
              <p>📞 <strong>फोन:</strong> +91 94500 XXXXX</p>
            </div>
          </div>

          {/* Quick Categories Navigation (Cols 5) */}
          <div className="lg:col-span-5">
            <h3 className="text-white text-base font-bold mb-4 pb-2 border-b border-gray-800 flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#e01b24] rounded-full inline-block"></span>
              <span>प्रमुख श्रेणियां</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
              <Link to="/" className="hover:text-white hover:underline py-1">होम</Link>
              <Link to="/category/top-news" className="hover:text-white hover:underline py-1">टॉप न्यूज</Link>
              <Link to="/category/india" className="hover:text-white hover:underline py-1">भारत समाचार</Link>
              <Link to="/category/uttar-pradesh" className="hover:text-white hover:underline py-1">उत्तर प्रदेश</Link>
              <Link to="/category/uttarakhand" className="hover:text-white hover:underline py-1">उत्तराखंड</Link>
              <Link to="/category/international" className="hover:text-white hover:underline py-1">विदेश</Link>
              <Link to="/category/entertainment" className="hover:text-white hover:underline py-1">मनोरंजन</Link>
              <Link to="/category/business" className="hover:text-white hover:underline py-1">बिजनेस</Link>
              <Link to="/category/sports" className="hover:text-white hover:underline py-1">खेल</Link>
              <Link to="/category/tech" className="hover:text-white hover:underline py-1">टेक्नोलॉजी</Link>
              <Link to="/category/rashifal" className="hover:text-white hover:underline py-1">आज का राशिफल</Link>
              <Link to="/category/editorial" className="hover:text-white hover:underline py-1">संपादकीय</Link>
            </div>
          </div>

          {/* Regional Hubs & Editorial (Cols 3) */}
          <div className="lg:col-span-3">
            <h3 className="text-white text-base font-bold mb-4 pb-2 border-b border-gray-800 flex items-center space-x-2">
              <span className="w-2 h-2 bg-[#e01b24] rounded-full inline-block"></span>
              <span>उत्तर प्रदेश के मुख्य जिले</span>
            </h3>

            <div className="flex flex-wrap gap-1.5 text-xs">
              {['बलिया', 'लखनऊ', 'वाराणसी', 'कानपुर', 'प्रयागराज', 'गोरखपुर', 'आजमगढ़', 'बलरामपुर', 'आगरा', 'गाजियाबाद', 'बरेली', 'मऊ'].map((city, idx) => (
                <Link
                  key={idx}
                  to={`/category/uttar-pradesh?district=${city}`}
                  className="bg-gray-800 hover:bg-[#e01b24] hover:text-white px-2 py-1 rounded text-gray-300 transition-colors"
                >
                  {city}
                </Link>
              ))}
            </div>

            <div className="mt-5 p-3 bg-gray-900 rounded border border-gray-800">
              <span className="text-xs text-yellow-400 font-semibold block mb-1">
                पत्रकारिता के मानक
              </span>
              <p className="text-[11px] text-gray-400 leading-normal">
                परख खबर प्रेस काउंसिल ऑफ इंडिया के पत्रकारिता आचार संहिता का पूर्ण अनुपालन करता है।
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Mandatory Newspaper Policy & Compliance Links Bar */}
      <div className="bg-[#121416] py-4 border-t border-gray-800">
        <div className="site-container">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-gray-400">
            {policyLinks.map((p, idx) => (
              <li key={idx} className="flex items-center">
                <Link 
                  to={p.path} 
                  className="hover:text-white transition-colors"
                >
                  {p.label}
                </Link>
                {idx < policyLinks.length - 1 && (
                  <span className="ml-4 text-gray-600 select-none">|</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="bg-black py-4 text-center text-xs text-gray-500 border-t border-gray-900">
        <div className="site-container flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            Copyright © {new Date().getFullYear()} <Link to="/" className="text-gray-300 hover:text-white font-semibold">Parakh Khabar</Link>. All Rights Reserved.
          </p>
          <p className="text-[11px] text-gray-600">
            डिजिटल रूप से प्रकाशित एवं संचालित
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
