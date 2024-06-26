import { ObjectId } from "mongoose"

import User from '../database/models/users'
import Category from '../database/models/category'
import Categoryuser from '../database/models/categoryUser'
import Experience from '../database/models/experience'

export const categoriesFromUser = async (id: ObjectId) => {

    const categories = await Category.find()

    for (let i = 0; i < categories.length; i++) {
        
        const categoryUser = new Categoryuser({
            category: categories[i]._id,
            user: id
        })

        const newCategoryUser = await categoryUser.save()

        await User.findByIdAndUpdate(id, {
            $push: {
                categories: newCategoryUser._id
            }
        }, {
            new: true
        })
    }

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
