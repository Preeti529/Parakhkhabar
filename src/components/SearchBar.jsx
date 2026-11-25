import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

const SearchBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleQuickTag = (tag) => {
    navigate(`/search?q=${encodeURIComponent(tag)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-md shadow-2xl w-full max-w-xl overflow-hidden border border-gray-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h3 id="search-modal-title" className="text-base font-bold text-gray-900 flex items-center space-x-2">
            <Search className="w-4 h-4 text-[#e01b24]" />
            <span>परख खबर समाचार खोजें</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:text-black hover:bg-gray-200 transition-colors"
            aria-label="बंद करें"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5">
          <div className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="खोजने के लिए शब्द लिखें (उदा. उत्तर प्रदेश, बजट, चुनाव, बलिया)..."
              className="w-full pl-10 pr-24 py-3 border-2 border-gray-300 rounded focus:border-[#e01b24] focus:outline-hidden text-sm sm:text-base"
              autoFocus
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3" />
            
            <button
              type="submit"
              className="absolute right-1.5 bg-[#e01b24] hover:bg-[#b7141b] text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
            >
              खोजें
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className="mt-4">
            <span className="text-xs text-gray-500 font-semibold block mb-2">
              लोकप्रिय खोजें:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['उत्तर प्रदेश', 'बलिया', 'अयोध्या', 'सड़क हादसा', 'सोनी सब', 'एक्सिस बैंक', 'राशिफल'].map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickTag(tag)}
                  className="text-xs bg-gray-100 hover:bg-red-50 hover:text-[#e01b24] px-2.5 py-1 rounded text-gray-700 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

export default SearchBar;
