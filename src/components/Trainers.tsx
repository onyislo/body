import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Trainer } from '../types';
import { User } from 'lucide-react';

export default function Trainers() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const { data, error } = await supabase
        .from('trainers')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setTrainers(data || []);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSpecialtyColor = (specialty: string) => {
    const colors: { [key: string]: string } = {
      'Boxing': 'bg-red-600',
      'Bodybuilding': 'bg-black',
      'Zumba': 'bg-red-500',
      'CrossFit': 'bg-gray-800',
      'Yoga': 'bg-red-700',
      'Powerlifting': 'bg-gray-900',
    };
    return colors[specialty] || 'bg-red-600';
  };

  if (loading) {
    return (
      <section id="trainers" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">Loading trainers...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="trainers" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            OUR <span className="text-red-600">TRAINERS</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our team of certified professionals dedicated to helping you achieve your fitness goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-64 bg-gray-200 flex items-center justify-center">
                {trainer.image_url ? (
                  <img
                    src={trainer.image_url}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-black w-full h-full flex items-center justify-center">
                    <User size={80} className="text-gray-400" />
                  </div>
                )}
                <div
                  className={`absolute top-4 right-4 ${getSpecialtyColor(
                    trainer.specialty
                  )} text-white px-4 py-2 rounded-full text-sm font-semibold`}
                >
                  {trainer.specialty}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-black mb-2">{trainer.name}</h3>
                <p className="text-gray-600 leading-relaxed">{trainer.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
