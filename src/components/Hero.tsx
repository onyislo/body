export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-black pt-20">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-black/80 z-10"></div>

      <div
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-20"></div>

        <div className="relative z-30 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                TRANSFORM YOUR
                <span className="text-red-600"> BODY</span>
                <br />
                FUEL YOUR
                <span className="text-red-600"> LIFE</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Welcome to Body Fuel Fitness - Where strength meets determination.
                Join our community and achieve your fitness goals with expert trainers
                and state-of-the-art equipment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToContact}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-md text-lg font-semibold transition-all transform hover:scale-105"
                >
                  START YOUR JOURNEY
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById('about');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded-md text-lg font-semibold transition-all"
                >
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
