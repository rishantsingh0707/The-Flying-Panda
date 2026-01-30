import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  visaType: {
    type: String,
    required: [true, 'Visa type is required'],
    enum: {
      values: ['Tourist', 'Business', 'Student'],
      message: '{VALUE} is not a valid visa type'
    }
  },
  status: {
    type: String,
    enum: {
      values: ['Active', 'Booked', 'Expired'],
      message: '{VALUE} is not a valid status'
    },
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient filtering
alertSchema.index({ country: 1, status: 1 });

export default mongoose.model('Alert', alertSchema);

