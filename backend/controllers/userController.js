const asyncHandler = require('express-async-handler')

//@description register a new user
//@route  api/users
//@access public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Pleaase include all fields')
    }
    res.send('Register Route')
})

const loginUser = asyncHandler(async(req,res) => {
    res.send('Login Route')
})

module.exports = {
    registerUser,
    loginUser
}