import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
require('dotenv').config()

const PORT = 3000
const main = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.y1e7y.mongodb.net/advanced-note-app?retryWrites=true&w=majority&appName=Cluster0`);
        console.log(`Connected to mongoose 😊😍`)
        app.listen(PORT, () => {
            console.log(`Server is running on localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

app.get(`/`, (req, res) => {
    res.send(`HELLO ASSINGMENT-4`)
})
main()