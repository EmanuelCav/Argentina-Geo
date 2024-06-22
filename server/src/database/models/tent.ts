import { Schema, model } from "mongoose";

import { ITent } from "../../interface/User";

const tentSchema = new Schema({

    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    quantity: Number,

    price: Number,

    isAdd: Boolean

}, {
    timestamps: true,
    versionKey: false
})

export default model<ITent>('Tent', tentSchema)