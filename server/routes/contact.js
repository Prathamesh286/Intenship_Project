// server/routes/contact.js
import express from 'express';
import Contact from '../models/Contact.js';
import { sendContactEmail } from '../utils/sendEmail.js';

const router = express.Router();

// POST /api/contact - Submit contact form
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

export default router;