import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/routes.js'
dotenv.config()


const PORT = process.env.PORT || 5000
const app = express()

/**
 * middlewares
 */
app
    .use(express.json())
    .use(router)


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
