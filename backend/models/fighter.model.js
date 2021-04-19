import  mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

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
        lowercase: true,
        unique: {
            message: "Un fighter as déja ce nom"
        }
    },
    picture: {
        type: String,
        required: true,
    }, 
    type: {
        type: String, 
        required: true
    } 
})
FighterSchema.plugin(uniqueValidator)
const FighterModel = mongoose.model("Fighter", FighterSchema)

export default FighterModel