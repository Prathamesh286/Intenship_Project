// src/pages/admin/MessagesInbox.jsx
import React, { useState } from 'react';

const MessagesInbox = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('All Messages');

  const messageTabs = ['All Messages', 'New (12)', 'Replied', 'Archived'];

  const sampleMessages = [
    {
      id: 1,
      sender: 'Marcus Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80',
      membership: 'Elite Tier',
      subject: 'Membership Inquiry - Elite Tier',
      preview: 'Hi, I was looking to upgrade my current membership to the Elite tier...',
      time: 'Today, 10:24 AM',
      status: 'NEW',
      fullMessage: `Hi PowerGym Admin Team,\n\nI've been a member at the Downtown branch for about six months now on the Standard plan. I'm really enjoying the facilities and the community you guys have built!\n\nI was looking into upgrading my current membership to the Elite tier to get access to the recovery lounge and the priority class booking. Could you let me know what the current monthly rate would be for that? Also, is there any promotion for members who are already on a contract?\n\nI'd also like to know if the Elite tier includes the guest passes monthly or if those are a separate add-on.\n\nLooking forward to hearing from you soon.\n\nBest regards,\nMarcus Johnson`,
      phone: '+1 (555) 234-5678',
      email: 'marcusj@example.com',
      date: 'Oct 25, 2023 - 10:24 AM',
    },
    {
      id: 2,
      sender: 'Sarah Miller',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80',
      subject: 'Personal Training Sessions',
      preview: 'Thanks for the info! I\'d like to book a trial session with Coach Elena...',
      time: 'Oct 24, 03:15 PM',
      status: 'REPLIED',
    },
    {
      id: 3,
      sender: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80',
      subject: 'Billing Issue - Double Charge',
      preview: 'I noticed two charges of $59 on my bank statement for the month of October...',
      time: 'Oct 24, 11:00 AM',
      status: 'NEW',
    },
    {
      id: 4,
      sender: 'Jessica Wong',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80',
      subject: 'Locker Room Maintenance',
      preview: 'The sauna in the men\'s locker room seems to be fluctuating in temperature...',
      time: 'Oct 23, 09:45 AM',
      status: 'ARCHIVED',
    },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      NEW: 'bg-red-900/70 text-red-300',
      REPLIED: 'bg-green-900/70 text-green-300',
      ARCHIVED: 'bg-gray-700 text-gray-300',
    };
    return styles[status] || 'bg-gray-700 text-gray-300';
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-xl font-bold">
            P
          </div>
          <h1 className="text-xl font-bold">PowerGym Admin</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search inquiries..."
              className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:border-red-600 transition-colors"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-300 hover:text-white">Dashboard</a>
            <a href="#" className="text-red-500 font-medium">Messages</a>
            <a href="#" className="text-gray-300 hover:text-white">Members</a>
            <a href="#" className="text-gray-300 hover:text-white">Settings</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="relative">
              <span className="text-2xl">🔔</span>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </button>
            <div className="w-10 h-10 bg-gray-700 rounded-full overflow-hidden border-2 border-gray-600">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80"
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-gray-900 border-r border-gray-800 flex-shrink-0">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6">MAIN MENU</h2>
            <ul className="space-y-1">
              {[
                { icon: '📊', label: 'Overview' },
                { icon: '✉️', label: 'Inquiries', active: true, badge: 12 },
                { icon: '👥', label: 'Staff Management' },
                { icon: '📈', label: 'Reports' },
                { icon: '⚙️', label: 'Settings' },
              ].map((item, i) => (
                <li key={i}>
                  <button
                    className={`w-full flex items-center justify-between px-5 py-3.5 rounded-lg transition-colors ${
                      item.active
                        ? 'bg-red-900/40 text-red-400'
                        : 'hover:bg-gray-800/70 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-red-600 text-white text-xs px-2.5 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Messages List + Detail View */}
        <div className="flex-1 flex overflow-hidden">
          {/* Messages List */}
          <div className="w-full md:w-5/12 lg:w-96 border-r border-gray-800 flex flex-col bg-gray-950">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold mb-1">Contact Inbox</h2>
              <p className="text-gray-400 text-sm">
                Manage member inquiries and feedback
              </p>
            </div>

            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <div className="flex gap-3">
                {messageTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-red-900/50 text-red-300 border-b-2 border-red-600'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">↻</button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium flex items-center gap-1.5">
                  <span>✏️</span> New Message
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {sampleMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-5 border-b border-gray-800 cursor-pointer hover:bg-gray-900 transition-colors ${
                    selectedMessage?.id === msg.id ? 'bg-gray-900 border-l-4 border-red-600' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src={msg.avatar} alt={msg.sender} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium">{msg.sender}</div>
                        {msg.membership && (
                          <div className="text-xs text-gray-500">{msg.membership}</div>
                        )}
                      </div>
                    </div>

                    {msg.status && (
                      <span className={`text-xs px-2.5 py-1 rounded-full ${getStatusBadge(msg.status)}`}>
                        {msg.status}
                      </span>
                    )}
                  </div>

                  <div className="font-medium mb-1 truncate">{msg.subject}</div>
                  <div className="text-sm text-gray-400 truncate">{msg.preview}</div>
                  <div className="text-xs text-gray-500 mt-2">{msg.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Detail View */}
          <div className="flex-1 flex flex-col bg-gray-950">
            {selectedMessage ? (
              <>
                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{selectedMessage.subject}</h3>
                    <div className="text-sm text-gray-400 mt-1">
                      From: <span className="text-gray-200">{selectedMessage.sender}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="p-2.5 hover:bg-gray-800 rounded-lg transition-colors">📥</button>
                    <button className="p-2.5 hover:bg-gray-800 rounded-lg transition-colors">🗑</button>
                    <button className="p-2.5 hover:bg-gray-800 rounded-lg transition-colors">📧</button>
                  </div>
                </div>

                <div className="p-6 flex-1 overflow-y-auto">
                  <div className="flex items-start gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={selectedMessage.avatar}
                        alt={selectedMessage.sender}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium">{selectedMessage.sender}</span>
                        <span className="text-gray-500 text-sm">
                          {selectedMessage.email} • {selectedMessage.phone}
                        </span>
                        <span className="text-xs text-gray-500 ml-auto">
                          RECEIVED • {selectedMessage.date}
                        </span>
                      </div>

                      <div className="whitespace-pre-line text-gray-300 leading-relaxed">
                        {selectedMessage.fullMessage}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Reply */}
                <div className="border-t border-gray-800 p-6 bg-gray-900">
                  <div className="mb-4">
                    <textarea
                      placeholder="Type your response here..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 min-h-[120px] focus:outline-none focus:border-red-600 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <button className="text-gray-400 hover:text-white transition-colors">📎</button>
                      <button className="text-gray-400 hover:text-white transition-colors">😊</button>
                    </div>

                    <button className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors flex items-center gap-2">
                      Send Response →
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <h3 className="text-2xl font-medium mb-3">No message selected</h3>
                  <p>Select a conversation from the list to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesInbox;