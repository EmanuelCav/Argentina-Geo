import { Schema, model } from 'mongoose'

import { ILevel } from '../../interface/User'

const levelSchema = new Schema({

    level: {
        type: Number,
        required: true,
        unique: true
    },
    max: {
        type: Number,
        required: true,
        unique: true
    }

}, {
    timestamps: true,
    versionKey: false
})

export default model<ILevel>('Level', levelSchema)