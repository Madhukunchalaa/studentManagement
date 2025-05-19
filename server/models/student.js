const mongoose=require('mongoose')

const studentSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    hallticketNo:{
        type:String

    },
    branch:{
        type:String
    }

});
const student=mongoose.model('Student',studentSchema)
module.exports=student