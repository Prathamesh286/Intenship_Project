// server/routes/contact.js
import express from 'express';
import Contact from '../models/Contact.js';
import { sendContactEmail } from '../utils/sendEmail.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// POST /api/contact - Submit contact form (Public)
router.post('/', async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;

    // Basic validation
    if (!name || !email || !mobile || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const contact = new Contact({ name, email, mobile, message });
    await contact.save();
    await sendContactEmail({ name, email, mobile, message });

    res.status(201).json({ message: 'Thank you! Your message has been received.' });
  } catch (err) {
    console.error('Contact submission error:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// GET /api/contact - Get all contact submissions (Admin only)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error('Get contacts error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/contact/:id - Delete contact submission (Admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    console.error('Delete contact error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;