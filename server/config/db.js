const mongoose=require('mongoose')
require('dotenv').config()

const dbConnection=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
      useUnifiedTopology: true
        })
        console.log("mongodb connected")
    }
    catch(err){
        console.error('db connection failed',err)
    }
}

module.exports=dbConnection