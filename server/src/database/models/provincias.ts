import { Schema, model } from "mongoose";

import { IProvincia } from '../../interface/Provincia';

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
        type: String,
        required: true,
        trim: true
    },
    population: {
        type: Number,
        required: true
    },
    surface: {
        type: Number,
        required: true
    }

})

export default model<IProvincia>('Provincia', provinciaSchema)