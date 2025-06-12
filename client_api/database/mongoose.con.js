const mongoose = require("mongoose");

const url = process.env.MONGODB_URL.endsWith("/") ? process.env.MONGODB_URL: `${process.env.MONGODB_URL}/`
const name = "movieflex_Database"

  async function connectDb() {
    try {
      const conn = await mongoose.connect(url+name) 
      console.log('Database connected..')
  }catch(e) {
    console.log({
      status: "Db connect faild.",
      message: e.message
    })
  }
}
module.exports = connectDb