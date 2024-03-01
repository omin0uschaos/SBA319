import express from 'express';
const router = express.router();

router.get("/", (req, res) =>{
    const allSongs = await Songs.find({});
    res.json(allSongs);
})