import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationOverlay = ({ isOpen, onClose }: NavigationOverlayProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const mainItems = [
    { id: 'home', label: 'Home', href: '#hero' },
    { id: 'build', label: 'Build', href: '#features' },
    { id: 'manage', label: 'Manage', href: '#team' },
    { id: 'analyze', label: 'Analyze', href: '#closing' }
  ];

  const sideItems = [
    { id: 'blog', label: 'Blog', href: '#' },
    { id: 'engagements', label: 'Engagements', href: '#' },
    { id: 'demo', label: 'Demo', href: '#closing' },
    { id: 'story', label: 'Our Story', href: '#' }
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-pure-black">
      <div className="absolute top-8 right-8">
        <button
          onClick={onClose}
          className="text-pure-white hover:text-gray-300 transition-colors"
        >
          <X className="h-8 w-8" />
        </button>
      </div>

      <div className="flex h-full">
        {/* Main Navigation */}
        <div className="flex-1 flex flex-col justify-center pl-16">
          <nav className="space-y-4">
            {mainItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`nav-overlay-text block text-left transition-all duration-300 ${
                  hoveredItem === item.id
                    ? 'text-pure-white'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Side Navigation */}
        <div className="w-80 flex flex-col justify-center pr-16">
          <nav className="space-y-6">
            {sideItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                className="text-2xl font-medium text-gray-400 hover:text-pure-white transition-colors block text-left"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavigationOverlay;