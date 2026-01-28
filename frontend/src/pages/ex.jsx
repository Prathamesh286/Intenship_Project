import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import SeatGrid from '../components/SeatGrid';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import CheckoutForm from '../components/CheckoutForm';
import { Clock, Film, Monitor, Armchair, ChevronDown, ChevronLeft, ChevronRight, Gem, Layers, Glasses, Baby, Award } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const BookingPage = () => {
    const { showtimeId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToast } = useToast();
    const [showtime, setShowtime] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [snacks, setSnacks] = useState({});
    const [allShowtimes, setAllShowtimes] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('STRIPE');
    const [clientSecret, setClientSecret] = useState('');
    const showtimeScrollRef = useRef(null);

    // NEW: Loyalty Points Redemption State
    const [redeemPoints, setRedeemPoints] = useState(0);

    const scrollShowtimes = (direction) => {
        if (showtimeScrollRef.current) {
            const { current } = showtimeScrollRef;
            if (direction === 'left') {
                current.scrollBy({ left: -200, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: 200, behavior: 'smooth' });
            }
        }
    };

    const SNACK_ITEMS = [
        { id: 'popcorn', name: 'Popcorn', price: 8, icon: '🍿' },
        { id: 'soda', name: 'Soda', price: 4, icon: '🥤' },
        { id: 'nachos', name: 'Nachos', price: 6, icon: '🧀' },
    ];

    // Calculate snack list for payment
    const snackList = Object.entries(snacks)
        .filter(([_, qty]) => qty > 0)
        .map(([id, qty]) => {
            const item = SNACK_ITEMS.find(s => s.id === id);
            return { name: item.name, price: item.price, quantity: qty };
        });

    // NEW: Calculate total with loyalty discount
    const calculateTotal = () => {
        if (!showtime) return 0;

        const snackTotal = snackList.reduce((acc, s) => acc + (s.price * s.quantity), 0);

        const ticketTotal = selectedSeats.reduce((acc, s) => {
            const seatData = showtime.seats[s.row][s.col];
            let price = showtime.price;
            const type = seatData.type ? seatData.type.toLowerCase() : '';
            if (type === 'vip') price += 3;
            if (type === 'balcony') price += 1;
            return acc + price;
        }, 0);

        const baseTotal = ticketTotal + snackTotal;

        // Apply loyalty discount: 1 point = $0.10
        const discount = redeemPoints * 0.1;
        const finalPrice = Math.max(0, baseTotal - discount);

        return { baseTotal, discount, finalPrice };
    };

    const { baseTotal, discount, finalPrice } = calculateTotal();

    // Max redeemable points (cannot exceed available points or base total / 0.1)
    const maxRedeemable = Math.min(
        Math.floor(user?.loyaltyPoints || 0),
        Math.floor(baseTotal / 0.1)
    );

    useEffect(() => {
        // Reset redemption when selections change
        setRedeemPoints(0);
    }, [selectedSeats, snacks]);

    useEffect(() => {
        if (paymentMethod === 'STRIPE' && finalPrice > 0) {
            api.post('/payments/create-payment-intent', { amount: finalPrice, currency: 'usd' })
                .then(res => setClientSecret(res.data.clientSecret))
                .catch(err => console.error('Failed to init payment', err));
        }
    }, [paymentMethod, finalPrice, showtime]);

    useEffect(() => {
        setSelectedSeats([]);
        const fetchShowtime = async () => {
            try {
                const { data } = await api.get(`/showtimes/${showtimeId}`);
                setShowtime(data);

                if (data.movie) {
                    const movieId = data.movie._id || data.movie;
                    const allRes = await api.get(`/showtimes/movie/${movieId}`);
                    setAllShowtimes(allRes.data);
                }
            } catch (error) {
                console.error('Failed to fetch showtime', error);
            } finally {
                setLoading(false);
            }
        };
        fetchShowtime();
    }, [showtimeId]);

    const handleSeatSelect = (row, col, isSelected) => {
        if (isSelected) {
            setSelectedSeats((prev) => [...prev, { row, col }]);
        } else {
            setSelectedSeats((prev) => prev.filter((s) => s.row !== row || s.col !== col));
        }
    };

    const updateSnack = (id, delta) => {
        setSnacks(prev => {
            const current = prev[id] || 0;
            const updated = Math.max(0, current + delta);
            return { ...prev, [id]: updated };
        });
    };

    const handleBooking = async (paymentResult = {}) => {
        if (selectedSeats.length === 0) {
            addToast('Please select at least one seat', 'error');
            return;
        }

        setProcessing(true);

        try {
            await api.post('/bookings', {
                showtimeId,
                seats: selectedSeats,
                snacks: snackList,
                totalPrice: finalPrice,
                redeemPoints, // NEW: Send redeemed points to backend
                paymentResult: {
                    ...paymentResult,
                    provider: paymentMethod
                },
            });

            addToast('Booking Successful!', 'success');
            navigate('/profile');
        } catch (error) {
            addToast(`Booking Failed: ${error.response?.data?.message || error.message}`, 'error');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return <div className="text-center py-20 text-2xl">Loading showtime...</div>;
    if (!showtime) return <div className="text-center py-20 text-2xl">Showtime not found</div>;

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img src={showtime.movie.poster} alt="" className="w-full h-full object-cover opacity-10 blur-3xl scale-110" />
                <div className="absolute inset-0 bg-gradient-to-b from-luxury-50/80 to-luxury-50 dark:from-luxury-950/80 dark:to-luxury-950" />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-12 mx-auto">
                    <div className="w-40 md:w-56 aspect-[2/3] flex-shrink-0 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 relative group">
                        <img src={showtime.movie.poster} alt={showtime.movie.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-4 min-w-0 w-full">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-500 text-xs font-bold tracking-widest uppercase">
                            <Gem className="w-3 h-3" />
                            <span>Ticket Reservation</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-luxury-900 dark:text-white neon-text leading-tight truncate">{showtime.movie.title}</h1>

                        {/* Hall/Time Carousel */}
                        <div className="relative group/carousel mt-8 pt-8 border-t border-luxury-200 dark:border-white/10 w-full">
                            <p className="text-sm text-luxury-500 dark:text-gold-100/50 mb-3 font-medium">Select Experience</p>

                            <div className="absolute top-3/4 -translate-y-1/2 left-0 right-0 pointer-events-none flex justify-between z-10 px-0 md:-mx-4">
                                <button onClick={() => scrollShowtimes('left')} className="pointer-events-auto p-3 hover:bg-gold-500/10 text-luxury-400 hover:text-gold-500 rounded-full transition-all bg-white/50 dark:bg-black/20 backdrop-blur-sm md:bg-transparent">
                                    <ChevronLeft className="w-8 h-8" />
                                </button>
                                <button onClick={() => scrollShowtimes('right')} className="pointer-events-auto p-3 hover:bg-gold-500/10 text-luxury-400 hover:text-gold-500 rounded-full transition-all bg-white/50 dark:bg-black/20 backdrop-blur-sm md:bg-transparent">
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            </div>

                            <div ref={showtimeScrollRef} className="flex items-center gap-4 overflow-x-auto py-2 px-1 no-scrollbar snap-x scrollbar-hide scroll-smooth mask-linear-fade relative z-0">
                                {allShowtimes.map((st) => {
                                    let HallIcon = Film;
                                    if (st.hallType === 'vip') HallIcon = Gem;
                                    else if (st.hallType === 'imax') HallIcon = Monitor;
                                    else if (st.hallType === '3d') HallIcon = Glasses;
                                    else if (st.hallType === 'kids') HallIcon = Baby;

                                    return (
                                        <button
                                            key={st._id}
                                            onClick={() => {
                                                if (st._id !== showtimeId) {
                                                    navigate(`/booking/${st._id}`);
                                                }
                                            }}
                                            className={`flex flex-col items-center justify-center min-w-[120px] p-3 rounded-xl border transition-all duration-300 snap-center shrink-0 ${st._id === showtimeId
                                                ? 'bg-gold-500 text-white border-gold-500 shadow-lg scale-105'
                                                : 'bg-white/50 dark:bg-luxury-800/50 text-luxury-600 dark:text-gold-100/60 border-luxury-200 dark:border-white/10 hover:border-gold-500/50 hover:bg-white/80 dark:hover:bg-luxury-700/80'
                                                }`}
                                        >
                                            <HallIcon className={`w-5 h-5 mb-1 ${st._id === showtimeId ? 'text-white' : 'text-gold-500'}`} />
                                            <span className="font-bold text-sm">
                                                {new Date(st.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            <span className="text-[10px] opacity-80 uppercase tracking-wider mt-1">
                                                {st.hallType === 'vip' ? 'Gold Class' : st.hallType}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Seat Grid */}
                        <div className="glass-card p-6 rounded-2xl relative">
                            <div className="text-xs text-luxury-400 dark:text-white/50 font-mono flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></div>
                                Live
                            </div>

                            <div className="flex justify-center overflow-x-auto custom-scrollbar">
                                <SeatGrid
                                    key={showtimeId}
                                    showtimeId={showtimeId}
                                    seats={showtime.seats}
                                    onSeatSelect={handleSeatSelect}
                                    selectedSeats={selectedSeats}
                                />
                            </div>
                        </div>

                        {/* Snacks */}
                        <div className="glass-card p-6 rounded-2xl">
                            <h3 className="text-xl font-bold text-luxury-900 dark:text-white mb-6 border-b border-luxury-200 dark:border-white/10 pb-4 font-serif flex items-center gap-2">
                                <span>🍿</span> Add Snacks
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {SNACK_ITEMS.map(item => (
                                    <div key={item.id} className="bg-white/50 dark:bg-luxury-900/40 p-4 rounded-xl flex flex-col items-center gap-3 border border-luxury-200 dark:border-white/5 hover:border-gold-500/30 transition-colors group">
                                        <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                        <div className="text-center">
                                            <p className="font-bold text-luxury-900 dark:text-white">{item.name}</p>
                                            <p className="text-gold-600 dark:text-gold-400 font-bold">${item.price}</p>
                                        </div>
                                        <div className="flex items-center gap-3 bg-white dark:bg-luxury-800 rounded-lg p-1 shadow-sm">
                                            <button onClick={() => updateSnack(item.id, -1)} className="w-8 h-8 flex items-center justify-center rounded bg-luxury-100 dark:bg-luxury-700 hover:bg-gold-500 hover:text-white text-luxury-900 dark:text-white transition-colors font-bold">-</button>
                                            <span className="w-4 text-center font-bold text-luxury-900 dark:text-white">{snacks[item.id] || 0}</span>
                                            <button onClick={() => updateSnack(item.id, 1)} className="w-8 h-8 flex items-center justify-center rounded bg-luxury-100 dark:bg-luxury-700 hover:bg-gold-500 hover:text-white text-luxury-900 dark:text-white transition-colors font-bold">+</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        {/* Ticket Summary */}
                        <div className="relative bg-white dark:bg-luxury-800 rounded-3xl overflow-hidden shadow-2xl filter drop-shadow-xl transform transition-transform hover:scale-[1.02] duration-300">
                            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-luxury-50 dark:bg-luxury-950 rounded-full z-10" />
                            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-luxury-50 dark:bg-luxury-950 rounded-full z-10" />

                            <div className="p-8 pb-10 bg-white dark:bg-luxury-800 border-b-2 border-dashed border-luxury-200 dark:border-white/10 relative">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-luxury-900 dark:text-white font-serif tracking-tight">Your Ticket</h3>
                                    <div className="text-red-500 font-bold text-sm bg-red-50 px-2 py-1 rounded animate-pulse flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <CountdownTimer initialMinute={5} onTimerEnd={() => {
                                            addToast('Reservation timed out!', 'error');
                                            navigate('/');
                                        }} />
                                    </div>
                                </div>

                                {/* Movie Info */}
                                <div className="flex gap-4 mb-6 pb-6 border-b border-luxury-100 dark:border-white/5">
                                    <div className="w-16 h-24 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                                        <img src={showtime.movie.poster} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-luxury-900 dark:text-white leading-tight mb-1">{showtime.movie.title}</h4>
                                        <div className="text-xs text-luxury-500 dark:text-gold-100/60 space-y-1">
                                            <p>{new Date(showtime.startTime).toLocaleDateString()}</p>
                                            <p>{new Date(showtime.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {showtime.hallType.toUpperCase()}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between text-luxury-600 dark:text-gold-100/60">
                                        <span>Seats</span>
                                        <span className="font-bold text-luxury-900 dark:text-white text-base">
                                            {selectedSeats.length > 0 ? selectedSeats.map(s => `${String.fromCharCode(65 + s.row)}${s.col + 1}`).join(', ') : '-'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-luxury-600 dark:text-gold-100/60">
                                        <span>Snacks</span>
                                        <span className="font-bold text-luxury-900 dark:text-white">
                                            ${snackList.reduce((acc, s) => acc + s.price * s.quantity, 0).toFixed(2)}
                                        </span>
                                    </div>

                                    {/* NEW: Loyalty Points Redemption Section */}
                                    {user && (
                                        <div className="glass-card p-4 mt-6 border border-gold-500/20 bg-gold-500/5">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Award className="w-5 h-5 text-gold-600" />
                                                <h4 className="font-bold text-gold-600">Redeem Loyalty Points</h4>
                                            </div>
                                            <p className="text-sm text-luxury-600 dark:text-gold-100/80 mb-3">
                                                Available: <strong>{user.loyaltyPoints || 0}</strong> points (1 point = $0.10)
                                            </p>
                                            <input
                                                type="number"
                                                min="0"
                                                max={maxRedeemable}
                                                value={redeemPoints}
                                                onChange={(e) => setRedeemPoints(Math.min(Number(e.target.value) || 0, maxRedeemable))}
                                                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-luxury-900 border border-gold-500/30 focus:border-gold-500 outline-none text-luxury-900 dark:text-white"
                                                placeholder="Enter points to redeem"
                                            />
                                            <div className="mt-3 space-y-1">
                                                <p className="text-sm font-medium text-green-600">Discount: -${discount.toFixed(2)}</p>
                                                <p className="text-xl font-bold text-gold-600">Final Amount: ${finalPrice.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    )}


                                    
                                </div>
                            </div>

                            {/* Payment Section */}
                            <div className="p-8 pt-10 bg-luxury-50 dark:bg-luxury-900/50">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-luxury-500 dark:text-white/40 font-bold uppercase tracking-widest text-xs">Total Amount</span>
                                    <span className="text-3xl font-bold text-gold-600 dark:text-gold-400 font-serif leading-none">
                                        ${finalPrice.toFixed(2)}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex gap-2 p-1 bg-white dark:bg-black/20 rounded-xl border border-luxury-200 dark:border-white/5">
                                        <button onClick={() => setPaymentMethod('STRIPE')} className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${paymentMethod === 'STRIPE' ? 'bg-gold-500 text-white shadow-md' : 'text-luxury-400 hover:text-luxury-600 dark:text-white/30'}`}>
                                            Card
                                        </button>
                                        <button onClick={() => setPaymentMethod('PAYPAL')} className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${paymentMethod === 'PAYPAL' ? 'bg-blue-600 text-white shadow-md' : 'text-luxury-400 hover:text-luxury-600 dark:text-white/30'}`}>
                                            PayPal
                                        </button>
                                    </div>

                                    {paymentMethod === 'STRIPE' && clientSecret && finalPrice > 0 && (
                                        <div className="mt-4">
                                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                                <CheckoutForm
                                                    totalPrice={finalPrice}
                                                    selectedSeats={selectedSeats}
                                                    snacks={snackList}
                                                    showtimeId={showtimeId}
                                                    redeemPoints={redeemPoints}
                                                    onSuccess={handleBooking}
                                                />
                                            </Elements>
                                        </div>
                                    )}

                                    {paymentMethod === 'PAYPAL' && finalPrice > 0 && (
                                        <div className="mt-4">
                                            <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test" }}>
                                                <PayPalButtons
                                                    style={{ layout: "horizontal", height: 40, tagline: false }}
                                                    createOrder={(data, actions) => {
                                                        return actions.order.create({
                                                            purchase_units: [{
                                                                amount: { value: finalPrice.toFixed(2) }
                                                            }]
                                                        });
                                                    }}
                                                    onApprove={(data, actions) => {
                                                        return actions.order.capture().then((details) => {
                                                            handleBooking({
                                                                id: details.id,
                                                                status: details.status,
                                                                email_address: details.payer.email_address,
                                                                provider: 'PAYPAL'
                                                            });
                                                        });
                                                    }}
                                                />
                                            </PayPalScriptProvider>
                                        </div>
                                    )}
                                </div>

                                {/* Barcode */}
                                <div className="mt-8 flex justify-between items-end opacity-30 grayscale pointer-events-none select-none">
                                    <div className="h-8 flex gap-1">
                                        {[...Array(20)].map((_, i) => (
                                            <div key={i} className={`w-${Math.random() > 0.5 ? '1' : '2'} bg-black dark:bg-white h-full`} />
                                        ))}
                                    </div>
                                    <div className="font-mono text-[10px] tracking-widest text-black dark:text-white">
                                        CINEMANIA-TKT-2026
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Group Booking Card */}
                        <div className="glass-card p-6 rounded-2xl border border-gold-500/20 bg-gradient-to-br from-gold-500/5 to-transparent relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                            <h4 className="font-bold text-gold-600 dark:text-gold-400 mb-2 font-serif flex items-center gap-2">
                                <Layers className="w-4 h-4" />
                                Book with Friends
                            </h4>
                            <p className="text-xs text-luxury-500 dark:text-gold-100/50 mb-4 leading-relaxed">
                                Share this session ID with friends to see their seat selections in real-time.
                            </p>
                            <div className="space-y-3">
                                <button
                                    onClick={() => {
                                        const sessionId = Math.random().toString(36).substring(7);
                                        addToast(`Session Created: ${sessionId}`, 'success');
                                    }}
                                    className="w-full py-2 bg-luxury-100 dark:bg-luxury-800 hover:bg-gold-500 hover:text-white rounded-lg text-sm border border-luxury-300 dark:border-white/5 transition-all font-medium"
                                >
                                    Create Session
                                </button>
                                <div className="flex gap-2">
                                    <input placeholder="Enter Session ID" className="flex-1 bg-white/50 dark:bg-luxury-900/50 border border-luxury-200 dark:border-white/10 rounded-lg px-3 text-sm focus:border-gold-500 outline-none text-luxury-900 dark:text-white placeholder:text-luxury-300" />
                                    <button className="px-4 bg-luxury-800 dark:bg-luxury-700 hover:bg-luxury-700 dark:hover:bg-luxury-600 rounded-lg text-sm font-bold text-white border border-white/10">Join</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CountdownTimer = ({ initialMinute = 5, onTimerEnd }) => {
    const [timeLeft, setTimeLeft] = useState(initialMinute * 60);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimerEnd();
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, onTimerEnd]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>;
};

export default BookingPage;