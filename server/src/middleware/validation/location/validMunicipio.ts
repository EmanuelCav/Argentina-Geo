import { Request, Response, NextFunction } from "express";

import Municipio from '../../../database/models/municipios';

const validMunicipio = async (req: Request, res: Response, next: NextFunction) => {

    const validText = /^[a-zA-Z]+$/
    const validNumber = /^[0-9]+$/

    const { name, cabecera, population, surface, provinciaName } = req.body

    if(!name || !cabecera || !population || !surface || !provinciaName) {
        return res.status(400).json({ message: "There are empty fields" })
    }

    const municipio = await Municipio.findOne({ name })

    if(municipio) {
        return res.status(400).json({ message: "Municipio's name already exists" })
    }

    const isNameValid = validText.test(name)
    const isCabeceraValid = validText.test(cabecera)

    if(!isNameValid || !isCabeceraValid) {
        return res.status(401).json({ message: "Name and cabecera accepts only charactes" })
    }

    const isPopulationValid = validNumber.test(population)
    const isSurfaceValid = validNumber.test(surface)

    if(!isPopulationValid || !isSurfaceValid) {
        return res.status(401).json({ message: "Population and surface accepts only numbers" })
    }

    next()

}

export default validMunicipio