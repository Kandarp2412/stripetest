const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    userId : {type:String},
    connectedId :{type:String,default:"0"},
    charges :{type:String,default:"0"},
    payouts : {type:String,default:"0"},
    timestamp :{type:Date,default:Date.now}
})


module.exports = mongoose.model("user",userSchema)