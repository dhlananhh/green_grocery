import Product from "../models/Product.js"
import { v2 as cloudinary } from "cloudinary"


// add product: /api/product/add
export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData)

    const images = req.files

    let imagesUrl = await Promise.all(
      images.map(async () => {
        let result = await cloudinary.uploader.upload(
          item.path, { resource_type: "image" }
        )
        return result.secure_url
      })
    )

    await Product.create({ ...productData, image: imagesUrl })

    return res.json({ success: true, message: "A new product has been successfully created!" })
  } catch (error) {
    console.log(error.message)
    return res.json({ success: false, message: error.message })
  }
}


// get product list: /api/product/list
export const getProductList = async (req, res) => {
  try {
    const products = await Product.find({})
    return res.json({ success: true, message: "Product list has been displayed successfully!", products })
  } catch (error) {
    console.log(error.message)
    return res.json({ success: false, message: error.message })
  }
}


// get a single product: /api/product/id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.body
    const product = await Product.findById(id)
    return res.json({ success: true, message: `Product Id ${id} found successfully!`, product })
  } catch (error) {
    console.log(error.message)
    return res.json({ success: false, message: error.message })
  }
}


// change product in stock: /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body
    await Product.findByIdAndUpdate(id, { inStock })
    return res.json({ success: true, message: `Updated in stock status of Product Id ${id} successfully!` })
  } catch (error) {
    console.log(error.message)
    return res.json({ success: false, message: error.message })
  }
}
