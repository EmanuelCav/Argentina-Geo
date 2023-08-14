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
        type: ObjectId,
        ref: 'Category'
    },
    image: {
        type: ObjectId,
        ref: 'Image'
    },
    answer: {
        type: String,
        requuired: true
    }

})

export default model<IQuestion>('Question', questionSchema)