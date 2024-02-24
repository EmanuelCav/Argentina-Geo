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
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: ObjectId,
        ref: 'Role'
    },
    points: {
        type: ObjectId,
        ref: 'Experience'
    },
    categories: [{
        type: ObjectId,
        ref: 'Categoryuser'
    }],
    amountOptions: {
        type: Number,
        default: 4
    },
    amountQuestions: {
        type: Number,
        default: 10
    },
    pais: {
        type: ObjectId,
        ref: 'Pais'
    },
    provincia: {
        type: ObjectId,
        ref: 'Provincia',
        default: null
    },
    municipio: {
        type: ObjectId,
        ref: 'Municipio',
        default: null
    },
    helps: {
        type: Number,
        default: 3
    }

}, {
    timestamps: true,
    versionKey: false
})

export default model<IUser>('User', userSchema)