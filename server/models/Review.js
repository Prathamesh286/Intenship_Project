import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  stars: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Review', reviewSchema);