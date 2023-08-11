import { Schema, model } from "mongoose";

import { Image } from "../../interface/Image";

const imageSchema = new Schema({
    
    image: String,
    imageId: String,
    place: String

}, {
    timestamps: true,
    versionKey: false
})

export default model<Image>('Image', imageSchema)