const mongoose = require("mongoose")

const authSchema = mongoose.Schema({
  username:String,
  password:String
},{ timestamps: true  })

const authCollection = mongoose.model("admin_auth",authSchema)
module.exports = authCollection;