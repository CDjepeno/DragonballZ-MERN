import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


const PORT = process.env.PORT || 4000
const app = express()

/**
 * middlewares
 */
app
    .use(express.json())


/**
 * Connect MongoDB
 */
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

app.listen(PORT, () => {
    console.log(`Listening server in PORT ${PORT}`);
})
