import { Request, Response } from "express";
import fs from 'fs-extra';

import Question from '../database/models/question';
import Category from '../database/models/category';
import Categoryuser from '../database/models/categoryUser'
import Image from '../database/models/image';
import Game from '../database/models/game'

import { cloud } from "../helper/cloud";

import { folder } from "../config/config";

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

    const { question, answer } = req.body
    const { id } = req.params

    try {

        const category = await Category.findById(id)

        if (!category) {
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
                category: category._id,
                answer
            })

            questionSaved = await newQuestion.save()

            await fs.unlink(req.file.path)

        } else {

            const newQuestion = new Question({
                question,
                category: category._id,
                answer
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

        return res.status(200).json({ message: "Question counted" })

    } catch (error) {
        throw error
    }

}

export const correctQuestion = async (req: Request, res: Response) => {

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
            corrects: category.corrects + 1
        }, {
            new: true
        })

        return res.status(200).json({
            message: "User category updated"
        })

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

        const gameUpdated = await Game.findByIdAndUpdate(id, {
            $push: {
                questions: question._id
            }
        }, {
            new: true
        })
            .populate({
                path: "questions",
                populate: [{
                    path: "image",
                    select: "image"
                }, {
                    path: "category"
                }]
            })

        return res.status(200).json(gameUpdated)

    } catch (error) {
        throw error
    }

}

export const generateOption = async (req: Request, res: Response): Promise<Response> => {

    const { option } = req.body
    const { id } = req.params

    try {

        // await Question.findByIdAndUpdate(id, {
        //     $push: {
        //         options: option
        //     }
        // }, {
        //     new: true
        // })

        const question = await Question.findById(id)

        if (!question) {
            return res.status(400).json({ message: "Question does not exists" })
        }

        // let options = ["", "", "", "", "", "", "", "", ""]
        let options = ["Tucumán", "La Pampa", "Buenos Aires", "Corrientes", "Mendoza", "Córdoba", "Misiones", "La Rioja", "Chubut"]

        await Question.findByIdAndUpdate(id, {
            $set: {
                options
            }
        }, {
            new: true
        })

        return res.status(200).json({ message: "Option created successfully" })

    } catch (error) {
        throw error
    }

}

export const updateQuestion = async (req: Request, res: Response): Promise<Response> => {

    const { question } = req.body
    const { id } = req.params

    try {

        const questionFound = await Question.findById(id)

        if (!questionFound) {
            return res.status(400).json({ message: "Question does not exists" })
        }

        const questionUpdated = await Question.findByIdAndUpdate(id, {
            question
        }, {
            new: true
        })

        return res.status(200).json(questionUpdated)

    } catch (error) {
        throw error
    }

}

export const questionsSuccess = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showQuestions = await Question.find()

        let wrong = []

        for (let i = 0; i < showQuestions.length; i++) {
            if (showQuestions[i].answer !== showQuestions[i].options[0]) {
                wrong.push(showQuestions[i])
            }
        }

        return res.status(200).json(wrong)

    } catch (error) {
        throw error
    }

}

export const updateCategory = async (req: Request, res: Response): Promise<Response> => {

    const { qid, cid } = req.params

    try {

        const question = await Question.findById(qid)

        if (!question) {
            return res.status(400).json({ message: "Question does not exists" })
        }

        const category = await Category.findById(cid)

        if (!category) {
            return res.status(400).json({ message: "Category does not exists" })
        }

        await Question.findByIdAndUpdate(question._id, {
            category: category._id
        }, {
            new: true
        })

        return res.status(200).json({
            message: "Category of the question updated successfully"
        })

    } catch (error) {
        throw error
    }

}