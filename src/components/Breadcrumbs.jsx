import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbSchema } from '../utils/seo';

const Breadcrumbs = ({ items = [] }) => {
  useEffect(() => {
    if (items.length > 0) {
      const schema = generateBreadcrumbSchema([
        { name: 'होम', path: '/' },
        ...items
      ]);
      let scriptTag = document.getElementById('breadcrumb-jsonld');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'breadcrumb-jsonld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schema, null, 2);
    }
  }, [items]);

  return (
    <nav aria-label="ब्रेडक्रम्ब्स" className="py-2.5 mb-4 text-xs text-gray-500 border-b border-gray-200">
      <ol className="flex items-center flex-wrap gap-1.5">
        <li className="flex items-center">
          <Link to="/" className="text-gray-600 hover:text-[#e01b24] flex items-center">
            <Home className="w-3.5 h-3.5 mr-1" />
            <span>होम</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              {isLast ? (
                <span className="text-gray-800 font-semibold truncate max-w-[280px] sm:max-w-md">
                  {item.name}
                </span>
              ) : (
                <Link to={item.path} className="text-gray-600 hover:text-[#e01b24] truncate">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
