import { Schema, model, Types } from "mongoose";

import { IExperience } from "../../interface/User";

const { ObjectId } = Types

const experienceSchema = new Schema({

    day: {
        type: Number,
        default: 0
    },
    month: {
        type: Number,
        default: 0
    },
    year: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    user: {
        type: ObjectId,
        ref: 'User'
    },
    levelExperience: {
        type: Number,
        default: 0
    },
    bestPuntuation: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true,
    versionKey: false
})

export default model<IExperience>('Experience', experienceSchema)