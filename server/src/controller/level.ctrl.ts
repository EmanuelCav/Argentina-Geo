import { Request, Response } from "express";

import Level from '../database/models/level'

export const levels = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showLevels = await Level.find()

        return res.status(200).json(showLevels)
        
    } catch (error) {
        throw error
    }

}

export const createLevels = async (req: Request, res: Response): Promise<Response> => {

    const { level, max } = req.body

    try {

        const newLevel = new Level({
            level,
            max
        })

        const levelSaved = await newLevel.save()

        return res.status(200).json(levelSaved)
        
    } catch (error) {
        throw error
    }

}

export const updateLevels = async (req: Request, res: Response): Promise<Response> => {

    const { max } = req.body
    const { id } = req.params

    try {

        const level = await Level.findById(id)

        if(!level) {
            return res.status(400).json({ message: "Level does not exists" })
        }

        await Level.findByIdAndUpdate(id, {
            max
        }, {
            new: true
        })

        return res.status(200).json({ message: "Level updated successfully" })
        
    } catch (error) {
        throw error
    }

}
