import { Request, Response } from "express"

import Pais from "../database/models/pais"
import Provincia from "../database/models/provincia"
import Municipio from "../database/models/municipio"

export const paises = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showPaises = await Pais.find()

        return res.status(200).json(showPaises)

    } catch (error) {
        throw error
    }

}

export const provincias = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showProvincias = await Provincia.find()

        return res.status(200).json(showProvincias)

    } catch (error) {
        throw error
    }

}

export const municipios = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showMunicipios = await Municipio.find()

        return res.status(200).json(showMunicipios)


    } catch (error) {
        throw error
    }

}

export const createLocalidad = async (req: Request, res: Response): Promise<Response> => {

    try {

        const provincia = await Provincia.findOne({ name: "Buenos Aires" })

        if (!provincia) return res.status(400).json({ message: "Provincia does not exists" })

        let municipios = [{}]
        await Provincia.insertMany(municipios)

        return res.status(200).json({ message: "Localides creadas correctamente" })

    } catch (error) {
        throw error
    }

}