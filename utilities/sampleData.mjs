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
  { mood: 'Happy', songIDs: ['65e0309a9843765a36f82e35', '65e0309a9843765a36f82e33'], createdBy: '65e0309a9843765a36f82e2a' },
  { mood: 'Sad', songIDs: ['65e0309a9843765a36f82e34'], createdBy: '65e0309a9843765a36f82e2c' },
  { mood: 'Energetic', songIDs: ['65e0309a9843765a36f82e36', '65e0309a9843765a36f82e35'], createdBy: '65e0309a9843765a36f82e2b' },
  { mood: 'Chill', songIDs: ['65e0309a9843765a36f82e37', '65e0309a9843765a36f82e35'], createdBy: '65e0309a9843765a36f82e29' },
  { mood: 'Romantic', songIDs: ['65e0309a9843765a36f82e34', '65e0309a9843765a36f82e33'], createdBy: '65e0309a9843765a36f82e2d' },
];


export { users, songs, playlists };
