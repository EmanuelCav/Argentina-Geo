import { Schema, model, Types } from "mongoose";

import { IGame } from "../../interface/Game";

const { ObjectId } = Types

const gameSchema = new Schema({

    questions: [{
        type: ObjectId,
        ref: 'Question'
    }],
    corrects: {
        type: Number,
        default: 0
    },
    user: {
        type: ObjectId,
        ref: 'User'
    },

}, {
    timestamps: true,
    versionKey: false
})

export default model<IGame>('Game', gameSchema)