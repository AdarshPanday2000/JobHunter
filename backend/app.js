import express from "express";
import dotenv from "dotenv";
import cors from "cors";  // for connecting backend and frontend
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from './routes/userRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import jobRouter from './routes/jobRouter.js';
import { dbConnection } from './database/dbConnection.js';
import { errorMiddleware } from './middlewares/error.js'

const app = express()    // instance created
dotenv.config({ path: "./config/config.env"})

app.use(
    cors({
        origin : [process.env.FRONTEND_URL],
        methods: ['GET', 'POST' , 'DELETE', 'PUT'],
        credentials: true,
    })
);  //app.use: This method mounts middleware to the Express application. Middleware is a function that processes requests as they pass through the server


app.use(cookieParser());
app.use(express.json())  //only parses JSON data and leave rest data
app.use(express.urlencoded({ extended: true }));  // it converts the provided string into JSON format.
app.use(fileUpload({
    useTempFiles :  true,
    tempFileDir  : '/tmp/'
}))
app.use("/api/v1/user", userRouter);
app.use('/api/v1/application', applicationRouter);
app.use('/api/v1/job', jobRouter);


dbConnection();

app.use(errorMiddleware)



export default app;


// dotenv: This module loads environment variables from a .env file into process.env. This is useful for managing configuration variables outside your code, like API keys and database connection strings.
// cors: CORS stands for Cross-Origin Resource Sharing. This module allows your server to handle requests from different origins (domains). It's often used when your frontend (client) and backend (server) are on different domains.