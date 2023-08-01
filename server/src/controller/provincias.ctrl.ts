import { Request, Response } from "express";

import Provincia from '../database/models/provincias';

export const provincias = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showProvincias = await Provincia.find()

        return res.status(200).json(showProvincias)
        
    } catch (error) {
        throw error
    }

}

export const provincia = async (req: Request, res: Response): Promise<Response> => {

    try {

        return res.status(200).json({ message: "provincia" })
        
    } catch (error) {
        throw error
    }

}

export const createProvincia = async (req: Request, res: Response): Promise<Response> => {

    try {

        return res.status(200).json({ message: "createProvincia" })
        
    } catch (error) {
        throw error
    }

}

export const removeProvincia = async (req: Request, res: Response): Promise<Response> => {

    try {

        return res.status(200).json({ message: "removeProvincia" })
        
    } catch (error) {
        throw error
    }

}