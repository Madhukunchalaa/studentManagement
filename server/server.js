const express=require('express')
const app=express()
const dbConnection=require('./config/db')
require('dotenv').config()
const apiRotues=require('./routes/employeeRoute')
const cors=require('cors')
app.use(cors({
  origin: '*',  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))


app.use(express.json())

app.use('/user',apiRotues)


dbConnection()


app.get('/',(req,res)=>{
    res.json({
        msg:'server started running'
    })
})


port=process.env.port
app.listen(port,()=>{
    console.log('server started running',port)
})