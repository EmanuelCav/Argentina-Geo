import { Document, ObjectId } from "mongoose";

import { imageType } from "../types/game.types";

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
    isUnlocked: boolean;
    user: ObjectId;
}

export interface IQuestion extends Document {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: ObjectId;
    question: string;
    category: String;
    image: imageType;
    answer: string;
    text: string;
}

export interface IGame extends Document {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: ObjectId;
    questions: ObjectId;
    user: ObjectId;
    corrects: number;
}

export interface IQuestionGame extends Document {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: ObjectId;
    question: ObjectId;
    options: string[];
    user: ObjectId;
    categoryUser: ObjectId;
}



