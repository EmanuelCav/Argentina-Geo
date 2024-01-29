import { Request, Response } from "express";

import Game from '../database/models/game';
import Question from '../database/models/question';
import User from '../database/models/users';
import CategoryUser from '../database/models/categoryUser'

import { shuffle } from '../helper/functions';

import { IQuestion } from "../interface/Game";

export const games = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showGames = await Game.find({ user: req.user })
            .populate({
                path: "questions",
                populate: [{
                    path: "image",
                    select: "image"
                }, {
                    path: "category"
                }]
            })

        return res.status(200).json(showGames)

    } catch (error) {
        throw error
    }

}

export const game = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const showGame = await Game.findById(id)
            .populate({
                path: "questions",
                populate: [{
                    path: "image",
                    select: "image"
                }, {
                    path: "category"
                }]
            })

        if (!showGame) {
            return res.status(400).json({ message: "Game does not exists" })
        }

        return res.status(200).json({
            game: showGame
        })

    } catch (error) {
        throw error
    }

}

export const createGames = async (req: Request, res: Response): Promise<Response> => {

    try {

        const user = await User.findById(req.user)

        const categoriesSelected = await CategoryUser.find({ user: req.user, isSelect: true })

        if (categoriesSelected.length === 0) {
            return res.status(401).json({ message: "Tienes que elegír algunas categorias para comenzar" })
        }

        let categories = []

        for (let i = 0; i < categoriesSelected.length; i++) {
            categories.push(categoriesSelected[i].category)
        }

        const avaibleQuestions = await Question.find({ category: categories })

        const shuffledQuestions: IQuestion[] = shuffle(avaibleQuestions).slice(0, user?.amountQuestions!)

        const newGame = new Game({
            user: req.user
        })

        const gameSaved = await newGame.save()

        for (let i = 0; i < 5; i++) {

            await Game.findByIdAndUpdate(gameSaved._id, {
                $push: {
                    questions: shuffledQuestions[i]._id
                }
            }, {
                new: true
            })

        }

        const game = await Game.findById(gameSaved._id)
            .populate({
                path: "questions",
                populate: [{
                    path: "image",
                    select: "image"
                }, {
                    path: "category"
                }]
            })

        return res.status(200).json({
            game,
            shuffledQuestions
        })

    } catch (error) {
        throw error
    }

}

export const removeGames = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const game = await Game.findById(id)

        if (!game) {
            return res.status(400).json({ message: "Game does not exists" })
        }

        await Game.findByIdAndDelete(id)

        return res.status(200).json({ message: "Game was removed successfully" })

    } catch (error) {
        throw error
    }

}
