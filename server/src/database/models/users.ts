import { Schema, model, Types } from "mongoose";

import { IUser } from "../../interface/User";

const { ObjectId } = Types

const userSchema = new Schema({

    nickname: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        // unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: ObjectId,
        ref: 'Role'
    },
    level: {
        type: Number,
        default: 1
    },
    points: {
        type: Number,
        default: 0
    },
    categories: [{
        type: ObjectId,
        ref: 'Category'
    }],
    amountOptions: {
        type: Number,
        default: 4
    },
    amountQuestions: {
        type: Number,
        default: 10
    }

}, {
    timestamps: true,
    versionKey: false
})

export default model<IUser>('User', userSchema)