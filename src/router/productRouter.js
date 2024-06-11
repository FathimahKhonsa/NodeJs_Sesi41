const express = require("express")
const productController = require("../controller/productController")
const {authMiddleware, permissionUser} = require("../middleware/auth")
const router = express.Router()

router.get("/products", authMiddleware, productController.getProducts)
router.get("/products/:id", permissionUser, productController.getProductById)
router.post("/products", permissionUser, productController.addProduct)
router.put("/products/:id",  permissionUser, productController.updateProduct)
router.delete("/products/:id", permissionUser, productController.deleteProduct)

module.exports = router