import { Schema, model } from "mongoose";

import { ICategory } from "../../interface/Game";

const categorySchema = new Schema({

    name: {
        type: String,
        required: true
    },

    questions: {
        type: Number,
        default: 0
    },

    corrects: {
        type: Number,
        default: 0
    },

    isSelected: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true,
    versionKey: false
})

export default model<ICategory>('Category', categorySchema)