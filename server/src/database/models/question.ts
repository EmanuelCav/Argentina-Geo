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
        type: String
    },
    image: {
        type: ObjectId,
        ref: 'Image'
    },
    answer: {
        type: String,
        required: true
    },
    text: {
        type: String,
        trim: true
    },
    isAnswer: {
        type: Boolean,
        default: true
    }
    
}, {
    timestamps: true,
    versionKey: false
})

export default model<IQuestion>('Question', questionSchema)