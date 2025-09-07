const mongoose = require("mongoose");

const mongooseUrl = process.env.MONGODB_URL
const url = mongooseUrl ? mongooseUrl.endsWith("/") ? mongooseUrl : `${mongooseUrl}/` : null
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