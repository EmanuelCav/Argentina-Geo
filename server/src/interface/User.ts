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
    level: number;
    points: number;
    categories: ObjectId[];
    amountOptions: number;
    amountQuestions: number;
}