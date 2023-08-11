import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import fs from 'fs-extra';

import Provincia from '../database/models/provincias';
import Image from '../database/models/image';

import { cloud } from '../helper/cloud';

import { folder } from "../config/config";

export const provincias = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showProvincias = await Provincia.find()

        return res.status(200).json(showProvincias)
        
    } catch (error) {
        throw error
    }

}

export const provincia = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const showProvincia = await Provincia.findById(id)

        if(!showProvincia) {
            return res.status(400).json({ message: "Provincia does not exists" })
        }

        return res.status(200).json(showProvincia)
        
    } catch (error) {
        throw error
    }

}

export const createProvincia = async (req: any, res: Response): Promise<Response> => {

    const { name, capital, population, surface } = req.body

    try {

        if(!req.files) {
            return res.status(400).json({ message: "You have to upload a file" })
        }

        const imagesProvincia: ObjectId[] = []

        for(let i = 0; i < req.files.length; i++) {

            const result = await cloud.uploader.upload(req.files[i]?.path!, {
                use_filename: true,
                folder: `${folder}`
            })            

            const newImage = new Image({
                image: result.secure_url,
                imageId: result.public_id,
                place: name
            })

            const imageSaved = await newImage.save()

            imagesProvincia.push(imageSaved._id)

            await fs.unlink(req.files[i]?.path!)
        }

        const newProvincia = new Provincia({
            name,
            capital,
            population,
            surface,
            flag: imagesProvincia[0],
            location: imagesProvincia[1]
        })

        const provinciaSaved = await newProvincia.save()

        return res.status(200).json({
            message: "Provincia created successfully",
            provincia: provinciaSaved
        })
        
    } catch (error) {
        throw error
    }

}

export const removeProvincia = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;

    try {

        const provincia = await Provincia.findById(id)

        if(!provincia) {
            return res.status(400).json({ message: "Provincia does not exists" })
        }

        const imagesRemove = await Image.find({ place: provincia.name })

        for (let i = 0; i < imagesRemove.length; i++) {
            await cloud.uploader.destroy(imagesRemove[i].imageId)
            await Image.findByIdAndDelete(imagesRemove[i]._id)
        }

        await Provincia.findByIdAndDelete(id)

        return res.status(200).json({ message: "Provincia was removed successfully" })
        
    } catch (error) {
        throw error
    }

}