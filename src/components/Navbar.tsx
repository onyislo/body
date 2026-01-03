import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav className="bg-black fixed w-full z-50 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Hamburger menu button on the left for mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-red-600 transition-colors"
                aria-label="Toggle menu"
              >
                <Menu size={28} />
              </button>
            </div>

            {/* Logo and brand name - centered on mobile, left on desktop */}
            <div className="flex items-center flex-1 md:flex-initial justify-center md:justify-start">
              <img
                src="/image.png"
                alt="Body Fuel Fitness"
                className="h-16 w-16 rounded-full"
              />
              <span className="ml-3 text-white text-xl font-bold">
                BODYFUEL
              </span>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-white hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  HOME
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-white hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  ABOUT US
                </button>
                <button
                  onClick={() => scrollToSection('trainers')}
                  className="text-white hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  TRAINERS
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-white hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  PRICING
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  JOIN NOW
                </button>
              </div>
            </div>

            {/* Spacer for mobile to balance the layout */}
            <div className="md:hidden w-10"></div>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar menu - slides in from the left */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <span className="text-white text-lg font-bold">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-red-600 transition-colors"
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
        </div>

        {/* Menu items */}
        <div className="px-4 py-6 space-y-4">
          <button
            onClick={() => scrollToSection('home')}
            className="text-white hover:bg-red-600 block px-4 py-3 rounded-md text-base font-medium w-full text-left transition-colors"
          >
            HOME
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-white hover:bg-red-600 block px-4 py-3 rounded-md text-base font-medium w-full text-left transition-colors"
          >
            ABOUT US
          </button>
          <button
            onClick={() => scrollToSection('trainers')}
            className="text-white hover:bg-red-600 block px-4 py-3 rounded-md text-base font-medium w-full text-left transition-colors"
          >
            TRAINERS
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="text-white hover:bg-red-600 block px-4 py-3 rounded-md text-base font-medium w-full text-left transition-colors"
          >
            PRICING
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-red-600 hover:bg-red-700 text-white block px-4 py-3 rounded-md text-base font-medium w-full text-left transition-colors"
          >
            JOIN NOW
          </button>
        </div>
      </div>

      {/* Overlay backdrop when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
