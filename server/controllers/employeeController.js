const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const Employee=require('../models/Employee')


const register= async(req,res)=>{
    try{
     const{name,email,password,role,otp}=req.body
     const existingEmployee= await Employee.findOne({email})
     if(existingEmployee){
        return res.json({
            msg:`email alredy registered`
        })
     }
     const hassedPassword=await bcrypt.hash(password,10)

     const newEmployee= new Employee({
        name,
        email,
        password:hassedPassword,
        role,
        otp,
       
     })
     await newEmployee.save()
    return res.json({
        msg:`registeration success`
     })

    }
    catch(err){
      return  res.json({
            msg:`registeration failed`,
            err
        })
        console.error(err)
    }
   
}

const login=async(req,res)=>{
    const{email,password}=req.body

    const existingEmployee=await Employee.findOne({email})
    if(!existingEmployee){
        return  res.status(400).json({
            msg:`user email not found`
        })
    }
    const passwordCheck=await bcrypt.compare(password,existingEmployee.password)
    if(!passwordCheck){
        return  res.status(400).json({
            msg:`invalid password`
        })
    }
    const payload={
        name:existingEmployee.name,
        email:existingEmployee.email,
        hallticketNo:existingEmployee.hallticketNo
    }
    const token=jwt.sign(payload,process.env.SECRET_KEY,({expiresIn:'30d'}))




    return res.status(200).json({
        msg:`login success`,token
    
    })
}



const dashboard=async(req,res)=>{
    try{
        return res.status(200).json({
            msg:`welcome`,
            user:req.user
        })
    }
    catch(err){
        return res.status(400).json({
            msg:`failed to load dashboard`
        })

    }

}

module.exports={register,login,dashboard}