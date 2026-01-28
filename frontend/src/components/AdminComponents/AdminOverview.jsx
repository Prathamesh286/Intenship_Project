import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Users, Calendar, Mail, CreditCard, TrendingUp, Activity, UserPlus, CheckCircle } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const AdminOverview = () => {
    const navigate = useNavigate();
    const { addToast: showToast } = useToast();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalBookings: 0,
        activeBookings: 0,
        totalContacts: 0,
        totalRevenue: 0,
        newUsersThisMonth: 0,
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [recentContacts, setRecentContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // Fetch all data in parallel
            const [usersRes, bookingsRes, contactsRes] = await Promise.all([
                api.get('/admin/users'),
                api.get('/bookings'),
                api.get('/contact'),
            ]);

            const users = usersRes.data;
            const bookings = bookingsRes.data;
            const contacts = contactsRes.data;

            // Calculate stats
            const now = new Date();
            const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

            const newUsersThisMonth = users.filter(
                user => new Date(user.createdAt) >= firstDayOfMonth
            ).length;

            const activeBookings = bookings.filter(b => b.status === 'Active').length;
            const totalRevenue = bookings
                .filter(b => b.paymentStatus === 'Paid')
                .reduce((sum, b) => sum + b.amount, 0);

            setStats({
                totalUsers: users.length,
                totalBookings: bookings.length,
                activeBookings,
                totalContacts: contacts.length,
                totalRevenue,
                newUsersThisMonth,
            });

            // Get recent bookings (last 5)
            setRecentBookings(bookings.slice(0, 5));

            // Get recent contacts (last 5)
            setRecentContacts(contacts.slice(0, 5));

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            showToast('Error loading dashboard data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            Pending: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
            Active: 'bg-green-500/10 text-green-600 dark:text-green-400',
            Expired: 'bg-red-500/10 text-red-600 dark:text-red-400',
            Cancelled: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
        };
        return colors[status] || colors.Pending;
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
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold font-serif text-luxury-900 dark:text-white">Dashboard Overview</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Welcome to the admin panel</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Users */}
                <div className="glass-card rounded-2xl border border-luxury-200 dark:border-white/5 p-6 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-black/20 hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => navigate('/admin/users')}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Users</p>
                            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.totalUsers}</p>
                            <p className="text-xs text-gray-400 mt-1">+{stats.newUsersThisMonth} this month</p>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center">
                            <Users className="w-7 h-7 text-blue-500" />
                        </div>
                    </div>
                </div>

                {/* Total Bookings */}
                <div className="glass-card rounded-2xl border border-luxury-200 dark:border-white/5 p-6 bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-black/20 hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => navigate('/admin/bookings')}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Bookings</p>
                            <p className="text-4xl font-bold text-purple-600 dark:text-purple-400 mt-2">{stats.totalBookings}</p>
                            <p className="text-xs text-gray-400 mt-1">{stats.activeBookings} active</p>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center">
                            <Calendar className="w-7 h-7 text-purple-500" />
                        </div>
                    </div>
                </div>

                {/* Total Revenue */}
                <div className="glass-card rounded-2xl border border-luxury-200 dark:border-white/5 p-6 bg-gradient-to-br from-gold-50 to-white dark:from-gold-900/20 dark:to-black/20 hover:scale-105 transition-transform">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Revenue</p>
                            <p className="text-4xl font-bold text-gold-600 dark:text-gold-400 mt-2">
                                ₹{stats.totalRevenue.toLocaleString('en-IN')}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">From paid bookings</p>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-gold-500/10 flex items-center justify-center">
                            <CreditCard className="w-7 h-7 text-gold-500" />
                        </div>
                    </div>
                </div>

                {/* Pending Contacts */}
                <div className="glass-card rounded-2xl border border-luxury-200 dark:border-white/5 p-6 bg-gradient-to-br from-orange-50 to-white dark:from-orange-900/20 dark:to-black/20 hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => navigate('/admin/contacts')}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Contact Queries</p>
                            <p className="text-4xl font-bold text-orange-600 dark:text-orange-400 mt-2">{stats.totalContacts}</p>
                            <p className="text-xs text-gray-400 mt-1">Pending responses</p>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center">
                            <Mail className="w-7 h-7 text-orange-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button
                    onClick={() => navigate('/admin/users')}
                    className="glass-card rounded-xl border border-luxury-200 dark:border-white/5 p-4 bg-white/50 dark:bg-black/20 hover:bg-luxury-50 dark:hover:bg-white/5 transition-all flex items-center gap-3"
                >
                    <UserPlus className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium text-luxury-900 dark:text-white">Manage Users</span>
                </button>

                <button
                    onClick={() => navigate('/admin/bookings')}
                    className="glass-card rounded-xl border border-luxury-200 dark:border-white/5 p-4 bg-white/50 dark:bg-black/20 hover:bg-luxury-50 dark:hover:bg-white/5 transition-all flex items-center gap-3"
                >
                    <Calendar className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-medium text-luxury-900 dark:text-white">View Bookings</span>
                </button>

                <button
                    onClick={() => navigate('/admin/contacts')}
                    className="glass-card rounded-xl border border-luxury-200 dark:border-white/5 p-4 bg-white/50 dark:bg-black/20 hover:bg-luxury-50 dark:hover:bg-white/5 transition-all flex items-center gap-3"
                >
                    <Mail className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-medium text-luxury-900 dark:text-white">Check Messages</span>
                </button>

                <button
                    onClick={() => navigate('/admin/settings')}
                    className="glass-card rounded-xl border border-luxury-200 dark:border-white/5 p-4 bg-white/50 dark:bg-black/20 hover:bg-luxury-50 dark:hover:bg-white/5 transition-all flex items-center gap-3"
                >
                    <Activity className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-luxury-900 dark:text-white">Settings</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <div className="glass-card rounded-2xl border border-luxury-200 dark:border-white/5 bg-white/50 dark:bg-black/20 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-luxury-900 dark:text-white">Recent Bookings</h3>
                        <button
                            onClick={() => navigate('/admin/bookings')}
                            className="text-sm text-gold-600 dark:text-gold-400 hover:underline font-medium"
                        >
                            View All
                        </button>
                    </div>

                    <div className="space-y-3">
                        {recentBookings.length === 0 ? (
                            <p className="text-gray-500 text-sm text-center py-6">No bookings yet</p>
                        ) : (
                            recentBookings.map((booking) => (
                                <div
                                    key={booking._id}
                                    className="flex items-center justify-between p-3 rounded-xl bg-luxury-50 dark:bg-white/5 hover:bg-luxury-100 dark:hover:bg-white/10 transition-colors"
                                >
                                    <div className="flex-1">
                                        <p className="font-medium text-luxury-900 dark:text-white text-sm">{booking.name}</p>
                                        <p className="text-xs text-gray-500">{booking.membershipType} - {booking.duration}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-luxury-900 dark:text-white text-sm">₹{booking.amount.toLocaleString('en-IN')}</p>
                                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Recent Contacts */}
                <div className="glass-card rounded-2xl border border-luxury-200 dark:border-white/5 bg-white/50 dark:bg-black/20 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-luxury-900 dark:text-white">Recent Contact Queries</h3>
                        <button
                            onClick={() => navigate('/admin/contacts')}
                            className="text-sm text-gold-600 dark:text-gold-400 hover:underline font-medium"
                        >
                            View All
                        </button>
                    </div>

                    <div className="space-y-3">
                        {recentContacts.length === 0 ? (
                            <p className="text-gray-500 text-sm text-center py-6">No contact queries</p>
                        ) : (
                            recentContacts.map((contact) => (
                                <div
                                    key={contact._id}
                                    className="flex items-start gap-3 p-3 rounded-xl bg-luxury-50 dark:bg-white/5 hover:bg-luxury-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                                    onClick={() => navigate('/admin/contacts')}
                                >
                                    <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-orange-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-luxury-900 dark:text-white text-sm">{contact.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{contact.message}</p>
                                        <p className="text-xs text-gray-400 mt-1">{new Date(contact.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Activity Summary */}
            <div className="glass-card rounded-2xl border border-luxury-200 dark:border-white/5 bg-gradient-to-r from-gold-50 to-luxury-50 dark:from-gold-900/10 dark:to-black/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-gold-600 dark:text-gold-400" />
                    <h3 className="text-lg font-bold text-luxury-900 dark:text-white">Quick Stats</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-black/20">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.activeBookings}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Active Members</p>
                    </div>

                    <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-black/20">
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.newUsersThisMonth}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">New This Month</p>
                    </div>

                    <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-black/20">
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.totalContacts}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pending Queries</p>
                    </div>

                    <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-black/20">
                        <p className="text-2xl font-bold text-gold-600 dark:text-gold-400">
                            {stats.totalBookings > 0 ? ((stats.activeBookings / stats.totalBookings) * 100).toFixed(0) : 0}%
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Active Rate</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
