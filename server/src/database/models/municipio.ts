import { Schema, model, Types } from "mongoose";

const { ObjectId } = Types

import { IMunicipio } from "../../interface/Location";

const municipioSchema = new Schema({
    
    name: {
        type: String,
        required: true,
        trim: true
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