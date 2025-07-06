import express from "express";
import dogDataModel from "../model/dogDataModel.js";

const router = express.Router();

router.get("/",async (req, res) => {
    const holders1 = await dogDataModel.find().sort();
    res.json(holders1);
});

router.post("/",async(req,res) => {
    const { name,gender,city,image,discription,num,age } = req.body;
    const newDog = new dogDataModel({ name,gender,city,image,discription,num,age });
    await newDog.save();
    res.status(201).json(newDog);
})
export default router;