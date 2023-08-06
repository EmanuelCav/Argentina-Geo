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
    }

}, {
    timestamps: true,
    versionKey: false
})

export default model<IUser>('User', userSchema)