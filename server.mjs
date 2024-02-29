import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


import { users, songs, playlists } from './path/to/sampleData.mjs'

//Populate Database with sample data
app.get('/seed', async (req, res)=>{
    await Fruits.deleteMany({});
    await Fruits.create(fruits);
    res.send('Database Seeded');
})