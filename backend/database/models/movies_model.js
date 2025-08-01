const mongoose = require("mongoose")

const movieSchema = mongoose.Schema({
  url_name:String,
  Featured:Boolean,
  Title:String,
  Year:String,
  Rated:String,
  Released:String,
  Runtime:String,
  Genre:[String],
  Director:String,
  Writer:String,
  Actors:String,
  Plot:String,
  Language:String,
  Country:String,
  Awards:String,
  Metascore:String,
  imdbRating:String,
  imdbVotes:String,
  imdbID:String,
  Type:String,
  Images:[String],
  Downloads:[{
    title: String,
    url:String,
    size:String,
    language:String,
    quality:String
  }],
  New:Boolean,
  Trand:Boolean,
  Poster:String,
  AutoShow:Boolean,
  Category:String,
  UploadedImageIds:[String]
},{ timestamps: true  })

const movieCollection = mongoose.model("movie",movieSchema)
module.exports = movieCollection;