import { Request, Response } from "express";
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { PreferenceRequest } from "mercadopago/dist/clients/preference/commonTypes";

import Tent from '../database/models/tent';
import User from '../database/models/users';

import { access_token_prod, access_token_test, host } from "../config/config";

const client = new MercadoPagoConfig({
    accessToken: process.env.PORT === 'production'
        ? `${access_token_prod}`
        : `${access_token_test}`
});

export const orderPayment = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const tent = await Tent.findById(id)

        if (!tent) {
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
                    unit_price: tent.price / 10,
                    picture_url: "https://res.cloudinary.com/projects-emanuek/image/upload/v1706790450/favicon_tvx4ge.png"
                }
            ],
            back_urls: {
                success: `${host}/payments/success`,
                pending: `${host}/payments/pending`,
                failure: `${host}/payments/failure`
            },
            notification_url: `${host}/payments/webhook/tents/${id}`
        };

        const preference = await new Preference(client).create({ body })

        return res.status(200).json(preference.init_point)

    } catch (error) {
        throw error
    }

}

export const successPayment = async (req: Request, res: Response): Promise<Response> => {

    // const { id } = req.params

    try {

        console.log("SUCCESS");
        

        // const tent = await Tent.findById(id)

        // if (!tent) {
        //     return res.status(400).json({ message: "Tent does not exists" })
        // }

        const user = await User.findById(req.user).populate({
            path: "categories",
            select: "category questions corrects isSelect isUnlocked",
            populate: {
                path: 'category',
                select: "name"
            }
        })
            .populate("pais")
            .populate("provincia")
            .populate("municipio")
            .populate("points")

        if (!user) {
            return res.status(400).json({ message: "User does not exists" })
        }

        // const userUpdated = await User.findByIdAndUpdate(req.user, {
        //     $set: {
        //         isAdd: !user.isAdd ? false : !tent.isAdd,
        //         helps: user.helps + tent.quantity
        //     }
        // }, {
        //     new: true
        // }).populate({
        //     path: "categories",
        //     select: "category questions corrects isSelect isUnlocked",
        //     populate: {
        //         path: 'category',
        //         select: "name"
        //     }
        // })
        //     .populate("pais")
        //     .populate("provincia")
        //     .populate("municipio")
        //     .populate("points")

        return res.status(200).json({
            user,
            message: "Pago realizado"
        })

    } catch (error) {
        throw error
    }

}

export const pendingPayment = async (req: Request, res: Response): Promise<Response> => {

    try {

        const user = await User.findById(req.user).populate({
            path: "categories",
            select: "category questions corrects isSelect isUnlocked",
            populate: {
                path: 'category',
                select: "name"
            }
        })
            .populate("pais")
            .populate("provincia")
            .populate("municipio")
            .populate("points")

        if (!user) {
            return res.status(400).json({ message: "User does not exists" })
        }

        return res.status(200).json({
            user,
            message: "Pago en proceso"
        })

    } catch (error) {
        throw error
    }

}

export const failurePayment = async (req: Request, res: Response): Promise<Response> => {

    try {

        const user = await User.findById(req.user).populate({
            path: "categories",
            select: "category questions corrects isSelect isUnlocked",
            populate: {
                path: 'category',
                select: "name"
            }
        })
            .populate("pais")
            .populate("provincia")
            .populate("municipio")
            .populate("points")

        if (!user) {
            return res.status(400).json({ message: "User does not exists" })
        }

        return res.status(200).json({
            user,
            message: "Pago fallido"
        })

    } catch (error) {
        throw error
    }

}

export const webhookPayment = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params
    const { type } = req.query

    try {

        console.log(req.query);

        const tent = await Tent.findById(id)

        if (!tent) {
            return res.status(400).json({ message: "Tent does not exists" })
        }

        let user

        user = await User.findById(req.user).populate({
            path: "categories",
            select: "category questions corrects isSelect isUnlocked",
            populate: {
                path: 'category',
                select: "name"
            }
        })
            .populate("pais")
            .populate("provincia")
            .populate("municipio")
            .populate("points")

        if (!user) {
            return res.status(400).json({ message: "User does not exists" })
        }

        if (String(type) === "payment") {
            user = await User.findByIdAndUpdate(req.user, {
                $set: {
                    isAdd: !user.isAdd ? false : !tent.isAdd,
                    helps: user.helps + tent.quantity
                }
            }, {
                new: true
            }).populate({
                path: "categories",
                select: "category questions corrects isSelect isUnlocked",
                populate: {
                    path: 'category',
                    select: "name"
                }
            })
                .populate("pais")
                .populate("provincia")
                .populate("municipio")
                .populate("points")
        }

        return res.status(200).json(user)

    } catch (error) {
        throw error
    }

}