import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
      },
      artist: {
        type: String,
        required: true,
        trim: true,
      },
      duration: {
        type: Number,
        required: true,
        min: 0,
      },
  mood: {
    type: String,
    enum: ["Happy", "Sad", "Energetic", "Chill", "Romantic", "Melancholic", "Motivational", "Relaxed", "Angry", "Hopeful", "Nostalgic", "Peaceful", "Excited", "Dreamy", "Reflective"],
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Song', songSchema);
