import { Document, ObjectId } from "mongoose";

import { roleType } from "../types/auth.types";

export interface IUser extends Document {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: ObjectId;
    nickname: string;
    phone: string;
    password: string;
    role: roleType;
    level: ObjectId;
    points: number;
    categories: ObjectId[];
    amountOptions: number;
    amountQuestions: number;
    pais: ObjectId;
    provincia: ObjectId;
    municipio: ObjectId;
}

export interface ILevel extends Document {
    level: number;
    max: number;
}

export interface IExperience extends Document {
    day: number;
    month: number;
    year: number;
    total: number;
    user: ObjectId;
}

