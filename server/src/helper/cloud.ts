import cloudinary from 'cloudinary';

import { cloud_name, api_key, api_secret } from '../config/config';

export const cloud = cloudinary.v2

cloud.config({
    cloud_name,
    api_key,
    api_secret,
})