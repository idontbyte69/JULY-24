import mongoose from 'mongoose';

const victimSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  dateOfIncident: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  injuries: [{
    type: String
  }],
  medicalReports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MedicalReport'
  }],
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  supportNeeded: [{
    type: String,
    enum: ['medical', 'legal', 'financial', 'psychological']
  }],
  familyContact: {
    name: String,
    relationship: String,
    phone: String,
    email: String
  },
  documents: [{
    type: String, // URLs to stored documents
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Victim || mongoose.model('Victim', victimSchema); 