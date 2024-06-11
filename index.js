require("dotenv").config()
const express = require("express")
const cors = require("cors")
const productRouter = require("./src/router/productRouter")
const userRouter = require("./src/router/userRouter")
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(productRouter)
app.use("/auth", userRouter)


app.listen(PORT, (e) => {
    if(e) console.log(e)
    console.log(`App Running in PORT : ${PORT}`)
})