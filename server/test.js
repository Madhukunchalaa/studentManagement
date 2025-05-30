const nodemailer=require('nodemailer')

let transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'madhkunchala@gmail.com',
        pass:'vthg gulr redc ykkq'
    }
})
let mailOptions={
    from:"madhkunchala@gmail.com",
    to:"madhkunchala@gmail.com",
    subject:"testing mail",
    text:"Hello this is test mail"
}
transporter.sendMail(mailOptions,(err,info)=>{
    if(err){
        console.log('mail sent failed',err)
    }
    console.log('mail sent success',info)
})