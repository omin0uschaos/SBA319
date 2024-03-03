import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
  mood: {
    type: String,
    enum: ["Happy", "Sad", "Energetic", "Chill", "Romantic","Melancholic", "Motivational", "Relaxed", "Angry", "Hopeful",       "Nostalgic", "Peaceful", "Excited", "Dreamy", "Reflective"],
    required: true,
  },
  songIDs: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Song',
    required: true
  }],
  createdBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
});

export default mongoose.model('Playlists', playlistSchema);
