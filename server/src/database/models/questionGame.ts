import { Schema, model, Types } from "mongoose";

import { IQuestionGame } from '../../interface/Game';

const { ObjectId } = Types

const questionGameSchema = new Schema({

    question: {
        type: ObjectId,
        ref: 'Question'
    },
    options: [{
        type: String
    }]

}, {
    timestamps: true,
    versionKey: false
})

export default model<IQuestionGame>('QuestionGame', questionGameSchema)