    import { connectDB, conn, gfs, storage } from "./db/index.js"
    import { app } from "./app.js";
    import dotenv from "dotenv";
    import { DB_NAME } from "./constant.js";
    

    dotenv.config({
        path: "../.env"
    });

    connectDB()
    .then(() => {

        app.on("error", (err) => {
            console.log('Error:',err);
            throw err;
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });

    })
    .catch((err) => {
        console.log("Connection Error", err);
    })