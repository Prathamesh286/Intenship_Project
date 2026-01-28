import express from 'express';
import Booking from '../models/Booking.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Get all bookings (Admin only)
router.get('/', protect, adminOnly, async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        console.error('Get bookings error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single booking
router.get('/:id', protect, adminOnly, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('user', 'name email');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (err) {
        console.error('Get booking error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create booking (Admin only)
router.post('/', protect, adminOnly, async (req, res) => {
    try {
        const { user, name, email, phone, membershipType, duration, startDate, amount, notes } = req.body;

        if (!name || !email || !phone || !membershipType || !duration || !startDate || !amount) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        // Calculate end date based on duration
        const start = new Date(startDate);
        const end = new Date(start);

        switch (duration) {
            case '1 Month':
                end.setMonth(end.getMonth() + 1);
                break;
            case '3 Months':
                end.setMonth(end.getMonth() + 3);
                break;
            case '6 Months':
                end.setMonth(end.getMonth() + 6);
                break;
            case '12 Months':
                end.setFullYear(end.getFullYear() + 1);
                break;
        }

        const booking = await Booking.create({
            user: user || req.user.id,
            name,
            email,
            phone,
            membershipType,
            duration,
            startDate: start,
            endDate: end,
            amount,
            notes: notes || '',
        });

        res.status(201).json(booking);
    } catch (err) {
        console.error('Create booking error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update booking (Admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
    try {
        const { status, paymentStatus, notes } = req.body;

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status, paymentStatus, notes },
            { new: true, runValidators: true }
        );

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json(booking);
    } catch (err) {
        console.error('Update booking error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete booking (Admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json({ message: 'Booking deleted successfully' });
    } catch (err) {
        console.error('Delete booking error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
