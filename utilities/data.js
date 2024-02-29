const users = [
  { username: 'user1', password: 'pass123' },
  { username: 'musicLover', password: 'loveSongs' },
  { username: 'playlistMaster', password: 'masterPass' },
  { username: 'chillVibesOnly', password: 'chill123' },
  { username: 'energeticSouls', password: 'energyHigh' },
];

const songs = [
  { title: 'Happy Song', artist: 'Happy Artist', duration: 210, mood: 'Happy', link: 'https://youtube.com/happy_song' },
  { title: 'Sad Melody', artist: 'Melancholic Singer', duration: 180, mood: 'Sad', link: 'https://youtube.com/sad_melody' },
  { title: 'Energetic Beats', artist: 'DJ Energy', duration: 200, mood: 'Energetic', link: 'https://youtube.com/energetic_beats' },
  { title: 'Chill Waves', artist: 'Calm Composer', duration: 190, mood: 'Chill', link: 'https://youtube.com/chill_waves' },
  { title: 'Romantic Tune', artist: 'Lover’s Voice', duration: 185, mood: 'Romantic', link: 'https://youtube.com/romantic_tune' },
];


const playlists = [
  { mood: 'Happy', songIDs: ['songId1', 'songId3'], createdBy: 'userId1' },
  { mood: 'Sad', songIDs: ['songId2'], createdBy: 'userId2' },
  { mood: 'Energetic', songIDs: ['songId3', 'songId4'], createdBy: 'userId3' },
  { mood: 'Chill', songIDs: ['songId4', 'songId5'], createdBy: 'userId4' },
  { mood: 'Romantic', songIDs: ['songId5', 'songId1'], createdBy: 'userId5' },
];


module.exports = { users, songs, playlists };
