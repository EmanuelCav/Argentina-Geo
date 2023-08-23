import { Document, ObjectId } from "mongoose";

export interface IPais extends Document {
    _id: ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    name: string;
}

export interface IProvincia extends Document {
    _id: ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    name: string;
    pais: ObjectId;
}

export interface IMunicipio extends Document {
    _id: ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    name: string;
    provincia: ObjectId;
}