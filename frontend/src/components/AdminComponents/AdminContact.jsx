// src/components/AdminComponents/AdminContact.jsx
import { useState, useEffect } from 'react';
import api from '../../api/api';
import { Mail, Phone, User, Trash2, Calendar } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast: showToast } = useToast();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/contact');
      setContacts(data);
    } catch (error) {
      showToast('Error fetching contacts', 'error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact submission?')) {
      try {
        await api.delete(`/contact/${id}`);
        setContacts(contacts.filter(c => c._id !== id));
        setSelectedContact(null);
        showToast('Contact deleted successfully', 'success');
      } catch (error) {
        showToast('Error deleting contact', 'error');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-serif text-luxury-900 dark:text-white">Contact Queries</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">View and manage customer inquiries</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact List */}
        <div className="lg:col-span-1 space-y-3">
          <div className="glass-card rounded-2xl border border-luxury-200 dark:border-white/5 p-4 bg-white/50 dark:bg-black/20">
            <h3 className="font-bold text-lg mb-4">All Messages ({contacts.length})</h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {contacts.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No contact submissions yet</p>
              ) : (
                contacts.map((contact) => (
                  <button
                    key={contact._id}
                    onClick={() => setSelectedContact(contact)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${selectedContact?._id === contact._id
                      ? 'bg-gold-500/20 border-l-4 border-gold-500'
                      : 'hover:bg-luxury-100 dark:hover:bg-white/5 border-l-4 border-transparent'
                      }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-luxury-900 dark:text-white">{contact.name}</h4>
                      <span className="text-xs text-gray-500">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{contact.email}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 truncate mt-1">
                      {contact.message.substring(0, 50)}...
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="lg:col-span-2">
          {selectedContact ? (
            <div className="glass-card rounded-2xl border border-luxury-200 dark:border-white/5 p-6 bg-white/50 dark:bg-black/20">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-luxury-900 dark:text-white mb-2">
                    {selectedContact.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedContact.createdAt).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(selectedContact._id)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-luxury-100 dark:bg-white/5 rounded-lg">
                  <Mail className="w-5 h-5 text-gold-500" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium text-luxury-900 dark:text-white">{selectedContact.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-luxury-100 dark:bg-white/5 rounded-lg">
                  <Phone className="w-5 h-5 text-gold-500" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Mobile</p>
                    <p className="font-medium text-luxury-900 dark:text-white">{selectedContact.mobile}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-luxury-200 dark:border-white/5 pt-6">
                <h4 className="font-bold text-luxury-900 dark:text-white mb-3">Message</h4>
                <div className="bg-luxury-50 dark:bg-black/40 p-4 rounded-lg">
                  <p className="text-luxury-900 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="flex-1 bg-gold-500 hover:bg-gold-400 text-black px-6 py-3 rounded-xl font-bold text-center transition-all"
                >
                  Reply via Email
                </a>
                <a
                  href={`tel:${selectedContact.mobile}`}
                  className="flex-1 bg-luxury-200 dark:bg-white/10 hover:bg-luxury-300 dark:hover:bg-white/20 text-luxury-900 dark:text-white px-6 py-3 rounded-xl font-bold text-center transition-all"
                >
                  Call Now
                </a>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-2xl border border-luxury-200 dark:border-white/5 p-12 bg-white/50 dark:bg-black/20 text-center">
              <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400">No message selected</h3>
              <p className="text-gray-500 dark:text-gray-500 mt-2">
                Select a contact from the list to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContact;