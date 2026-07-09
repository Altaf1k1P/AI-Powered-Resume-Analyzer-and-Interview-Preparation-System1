const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the User model (which candidate uploaded it)
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String, // Will store local path or Cloudinary URL
    required: true
  },
  atsScore: {
    type: Number,
    default: 0
  },
  scoreBreakdown: {
    skills: { type: Number, default: 0 },
    experience: { type: Number, default: 0 },
    education: { type: Number, default: 0 },
    formatting: { type: Number, default: 0 }
  },
  extractedData: {
    skills: [String],
    experienceCount: { type: Number, default: 0 },
    educationCount: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resume', resumeSchema);