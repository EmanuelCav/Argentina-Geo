import { Document, ObjectId } from "mongoose";

export interface IProvincia extends Document {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: ObjectId;
    name: string;
    capital: string;
    flag: string;
    population: number;
    surface: number;
}