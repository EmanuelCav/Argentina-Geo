import { Request, Response } from "express";
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { PreferenceRequest } from "mercadopago/dist/clients/preference/commonTypes";

import Tent from '../database/models/tent';

const client = new MercadoPagoConfig({ accessToken: 'APP_USR-5997640093596830-062214-3b4515b48d3f6130ec2cfca0a812c580-1870347950' });

export const orderPayment = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const tent = await Tent.findById(id)

        if(!tent) {
            return res.status(400).json({ message: "Tent does not exists" })
        }

        const body: PreferenceRequest = {
            items: [
                {
                    id: id,
                    title: tent.title,
                    description: tent.description,
                    currency_id: "ARS",
                    quantity: tent.quantity,
                    unit_price: tent.price,
                    picture_url: "https://res.cloudinary.com/projects-emanuek/image/upload/v1706790450/favicon_tvx4ge.png"
                }
            ]
        };

        const preference = await new Preference(client).create({ body })

        return res.status(200).json(preference)
        
    } catch (error) {
        throw error
    }

}