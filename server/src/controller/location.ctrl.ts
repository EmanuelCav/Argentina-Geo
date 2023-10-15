import { Request, Response } from "express"

import Pais from "../database/models/pais"
import Provincia from "../database/models/provincia"
import Municipio from "../database/models/municipio"

export const paises = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showPaises = await Pais.find().sort({
            name: 1
        })

        return res.status(200).json(showPaises)

    } catch (error) {
        throw error
    }

}

export const provincias = async (req: Request, res: Response): Promise<Response> => {

    const { pais } = req.params

    try {

        const paisId = await Pais.findOne({ name: pais })

        if (!paisId) {
            return res.status(400).json({ message: "Pais does not exists" })
        }

        const showProvincias = await Provincia.find({ pais: paisId._id })
            .populate("pais")
            .sort({
                name: 1
            })

        return res.status(200).json(showProvincias)

    } catch (error) {
        throw error
    }

}

export const municipios = async (req: Request, res: Response): Promise<Response> => {

    const { provincia } = req.params

    try {

        const provinciaId = await Provincia.findOne({ name: provincia })

        if (!provinciaId) {
            return res.status(400).json({ message: "Provincia does not exists" })
        }

        const showMunicipios = await Municipio.find({ provincia: provinciaId._id })
            .populate("provincia")
            .sort({
                name: 1
            })

        return res.status(200).json(showMunicipios)

    } catch (error) {
        throw error
    }

}

export const createLocalidad = async (req: Request, res: Response): Promise<Response> => {

    try {

        const provincia = await Provincia.findOne({ name: "Ciudad Autónoma de Buenos Aires" })

        if (!provincia) return res.status(400).json({ message: "Provincia does not exists" })

        let municipios = [{ name: 'Agronomía', provincia: provincia._id }, { name: 'Almagro', provincia: provincia._id }, { name: 'Balvanera', provincia: provincia._id }, { name: 'Barracas', provincia: provincia._id }, { name: 'Belgrano', provincia: provincia._id }, { name: 'Boedo', provincia: provincia._id }, { name: 'Caballito', provincia: provincia._id }, { name: 'Chacarita', provincia: provincia._id }, { name: 'Coghlan', provincia: provincia._id }, { name: 'Colegiales', provincia: provincia._id }, { name: 'Constitución', provincia: provincia._id }, { name: 'Flores', provincia: provincia._id }, { name: 'Floresta', provincia: provincia._id }, { name: 'La Boca', provincia: provincia._id }, { name: 'La Paternal', provincia: provincia._id }, { name: 'Liniers', provincia: provincia._id }, { name: 'Mataderos', provincia: provincia._id },
        { name: 'Montserrat', provincia: provincia._id }, { name: 'Monte Castro', provincia: provincia._id }, { name: 'Nueva Pompeya', provincia: provincia._id }, { name: 'Núñez', provincia: provincia._id }, { name: 'Palermo', provincia: provincia._id },
        { name: 'Parque Avellaneda', provincia: provincia._id }, { name: 'Parque Chacabuco', provincia: provincia._id }, { name: 'Parque Chas', provincia: provincia._id }, { name: 'Parque Patricios', provincia: provincia._id }, { name: 'Puerto Madero', provincia: provincia._id }, { name: 'Recoleta', provincia: provincia._id }, { name: 'Retiro', provincia: provincia._id }, { name: 'Saavedra', provincia: provincia._id }, { name: 'San Cristóbal', provincia: provincia._id }, { name: 'San Nicolás', provincia: provincia._id }, { name: 'San Telmo', provincia: provincia._id }, { name: 'Vélez Sarsfield', provincia: provincia._id }, { name: 'Versalles', provincia: provincia._id }, { name: 'Villa Crespo', provincia: provincia._id }, { name: 'Villa del Parque', provincia: provincia._id }, { name: 'Villa Devoto', provincia: provincia._id }, { name: 'Villa Gral. Mitre', provincia: provincia._id }, { name: 'Villa Lugano', provincia: provincia._id }, { name: 'Villa Luro', provincia: provincia._id }, { name: 'Villa Ortúzar', provincia: provincia._id }, { name: 'Villa Pueyrredón', provincia: provincia._id }, { name: 'Villa Real', provincia: provincia._id }, { name: 'Villa Riachuelo', provincia: provincia._id }, { name: 'Villa Santa Rita', provincia: provincia._id }, { name: 'Villa Soldati', provincia: provincia._id }, { name: 'Villa Urquiza', provincia: provincia._id }]

        await Municipio.insertMany(municipios)

        return res.status(200).json({ message: "Localides creadas correctamente" })

    } catch (error) {
        throw error
    }

}

export const removeLocalidad = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        await Municipio.findByIdAndDelete(id)

        return res.status(200).json({ message: "Location removed" })

    } catch (error) {
        throw error
    }

}