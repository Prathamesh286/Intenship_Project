// src/pages/admin/Settings.jsx
import React, { useState } from 'react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('General');

  const tabs = ['General', 'Memberships', 'Payments', 'Notifications'];

  const membershipTiers = [
    { name: 'Basic Strength', price: 29.99, status: 'ACTIVE' },
    { name: 'Pro Athlete', price: 59.99, status: 'ACTIVE' },
    { name: 'Elite Coaching', price: 129.99, status: 'DRAFT' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 border-r border-gray-800 flex-shrink-0">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-xl font-bold">
              X
            </div>
            <div>
              <h1 className="text-xl font-bold">Iron Gym Admin</h1>
              <p className="text-xs text-gray-500">Management Portal v2.4</p>
            </div>
          </div>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-1">
            {[
              { icon: '📊', label: 'Dashboard' },
              { icon: '👥', label: 'Memberships' },
              { icon: '💳', label: 'Payments' },
              { icon: '🔔', label: 'Notifications' },
              { icon: '⚙️', label: 'Settings', active: true },
            ].map((item, i) => (
              <li key={i}>
                <button
                  className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-red-900/40 text-red-400'
                      : 'hover:bg-gray-800/70 text-gray-300'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-8 left-6 right-6">
          <button className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors">
            View Gym Site
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold">Admin Settings</h1>
            <p className="text-gray-400 mt-1">
              Manage your gym's core configurations and brand identity.
            </p>
          </div>

          <button className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors">
            Save All Changes
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800 mb-10">
          <div className="flex space-x-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-medium transition-colors relative ${
                  activeTab === tab
                    ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-red-600'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* General Tab Content */}
        {activeTab === 'General' && (
          <div className="space-y-12">
            {/* Branding Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6">General Branding</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Logo Upload */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Gym Logo
                  </label>
                  <div className="border-2 border-dashed border-gray-700 rounded-xl p-10 text-center hover:border-red-600/50 transition-colors cursor-pointer bg-gray-900/50">
                    <div className="mx-auto w-32 h-32 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-5xl">↑</span>
                    </div>
                    <p className="text-gray-400">Drop logo or click to upload</p>
                    <p className="text-sm text-gray-500 mt-2">
                      PNG or SVG • Recommended 512×512px
                    </p>
                  </div>
                  <button className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm">
                    Update Brand Assets
                  </button>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Gym Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Iron Gym Downtown"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Business Email
                    </label>
                    <input
                      type="email"
                      defaultValue="contact@irongym.com"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Support Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 987-6543"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Membership Tiers */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Membership Tiers</h2>
                <button className="px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg font-medium">
                  + Add New Tier
                </button>
              </div>

              <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="text-left px-8 py-5 font-medium">Tier Name</th>
                      <th className="text-left px-8 py-5 font-medium">Price / Month</th>
                      <th className="text-left px-8 py-5 font-medium">Status</th>
                      <th className="text-right px-8 py-5 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {membershipTiers.map((tier, index) => (
                      <tr key={index} className="hover:bg-gray-800/50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              tier.status === 'ACTIVE' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}></div>
                            <span>{tier.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">${tier.price.toFixed(2)}</td>
                        <td className="px-8 py-6">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            tier.status === 'ACTIVE'
                              ? 'bg-green-900/60 text-green-400'
                              : 'bg-yellow-900/60 text-yellow-400'
                          }`}>
                            {tier.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="text-gray-400 hover:text-white transition-colors">
                            ✏️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab !== 'General' && (
          <div className="text-center py-32 text-gray-500">
            <p className="text-xl">This section is under development</p>
            <p className="mt-2">{activeTab} settings coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminSettings;