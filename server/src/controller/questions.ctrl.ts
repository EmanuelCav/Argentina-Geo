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

        // let options = ["Aconcagua", "Monte Pissis", "Cerro Bonete Chico", "Cerro Catedral", "Cerro de los Siete Colores", "Cerro Torre", "Chañi", "Cerro Tronador", "Champaquí", "Volcán Lanín"]
        // let options = ["Tucumán", "Santiago del Estero", "Chaco", "Córdoba", "Chubut", "Buenos Aires", "Jujuy", "Salta", "La Rioja", "Catamarca", "Formosa", "Misiones", "Corrientes", "Entre Ríos", "Santa Fe", "San Juan", "San Luis", "Ciudad Autónoma de Buenos Aires", "Mendoza", "La Pampa", "Neuquén", "Río Negro", "Santa Cruz", "Tierra del Fuego, Antártida e Islas del Atlántico Sur"]
        // let options = ["Río Paraná", "Río Cuarto", "Río Uruguay", "Río Atuel", "Río de la Plata", "Río Bermejo", "Río Colorado", "Río Salado", "Río Paraguay", "Río Negro"]
        // let options = ["Lago Argentino", "Lago Nahuel Huapi", "Lago Viedma", "Lago Lácar", "Lago Musters", "Lago Cardiel", "Lago Epecuén", "Lago Pellegrini", "Lago Buenos Aires", "Lago Aluminé"]

        // let options = ["1816", "1853", "1810", "1812", "1794", "1804", "1914", "1888", "1867", "1891"]
        // let options = ["1946", "1933", "1937", "1942", "1952", "1955", "1960", "1929", "1964", "1968"]
        // let options = ["Batalla de la Vuelta de Obligado", "Batalla de Caseros", "Combate de San Lorenzo", "Batalla de Pavón", "Éxodo Jujeño", "Revolución de Mayo", "Declaración de la Independencia", "Fundación de Buenos Aires", "Creación de la Bandera", "Retorno a la democracía"]
        let option = ["Manuel Belgrano", "", ""]

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