import { Schema, model } from "mongoose";

import { IPais } from "../../interface/Location";

const paisSchema = new Schema({
    
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }

}, {
    timestamps: true,
    versionKey: false
})

export default model<IPais>('Pais', paisSchema)