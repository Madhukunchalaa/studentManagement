const mongoose=require('mongoose')

const loginLogoutSchema=mongoose.Schema({
    punchin:{type:Date}
})
const PunchInOut=mongoose.model('PunchinOut',loginLogoutSchema)
module.exports=PunchInOut