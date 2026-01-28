import { useState, useEffect } from 'react';
import api from '../../api/api';
import { Calendar, CreditCard, User, Trash2, Edit, Plus, Filter } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [statusFilter, setStatusFilter] = useState('All');
    const { addToast: showToast } = useToast();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        membershipType: 'Basic',
        duration: '1 Month',
        startDate: '',
        amount: '',
        notes: '',
    });

    useEffect(() => {
        fetchBookings();
    }, []);

    useEffect(() => {
        if (statusFilter === 'All') {
            setFilteredBookings(bookings);
        } else {
            setFilteredBookings(bookings.filter(b => b.status === statusFilter));
        }
    }, [statusFilter, bookings]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/bookings');
            setBookings(data);
            setFilteredBookings(data);
        } catch (error) {
            showToast('Error fetching bookings', 'error');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            try {
                await api.delete(`/bookings/${id}`);
                setBookings(bookings.filter(b => b._id !== id));
                showToast('Booking deleted successfully', 'success');
            } catch (error) {
                showToast('Error deleting booking', 'error');
            }
        }
    };

    const handleStatusChange = async (booking, newStatus) => {
        try {
            await api.put(`/bookings/${booking._id}`, {
                status: newStatus,
                paymentStatus: booking.paymentStatus,
                notes: booking.notes
            });
            fetchBookings();
            showToast('Status updated successfully', 'success');
        } catch (error) {
            showToast('Error updating status', 'error');
        }
    };

    const handlePaymentStatusChange = async (booking, newPaymentStatus) => {
        try {
            await api.put(`/bookings/${booking._id}`, {
                status: booking.status,
                paymentStatus: newPaymentStatus,
                notes: booking.notes
            });
            fetchBookings();
            showToast('Payment status updated', 'success');
        } catch (error) {
            showToast('Error updating payment status', 'error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/bookings', formData);
            showToast('Booking created successfully', 'success');
            fetchBookings();
            setIsModalOpen(false);
            resetForm();
        } catch (error) {
            showToast('Error creating booking', 'error');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            membershipType: 'Basic',
            duration: '1 Month',
            startDate: '',
            amount: '',
            notes: '',
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            Pending: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
            Active: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
            Expired: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
            Cancelled: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20',
        };
        return colors[status] || colors.Pending;
    };

    const getPaymentColor = (status) => {
        const colors = {
            Pending: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
            Paid: 'bg-green-500/10 text-green-600 dark:text-green-400',
            Failed: 'bg-red-500/10 text-red-600 dark:text-red-400',
            Refunded: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
        };
        return colors[status] || colors.Pending;
    };

    const stats = {
        total: bookings.length,
        active: bookings.filter(b => b.status === 'Active').length,
        pending: bookings.filter(b => b.status === 'Pending').length,
        revenue: bookings.filter(b => b.paymentStatus === 'Paid').reduce((sum, b) => sum + b.amount, 0),
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
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold font-serif text-luxury-900 dark:text-white">Bookings Management</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Track and manage membership bookings</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gold-500 hover:bg-gold-400 text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105"
                >
                    <Plus className="w-5 h-5" /> New Booking
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card rounded-2xl border border-luxury-200 dark:border-white/5 p-6 bg-white/50 dark:bg-black/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Bookings</p>
                            <p className="text-3xl font-bold text-luxury-900 dark:text-white mt-2">{stats.total}</p>
                        </div>
                        <Calendar className="w-12 h-12 text-gold-500 opacity-50" />
                    </div>
                </div>

                <div className="glass-card rounded-2xl border border-luxury-200 dark:border-white/5 p-6 bg-white/50 dark:bg-black/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.active}</p>
                        </div>
                        <User className="w-12 h-12 text-green-500 opacity-50" />
                    </div>
                </div>

                <div className="glass-card rounded-2xl border border-luxury-200 dark:border-white/5 p-6 bg-white/50 dark:bg-black/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
                            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{stats.pending}</p>
                        </div>
                        <Filter className="w-12 h-12 text-yellow-500 opacity-50" />
                    </div>
                </div>

                <div className="glass-card rounded-2xl border border-luxury-200 dark:border-white/5 p-6 bg-white/50 dark:bg-black/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
                            <p className="text-3xl font-bold text-gold-600 dark:text-gold-400 mt-2">₹{stats.revenue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                        <CreditCard className="w-12 h-12 text-gold-500 opacity-50" />
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
                {['All', 'Pending', 'Active', 'Expired', 'Cancelled'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${statusFilter === status
                            ? 'bg-gold-500 text-black'
                            : 'bg-luxury-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-luxury-200 dark:hover:bg-white/10'
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Bookings Table */}
            <div className="glass-card rounded-2xl overflow-hidden border border-luxury-200 dark:border-white/5 bg-white/50 dark:bg-black/20">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-luxury-100 dark:bg-white/5 text-luxury-600 dark:text-gray-400 uppercase text-xs tracking-wider font-bold">
                            <tr>
                                <th className="p-5 text-left">Member</th>
                                <th className="p-5 text-left">Membership</th>
                                <th className="p-5 text-left">Duration</th>
                                <th className="p-5 text-left">Dates</th>
                                <th className="p-5 text-left">Amount</th>
                                <th className="p-5 text-left">Status</th>
                                <th className="p-5 text-left">Payment</th>
                                <th className="p-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-luxury-200 dark:divide-white/5">
                            {filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="p-12 text-center text-gray-500">
                                        No bookings found
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-luxury-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="p-5">
                                            <div>
                                                <div className="font-bold text-luxury-900 dark:text-white">{booking.name}</div>
                                                <div className="text-sm text-gray-500">{booking.email}</div>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <span className="px-3 py-1 bg-gold-500/10 text-gold-600 dark:text-gold-400 rounded-full text-sm font-medium">
                                                {booking.membershipType}
                                            </span>
                                        </td>
                                        <td className="p-5 text-luxury-900 dark:text-white font-medium">{booking.duration}</td>
                                        <td className="p-5">
                                            <div className="text-sm">
                                                <div className="text-gray-600 dark:text-gray-400">
                                                    {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5 text-luxury-900 dark:text-white font-bold">₹{booking.amount.toLocaleString('en-IN')}</td>
                                        <td className="p-5">
                                            <select
                                                value={booking.status}
                                                onChange={(e) => handleStatusChange(booking, e.target.value)}
                                                className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)} bg-transparent cursor-pointer`}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Active">Active</option>
                                                <option value="Expired">Expired</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="p-5">
                                            <select
                                                value={booking.paymentStatus}
                                                onChange={(e) => handlePaymentStatusChange(booking, e.target.value)}
                                                className={`px-3 py-1 rounded-full text-xs font-bold ${getPaymentColor(booking.paymentStatus)} bg-transparent cursor-pointer`}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Paid">Paid</option>
                                                <option value="Failed">Failed</option>
                                                <option value="Refunded">Refunded</option>
                                            </select>
                                        </td>
                                        <td className="p-5 text-right">
                                            <button
                                                onClick={() => handleDelete(booking._id)}
                                                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Booking Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-luxury-50 dark:bg-luxury-900 w-full max-w-2xl rounded-3xl border border-luxury-200 dark:border-white/10 shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold font-serif text-luxury-900 dark:text-white">Create New Booking</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Full Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-luxury-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-gold-500 outline-none text-luxury-900 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-luxury-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-gold-500 outline-none text-luxury-900 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Phone *</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-luxury-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-gold-500 outline-none text-luxury-900 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Membership Type *</label>
                                    <select
                                        value={formData.membershipType}
                                        onChange={(e) => setFormData({ ...formData, membershipType: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-luxury-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-gold-500 outline-none text-luxury-900 dark:text-white"
                                    >
                                        <option value="Basic">Basic</option>
                                        <option value="Standard">Standard</option>
                                        <option value="Premium">Premium</option>
                                        <option value="Elite">Elite</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Duration *</label>
                                    <select
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-luxury-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-gold-500 outline-none text-luxury-900 dark:text-white"
                                    >
                                        <option value="1 Month">1 Month</option>
                                        <option value="3 Months">3 Months</option>
                                        <option value="6 Months">6 Months</option>
                                        <option value="12 Months">12 Months</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Start Date *</label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-luxury-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-gold-500 outline-none text-luxury-900 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Amount (₹) *</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        step="1"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        className="w-full p-3 rounded-xl border border-luxury-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-gold-500 outline-none text-luxury-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Notes (Optional)</label>
                                <textarea
                                    rows="3"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    className="w-full p-3 rounded-xl border border-luxury-200 dark:border-white/10 bg-white dark:bg-black/20 focus:border-gold-500 outline-none text-luxury-900 dark:text-white"
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-luxury-200 dark:border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 rounded-xl font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-gold-500 hover:bg-gold-400 text-black px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
                                >
                                    Create Booking
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBookings;
