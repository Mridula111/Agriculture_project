import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  village: { type: String, required: false },
  language: { type: String, required: true, default: 'en' },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
