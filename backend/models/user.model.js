import mongoose from 'mongoose'
import pkg from 'validator'
const {isEmail} = pkg
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    pseudo: {
        type: String
    },
    email: {
        type: String,
        required: {
            message: "Le champ email est requis"
        },
        validate: [isEmail, "L'email n'est pas au bon format"],
        unique: {
            message: "Un utilisateur possède déja cette email"
        }
    },
    password: {
        type: String,
        required: {
            message: "Le champ mot de passe est requis"
        }
    },
    role: {
        type: [String],
        default: 'user'
    },
    time: {
        type: Date,
        default: Date.now
    }
    
})

// Before - Register
userSchema.pre('save', async function(next) {
    const user = this

    const hash = await bcrypt.hash(user.password, 10)

    user.password = hash

    next()
})

const UserModel = mongoose.model('User', userSchema) 

export default UserModel