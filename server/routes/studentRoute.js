const express=require('express')
const router=express.Router()
const {register,login} =require('../controllers/studentController')
const middleWare = require('../middleware/authmiddleware')


router.post('/register',register)


router.post('/login',login)
router.get('/profile',middleWare,(req,res)=>{
    res.send({
        msg:`Hello ${user.name} your hallticket number is ${user.hallticketNo}`
    })
})


module.exports=router