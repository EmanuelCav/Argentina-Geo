import { Schema, model, Types } from "mongoose";

const { ObjectId } = Types

import { IProvincia } from "../../interface/Location";

const provinciaSchema = new Schema({
    
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    pais: {
        type: ObjectId,
        ref: 'Pais'
    }

}, {
    timestamps: true,
    versionKey: false
})

export default model<IProvincia>('Provincia', provinciaSchema)