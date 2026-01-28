import React from 'react';

function Settings() {
  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-gray-600 rounded-full mr-3"></div>
            <div>
              <div className="font-semibold">Alex Grim</div>
              <div className="text-sm text-gray-400">Administrator</div>
            </div>
          </div>

          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center text-white bg-red-600 p-3 rounded-lg"
            >
              <span className="mr-3">Settings Icon</span> General
            </a>
            <a
              href="#"
              className="flex items-center text-gray-400 hover:text-white p-3 rounded-lg hover:bg-gray-700"
            >
              <span className="mr-3">Users Icon</span> User Management
            </a>
            <a
              href="#"
              className="flex items-center text-gray-400 hover:text-white p-3 rounded-lg hover:bg-gray-700"
            >
              <span className="mr-3">Plans Icon</span> Subscription Plans
            </a>
            <a
              href="#"
              className="flex items-center text-gray-400 hover:text-white p-3 rounded-lg hover:bg-gray-700"
            >
              <span className="mr-3">Integrations Icon</span> Integrations
            </a>
            <a
              href="#"
              className="flex items-center text-gray-400 hover:text-white p-3 rounded-lg hover:bg-gray-700"
            >
              <span className="mr-3">Security Icon</span> Security
            </a>
          </nav>
        </div>

        <div>
          <a
            href="#"
            className="flex items-center text-gray-400 hover:text-white p-3 rounded-lg hover:bg-gray-700"
          >
            <span className="mr-3">Logout Icon</span> Logout
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold mb-2">General Settings</h1>
          <p className="text-gray-400 mb-8">
            Configure general app settings, branding, and contact information.
          </p>

          {/* Gym Name & Logo Section */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">Gym Name & Logo</h2>
                <p className="text-gray-400 text-sm">
                  Update your gym's branding and public profile.
                </p>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
                Save Changes
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Gym Name</label>
                <input
                  type="text"
                  defaultValue="Powerhouse Fitness"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Gym Logo</label>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">
                  Upload New Logo
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">Contact Information</h2>
                <p className="text-gray-400 text-sm">
                  Update your gym's address and contact details.
                </p>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
                Save Changes
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  defaultValue="123 Fitness Lane, Workout City"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="text"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="contact@powerhouse.fit"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Regional Settings Section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">Regional Settings</h2>
                <p className="text-gray-400 text-sm">
                  Set the correct timezone and currency for your region.
                </p>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
                Save Changes
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Timezone</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500">
                  <option>(GMT-05:00) Eastern Time</option>
                  <option>(GMT-08:00) Pacific Time</option>
                  <option>(GMT+00:00) UTC</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Currency</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-red-500">
                  <option>USD - United States Dollar</option>
                  <option>EUR - Euro</option>
                  <option>GBP - British Pound</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;
