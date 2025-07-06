import mongoose from "mongoose"

const catNameSchema = new mongoose.Schema({
    name:String,
    gender:String,
    city:String,
    image:String,
    discription:String,
    num:String,
    age:String,

});
export default mongoose.model('catData',catNameSchema);