import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


import Fruits from '/utilities/fruits.js'

app.get('/seed', async (req, res)=>{
    await Fruits.deleteMany({});
    await Fruits.create(fruits);
    res.send('Database Seeded');
})