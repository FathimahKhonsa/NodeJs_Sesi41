const express = require("express")
const userController = require("../controller/userController")
const router = express.Router()

router.post("/login", userController.login)
router.post("/register", userController.register)
router.put("/logout", userController.logout)

module.exports = router