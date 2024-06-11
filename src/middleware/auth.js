const jwt = require("jsonwebtoken")
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const authMiddleware = async(req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
         token = req.headers.authorization.split(" ")[1]
    }

    if(!token){
        return next(res.status(401).json({
            status : 401,
            message : "Anda belum Login. Token tidak ditemukan"
        }))
    }

    const secret = process.env.JWT_SECRET
    try{
        const decoded = await jwt.verify(token, secret)
        req.user = decoded
    }catch(err){
        return next(res.status(401).json({
            error : err,
            message : "Token yang dimasukkan invalid"
        }))
    }

    next()
}

const permissionUser = async(req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
         token = req.headers.authorization.split(" ")[1]
    }

    if(!token){
        return next(res.status(401).json({
            status : 401,
            message : "Anda belum Login. Token tidak ditemukan"
        }))
    }

    const secret = process.env.JWT_SECRET
    try{
        const decoded = await jwt.verify(token, secret)
        const user = await prisma.user.findUnique({where : {id: decoded.id}})
        if(user.role != "Admin"){
            return next(res.status(403).json({
                status : 403,
                message : "Anda tidak dapat mengakses halaman ini"
            }))
        }
    }catch(err){
        return next(res.status(401).json({
            error : err,
            message : "Token yang dimasukkan invalid"
        }))
    }
    next()
}

module.exports = {authMiddleware, permissionUser}