const mongoose=require('mongoose')

const employeeSchema= new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    role:{type:String},
    otp:{type:String},
    punchin:{type:Date},
  
})
const Employee=mongoose.model('Employee',employeeSchema)
module.exports=Employee