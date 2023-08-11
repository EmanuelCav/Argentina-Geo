import { Request, Response, NextFunction } from "express";

import Provincia from '../../../database/models/provincias';

const validProvincia = async (req: Request, res: Response, next: NextFunction) => {

    const validText = /^[a-zA-Z]+$/
    const validNumber = /^[0-9]+$/

    const { name, capital, population, surface } = req.body

    if(!name || !capital || !population || !surface) {
        return res.status(400).json({ message: "There are empty fields" })
    }

    const provincia = await Provincia.findOne({ name })

    if(provincia) {
        return res.status(400).json({ message: "Provincia's name already exists" })
    }

    const isNameValid = validText.test(name)
    const isCapitalValid = validText.test(capital)

    if(!isNameValid || !isCapitalValid) {
        return res.status(401).json({ message: "Name and capital accepts only charactes" })
    }

    const isPopulationValid = validNumber.test(population)
    const isSurfaceValid = validNumber.test(surface)

    if(!isPopulationValid || !isSurfaceValid) {
        return res.status(401).json({ message: "Population and surface accepts only numbers" })
    }

    next()

}

export default validProvincia