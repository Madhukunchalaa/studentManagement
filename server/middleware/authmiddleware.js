const jwt=require('jsonwebtoken')

async function middleWare(req,res,next){
    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(' ')[1]
    if(!token){
        return res.json('invalid token')
    }
 
    await jwt.verify(token,process.env.SCREAT_KEY,(err,user)=>{
        if(err){
            return res.json('invlaid or expired token')
        } 
        req.user=user
       next()
            
    })
}
module.exports=middleWare