import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { PricingPlan } from '../types';
import { Check } from 'lucide-react';

export default function Pricing() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true });

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">Loading pricing plans...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            MEMBERSHIP <span className="text-red-600">PLANS</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan that fits your fitness journey and budget
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 ${
                index === 2 ? 'border-4 border-red-600 relative' : 'border border-gray-200'
              }`}
            >
              {index === 2 && (
                <div className="bg-red-600 text-white text-center py-2 font-bold text-sm">
                  MOST POPULAR
                </div>
              )}
              <div className={`p-8 ${index === 2 ? 'bg-black' : 'bg-white'}`}>
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    index === 2 ? 'text-white' : 'text-black'
                  }`}
                >
                  {plan.name}
                </h3>
                <p className={`mb-6 ${index === 2 ? 'text-gray-300' : 'text-gray-600'}`}>
                  {plan.duration}
                </p>
                <div className="mb-6">
                  <span
                    className={`text-5xl font-bold ${
                      index === 2 ? 'text-red-600' : 'text-black'
                    }`}
                  >
                    KSH {plan.price.toLocaleString()}
                  </span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check
                        className={`${
                          index === 2 ? 'text-red-600' : 'text-red-600'
                        } mr-3 flex-shrink-0 mt-1`}
                        size={20}
                      />
                      <span
                        className={`${index === 2 ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={scrollToContact}
                  className={`w-full py-3 rounded-md font-semibold transition-all ${
                    index === 2
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-black hover:bg-gray-800 text-white'
                  }`}
                >
                  SELECT PLAN
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
