import { Schema, model, Types } from "mongoose";

import { IMunicipio } from '../../interface/Localidades';

const { ObjectId } = Types

const municipioSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    cabecera: {
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
    },
    provincia: {
        type: ObjectId,
        ref: 'Provincia'
    }

}, {
    timestamps: true,
    versionKey: false
})

export default model<IMunicipio>('Municipio', municipioSchema)