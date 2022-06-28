const jwt = require('jsonwebtoken');

const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')

//@description register a new user
//@route  api/users
//@access public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Pleaase include all fields')
    }

    // find if user exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if(user){
        res.status(201).json({
            //underscore id (_id) as per mongoDB
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid entry')
    }
})


//@description login user
//@route  api/users/login
//@access public
const loginUser = asyncHandler(async(req,res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    // check user and password
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            //underscore id (_id) as per mongoDB
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

//@description access user profile
//@route  api/users/profile
//@access private
const getProfile = asyncHandler(async(req,res) => {
    // update field name, example _id to id
    const user ={
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
    }
    res.status(200).json(user)
})

// generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_TOKEN, {
        expiresIn: '30d'
    })
}


module.exports = {
    registerUser,
    loginUser,
    getProfile,
}
