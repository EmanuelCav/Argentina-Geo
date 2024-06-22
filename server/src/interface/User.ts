import { Document, ObjectId } from "mongoose";

import { roleType } from "../types/auth.types";

export interface IUser extends Document {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: ObjectId;
    nickname: string;
    password: string;
    role: roleType;
    points: IExperience;
    categories: ObjectId[];
    amountOptions: number;
    amountQuestions: number;
    pais: ObjectId;
    provincia: ObjectId;
    municipio: ObjectId;
    helps: number;
    isAdd: boolean;
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
    bestPuntuation: number;
    lastGame: string;
}

export interface ITent extends Document {
    _id: ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    title: string;
    description: string;
    quantity: number;
    price: number;
    isAdd: boolean;
}