import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan_interest: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error: submitError } = await supabase.from('inquiries').insert([
        {
          ...formData,
          status: 'new',
        },
      ]);

      if (submitError) throw submitError;

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        plan_interest: '',
        message: '',
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to submit inquiry. Please try again.');
      console.error('Error submitting inquiry:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            GET <span className="text-red-600">STARTED</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ready to transform your life? Fill out the form below and we'll get back to you
            shortly
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-black mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-red-600 p-3 rounded-lg mr-4">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-black mb-1">Location</h4>
                  <p className="text-gray-600">Ushirika Plaza, Eastleigh, Nairobi</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-red-600 p-3 rounded-lg mr-4">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-black mb-1">Phone</h4>
                  <p className="text-gray-600">+254 700 000 000</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-red-600 p-3 rounded-lg mr-4">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-black mb-1">Email</h4>
                  <p className="text-gray-600">info@bodyfuel.co.ke</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-black text-white p-6 rounded-lg">
              <h4 className="font-bold text-xl mb-4">Opening Hours</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Every Day</span>
                  <span className="text-red-600 font-semibold text-lg">24/7</span>
                </div>
                <p className="text-gray-400 text-sm mt-2">We're open around the clock for your convenience</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-black mb-6">Send Us a Message</h3>

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                Thank you! We'll contact you soon.
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="+254 7XX XXX XXX"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Interested Plan
                </label>
                <select
                  name="plan_interest"
                  value={formData.plan_interest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="">Select a plan</option>
                  <option value="Daily Pass">Daily Pass</option>
                  <option value="Weekly Pass">Weekly Pass</option>
                  <option value="Monthly Membership">Monthly Membership</option>
                  <option value="Quarterly Membership">Quarterly Membership</option>
                  <option value="Annual Membership">Annual Membership</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Tell us about your fitness goals..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-md transition-colors flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    SUBMIT INQUIRY
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
