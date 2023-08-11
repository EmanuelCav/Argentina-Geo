import { Schema, model, Types } from "mongoose";

import { IProvincia } from '../../interface/Provincia';

const { ObjectId } = Types

const provinciaSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    capital: {
        type: String,
        required: true,
        trim: true
    },
    flag: {
        type: ObjectId,
        ref: 'Image'
    },
    location: {
        type: ObjectId,
        ref: 'Image'
    },
    population: {
        type: String,
        required: true
    },
    surface: {
        type: String,
        required: true
    }

}, {
    timestamps: true,
    versionKey: false
})

export default model<IProvincia>('Provincia', provinciaSchema)