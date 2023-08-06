import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: ObjectId;
    nickname: string;
    phone: string;
    password: string;
    role: any;
}