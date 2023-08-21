
const mongoose = require("mongoose");
// mongodb+srv://samarth0592002:<password>@cluster0.ghsplik.mongodb.net/?retryWrites=true&w=majority
const connectDB = async ()=>{
    const username = "samarth0592002";
const password = "FQvAAzG0Pt41Wsf";
const cluster = "cluster0";
const dbname = "shipmnts";

await mongoose.connect(process.env.MONGO_URI, { 
    dbName: "shipmnts" ,
    useNewUrlParser:true,
    useUnifiedTopology:true,},)
    .then(() => { console.log("db connected") })
    .catch((e) => { console.log(e) });
}

module.exports = {connectDB}