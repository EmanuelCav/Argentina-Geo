import { Request, Response } from "express";

import Game from '../database/models/game';
import QuestionGame from '../database/models/questionGame';
import Question from '../database/models/question';
import User from '../database/models/users';
import CategoryUser from '../database/models/categoryUser'

import { shuffle } from '../helper/functions';

import { IQuestion } from "../interface/Game";

export const games = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showGames = await Game.find({ user: req.user })

        return res.status(200).json(showGames)

    } catch (error) {
        throw error
    }

}

export const game = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const showGame = await Game.findById(id).populate(({
            path: "questions",
            populate: {
                path: "question"
            }
        }))

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

        let categories = []

        const categoriesSelected = await CategoryUser.find({ user: req.user, isSelect: true, isUnlocked: true })

        if (categoriesSelected.length === 0) {
            return res.status(401).json({ message: "Tienes que elegír algunas categorias para comenzar" })
        }

        for (let i = 0; i < categoriesSelected.length; i++) {
            categories.push(categoriesSelected[i].category)
        }        

        const avaibleQuestions = await Question.find({ category: categories })

        const shuffledQuestions = shuffle(avaibleQuestions).slice(0, user?.amountQuestions)

        const newGame = new Game({
            user: req.user
        })

        const gameSaved = await newGame.save()

        for (let i = 0; i < user?.amountQuestions!; i++) {

            let optionsAdded = []

            const correctOption = Math.floor(Math.random() * user?.amountOptions!);

            const categoryQuestion = await Question.find({ category: shuffledQuestions[i].category })
            const shuffledCategoryQuestion = shuffle(categoryQuestion).filter((q: IQuestion) => q.answer !== shuffledQuestions[i].answer)

            const nameCategoryUser = await CategoryUser.findOne({ user: req.user, category: shuffledQuestions[i].category })

            if (!nameCategoryUser) {
                return res.status(400).json({ message: "User category does not exists" })
            }

            const newQuestionGame = new QuestionGame({
                question: shuffledQuestions[i]._id,
                categoryUser: nameCategoryUser._id,
                user: req.user
            })

            const questionSaved = await newQuestionGame.save()

            for (let j = 0; j < user?.amountOptions!; j++) {

                if (j === correctOption) {

                    optionsAdded.push(shuffledQuestions[i].answer)

                    await QuestionGame.findByIdAndUpdate(questionSaved._id, {
                        $push: {
                            options: shuffledQuestions[i].answer
                        }
                    }, {
                        new: true
                    })
                } else {

                    optionsAdded.push(shuffledCategoryQuestion[j].answer)

                    await QuestionGame.findByIdAndUpdate(questionSaved._id, {
                        $push: {
                            options: shuffledCategoryQuestion[j].answer
                        }
                    }, {
                        new: true
                    })
                }

            }

            await Game.findByIdAndUpdate(gameSaved._id, {
                $push: {
                    questions: questionSaved._id
                }
            }, {
                new: true
            })

        }

        const game = await Game.findById(gameSaved._id).populate({
            path: "questions",
            populate: {
                path: "question",
                populate: {
                    path: "image",
                    select: "image"
                }
            }
        })

        return res.status(200).json(game)

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
