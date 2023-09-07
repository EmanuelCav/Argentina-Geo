import { Schema, model } from "mongoose";

import { ICategory } from "../../interface/Game"

const categorySchema = new Schema({

    name: {
        type: String,
        required: true
    }

}, {
    timestamps: true,
    versionKey: false
})

export default model<ICategory>('Category', categorySchema)