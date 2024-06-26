import { Request, Response } from "express";

import Role from '../database/models/roles';

export const roles = async (req: Request, res: Response): Promise<Response> => {

    try {

        const showRoles = await Role.find()

        return res.status(200).json(showRoles)
        
    } catch (error) {
        throw error
    }

}

export const createRole = async (req: Request, res: Response): Promise<Response> => {

    const { role } = req.body

    try {

        const newRole = new Role({
            role
        })

        const roleSaved = await newRole.save()

        return res.status(200).json(roleSaved)
        
    } catch (error) {
        throw error
    }

}

export const removeRole = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    try {

        const role = await Role.findById(id)

        if(!role) {
            return res.status(400).json({ message: "Role does not exists" })
        }

        await Role.findByIdAndDelete(id)

        return res.status(200).json({ message: "Role was removed successfully" })
        
    } catch (error) {
        throw error
    }

}

