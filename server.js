//const express = require('express')
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import catData from "./routes/catData.js"
import dogData from "./routes/dogData.js"
import authRoutes from "./routes/authRoutes.js"

const app = express()
const port =3500
dotenv.config()

app.get('/',(req, res)=>{
    res.send('hello world')
})

app.use(cors());
app.use(express.json());
app.use('/api/catData',catData);
app.use('/api/dogData',dogData);
app.use('/api/auth',authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
    app.listen(port, ()=>{
        console.log(`example applistening on port ${port}`)
    })
})
.catch(err => console.error(err));