import { Request, Response } from "express";
import fs from 'fs-extra';

import Question from '../database/models/question';
import Category from '../database/models/category';
import Image from '../database/models/image';

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

export const createQuestions = async (req: Request, res: Response): Promise<Response> => {

    const { question, category, answer } = req.body

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

            const newQuestion = new Question({
                question,
                category: categorySelected._id,
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

        if (question.image) {
            await cloud.uploader.destroy(question.image.imageId)
        }

        await Question.findByIdAndDelete(id)

        return res.status(200).json({ message: "Question was removed successfully" })

    } catch (error) {
        throw error
    }

}