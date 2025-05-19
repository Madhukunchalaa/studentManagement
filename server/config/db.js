const mongoose=require('mongoose')
require('dotenv').config()

const dbConnection=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected")
    }
    catch(err){
        console.error('db connection failed',err)
    }
}

module.exports=dbConnection