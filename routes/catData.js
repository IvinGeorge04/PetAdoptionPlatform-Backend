import express from "express";
import catDataModel from "../model/catDataModel.js";

const router = express.Router();

router.get("/",async (req, res) => {
    const holders = await catDataModel.find().sort({rank:1});
    res.json(holders);
});

router.post("/",async(req,res) => {
    const { name,gender,city,image,discription,num,age } = req.body;
    const newHolder = new catDataModel({ name,gender,city,image,discription,num,age });
    await newHolder.save();
    res.status(201).json(newHolder);
})
export default router;