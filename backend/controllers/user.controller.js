import UserModel from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = (req,res) => {
    UserModel
        .create({
            email: req.body.email,
            password: req.body.password
        })
        .then(_ => {
            const message = "L'utilisateur à bien été crée"
            res.json({ message })
        })
        .catch(err => {
            res.status(401).json(err.message)
        })
}

export const login = (req,res) => {
    const { email , password } = req.body

    UserModel
        .find({email})
        .then(user => {
            if(!user) {
                const message =  "L'utilisateur inconu"
                res.status(404).json({ message })
            }
            bcrypt
                .compare(password, user[0].password)
                .then(isPasswordValid => {
                    if(isPasswordValid) {
                        const token = jwt.sign({userId: user.id}, process.env.TOKEN_SECRET, {expiresIn: '24H'})
                        const message = "Connecter"
                        res.json({ message, token })
                    } else {
                        const message = "Identifiant invalide"
                        res.status(401).json({ message })
                    }

                })
        })
        .catch(err => {
            const message = "L'utilisateur n'a pas pu être connecter réesayer dans quelques instants"
            res.status(500).json({ message, data: err })
        })
}

export const logout = (_,res) => {
    res.send('deconnexion')
}