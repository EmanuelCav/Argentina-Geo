import { Request, Response } from "express";
import fs from 'fs-extra';

import Municipio from '../database/models/municipios';
import Provincia from '../database/models/provincias';
import Image from '../database/models/image';

import { cloud } from "../helper/cloud";

export const municipios = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showMunicipios = await Municipio.find()

        return res.status(200).json(showMunicipios)
        
    } catch (error) {
        throw error
    }

}

export const municipio = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const showMunicipio = await Municipio.findById(id)

        if(!showMunicipio) {
            return res.status(400).json({ message: "Municipio does not exists" })
        }

        return res.status(200).json(showMunicipio)
        
    } catch (error) {
        throw error
    }

}

export const createMunicipio = async (req: any, res: Response): Promise<Response> => {

    const { name, cabecera, population, surface, provinciaName } = req.body

    try {

        if(!req.files) {
            return res.status(400).json({ message: "You have to upload a file" })
        }

        const provincia = await Provincia.findOne({ name: provinciaName })

        if(!provincia) {
            return res.status(401).json({ message: "Provincia's name was not created" })
        }

        const imagesMunicipio = []

        for (let i = 0; i < req.files.length; i++) {

            const result = await cloud.uploader.upload(req.files[i].path)

            const newImage = new Image({
                image: result.secure_url,
                imageId: result.public_id,
                place: name
            })

            const imageSaved = await newImage.save()

            imagesMunicipio.push(imageSaved._id)
        
            await fs.unlink(req.files[i].path)
        }

        const newMunicipio = new Municipio({
            name,
            cabecera,
            population,
            surface,
            flag: imagesMunicipio[0],
            location: imagesMunicipio[1],
            provincia: provincia._id
        })

        const municipioSaved = await newMunicipio.save()

        return res.status(200).json({
            message: "Municipio created successfully",
            municipio: municipioSaved
        })
        
    } catch (error) {
        throw error
    }

}

export const removeMunicipio = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const municipio = await Municipio.findById(id)

        if(!municipio) {
            return res.status(400).json({ message: "Municipio does not exists" })
        }

        const imagesRemove = await Image.find({ place: municipio.name })

        for (let i = 0; i < imagesRemove.length; i++) {
            await cloud.uploader.destroy(imagesRemove[i].imageId)
            await Image.findByIdAndDelete(imagesRemove[i]._id)
        }

        await Municipio.findByIdAndDelete(id)

        return res.status(200).json({ message: "Municipio was removed successfully" })
        
    } catch (error) {
        throw error
    }

}
