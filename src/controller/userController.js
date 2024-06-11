const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async(req, res) => {
    const {username, email, password} = req.body
    try{
        const userEmail = await prisma.user.findUnique({where : {email}})

        if(userEmail){
            throw Error("Email already registered")
        }

        const hashedPass = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                username : username,
                email : email,
                password : hashedPass
            }
        })
        res.status(201).json(user)
    }catch(err){
        res.status(404).json({msg : err.message})
    }
}

const login = async(req, res) => {
    const {email, password} = req.body
    try{
        if(!email || !password){
            return res.status(400).json({
                status : "fail",
                error : "Error Validation",
                message : "Please input your email and password"
            })
        }

        const user = await prisma.user.findUnique({where : {email}})
        if(!user){
            throw Error("Email not found")
        }

        const isCorrect = await bcrypt.compare(password, user.password)
        if(!isCorrect){
            throw Error("Your Password is incorrect")
        }

        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET)

        await prisma.user.update({
            where: { id: user.id },
            data: { token: token },
        })
        const getUpdateUser = await prisma.user.findUnique({
            where: { id: user.id },
        })

        res.status(200).json({user : getUpdateUser})
    }catch(err){
        res.status(400).json({msg : err.message})
    }
}

const logout = async(req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    try{
        const user = await prisma.user.findUnique({where: {token}})
        if(!userToken){
            return res.status(404).json({
                message : "User Not Found"
            })
        }

        await prisma.user.update({
            where: { id : user.id},
            data: {token : null}
        })

        const getUpdateUser = await prisma.user.findUnique({
            where: { id: user.id },
        })

        res.status(200).json({user : getUpdateUser})
    }catch(err){
        res.status(404).json({
            error : err,
            messsage : "Please try logout again"
        })
    }
}

module.exports = {register, login, logout}