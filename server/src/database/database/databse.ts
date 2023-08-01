import mongoose from 'mongoose';

import { database } from "../../config/config";

(async () => {

    const connection = await mongoose.connect(`${database}`)

    if(connection.STATES.connected) {
        console.log("Database is running");
    }

})()