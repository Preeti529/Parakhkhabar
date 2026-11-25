import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare } from 'lucide-react';

const ShareModal = ({ isOpen, onClose, article }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !article) return null;

  const url = `${window.location.origin}/news/${article.slug}`;
  const title = article.title;

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + '\n' + url)}`, '_blank');
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&via=ParakhKhabar`, '_blank');
  };

  const shareTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-md shadow-xl w-full max-w-sm overflow-hidden border border-gray-200 animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h3 className="text-sm font-bold text-gray-900">
            खबर शेयर करें
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-200"
            aria-label="बंद करें"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Article Preview */}
        <div className="p-4 border-b border-gray-100 flex items-start space-x-3">
          <img
            src={article.image}
            alt={article.title}
            className="w-16 h-12 object-cover rounded flex-shrink-0 bg-gray-100"
          />
          <h4 className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug">
            {article.title}
          </h4>
        </div>

        {/* Share buttons */}
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
            <button
              onClick={shareWhatsApp}
              className="flex flex-col items-center justify-center p-2 rounded bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              <span className="text-base">💬</span>
              <span className="text-[10px] mt-1">WhatsApp</span>
            </button>

            <button
              onClick={shareFacebook}
              className="flex flex-col items-center justify-center p-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <span className="text-base font-bold">f</span>
              <span className="text-[10px] mt-1">Facebook</span>
            </button>

            <button
              onClick={shareTwitter}
              className="flex flex-col items-center justify-center p-2 rounded bg-black text-white hover:bg-gray-800 transition-colors"
            >
              <span className="text-base font-bold">𝕏</span>
              <span className="text-[10px] mt-1">Twitter</span>
            </button>

            <button
              onClick={shareTelegram}
              className="flex flex-col items-center justify-center p-2 rounded bg-sky-500 text-white hover:bg-sky-600 transition-colors"
            >
              <span className="text-base">✈️</span>
              <span className="text-[10px] mt-1">Telegram</span>
            </button>
          </div>

          {/* Copy Link Input */}
          <div className="flex items-center space-x-2 pt-2">
            <input
              type="text"
              readOnly
              value={url}
              className="w-full text-xs bg-gray-50 border border-gray-300 rounded px-2.5 py-2 text-gray-600 truncate focus:outline-hidden"
            />
            <button
              onClick={handleCopy}
              className={`px-3 py-2 text-xs font-bold rounded flex items-center space-x-1 transition-colors flex-shrink-0 ${
                copied 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-800 hover:bg-black text-white'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'कॉपी हुआ' : 'कॉपी'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShareModal;
