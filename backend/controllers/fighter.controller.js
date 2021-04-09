import express from 'express'
import mongoose from 'mongoose'
import FighterModel from '../models/fighter.model.js'

const router = express.Router()

export const getOneFighter = (req,res) => {
    FighterModel
        .findById({_id: req.params.id})
        .then(fighter => {
            if(!fighter) {
                const message = "Aucun fighter ne correspond à votre recherche"
                return res.status(404).json({message})
            }
            res.json(fighter)
        })
        .catch(err => {
            const message = "Un problème est survenue"
            res.status(500).send({message})
        })
}

export const getAllFighters = (_, res) => {
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