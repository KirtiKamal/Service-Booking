import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Cleaning', 'Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Gardening', 'Other']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  duration: {
    type: Number,  // Duration in minutes
    required: true,
    min: 0
  },
  imageUrl: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);
export default Service; 