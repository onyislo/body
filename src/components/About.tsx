import { Dumbbell, Users, Award, Heart } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            ABOUT <span className="text-red-600">US</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Gym Interior"
              className="rounded-lg shadow-2xl"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-black mb-4">
              Welcome to Body Fuel Fitness
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Body Fuel Fitness is more than just a gym - it's a community dedicated
              to helping you achieve your fitness goals. Located at Ushirika Plaza,
              we offer world-class facilities and expert guidance to fuel your
              fitness journey.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We pride ourselves on creating an inclusive environment for everyone.
              Our facility includes a dedicated women's section, also called Body Fuel,
              providing a comfortable and empowering space for ladies to train with
              confidence.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="bg-red-600 p-3 rounded-lg mr-4">
                  <Dumbbell className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-black mb-1">Modern Equipment</h4>
                  <p className="text-gray-600 text-sm">State-of-the-art machines</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-red-600 p-3 rounded-lg mr-4">
                  <Users className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-black mb-1">Expert Trainers</h4>
                  <p className="text-gray-600 text-sm">Certified professionals</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-red-600 p-3 rounded-lg mr-4">
                  <Award className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-black mb-1">Proven Results</h4>
                  <p className="text-gray-600 text-sm">Success stories daily</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-red-600 p-3 rounded-lg mr-4">
                  <Heart className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-black mb-1">Women's Section</h4>
                  <p className="text-gray-600 text-sm">Dedicated ladies gym</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black text-white rounded-lg p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">500+</div>
              <div className="text-gray-300">Active Members</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">15+</div>
              <div className="text-gray-300">Expert Trainers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">24/7</div>
              <div className="text-gray-300">Access Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
