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
  { title: 'Rock Bottom', artist: 'Eminem', duration: 214, mood: 'Melancholic', link: 'https://www.youtube.com/watch?v=lcmDvh-bt2c' },
  { title: 'Black Boy Fly', artist: 'Kendrick Lamar', duration: 278, mood: 'Motivational', link: 'https://youtu.be/nEiYxVBV_ds?si=T7h8qgswFYeMQXJN' },
  { title: 'Valley Of Death', artist: 'Rick Ross', duration: 234, mood: 'Hopeful', link: 'https://www.youtube.com/watch?v=tNCe_mhX0eY' },
  { title: 'I Just Wanna Lay Around All Day In Bed With You', artist: 'The Coup', duration: 317, mood: 'Relaxed', link: 'https://www.youtube.com/watch?v=kX1HRWr_B5M' },
  { title: 'Hard in Da Paint', artist: 'Waka Flocka', duration: 246, mood: 'Angry', link: 'https://www.youtube.com/watch?v=3rFpYrrhJpQ' },
  { title: 'Back In The Day', artist: 'Ahmad', duration: 224, mood: 'Nostalgic', link: 'https://www.youtube.com/watch?v=q0WMSovOboY' },
  { title: 'Jayou', artist: 'Jurassic 5', duration: 244, mood: 'Peaceful', link: 'https://www.youtube.com/watch?v=3QnVOibhJIc' },
  { title: 'Put On ft. Kanye West', artist: 'Young Jeezy', duration: 321, mood: 'Excited', link: 'https://www.youtube.com/watch?v=Ya9TsEA4-Po' },
  { title: 'Never Catch Me ft. Kendrick Lamar', artist: 'Flying Lotus', duration: 286, mood: 'Dreamy', link: 'https://www.youtube.com/watch?v=2lXD0vv-ds8' },
  { title: 'No Love ft. Lil Wayne', artist: 'Eminem', duration: 314, mood: 'Reflective', link: 'https://www.youtube.com/watch?v=KV2ssT8lzj8' },
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
