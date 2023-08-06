import { Schema, model } from "mongoose";

import { IRole } from "../../interface/Role";

const roleSchema = new Schema({

    role: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }

}, {
    timestamps: true,
    versionKey: false
})

export default model<IRole>('Role', roleSchema)