import express from "express";
import cors from "cors";

const app = express(); //app created 

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    exposedHeaders: ['Content-Length', 'Content-Type', 'x-filename', 'Content-Disposition'],    
}));


app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));


// Routes import

import userRouter from './routes/user.routes.js';
import fontRouter from './routes/font.routes.js';


//Routes declaration
    //User Routes
app.use("/api/v1/users", userRouter);

    //Font Routes
app.use("/api/v1/fonts", fontRouter);


export {app}