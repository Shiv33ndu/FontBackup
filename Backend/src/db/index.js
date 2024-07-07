import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import GridFsStorage from "multer-gridfs-storage";



let conn;
let gfs;
let storage;

const connectDB = async () => {
    try {
        
        conn = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);


        // conn.connection.once("open", () => {
        // // init stream
        // gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        //     bucketName: "uploads",
        //     });
        // });

        // console.log("BUcket:", gfs? gfs.bucketName : "null");


        // storage = new GridFsStorage({ 
        //     url: `${process.env.MONGODB_URI}`,
        //     options: { useNewUrlParser: true, useUnifiedTopology: true },
        //     file: (req, file) => {
        //         return {
        //             filename: file.originalname,
        //             bucketName: 'uploads'
        //         };
        //     }
        // })

        // console.log('Storage::',storage);

    } catch (error) {
        console.log('DB Connection Error', error);
        process.exit(1);
    }
}

export { connectDB, conn, gfs, storage };