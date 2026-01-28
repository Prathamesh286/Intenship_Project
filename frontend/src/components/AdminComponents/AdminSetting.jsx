import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { Building2, Mail, Phone, MapPin, Clock, Users, Save } from 'lucide-react';

const AdminSetting = () => {
  const { user } = useAuth();
  const { addToast: showToast } = useToast();
  const [activeTab, setActiveTab] = useState('General');
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    gymName: 'CINEMANIA',
    businessEmail: 'contact@cinemania.com',
    supportPhone: '+91 98765 43210',
    address: '123 Fitness Street, New Delhi, India',
    openingHours: '5:00 AM - 11:00 PM',
    maxCapacity: 150,
  });

  const [membershipTiers, setMembershipTiers] = useState([
    { name: 'Basic', price: 2500, duration: '1 Month', status: 'Active' },
    { name: 'Standard', price: 7000, duration: '3 Months', status: 'Active' },
    { name: 'Premium', price: 13000, duration: '6 Months', status: 'Active' },
    { name: 'Elite', price: 24000, duration: '12 Months', status: 'Active' },
  ]);

  const tabs = ['General', 'Memberships', 'Notifications'];

  const handleSaveSettings = async () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      showToast('Settings saved successfully', 'success');
      setSaving(false);
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold font-serif text-luxury-900 dark:text-white">Settings</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage your gym's configurations and preferences
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="bg-gold-500 hover:bg-gold-400 text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-luxury-200 dark:border-white/10">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 font-medium transition-all relative ${activeTab === tab
                ? 'text-gold-600 dark:text-gold-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gold-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-luxury-900 dark:hover:text-white'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* General Tab */}
      {activeTab === 'General' && (
        <div className="space-y-6">
          {/* Gym Information */}
          <div className="glass-card rounded-2xl border border-luxury-200 dark:border-white/5 bg-white/50 dark:bg-black/20 p-6">
            <h3 className="text-xl font-bold text-luxury-900 dark:text-white mb-6 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-gold-500" />
              Gym Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gym Name
                </label>
                <input
                  type="text"
                  value={settings.gymName}
                  onChange={(e) => handleInputChange('gymName', e.target.value)}
                  className="w-full p-3 rounded-xl border border-luxury-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-gold-500 outline-none text-luxury-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Business Email
                </label>
                <input
                  type="email"
                  value={settings.businessEmail}
                  onChange={(e) => handleInputChange('businessEmail', e.target.value)}
                  className="w-full p-3 rounded-xl border border-luxury-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-gold-500 outline-none text-luxury-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Support Phone
                </label>
                <input
                  type="tel"
                  value={settings.supportPhone}
                  onChange={(e) => handleInputChange('supportPhone', e.target.value)}
                  className="w-full p-3 rounded-xl border border-luxury-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-gold-500 outline-none text-luxury-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Opening Hours
                </label>
                <input
                  type="text"
                  value={settings.openingHours}
                  onChange={(e) => handleInputChange('openingHours', e.target.value)}
                  className="w-full p-3 rounded-xl border border-luxury-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-gold-500 outline-none text-luxury-900 dark:text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full p-3 rounded-xl border border-luxury-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-gold-500 outline-none text-luxury-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Max Capacity
                </label>
                <input
                  type="number"
                  value={settings.maxCapacity}
                  onChange={(e) => handleInputChange('maxCapacity', e.target.value)}
                  className="w-full p-3 rounded-xl border border-luxury-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-gold-500 outline-none text-luxury-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Admin Profile */}
          <div className="glass-card rounded-2xl border border-luxury-200 dark:border-white/5 bg-white/50 dark:bg-black/20 p-6">
            <h3 className="text-xl font-bold text-luxury-900 dark:text-white mb-6">Admin Profile</h3>

            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center">
                <Users className="w-10 h-10 text-gold-500" />
              </div>
              <div>
                <p className="text-lg font-bold text-luxury-900 dark:text-white">{user?.name || 'Admin'}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || 'admin@cinemania.com'}</p>
                <p className="text-xs text-gold-600 dark:text-gold-400 font-medium mt-1">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Memberships Tab */}
      {activeTab === 'Memberships' && (
        <div className="glass-card rounded-2xl border border-luxury-200 dark:border-white/5 bg-white/50 dark:bg-black/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-luxury-900 dark:text-white">Membership Tiers</h3>
            <button className="bg-gold-500 hover:bg-gold-400 text-black px-4 py-2 rounded-lg font-bold text-sm transition-all">
              + Add Tier
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-luxury-100 dark:bg-white/5 text-luxury-600 dark:text-gray-400">
                <tr>
                  <th className="text-left p-4 font-bold">Tier Name</th>
                  <th className="text-left p-4 font-bold">Price (₹)</th>
                  <th className="text-left p-4 font-bold">Duration</th>
                  <th className="text-left p-4 font-bold">Status</th>
                  <th className="text-right p-4 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-200 dark:divide-white/5">
                {membershipTiers.map((tier, index) => (
                  <tr key={index} className="hover:bg-luxury-50 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="font-medium text-luxury-900 dark:text-white">{tier.name}</span>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-luxury-900 dark:text-white">₹{tier.price.toLocaleString('en-IN')}</td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">{tier.duration}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-xs font-bold">
                        {tier.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-gold-600 dark:text-gold-400 hover:underline text-sm font-medium">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'Notifications' && (
        <div className="glass-card rounded-2xl border border-luxury-200 dark:border-white/5 bg-white/50 dark:bg-black/20 p-6">
          <h3 className="text-xl font-bold text-luxury-900 dark:text-white mb-6">Notification Settings</h3>

          <div className="space-y-4">
            {[
              { label: 'Email notifications for new bookings', enabled: true },
              { label: 'SMS alerts for membership expiry', enabled: true },
              { label: 'Daily summary reports', enabled: false },
              { label: 'Contact form submissions', enabled: true },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-luxury-50 dark:bg-white/5">
                <span className="text-luxury-900 dark:text-white font-medium">{item.label}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSetting;