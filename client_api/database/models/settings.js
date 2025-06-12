const mongoose = require("mongoose")

const settingSchema = mongoose.Schema({
  Site_url:{
    type: String,
    default: "http://localhost:4000"
  },
  Colors:{
    text_color: {
      type: String,
      default: "#1a3031"
    },
    title_color: {
      type: String,
      default: "#468553"
    },
    bg_color: {
      type: String,
      default: "#cedbd1"
    },
    box_bg_color: {
      type: String,
      default: "#81c194"
    },
    link_color: {
      type: String,
      default: "#16501d"
    },
    small_text_color: {
      type: String,
      default: "#7f7f7f"
    },
    logo_color: {
      type: String,
      default: "#6d86b4"
    },
  },
  Site_name:{
    type: String,
    default: "MovieFlex"
  },
  
},{ timestamps: true  })

const settingCollection = mongoose.model("setting",settingSchema)
module.exports = settingCollection;