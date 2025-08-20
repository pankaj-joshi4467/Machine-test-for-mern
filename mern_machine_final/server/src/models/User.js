import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  mobile: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin','agent'], default: 'admin' }
}, { timestamps: true });
export default mongoose.model('User', userSchema);
