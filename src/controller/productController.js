const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient

const getProducts = async(req, res, next) => {
    try{
        const products = await prisma.product.findMany()
        res.status(200).json(products)
    }catch(err){
        res.status(500).json({msg : err.message})
    }
}

const getProductById = async(req, res, next) => {
    try{
        const productId = await prisma.product.findUnique({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json(productId)
    }catch (err){
        res.status(404).json({msg : err.message})
    }
}

const addProduct = async(req, res, next) => {
    const {name, price, image} = req.body
    try{
        const product = await prisma.product.create({
            data: {
                name : name,
                price : price,
                image : image
            }
        })
        res.status(201).json(product)
    }catch(err){
        res.status(404).json({msg: err.message})
    }
}

const updateProduct = async(req, res, next) => {
    const {name, price, image} = req.body
    try{
        const product = await prisma.product.update({
            where : {id : req.params.id},
            data : {
                name : name,
                price : price,
                image : image
            }
        })
        res.status(200).json(product)
    }catch(err){
        res.status(404).json({msg: err.message})
    }   
}

const deleteProduct = async(req, res) => {
    try{
        const product = await prisma.product.delete({
            where: {id : req.params.id}
        })
        res.status(200).json(product)
    }catch(err){
       res.status(400).json({msg: err.message})
    }
}

module.exports = {getProducts, getProductById, addProduct, updateProduct, deleteProduct}