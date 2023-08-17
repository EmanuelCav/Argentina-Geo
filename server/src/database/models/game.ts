import { Schema, model, Types } from "mongoose";

import { IGame } from "../../interface/Game";

const { ObjectId } = Types

const gameSchema = new Schema({

    questions: [{
        type: ObjectId,
        ref: 'QuestionGame'
    }]

}, {
    timestamps: true,
    versionKey: false
})

export default model<IGame>('Game', gameSchema)