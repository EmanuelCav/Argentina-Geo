import { ObjectId } from "mongoose"

import User from '../database/models/users'
import Category from '../database/models/category'
import Categoryuser from '../database/models/categoryUser'
import Experience from '../database/models/experience'

export const categoriesFromUser = async (id: ObjectId) => {


    const category = await Category.findOne({ name: 'Provincias/Distritos' })

    const categoryUser = new Categoryuser({
        category: category?._id,
        user: id,
        isUnlocked: true
    })

    const categoryUserSaved = await categoryUser.save()

    await User.findByIdAndUpdate(id, {
        $push: {
            categories: categoryUserSaved._id
        }
    }, {
        new: true
    })

}

export const experienceFromUser = async (id: ObjectId) => {

    const newExperience = new Experience({
        user: id
    })

    const experienceSaved = await newExperience.save()

    await User.findByIdAndUpdate(id, {
        points: experienceSaved._id
    }, {
        new: true
    })

}

export const timeUser = async () => {

    const url = "http://worldtimeapi.org/api/timezone/America/Argentina/Buenos_Aires"

    try {

        const time = await fetch(url).then((res) => {
            return res.json()
        })

        return time.datetime.split("T")[0]

    } catch (error) {
        console.log(error);
    }

}

export const generateUserNumber = (): string => {

    let number: string = ''

    for (let i = 0; i < 6; i++) {
        number += String(Math.floor(Math.random() * 10))
    }

    return number

}
