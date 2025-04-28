import express from "express"
import { upload } from "../configs/multer.js"
import authSeller from "../middlewares/authSeller.js"
import {
  addProduct,
  changeStock,
  getProductById,
  getProductList
} from "../controllers/productController.js"


const productRouter = express.Router()

productRouter.post('/add', upload.array([ images ]), authSeller, addProduct)
productRouter.post('/list', getProductList)
productRouter.post('/id', getProductById)
productRouter.post('/stock', authSeller, changeStock)


export default productRouter
