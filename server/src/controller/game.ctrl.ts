import { Request, Response } from "express";

import Game from '../database/models/game';
import QuestionGame from '../database/models/questionGame';
import Question from '../database/models/question';

export const games = async (req: Request, res: Response): Promise<Response> => {

    try {

        const games = await Game.find()

        return res.status(200).json(games)
        
    } catch (error) {
        throw error
    }

}

export const game = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const game = await Game.findById(id)

        if(!game) {
            return res.status(400).json({ message: "Game does not exists" })
        }

        return res.status(200).json(game)
        
    } catch (error) {
        throw error
    }

}

export const createGames = async (req: Request, res: Response): Promise<Response> => {

    try {

        // const newQuestionGame = new QuestionGame({
        //     question
        // })

        // const newGame = new Game({
            
        // })

        return res.status(200).json("createGames")
        
    } catch (error) {
        throw error
    }

}

export const removeGames = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const game = await Game.findById(id)

        if(!game) {
            return res.status(400).json({ message: "Game does not exists" })
        }

        await Game.findByIdAndDelete(id)

        return res.status(200).json({ message: "Game was removed successfully" })
        
    } catch (error) {
        throw error
    }

}