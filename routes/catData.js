import express from "express";
import CatDataModel from "../model/CatDataModel.js";

const router = express.Router();

router.get("/",async (req, res) => {
    const holders = await CatDataModel.find().sort({rank:1});
    res.json(holders);
});

router.post("/",async(req,res) => {
    const { name,gender,city,image,discription,num,age } = req.body;
    const newHolder = new CatDataModel({ name,gender,city,image,discription,num,age });
    await newHolder.save();
    res.status(201).json(newHolder);
})
export default router;