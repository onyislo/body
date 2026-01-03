import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { PricingPlan, Trainer, Inquiry } from '../types';
import {
  DollarSign,
  Users,
  MessageSquare,
  LogOut,
  Plus,
  Edit,
  Trash2,
  X,
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'pricing' | 'trainers' | 'inquiries'>('pricing');
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    fetchPricingPlans();
    fetchTrainers();
    fetchInquiries();
  }, []);

  const fetchPricingPlans = async () => {
    const { data } = await supabase
      .from('pricing_plans')
      .select('*')
      .order('price', { ascending: true });
    setPricingPlans(data || []);
  };

  const fetchTrainers = async () => {
    const { data } = await supabase
      .from('trainers')
      .select('*')
      .order('created_at', { ascending: false });
    setTrainers(data || []);
  };

  const fetchInquiries = async () => {
    const { data } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    setInquiries(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const deletePricingPlan = async (id: string) => {
    if (confirm('Are you sure you want to delete this pricing plan?')) {
      await supabase.from('pricing_plans').delete().eq('id', id);
      fetchPricingPlans();
    }
  };

  const deleteTrainer = async (id: string) => {
    if (confirm('Are you sure you want to delete this trainer?')) {
      await supabase.from('trainers').delete().eq('id', id);
      fetchTrainers();
    }
  };

  const updateInquiryStatus = async (id: string, status: string) => {
    await supabase.from('inquiries').update({ status }).eq('id', id);
    fetchInquiries();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img src="/image.png" alt="Body Fuel" className="h-10 w-10 rounded-full" />
              <span className="ml-3 text-xl font-bold">
                BODY FUEL <span className="text-red-600">ADMIN</span>
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your gym's pricing, trainers, and inquiries</p>
        </div>

        <div className="flex space-x-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('pricing')}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'pricing'
                ? 'bg-red-600 text-white'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            <DollarSign size={20} className="mr-2" />
            Pricing Plans
          </button>
          <button
            onClick={() => setActiveTab('trainers')}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'trainers'
                ? 'bg-red-600 text-white'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            <Users size={20} className="mr-2" />
            Trainers
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'inquiries'
                ? 'bg-red-600 text-white'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            <MessageSquare size={20} className="mr-2" />
            Inquiries ({inquiries.filter((i) => i.status === 'new').length})
          </button>
        </div>

        {activeTab === 'pricing' && (
          <PricingTab
            plans={pricingPlans}
            onDelete={deletePricingPlan}
            onRefresh={fetchPricingPlans}
            onEdit={setEditingItem}
            onShowModal={setShowModal}
          />
        )}

        {activeTab === 'trainers' && (
          <TrainersTab
            trainers={trainers}
            onDelete={deleteTrainer}
            onRefresh={fetchTrainers}
            onEdit={setEditingItem}
            onShowModal={setShowModal}
          />
        )}

        {activeTab === 'inquiries' && (
          <InquiriesTab inquiries={inquiries} onUpdateStatus={updateInquiryStatus} />
        )}
      </div>

      {showModal && (
        <Modal
          type={activeTab}
          item={editingItem}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
          onSuccess={() => {
            setShowModal(false);
            setEditingItem(null);
            if (activeTab === 'pricing') fetchPricingPlans();
            if (activeTab === 'trainers') fetchTrainers();
          }}
        />
      )}
    </div>
  );
}

function PricingTab({
  plans,
  onDelete,
  onRefresh,
  onEdit,
  onShowModal,
}: {
  plans: PricingPlan[];
  onDelete: (id: string) => void;
  onRefresh: () => void;
  onEdit: (item: any) => void;
  onShowModal: (show: boolean) => void;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Pricing Plans</h2>
        <button
          onClick={() => {
            onEdit(null);
            onShowModal(true);
          }}
          className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Plan
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-black mb-2">{plan.name}</h3>
            <p className="text-3xl font-bold text-red-600 mb-4">
              KSH {plan.price.toLocaleString()}
            </p>
            <p className="text-gray-600 mb-4">{plan.duration}</p>
            <div className="mb-4">
              {plan.features.map((feature, idx) => (
                <p key={idx} className="text-sm text-gray-700 mb-1">
                  • {feature}
                </p>
              ))}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  onEdit(plan);
                  onShowModal(true);
                }}
                className="flex-1 flex items-center justify-center bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors"
              >
                <Edit size={16} className="mr-2" />
                Edit
              </button>
              <button
                onClick={() => onDelete(plan.id)}
                className="flex-1 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrainersTab({
  trainers,
  onDelete,
  onRefresh,
  onEdit,
  onShowModal,
}: {
  trainers: Trainer[];
  onDelete: (id: string) => void;
  onRefresh: () => void;
  onEdit: (item: any) => void;
  onShowModal: (show: boolean) => void;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Trainers</h2>
        <button
          onClick={() => {
            onEdit(null);
            onShowModal(true);
          }}
          className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Trainer
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-black mb-2">{trainer.name}</h3>
            <p className="text-red-600 font-semibold mb-2">{trainer.specialty}</p>
            <p className="text-gray-700 text-sm mb-4">{trainer.bio}</p>
            <p className="text-sm mb-4">
              Status:{' '}
              <span
                className={`font-semibold ${
                  trainer.is_available ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trainer.is_available ? 'Available' : 'Unavailable'}
              </span>
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  onEdit(trainer);
                  onShowModal(true);
                }}
                className="flex-1 flex items-center justify-center bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors"
              >
                <Edit size={16} className="mr-2" />
                Edit
              </button>
              <button
                onClick={() => onDelete(trainer.id)}
                className="flex-1 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InquiriesTab({
  inquiries,
  onUpdateStatus,
}: {
  inquiries: Inquiry[];
  onUpdateStatus: (id: string, status: string) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-black mb-6">Customer Inquiries</h2>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">Plan Interest</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry, idx) => (
                <tr
                  key={inquiry.id}
                  className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className="px-6 py-4">{inquiry.name}</td>
                  <td className="px-6 py-4">{inquiry.email}</td>
                  <td className="px-6 py-4">{inquiry.phone}</td>
                  <td className="px-6 py-4">{inquiry.plan_interest || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <select
                      value={inquiry.status}
                      onChange={(e) => onUpdateStatus(inquiry.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        inquiry.status === 'new'
                          ? 'bg-blue-100 text-blue-800'
                          : inquiry.status === 'contacted'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => alert(`Message: ${inquiry.message || 'No message'}`)}
                      className="text-red-600 hover:text-red-700 font-semibold"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Modal({
  type,
  item,
  onClose,
  onSuccess,
}: {
  type: 'pricing' | 'trainers';
  item: any;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState(
    item || {
      name: '',
      price: '',
      duration: '',
      features: '',
      is_active: true,
      specialty: '',
      bio: '',
      image_url: '',
      is_available: true,
    }
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (type === 'pricing') {
        const data = {
          name: formData.name,
          price: parseInt(formData.price),
          duration: formData.duration,
          features: formData.features.split('\n').filter((f: string) => f.trim()),
          is_active: formData.is_active,
        };

        if (item) {
          await supabase.from('pricing_plans').update(data).eq('id', item.id);
        } else {
          await supabase.from('pricing_plans').insert([data]);
        }
      } else if (type === 'trainers') {
        const data = {
          name: formData.name,
          specialty: formData.specialty,
          bio: formData.bio,
          image_url: formData.image_url,
          is_available: formData.is_available,
        };

        if (item) {
          await supabase.from('trainers').update(data).eq('id', item.id);
        } else {
          await supabase.from('trainers').insert([data]);
        }
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-black">
            {item ? 'Edit' : 'Add'} {type === 'pricing' ? 'Pricing Plan' : 'Trainer'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {type === 'pricing' ? (
            <>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Plan Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Price (KSH) *</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Duration *</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="e.g., 30 Days"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Features (one per line) *
                </label>
                <textarea
                  value={
                    typeof formData.features === 'string'
                      ? formData.features
                      : formData.features.join('\n')
                  }
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-gray-700 font-semibold">Active</label>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Trainer Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Specialty *</label>
                <select
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="">Select specialty</option>
                  <option value="Boxing">Boxing</option>
                  <option value="Bodybuilding">Bodybuilding</option>
                  <option value="Zumba">Zumba</option>
                  <option value="CrossFit">CrossFit</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Powerlifting">Powerlifting</option>
                  <option value="Cardio">Cardio</option>
                  <option value="HIIT">HIIT</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Bio *</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_available}
                  onChange={(e) =>
                    setFormData({ ...formData, is_available: e.target.checked })
                  }
                  className="mr-2"
                />
                <label className="text-gray-700 font-semibold">Available</label>
              </div>
            </>
          )}

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-3 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
