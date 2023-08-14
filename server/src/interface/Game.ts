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

