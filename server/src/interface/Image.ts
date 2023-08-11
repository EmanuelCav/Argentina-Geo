import { Document, ObjectId } from "mongoose";

export interface Image extends Document {
    _id: ObjectId;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    image: string;
    imageId: string;
    place: string;
}