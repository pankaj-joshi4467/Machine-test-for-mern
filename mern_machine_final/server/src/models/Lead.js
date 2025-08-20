import mongoose from 'mongoose';
const leadSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  batchId: { type: String, index: true },
  status: { type: String, enum: ['Pending','In Progress','Completed'], default: 'Pending' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
export default mongoose.model('Lead', leadSchema);
