const users = [
  { username: 'user1', password: 'pass123' },
  { username: 'musicLover', password: 'loveSongs' },
  { username: 'playlistMaster', password: 'masterPass' },
  { username: 'chillVibesOnly', password: 'chill123' },
  { username: 'energeticSouls', password: 'energyHigh' },
];

const songs = [
  { title: 'Happy', artist: 'Pharell Williams', duration: 243, mood: 'Happy', link: 'https://youtu.be/g6aXBdrQE14?si=u5teOqVf9B3mmHuv' },
  { title: 'Jocelyn Flores', artist: 'XXXTENTACION', duration: 120, mood: 'Sad', link: 'https://youtu.be/FAucVNRx_mU?si=zVtj6JHJqg6ozVpP' },
  { title: 'Drop feat. Fatman Scoop', artist: 'Timbaland & Magoo', duration: 361, mood: 'Energetic', link: 'https://youtu.be/R6X2egvKD0M?si=XHFUF_BneJwaqHhk' },
  { title: 'Self Care', artist: 'Mac Miller', duration: 347, mood: 'Chill', link: 'https://youtu.be/4HCctKOHh2c?si=sF68lYsE8HkkqF7C' },
  { title: '911 ft. Mary J. Blige', artist: 'Wyclef Jean', duration: 266, mood: 'Romantic', link: 'https://youtu.be/L3Pua6D9DsE?si=e9g-ivr-Kn4g-ucH' },
];


const playlists = [
  { mood: 'Happy', songIDs: [], createdBy: "" },
  { mood: 'Sad', songIDs: [], createdBy: "" },
  { mood: 'Energetic', songIDs: [], createdBy: "" },
  { mood: 'Chill', songIDs: [], createdBy: "" },
  { mood: 'Romantic', songIDs: [], createdBy: "" },
  { mood: 'Melancholic', songIDs: [], createdBy: "" },
  { mood: 'Motivational', songIDs: [], createdBy: "" },
  { mood: 'Relaxed', songIDs: [], createdBy: "" },
  { mood: 'Angry', songIDs: [], createdBy: "" },
  { mood: 'Hopeful', songIDs: [], createdBy: "" },
  { mood: 'Nostalgic', songIDs: [], createdBy: "" },
  { mood: 'Peaceful', songIDs: [], createdBy: "" },
  { mood: 'Excited', songIDs: [], createdBy: "" },
  { mood: 'Dreamy', songIDs: [], createdBy: "" },
  { mood: 'Reflective', songIDs: [], createdBy: "" },
];


export { users, songs, playlists };
