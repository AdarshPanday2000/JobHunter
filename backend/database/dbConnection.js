import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName : 'JOB_HUNTER',
    })
    .then(() => {
        console.log('connected to db')
    }).catch((err) => {
        console.log(err)
    })
}