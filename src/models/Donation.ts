import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'BDT'
  },
  paymentMethod: {
    type: String,
    enum: ['bkash', 'nagad', 'rocket', 'card', 'bank_transfer'],
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  purpose: {
    type: String,
    enum: ['general', 'specific_case', 'medical', 'legal'],
    default: 'general'
  },
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Victim'
  },
  receipt: {
    type: String // URL to donation receipt
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Donation || mongoose.model('Donation', donationSchema); 