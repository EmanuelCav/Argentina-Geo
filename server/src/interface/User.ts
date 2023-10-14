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
    points: IExperience;
    categories: ObjectId[];
    amountOptions: number;
    amountQuestions: number;
    pais: ObjectId;
    provincia: ObjectId;
    municipio: ObjectId;
}

export interface ILevel extends Document {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: ObjectId;
    level: number;
    max: number;
}

export interface IExperience extends Document {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: ObjectId;
    day: number;
    month: number;
    year: number;
    total: number;
    user: ObjectId;
    levelExperience: number;
    bestPuntuation: number;
    lastGame: string;
}

