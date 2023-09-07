import { Schema, model, Types } from "mongoose";

import { IQuestion } from "../../interface/Game";

const { ObjectId } = Types

const questionSchema = new Schema({

    question: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: ObjectId,
        ref: 'Image'
    },
    answer: {
        type: String,
        required: true
    }
    
}, {
    timestamps: true,
    versionKey: false
})

export default model<IQuestion>('Question', questionSchema)