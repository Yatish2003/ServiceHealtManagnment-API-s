const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    serviceName:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},{timestamps: true})


user = mongoose.model("User",userSchema)
module.exports =user