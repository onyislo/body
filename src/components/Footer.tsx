import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/image.png"
                alt="Body Fuel Fitness"
                className="h-12 w-12 rounded-full"
              />
              <span className="ml-3 text-xl font-bold">
                BODY <span className="text-red-600">FUEL</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Transform your body, fuel your life. Join the premier fitness center in Nairobi.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 hover:bg-red-600 p-2 rounded-full transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-red-600 p-2 rounded-full transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-red-600 p-2 rounded-full transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-red-600 p-2 rounded-full transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('trainers')}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  Trainers
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Boxing Training</li>
              <li>Bodybuilding Programs</li>
              <li>Zumba Classes</li>
              <li>CrossFit Training</li>
              <li>Yoga Sessions</li>
              <li>Powerlifting Coaching</li>
              <li>Women's Gym Section</li>
              <li>Personal Training</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-red-600 mr-3 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-400">Ushirika Plaza, Nairobi, Kenya</span>
              </li>
              <li className="flex items-start">
                <Phone className="text-red-600 mr-3 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-400">+254 700 000 000</span>
              </li>
              <li className="flex items-start">
                <Mail className="text-red-600 mr-3 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-400">info@bodyfuel.co.ke</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Body Fuel Fitness. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
