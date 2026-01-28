import { useState, useEffect } from 'react';
import api from '../../api/api';
import { Search, Trash2, Mail, User, Shield, ShieldAlert, Ban, CheckCircle } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [uploading, setUploading] = useState(false);
    const { addToast: showToast } = useToast();

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
        profilePicture: ''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/users');
            setUsers(data);
        } catch (error) {
            showToast('Error fetching users', 'error');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                await api.delete(`/users/${id}`);
                setUsers(users.filter(u => u._id !== id));
                showToast('User deleted successfully', 'success');
            } catch (error) {
                showToast(error.response?.data?.message || 'Error deleting user', 'error');
            }
        }
    };

    const handleBanToggle = async (user) => {
        const action = user.isBanned ? 'unban' : 'ban';
        const reason = !user.isBanned ? prompt('Enter ban reason (optional):') : null;
        
        if (user.isBanned || window.confirm(`Are you sure you want to ban ${user.name}?`)) {
            try {
                await api.put(`/users/${user._id}/${action}`, { reason });
                await fetchUsers(); // Refresh list
                showToast(`User ${action}ned successfully`, 'success');
            } catch (error) {
                showToast(error.response?.data?.message || `Error ${action}ning user`, 'error');
            }
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        setEditMode(false);
        setSelectedUser(null);
        setFormData({ name: '', email: '', password: '', role: 'user', profilePicture: '' });
        setIsModalOpen(true);
    };

    const handleEdit = (user) => {
        setEditMode(true);
        setSelectedUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            password: '', // Don't fill password
            role: user.role || 'user',
            profilePicture: user.profilePicture || ''
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { ...formData };
            if (!userData.password && editMode) delete userData.password; // Don't send empty pass on edit

            if (editMode) {
                // Assuming backend supports PUT /auth/users/:id or similar
                // If not, we might need a specific admin update route. 
                // Standard convention: PUT /auth/users/:id or PUT /users/:id
                // Let's try /auth/users/:id based on fetchUsers path
                await api.put(`/users/${selectedUser._id}`, userData);
                showToast('User updated successfully', 'success');
            } else {
                await api.post('/users', userData); // Or admin specific create route
                showToast('User created successfully', 'success');
            }
            fetchUsers();
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
            showToast(editMode ? 'Error updating user' : 'Error creating user', 'error');
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadFormData = new FormData();
        uploadFormData.append('folder', 'users');
        uploadFormData.append('image', file);

        setUploading(true);
        try {
            const { data } = await api.post('/upload?folder=users', uploadFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFormData(prev => ({ ...prev, profilePicture: data }));
            showToast('Profile picture uploaded', 'success');
        } catch (error) {
            console.error(error);
            showToast('Error uploading image', 'error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-serif text-luxury-900 dark:text-white">User Management</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">View and manage registered users</p>
                </div>
                <div className="flex gap-3">
                    <div className="glass-card px-4 py-2 rounded-xl border border-luxury-200 dark:border-white/5 flex items-center gap-3 w-full md:w-auto">
                        <Search className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent outline-none text-luxury-900 dark:text-white placeholder-gray-400 w-full"
                        />
                    </div>
                    <button
                        onClick={handleAdd}
                        className="bg-gold-500 hover:bg-gold-400 text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-gold-500/20 transition-all hover:scale-105"
                    >
                        <User className="w-5 h-5" /> Add User
                    </button>
                </div>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden border border-luxury-200 dark:border-white/5 bg-white/50 dark:bg-black/20">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-luxury-100 dark:bg-white/5 text-luxury-600 dark:text-gray-400 uppercase text-xs tracking-wider font-bold">
                            <tr>
                                <th className="p-5">User</th>
                                <th className="p-5">Role</th>
                                <th className="p-5">Joined Date</th>
                                <th className="p-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-luxury-200 dark:divide-white/5">
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-luxury-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="p-5">
                                        <div className="flex items-center gap-4">
                                            {user.profilePicture ? (
                                                <img
                                                    src={user.profilePicture}
                                                    alt={user.name}
                                                    className="w-10 h-10 rounded-full object-cover shadow-lg shadow-gold-500/20"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-bold shadow-lg shadow-gold-500/20">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-bold text-luxury-900 dark:text-white flex items-center gap-2">
                                                    {user.name}
                                                    {user.role === 'admin' && <Shield className="w-3 h-3 text-gold-500" fill="currentColor" />}
                                                    {user.isBanned && (
                                                        <span className="px-2 py-0.5 bg-red-500/10 text-red-600 dark:text-red-400 text-xs rounded-full border border-red-500/20 flex items-center gap-1">
                                                            <Ban className="w-3 h-3" /> Banned
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Mail className="w-3 h-3" /> {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${user.role === 'admin'
                                            ? 'bg-gold-500/10 text-gold-600 dark:text-gold-400 border-gold-500/20'
                                            : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                                            }`}>
                                            {user.role === 'admin' ? 'Admin' : 'Customer'}
                                        </span>
                                    </td>
                                    <td className="p-5 text-sm text-gray-600 dark:text-gray-400">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-5 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all"
                                                title="Edit User"
                                            >
                                                <User className="w-5 h-5" />
                                            </button>
                                            {user.role !== 'admin' && (
                                                <>
                                                    <button
                                                        onClick={() => handleBanToggle(user)}
                                                        className={`p-2 rounded-lg transition-all ${
                                                            user.isBanned 
                                                                ? 'text-gray-400 hover:text-green-500 hover:bg-green-500/10' 
                                                                : 'text-gray-400 hover:text-orange-500 hover:bg-orange-500/10'
                                                        }`}
                                                        title={user.isBanned ? 'Unban User' : 'Ban User'}
                                                    >
                                                        {user.isBanned ? <CheckCircle className="w-5 h-5" /> : <Ban className="w-5 h-5" />}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user._id)}
                                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Modal */}
            {
                isModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                        <div className="bg-luxury-50 dark:bg-luxury-900 w-full max-w-md rounded-3xl border border-luxury-200 dark:border-white/10 shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold font-serif text-luxury-900 dark:text-white flex items-center gap-2">
                                    <User className="w-5 h-5 text-gold-500" /> {editMode ? 'Edit User' : 'Add New User'}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500 dark:text-gray-400">
                                    <Search className="w-5 h-5 rotate-45" /> {/* Use X icon normally, reusing Search rotate 45 for X effect or import X */}
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Profile Picture Upload */}
                                <div className="flex justify-center mb-6">
                                    <div className="relative group w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-gold-500 transition-colors">
                                        {formData.profilePicture ? (
                                            <img src={formData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                                                <User className="w-8 h-8 text-gray-400" />
                                            </div>
                                        )}
                                        <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <span className="text-white text-xs font-bold">{uploading ? '...' : 'Upload'}</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-luxury-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-gold-500 outline-none transition-colors text-luxury-900 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-luxury-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-gold-500 outline-none transition-colors text-luxury-900 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
                                        {editMode ? 'New Password (leave blank to keep)' : 'Password'}
                                    </label>
                                    <input
                                        type="password"
                                        required={!editMode}
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-luxury-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-gold-500 outline-none transition-colors text-luxury-900 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Role</label>
                                    <select
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-luxury-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-gold-500 outline-none transition-colors text-luxury-900 dark:text-white"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                <div className="pt-4 flex justify-end gap-3 border-t border-luxury-200 dark:border-white/10 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 rounded-xl font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-gold-500 hover:bg-gold-400 text-black px-6 py-2 rounded-xl font-bold shadow-lg shadow-gold-500/20 transition-all hover:scale-105"
                                    >
                                        {editMode ? 'Save Changes' : 'Create User'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default AdminUsers;
