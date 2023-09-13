import { ObjectId } from "mongoose"

import User from '../database/models/users'
import Category from '../database/models/category'
import Categoryuser from '../database/models/categoryUser'
import Experience from '../database/models/experience'

export const categoriesFromUser = async (id: ObjectId) => {

    const categories = await Category.find()

    for (let i = 0; i < categories.length; i++) {

        let categoryUser

        if(i === 0) {
            categoryUser = new Categoryuser({
                category: categories[i]._id,
                user: id,
                isUnlocked: true
            })
        } else {
            categoryUser = new Categoryuser({
                category: categories[i]._id,
                user: id
            })
        }

        const categoryUserSaved = await categoryUser.save()

        await User.findByIdAndUpdate(id, {
            $push: {
                categories: categoryUserSaved._id
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