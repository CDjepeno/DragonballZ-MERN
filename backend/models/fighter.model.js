import  mongoose from 'mongoose'

const FighterSchema = new mongoose.Schema({
    hp: {
        type: Number,
        required: true
    },
    cp: {
        type: Number,
        required: true
    }, 
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    picture: {
        type: String,
        required: true,
        lowercase: true
    }, 
    types: {
        type: [String], 
        required: true
    } 
})

const FighterModel = mongoose.model("User", FighterSchema)

export default FighterModel