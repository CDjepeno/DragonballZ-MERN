import express from 'express'
import FighterModel from '../models/fighter.model.js'

const router = express.Router()

export const deleteFighter = (req,res) => {
    FighterModel
        .findOneAndDelete(req.params.id)
        .then(() => {
            res.status(200).json("Le fighter à bien été supprimer")
        })
}

export const updateFighter = (req,res) => {
    FighterModel
        .findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.status(200).json("Le fighter à bien été modifier")
        })
        .catch(err => {
            res.status(400).send(err)
        })

} 

export const getOneFighter = (req,res) => {
    FighterModel
        .findById(req.params.id)
        .then(fighter => {
            if(fighter === null) {
                const message = "Aucun fighter ne correspond à votre recherche"
                return res.status(404).json({message})
            }
            res.json(fighter)
        })
        .catch(err => {
            const message = "Une erreur est survenue"
            return res.status(500).json({message})
        })
}

export const getAllFighters = (req, res) => {
    if (req.query.name) {
        const nameQuery = req.query.name

        FighterModel
            .find({ name: {$regex: nameQuery} })
            .then(fighter => res.json(fighter))
   
    } else {
        FighterModel
            .find({})
            .then(fighters => {
                res.json(fighters)
            })
            .catch(err => {
                const message = "Un problème est survenue lors de la récupération des fighters"
                res.status(500).send({message, data:err})
            })
    }
}

export const addFighter = (req,res) => {
    const Fighter = new FighterModel(req.body)

    Fighter
        .save()
        .then(fighter => {
            const message = `${fighter.name} a bien été crée`
            res.json({ message })
        })
        .catch(err => {
            const message = "Un problème est survenue lors de la création du pokemon"
            res.status(500).json({message, data: err})
        })
}