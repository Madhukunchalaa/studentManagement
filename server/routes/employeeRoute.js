const express= require('express')
const router=express.Router()
const middileware=require('../middleware/authmiddleware')
const {register,login,dashboard}=require('../controllers/employeeController')
const { punchIn, punchOut } = require('../controllers/punchController');

router.post('/register',register)
router.post('/login',login)
router.get('/dashboard',middileware,dashboard)
router.post('/punchin', middileware, punchIn);
router.post('/punchout', middileware, punchOut);




module.exports=router

 
