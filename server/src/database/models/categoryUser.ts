import { Schema, model, Types } from "mongoose";

import { ICategoryUser } from "../../interface/Game"

const { ObjectId } = Types

const categoryUserSchema = new Schema({

    category: {
        type: ObjectId,
        ref: 'Category'
    },

    questions: {
        type: Number,
        default: 0
    },

    corrects: {
        type: Number,
        default: 0
    },

    isSelect: {
        type: Boolean,
        default: true
    },

    user: {
        type: ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true,
    versionKey: false
})

export default model<ICategoryUser>('Categoryuser', categoryUserSchema)