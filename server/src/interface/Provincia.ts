import { Document, ObjectId } from "mongoose";

export interface IProvincia extends Document {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    _id: ObjectId;
    name: string;
    capital: string;
    flag: ObjectId;
    location: ObjectId;
    population: string;
    surface: string;
}