const mongoose = require("mongoose")

const aditionalDataSchema = mongoose.Schema({
  Category:[String],
  Genre: [String],
  Type: [String]
},{ timestamps: true  })

const aditionalDataCollection = mongoose.model("aditionalData",aditionalDataSchema)
module.exports = aditionalDataCollection;