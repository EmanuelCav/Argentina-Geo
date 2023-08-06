import { Document, ObjectId } from "mongoose";

export interface IRole extends Document {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: ObjectId;
    role: string;
}