const mongoose = require("mongoose")

const imageRecSchema = mongoose.Schema({
  fileId:String,
  url: String,
  waitForDelete: {
    type: Boolean,
    default: true
  },
  postId:String
},{ timestamps: true  })

const imageRecordCollection = mongoose.model("imageRecord",imageRecSchema)
module.exports = imageRecordCollection;