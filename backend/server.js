const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMIddleware')
const PORT = process.env.PORT || 8000

// conenct to databse
connectDB()

// initial express
const app = express()

// middleware to manage json
app.use(express.json()) //middleware to parse json
app.use(express.urlencoded({extended: false})) //middleware to parse url


app.get('/', (req, res) => { 
    res.json('Hello')
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))

// Error
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

