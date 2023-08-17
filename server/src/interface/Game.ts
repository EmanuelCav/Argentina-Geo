import { Document, ObjectId } from "mongoose";

import { imageType } from "../types/game.types";

export interface ICategory extends Document {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: ObjectId;
    name: string;
}

export interface IQuestion extends Document {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: ObjectId;
    question: string;
    category: ObjectId;
    image: imageType;
    answer: string;
}

export interface IGame extends Document {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: ObjectId;
    questions: ObjectId;
}

export interface IQuestionGame extends Document {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: ObjectId;
    question: ObjectId;
    options: string[];
}


