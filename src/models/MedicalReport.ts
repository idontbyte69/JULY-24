import mongoose from 'mongoose';

const medicalReportSchema = new mongoose.Schema({
  victimId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Victim',
    required: true
  },
  hospitalName: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  dateOfExamination: {
    type: Date,
    required: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  treatment: {
    type: String,
    required: true
  },
  medications: [{
    name: String,
    dosage: String,
    duration: String
  }],
  followUpDate: Date,
  documents: [{
    type: String, // URLs to stored medical documents
  }],
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
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

export default mongoose.models.MedicalReport || mongoose.model('MedicalReport', medicalReportSchema); 