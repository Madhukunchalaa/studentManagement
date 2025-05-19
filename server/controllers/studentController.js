const { application } = require('express')
const student=require('../models/student')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const register= async(req,res)=>{
    try{

        const{name,password,email,hallticketNo,branch}=req.body
        
        const existingStudent = await student.findOne({email})
        if(existingStudent){
            return res.json({
                msg:"student email already registered"
            })}
            const hasshedPassword= await bcrypt.hash(password,10)
            
            const newStudent= new student({
                name,
                email,
                password:hasshedPassword,
                hallticketNo,
                branch
            })
            await newStudent.save()
            
            return res.json({
                msg:"registration success",
                newStudent
            })
        }
        catch(err){
            res.json({
                msg:"registreation failed",err
            })

        }
    
    

    }


    const login=async(req,res)=>{
        const{email,password}=req.body

        const isExisting=await student.findOne({email})

        if(!isExisting){
            return res.json({
              
                msg:"is not registered"
            })
        }
        const isPassword=await bcrypt.compare(password,isExisting.password)

        if(!isPassword){
            return res.json({
                msg:"password is invalid"
            })

        }
    const payload={
        name:isExisting.name,
        email:isExisting.email,
        branch:isExisting.branch,
        hallticketNo:isExisting.hallticketNo
    }
    const token=jwt.sign(payload,process.env.SCREAT_KEY,{expiresIn:'30d'})
    return res.json({
        msg:"login success for",
        name:isExisting.name,
        token:token
    })

    }

module.exports={register,login}