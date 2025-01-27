import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"



dotenv.config({
    path: './env'
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`the process is running at: ${process.env.PORT}`)
})
})
.catch((err) => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`connection failed: ${err}`)
    })
})


/*
;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    }
    catch (error) {
        console.log("ERROR: ", error);
    }
})()
*/