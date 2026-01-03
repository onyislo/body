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
    <nav className="bg-black fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <img
              src="/image.png"
              alt="Body Fuel Fitness"
              className="h-16 w-16 rounded-full"
            />
            <span className="ml-3 text-white text-xl font-bold">
              BODY FUEL <span className="text-red-600">FITNESS</span>
            </span>
          </div>

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

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-red-600 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection('home')}
              className="text-white hover:bg-red-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-white hover:bg-red-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
            >
              ABOUT US
            </button>
            <button
              onClick={() => scrollToSection('trainers')}
              className="text-white hover:bg-red-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
            >
              TRAINERS
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-white hover:bg-red-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
            >
              PRICING
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-red-600 hover:bg-red-700 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
            >
              JOIN NOW
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
