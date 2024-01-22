import { Request, Response } from "express";
import fs from 'fs-extra';

import Question from '../database/models/question';
import Category from '../database/models/category';
import Categoryuser from '../database/models/categoryUser'
import QuestionGame from '../database/models/questionGame';
import User from '../database/models/users';
import Image from '../database/models/image';
import Game from '../database/models/game'

import { cloud } from "../helper/cloud";
import { shuffle } from "../helper/functions";

import { folder } from "../config/config";

import { IQuestion } from "../interface/Game";

export const questions = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showQuestions = await Question.find()

        return res.status(200).json(showQuestions)

    } catch (error) {
        throw error
    }

}

export const questionsCategory = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const showQuestions = await Question.find({
            category: id
        })

        return res.status(200).json({
            questions: showQuestions,
            amount: showQuestions.length
        })

    } catch (error) {
        throw error
    }

}


export const createQuestions = async (req: Request, res: Response): Promise<Response> => {

    const { question, category, answer, text, isAnswer } = req.body

    try {

        const categorySelected = await Category.findOne({ name: category })

        if (!categorySelected) {
            return res.status(400).json({ message: "Category does not exists" })
        }

        let questionSaved;

        if (req.file) {

            const result = await cloud.uploader.upload(req.file.path, {
                use_filename: true,
                folder: `${folder}`
            })

            const newImage = new Image({
                image: result.secure_url,
                imageId: result.public_id
            })

            const imageSaved = await newImage.save()

            const newQuestion = new Question({
                question,
                image: imageSaved._id,
                category: categorySelected._id,
                answer
            })

            questionSaved = await newQuestion.save()

            await fs.unlink(req.file.path)

        } else {

            if (!text) {
                return res.status(400).json({ message: "You have to upload a text as a question view" })
            }

            const newQuestion = new Question({
                question,
                category: categorySelected._id,
                answer,
                text,
                isAnswer
            })

            questionSaved = await newQuestion.save()

        }

        return res.status(200).json({
            message: "Question craeted successfully",
            question: questionSaved
        })

    } catch (error) {
        throw error
    }

}

export const removeQuestions = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const question = await Question.findByIdAndDelete(id).populate("image")

        if (!question) {
            return res.status(400).json({ message: "Question does not exists" })
        }

        // if (question.image) {
        //     await cloud.uploader.destroy(question.image.imageId)
        // }

        await Question.findByIdAndDelete(id)

        return res.status(200).json({ message: "Question was removed successfully" })

    } catch (error) {
        throw error
    }

}

export const gameQuestion = async (req: Request, res: Response) => {

    const { id } = req.params

    try {

        const category = await Categoryuser.findById(id)

        if (!category) {
            return res.status(400).json({ message: "Category does not exists" })
        }

        if (req.user != category.user) {
            return res.status(400).json({ message: "The category user does not match with user logged" })
        }

        await Categoryuser.findByIdAndUpdate(id, {
            questions: category.questions + 1
        }, {
            new: true
        })

        return res.status(200).json({ message: "New question" })

    } catch (error) {
        throw error
    }

}

export const correctQuestion = async (req: Request, res: Response) => {

    const { id, gameId } = req.params

    try {

        const category = await Categoryuser.findById(id)
        const game = await Game.findById(gameId)

        if (!category) {
            return res.status(400).json({ message: "Category does not exists" })
        }

        if (!game) {
            return res.status(400).json({ message: "Category does not exists" })
        }

        if (req.user != category.user) {
            return res.status(400).json({ message: "The category user does not match with user logged" })
        }

        if (req.user != game.user) {
            return res.status(400).json({ message: "The game user does not match with user logged" })
        }

        await Categoryuser.findByIdAndUpdate(id, {
            corrects: category.corrects + 1
        }, {
            new: true
        })

        const gameUpdated = await Game.findByIdAndUpdate(gameId, {
            corrects: game.corrects + 1
        }, {
            new: true
        })
            .populate({
                path: "questions",
                populate: {
                    path: "question",
                    populate: {
                        path: "image",
                        select: "image"
                    }
                }
            })

        return res.status(200).json(gameUpdated)

    } catch (error) {
        throw error
    }

}

export const generateQuestion = async (req: Request, res: Response): Promise<Response> => {

    const { id, questionId } = req.params

    try {

        const game = await Game.findById(id)

        if (!game) {
            return res.status(400).json({ message: "Game does not exists" })
        }

        const question = await Question.findById(questionId)

        if (!question) {
            return res.status(400).json({ message: "Question does not exists" })
        }

        const user = await User.findById(req.user)

        if (!user) {
            return res.status(400).json({ message: "User does not exists" })
        }

        const correctOption = Math.floor(Math.random() * user.amountOptions!);

        const categoryQuestion = await Question.find({ category: question.category })
        const shuffledCategoryQuestion = shuffle(categoryQuestion).filter((q: IQuestion) => q.answer !== question.answer)
        const uniquesOptions = [...new Set(shuffledCategoryQuestion.map((option: IQuestion) => option.answer))];

        const nameCategoryUser = await Categoryuser.findOne({ user: req.user, category: question.category })

        if (!nameCategoryUser) {
            return res.status(400).json({ message: "User category does not exists" })
        }

        const newQuestionGame = new QuestionGame({
            question: questionId,
            categoryUser: nameCategoryUser._id,
            user: req.user
        })

        const questionSaved = await newQuestionGame.save()

        for (let j = 0; j < user?.amountOptions!; j++) {

            if (j === correctOption) {

                await QuestionGame.findByIdAndUpdate(questionSaved._id, {
                    $push: {
                        options: question.answer
                    }
                }, {
                    new: true
                })
            } else {

                await QuestionGame.findByIdAndUpdate(questionSaved._id, {
                    $push: {
                        options: uniquesOptions[j]
                    }
                }, {
                    new: true
                })
            }

        }

        const gameUpdated = await Game.findByIdAndUpdate(id, {
            $push: {
                questions: questionSaved._id
            }
        }, {
            new: true
        })
            .populate({
                path: "questions",
                populate: {
                    path: "question",
                    populate: {
                        path: "image",
                        select: "image"
                    }
                }
            })

        return res.status(200).json(gameUpdated)

    } catch (error) {
        throw error
    }

}