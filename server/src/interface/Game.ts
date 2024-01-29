import { Document, ObjectId } from "mongoose";

export interface ICategory extends Document {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: ObjectId;
    name: string;
}

export interface ICategoryUser extends Document {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: ObjectId;
    category: ObjectId;
    questions: number;
    corrects: number;
    isSelect: boolean;
    user: ObjectId;
}

export interface IQuestion extends Document {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: ObjectId;
    question: string;
    category: ObjectId;
    image: ObjectId;
    answer: string;
    options: string[];
}

export interface IGame extends Document {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: ObjectId;
    questions: ObjectId[];
    user: ObjectId;
    corrects: number;
}



