import mongoose from "mongoose"

const connectDB = async () => {
  try {
    mongoose.connection.on(
      'connected',
      () => console.log("Connected to MongoDB Successfully!")
    )
    await mongoose.connect(`${process.env.MONGODB_URI}/green_grocery`)
  } catch (error) {
    console.error(error.message)
  }
}

export default connectDB
