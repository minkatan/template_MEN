const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database connected: ${connection.connection.host}`.yellow.underline);
    } catch (error) {
        console.log(error.message.red.bold)
        process.exit(1)
    }
}

module.exports = connectDB