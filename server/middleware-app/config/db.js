const mongoose = require('mongoose');

//connect to mongoose using the environment variable
const connectDB  = async () => {
  try{
    const connect = await mongoose.connect(process.env.MONGO_URL)
    console.log(`connected: ${connect.connection.host}`)
  }catch (err){
    console.log(err)
    process.exit(1)
  }
}

module.exports = connectDB