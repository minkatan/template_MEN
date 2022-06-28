const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getProfile} = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/profile',protect, getProfile) //add second argument if there's route required to be protected

module.exports = router