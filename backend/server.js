import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import "dotenv/config"

import connectDB from "./configs/db.js"
import connectCloudinary from "./configs/cloudinary.js"

import userRouter from "./routes/userRouter.js"
import sellerRouter from "./routes/sellerRouter.js"
import productRouter from "./routes/productRouter.js"


const app = express()
const port = process.env.PORT || 4000

await connectDB()
await connectCloudinary()

// allow multiple origins
const allowedOrigins = ['http://localhost:5173']

// middleware configuration
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: allowedOrigins, credentials: true }))

app.get('/', (req, res) => res.send("API is working..."))
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
